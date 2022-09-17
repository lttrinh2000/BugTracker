package com.longtrinh.profileimage.profile;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserProfileService {
    private final UserProfileDataAccess accessService;

    @Autowired
    public UserProfileService(UserProfileDataAccess accessService) {
        this.accessService = accessService;
    } 

    List<UserProfile> getuserProfiles() {
        return accessService.getUserList();
    }
}
