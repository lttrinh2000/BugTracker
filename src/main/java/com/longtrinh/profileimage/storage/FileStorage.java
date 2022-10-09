package com.longtrinh.profileimage.storage;

import java.io.IOException;
import java.io.InputStream;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.services.lookoutequipment.model.S3Object;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.S3ObjectInputStream;
import com.amazonaws.util.IOUtils;

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

    public byte[] downloadImage(String fullPath, String key) {
        try {
            com.amazonaws.services.s3.model.S3Object obj = s3.getObject(fullPath, key);
            S3ObjectInputStream inputStream = obj.getObjectContent();
            return IOUtils.toByteArray(inputStream);
        } catch (AmazonServiceException | IOException e) {
            throw new IllegalStateException("Failed to download");
        }
    }
}