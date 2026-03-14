package com.example.selmaapi.service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class SupabaseStorageService {
    private final String supabaseUrl;
    private final String supabaseServiceRoleKey;
    private final String storageBucket;
    private final HttpClient httpClient;

    public SupabaseStorageService(
            @Value("${supabase.url}") String supabaseUrl,
            @Value("${supabase.service-role-key:}") String supabaseServiceRoleKey,
            @Value("${supabase.storage.bucket:profile_picture}") String storageBucket
    ) {
        this.supabaseUrl = supabaseUrl.endsWith("/") ? supabaseUrl.substring(0, supabaseUrl.length() - 1) : supabaseUrl;
        this.supabaseServiceRoleKey = supabaseServiceRoleKey;
        this.storageBucket = storageBucket;
        this.httpClient = HttpClient.newHttpClient();
    }

    public String uploadProfilePicture(Long userId, MultipartFile file) {
        if (supabaseServiceRoleKey == null || supabaseServiceRoleKey.isBlank()) {
            throw new IllegalStateException("SUPABASE_SERVICE_ROLE_KEY is not configured");
        }
        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("Profile picture file is required");
        }

        String originalName = file.getOriginalFilename() == null ? "pfp" : file.getOriginalFilename();
        String safeName = originalName.replaceAll("[^a-zA-Z0-9.-]", "_");
        if (!safeName.contains(".")) {
            safeName = safeName + ".jpg";
        }

        String objectPath = userId + "/" + Instant.now().toEpochMilli() + "-" + safeName;
        String uploadUrl = supabaseUrl + "/storage/v1/object/" + storageBucket + "/" + objectPath;

        try {
            String contentType = (file.getContentType() == null || file.getContentType().isBlank())
                    ? "application/octet-stream"
                    : file.getContentType();

            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(uploadUrl))
                    .header("apikey", supabaseServiceRoleKey)
                    .header("Authorization", "Bearer " + supabaseServiceRoleKey)
                    .header("x-upsert", "true")
                    .header("Content-Type", contentType)
                    .POST(HttpRequest.BodyPublishers.ofByteArray(file.getBytes()))
                    .build();

            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString(StandardCharsets.UTF_8));
            if (response.statusCode() < 200 || response.statusCode() >= 300) {
                throw new IllegalStateException(response.body());
            }

            return supabaseUrl + "/storage/v1/object/public/" + storageBucket + "/" + objectPath;
        } catch (IllegalStateException ex) {
            throw ex;
        } catch (Exception ex) {
            throw new IllegalStateException("Supabase upload failed: " + ex.getMessage());
        }
    }
}
