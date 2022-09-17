package com.longtrinh.profileimage.placeHolderUsers;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Repository;

import com.longtrinh.profileimage.profile.*;

@Repository
public class ExampleUserProfile {
    
    private static final List<UserProfile> userProfileStorage = new ArrayList<>();

    static {
        userProfileStorage.add(new UserProfile(UUID.randomUUID(), "longtrinh123", null));
        userProfileStorage.add(new UserProfile(UUID.randomUUID(), "random_user", null));
    }

    public List<UserProfile> getUserProfile() {
        return userProfileStorage;
    }
}