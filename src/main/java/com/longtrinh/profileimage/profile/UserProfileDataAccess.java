package com.longtrinh.profileimage.profile;
import com.longtrinh.profileimage.placeHolderUsers.*;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class UserProfileDataAccess {
    
    private static ExampleUserProfile userList;

    @Autowired
    public UserProfileDataAccess(ExampleUserProfile exampleUserList) {
        this.userList = exampleUserList;
    }

    public static List<UserProfile> getUserList() {
        return userList.getUserProfile();
    }
}
