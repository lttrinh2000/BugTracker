package com.longtrinh.profileimage.profile;

import java.util.Objects;
import java.util.Optional;
import java.util.UUID;

public class UserProfile {
    private UUID id;
    private String userName;
    private String userImageLink;

    public UserProfile( UUID id, String userName, String userImage) {
        this.id = id;
        this.userName = userName;
        this.userImageLink = userImage;
    }
    
    public UUID getId() {
        return id;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String name) {
        this.userName = name;
    }

    public Optional<String> getUserImageLink() {
        return Optional.ofNullable(userImageLink);
    }

    public void setUserImageLink(String image) {
        this.userImageLink = image;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserProfile that = (UserProfile) o;
        return Objects.equals(id, that.id) &&
                Objects.equals(userName, that.userName) &&
                Objects.equals(userImageLink, that.userImageLink);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, userName, userImageLink);
    }
}
