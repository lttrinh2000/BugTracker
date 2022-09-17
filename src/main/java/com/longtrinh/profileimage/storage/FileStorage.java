package com.longtrinh.profileimage.storage;

import java.io.InputStream;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;

@Service
public class FileStorage {
    private final AmazonS3 s3;

    @Autowired
    public FileStorage( AmazonS3 s3 ) {
        this.s3 = s3;
    }

    public void save(String path, String fileName, 
                    Optional<Map<String, String>> optionalMetadata,
                    InputStream input) {
        ObjectMetadata metadata = new ObjectMetadata();
        optionalMetadata.ifPresent(map -> {
            if (!map.isEmpty()) {
                map.forEach((key, value) -> metadata.addUserMetadata(key, value));
            }
        });
        try {
            s3.putObject(path, fileName, input, metadata);
        } catch (AmazonServiceException e) {
            throw new IllegalStateException("Failed to store file to s3", e);
        }

    }
}