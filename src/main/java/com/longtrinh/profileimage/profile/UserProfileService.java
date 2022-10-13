package com.longtrinh.profileimage.profile;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.longtrinh.profileimage.bucket.BucketName;
import com.longtrinh.profileimage.storage.FileStorage;

@Service
public class UserProfileService {
    private final UserProfileDataAccess accessService;
    private final FileStorage fileStorage;

    @Autowired
    public UserProfileService(UserProfileDataAccess accessService, FileStorage fileStorage) {
        this.accessService = accessService;
        this.fileStorage = fileStorage;
    } 

    List<UserProfile> getUserProfiles() {
        return accessService.getUserList();
    }

    public byte[] downloadImage(UUID userProfileId) {
        UserProfile user = getUserProfilesOrThrow(userProfileId);
        String path = String.format("%s/%s", BucketName.PROFILE_IMAGE.getBucketName(), user.getId(), user.getUserImageLink());
        
        return user.getUserImageLink().map(key -> fileStorage.downloadImage(path, key)).orElse(new byte[0]);
        
    } 

    private UserProfile getUserProfilesOrThrow(UUID userProfileId) {
        return UserProfileDataAccess.getUserList()
                                    .stream()
                                    .filter(UserProfile -> UserProfile.getId().equals(userProfileId))
                                    .findFirst()
                                    .orElseThrow( () -> new IllegalStateException(String.format("UserProfile %s not found", userProfileId)));
    }

    public void uploadProfileImage(UUID userProfileId, MultipartFile file) {
        if (file.isEmpty()) {
            throw new IllegalStateException("Can't upload empty file [" + file.getSize() + "]");
        }

        String fileType = file.getContentType();
        if ( fileType.startsWith("image/") ) {
            UserProfile user = getUserProfilesOrThrow(userProfileId);
        
            HashMap<String, String> metadata = new HashMap<String, String>();
            metadata.put("Content-Type", fileType);
            metadata.put("Content-Length", String.valueOf(file.getSize()));

            String path = String.format("%s/%s", BucketName.PROFILE_IMAGE.getBucketName(), user.getId());
            String fileName = String.format("%s-%s", file.getOriginalFilename(), UUID.randomUUID());

            try {
                fileStorage.save(path, fileName, Optional.of(metadata), file.getInputStream());
                user.setUserImageLink(fileName);
            } catch (IOException e) {
                throw new IllegalStateException(e);
            }
        }
        else {
            throw new IllegalStateException("File type must be an image but uploaded file type is ["+fileType+"]");
        }
        
    }

}
