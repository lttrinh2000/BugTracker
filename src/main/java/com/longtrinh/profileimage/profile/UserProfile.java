package com.longtrinh.profileimage.profile;

import java.util.Objects;
import java.util.Optional;
import java.util.UUID;

public class UserProfile {
    private UUID id;
    private String userName;
    private String userImage; // S3 key

    public UserProfile( UUID id, String userName, String userImage) {
        this.id = id;
        this.userName = userName;
        this.userImage = userImage;
    }
    
    public String getUserName() {
        return userName;
    }

    public void setUserName(String name) {
        this.userName = name;
    }

    public Optional<String> getUserImage() {
        return Optional.ofNullable(userImage);
    }

    public void setUserImage(String image) {
        this.userImage = image;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserProfile that = (UserProfile) o;
        return Objects.equals(id, that.id) &&
                Objects.equals(userName, that.userName) &&
                Objects.equals(userImage, that.userImage);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, userName, userImage);
    }
}
