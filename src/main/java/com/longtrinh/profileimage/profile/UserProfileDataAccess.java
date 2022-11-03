package com.longtrinh.profileimage.profile;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.longtrinh.profileimage.database.*;

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
