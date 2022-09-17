package com.longtrinh.profileimage.bucket;

public enum BucketName {

        PROFILE_IMAGE("longtrinh-image-upload");
        private final String bname;

        BucketName( String name) {
            this.bname = name;
        }

        public String getBucketName() {
            return bname;
        }
}