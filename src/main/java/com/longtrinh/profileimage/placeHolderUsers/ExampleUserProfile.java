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
        userProfileStorage.add(new UserProfile(UUID.fromString("4132e490-9e86-4f53-84a4-7a226929c3d2"), "longtrinh123", null));
        userProfileStorage.add(new UserProfile(UUID.fromString("4a37bbb9-e071-4e11-897b-afc4a9c591f5"), "random_user", null));
    }

    public List<UserProfile> getUserProfile() {
        return userProfileStorage;
    }
}