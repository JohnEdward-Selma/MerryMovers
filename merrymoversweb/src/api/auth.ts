// src/api/auth.ts

const ALLOWED_IMAGE_EXTENSIONS = new Set([
  'jpg',
  'jpeg',
  'png',
  'gif',
  'webp',
  'bmp',
  'svg',
  'avif',
  'tif',
  'tiff',
  'ico',
  'heic',
  'heif',
]);

const EXTENSION_MIME_MAP: Record<string, string> = {
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  png: 'image/png',
  gif: 'image/gif',
  webp: 'image/webp',
  bmp: 'image/bmp',
  svg: 'image/svg+xml',
  avif: 'image/avif',
  tif: 'image/tiff',
  tiff: 'image/tiff',
  ico: 'image/x-icon',
  heic: 'image/heic',
  heif: 'image/heif',
};

function normalizeFileName(name: string) {
  return name.replace(/[^a-zA-Z0-9.-]/g, '_');
}

function getFileExtension(name: string) {
  const lastDot = name.lastIndexOf('.');
  if (lastDot < 0 || lastDot === name.length - 1) {
    return '';
  }
  return name.slice(lastDot + 1).toLowerCase();
}

function inferImageMimeType(file: File, extension: string) {
  if (file.type && file.type.startsWith('image/')) {
    return file.type;
  }
  return EXTENSION_MIME_MAP[extension] || 'application/octet-stream';
}

export function isSupportedImageFile(file: File) {
  const extension = getFileExtension(file.name);
  const hasSupportedExtension = ALLOWED_IMAGE_EXTENSIONS.has(extension);
  const hasImageMimeType = !!file.type && file.type.startsWith('image/');
  return hasImageMimeType || hasSupportedExtension;
}

export async function login(identifier: string, password: string) {
  // identifier can be email or username
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ identifier, password }),
  });
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || 'Login failed');
  }
  return await response.json();
}

export async function register(email: string, username: string, password: string, firstName: string, lastName: string) {
  const response = await fetch('/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, username, password, firstName, lastName }),
  });
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || 'Registration failed');
  }
  return await response.json();
}

export async function updateProfile(id: number, username: string, firstName: string, lastName: string) {
  const response = await fetch(`/api/auth/profile/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, firstName, lastName }),
  });
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || 'Profile update failed');
  }
  return await response.json();
}

export async function changePassword(id: number, currentPassword: string, newPassword: string) {
  const response = await fetch(`/api/auth/profile/${id}/password`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ currentPassword, newPassword }),
  });
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || 'Password update failed');
  }
  return await response.text();
}

export async function updateProfilePicture(id: number, profilePicture: string) {
  const response = await fetch(`/api/auth/profile/${id}/picture`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ profilePicture }),
  });
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || 'Profile picture update failed');
  }
  return await response.json();
}

export async function uploadProfilePictureToSupabase(userId: number, file: File) {
  const extension = getFileExtension(file.name) || 'jpg';
  const safeName = normalizeFileName(file.name);
  const resolvedFileName = safeName.includes('.') ? safeName : `${safeName || 'pfp'}.${extension}`;
  const normalizedFile = resolvedFileName === file.name ? file : new File([file], resolvedFileName, { type: inferImageMimeType(file, extension) });

  const formData = new FormData();
  formData.append('file', normalizedFile);

  const response = await fetch(`/api/auth/profile/${userId}/picture/upload`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || 'Profile picture upload failed');
  }

  return await response.json();
}
