package com.longtrinh.profileimage.profile;

import java.util.Objects;
import java.util.Optional;
import java.util.UUID;

public class UserProfile {
    private UUID id;
    private String emailAddress;
    private String userImageLink;

    public UserProfile( UUID id, String emailAddress, String userImage) {
        this.id = id;
        this.emailAddress = emailAddress;
        this.userImageLink = userImage;
    }
    
    public UUID getId() {
        return id;
    }

    public String getemailAddress() {
        return emailAddress;
    }

    public void setEmailAddress(String name) {
        this.emailAddress = name;
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
                Objects.equals(emailAddress, that.emailAddress) &&
                Objects.equals(userImageLink, that.userImageLink);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, emailAddress, userImageLink);
    }
}
