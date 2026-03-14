import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { changePassword, isSupportedImageFile, updateProfile, uploadProfilePictureToSupabase } from '../api/auth';
import './css/ProfilePage.css';

type AuthUser = {
  id?: number;
  username?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  profilePicture?: string;
};

const DEFAULT_PROFILE_PICTURE = 'https://fzfmsrafqxdsyazfqgts.supabase.co/storage/v1/object/public/profile_picture/default_pfp.jpg';

function ProfilePage() {
  const navigate = useNavigate();

  const [authUser, setAuthUser] = useState<AuthUser | null>(() => {
    const raw = localStorage.getItem('authUser');
    if (!raw) {
      return null;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  });

  const handleLogout = () => {
    localStorage.removeItem('authUser');
    window.dispatchEvent(new Event('authUserChanged'));
    navigate('/login');
  };

  const [isEditing, setIsEditing] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isPasswordFormOpen, setIsPasswordFormOpen] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');
  const [isUploadingPicture, setIsUploadingPicture] = useState(false);
  const [pictureError, setPictureError] = useState('');
  const [pictureSuccess, setPictureSuccess] = useState('');
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });
  const [formValues, setFormValues] = useState({
    username: authUser?.username ?? '',
    firstName: authUser?.firstName ?? '',
    lastName: authUser?.lastName ?? '',
  });

  const handleEditStart = () => {
    if (!authUser) {
      return;
    }
    setFormValues({
      username: authUser.username ?? '',
      firstName: authUser.firstName ?? '',
      lastName: authUser.lastName ?? '',
    });
    setSaveError('');
    setIsEditing(true);
  };

  const handleEditCancel = () => {
    setSaveError('');
    setIsEditing(false);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setPasswordForm((prev) => ({ ...prev, [name]: value }));
  };

  const togglePasswordForm = () => {
    setPasswordError('');
    setPasswordSuccess('');
    setIsPasswordFormOpen((prev) => !prev);
  };

  const handlePasswordSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!authUser?.id) {
      setPasswordError('Unable to change password: missing user ID.');
      return;
    }
    if (!passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmNewPassword) {
      setPasswordError('Please complete all password fields.');
      return;
    }
    if (passwordForm.newPassword !== passwordForm.confirmNewPassword) {
      setPasswordError('New passwords do not match.');
      return;
    }

    setPasswordError('');
    setPasswordSuccess('');
    setIsChangingPassword(true);

    try {
      await changePassword(authUser.id, passwordForm.currentPassword, passwordForm.newPassword);
      setPasswordSuccess('Password changed successfully.');
      setPasswordForm({ currentPassword: '', newPassword: '', confirmNewPassword: '' });
      setIsPasswordFormOpen(false);
    } catch (err: any) {
      setPasswordError(err?.message || 'Password update failed.');
    } finally {
      setIsChangingPassword(false);
    }
  };

  const handleEditSave = async () => {
    if (!authUser) {
      return;
    }

    if (!authUser.id) {
      setSaveError('Unable to update profile: missing user ID.');
      return;
    }

    setSaveError('');
    setIsSaving(true);

    try {
      const updatedUser = await updateProfile(
        authUser.id,
        formValues.username,
        formValues.firstName,
        formValues.lastName
      );

      localStorage.setItem('authUser', JSON.stringify(updatedUser));
      setAuthUser(updatedUser);
      window.dispatchEvent(new Event('authUserChanged'));
      setIsEditing(false);
    } catch (err: any) {
      setSaveError(err?.message || 'Profile update failed.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleProfilePictureSelected = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = '';

    if (!file) {
      return;
    }
    if (!authUser?.id) {
      setPictureError('Unable to update profile picture: missing user ID.');
      return;
    }
    if (!isSupportedImageFile(file)) {
      setPictureError('Unsupported format. Use jpg, jpeg, png, gif, webp, bmp, svg, avif, tiff, ico, heic, or heif.');
      return;
    }

    setPictureError('');
    setPictureSuccess('');
    setIsUploadingPicture(true);

    try {
      const updatedUser = await uploadProfilePictureToSupabase(authUser.id, file);

      localStorage.setItem('authUser', JSON.stringify(updatedUser));
      setAuthUser(updatedUser);
      window.dispatchEvent(new Event('authUserChanged'));
      setPictureSuccess('Profile picture updated successfully.');
      window.location.reload();
    } catch (err: any) {
      setPictureError(err?.message || 'Profile picture update failed.');
    } finally {
      setIsUploadingPicture(false);
    }
  };

  if (!authUser) {
    return (
      <>
        <Header />
        <main className="profile-page">
          <section className="profile-card">
            <h2>Profile</h2>
            <p>You are not logged in.</p>
            <Link className="profile-login-link" to="/login">Go to Login</Link>
          </section>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="profile-page">
        <section className="profile-card">
          <div className="profile-header-row">
            <h2>My Profile</h2>
            <div className="profile-actions">
              {isEditing ? (
                <>
                  <button className="profile-cancel-btn" onClick={handleEditCancel}>Cancel</button>
                  <button className="profile-save-btn" onClick={handleEditSave} disabled={isSaving}>
                    {isSaving ? 'Saving...' : 'Save'}
                  </button>
                </>
              ) : (
                <button className="profile-edit-btn" onClick={handleEditStart}>Edit Profile</button>
              )}
              <button className="profile-logout-btn" onClick={handleLogout}>Logout</button>
            </div>
          </div>

          <div className="profile-picture-row">
            <img
              className="profile-picture-preview"
              src={authUser.profilePicture || DEFAULT_PROFILE_PICTURE}
              alt="Profile"
            />
            <div className="profile-picture-actions">
              <label className="profile-picture-upload-btn">
                {isUploadingPicture ? 'Uploading...' : 'Edit PFP'}
                <input
                  type="file"
                  accept=".jpg,.jpeg,.png,.gif,.webp,.bmp,.svg,.avif,.tif,.tiff,.ico,.heic,.heif,image/*"
                  onChange={handleProfilePictureSelected}
                  disabled={isUploadingPicture}
                />
              </label>
              {pictureError && <div className="profile-error">{pictureError}</div>}
              {pictureSuccess && <div className="profile-success">{pictureSuccess}</div>}
            </div>
          </div>

          {saveError && <div className="profile-error">{saveError}</div>}

          <div className="profile-line">
            <span>Username:</span>
            {isEditing ? (
              <input
                className="profile-input"
                name="username"
                value={formValues.username}
                onChange={handleInputChange}
              />
            ) : (
              <strong>{authUser.username || '-'}</strong>
            )}
          </div>

          <div className="profile-line"><span>Email:</span> <strong>{authUser.email || '-'}</strong></div>

          <div className="profile-line">
            <span>First Name:</span>
            {isEditing ? (
              <input
                className="profile-input"
                name="firstName"
                value={formValues.firstName}
                onChange={handleInputChange}
              />
            ) : (
              <strong>{authUser.firstName || '-'}</strong>
            )}
          </div>

          <div className="profile-line">
            <span>Last Name:</span>
            {isEditing ? (
              <input
                className="profile-input"
                name="lastName"
                value={formValues.lastName}
                onChange={handleInputChange}
              />
            ) : (
              <strong>{authUser.lastName || '-'}</strong>
            )}
          </div>

          <div className="profile-line"><span>User ID:</span> <strong>{authUser.id ?? '-'}</strong></div>
        </section>

        <section className="profile-card security-card">
          <div className="security-title">Security</div>

          <div className="password-summary-row">
            <div>
              <div className="password-label">Password</div>
              <div className="password-last-changed">Keep your account secure with a strong password.</div>
            </div>
            <button className="change-password-btn" onClick={togglePasswordForm}>
              {isPasswordFormOpen ? 'Cancel' : 'Change Password'}
            </button>
          </div>

          {isPasswordFormOpen && (
            <form className="password-form" onSubmit={handlePasswordSubmit}>
              <div className="password-field">
                <label htmlFor="currentPassword">Current Password</label>
                <input
                  id="currentPassword"
                  name="currentPassword"
                  type="password"
                  value={passwordForm.currentPassword}
                  onChange={handlePasswordInputChange}
                />
              </div>
              <div className="password-field">
                <label htmlFor="newPassword">New Password</label>
                <input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  value={passwordForm.newPassword}
                  onChange={handlePasswordInputChange}
                />
              </div>
              <div className="password-field">
                <label htmlFor="confirmNewPassword">Confirm New Password</label>
                <input
                  id="confirmNewPassword"
                  name="confirmNewPassword"
                  type="password"
                  value={passwordForm.confirmNewPassword}
                  onChange={handlePasswordInputChange}
                />
              </div>
              <button className="submit-password-btn" type="submit" disabled={isChangingPassword}>
                {isChangingPassword ? 'Updating...' : 'Update Password'}
              </button>
            </form>
          )}

          {passwordError && <div className="profile-error">{passwordError}</div>}
          {passwordSuccess && <div className="profile-success">{passwordSuccess}</div>}

          <div className="security-recommendations">
            <div className="security-recommendations-title">Security Recommendations</div>
            <ul>
              <li>Use a strong password with at least 8 characters</li>
              <li>Include lowercase, numbers, and special characters</li>
              <li>Do not reuse passwords from other accounts</li>
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default ProfilePage;
