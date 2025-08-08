//package com.api.service;
//
//import java.util.Optional;
//
//import com.api.entity.Users;
//import com.api.repo.UsersRepo;
//import com.api.request.LoginRequest;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//@Service
//public class UserService {
//
//    @Autowired
//    UsersRepo usersRepo;
//
//    public Users addUser(Users user) {
//
//        return usersRepo.save(user);
//
//    }
//
//    public Boolean loginUser(LoginRequest loginRequest) {
//
//        Optional<Users> user = usersRepo.findById(loginRequest.getUserId());
//        Users user1 = user.get();
//
//        if(user1 == null) {
//            return false;
//        }
//        if(!user1.getPassword().equals(loginRequest.getPassword())) {
//            return false;
//        }
//
//        return true;
//    }
//
//
//}
package com.api.service;

//import java.util.Optional;
//
//import com.api.entity.Users;
//import com.api.repo.UsersRepo;
//import com.api.request.LoginRequest;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.stereotype.Service;
//
//@Service
//public class UserService {
//
//    @Autowired
//    private UsersRepo usersRepo;
//
//    @Autowired
//    private BCryptPasswordEncoder passwordEncoder;
//
//    // Register or add user with hashed password
//    public Users addUser(Users user) {
//        // Hash the password before saving
//        String hashedPassword = passwordEncoder.encode(user.getPassword());
//        user.setPassword(hashedPassword);
//
//        return usersRepo.save(user);
//    }
//
//    // Login validation
//    public Boolean loginUser(LoginRequest loginRequest) {
//        Optional<Users> optionalUser = usersRepo.findById(loginRequest.getUserEmail());
//
//        if (optionalUser.isEmpty()) {
//            return false;
//        }
//
//        Users user = optionalUser.get();
//
//        // Compare raw password with hashed password
//        return passwordEncoder.matches(loginRequest.getPassword(), user.getPassword());
//    }
//}
//package com.api.service;
//
//import java.util.Optional;
//
//import com.api.entity.Users;
//import com.api.repo.UsersRepo;
//import com.api.request.LoginRequest;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.stereotype.Service;
//import org.springframework.web.bind.annotation.RequestBody;
//
//@Service
//public class UserService {
//
//    @Autowired
//    private UsersRepo usersRepo;
//
//    @Autowired
//    private BCryptPasswordEncoder passwordEncoder;
//
//    // Register or add user with hashed password
//    public Users addUser(Users user) {
//        // Hash the password before saving
//        String hashedPassword = passwordEncoder.encode(user.getPassword());
//        user.setPassword(hashedPassword);
//
//        return usersRepo.save(user);
//    }
//
//    // Login validation by email
//    public Boolean loginUser(@RequestBody LoginRequest loginRequest) {
//        Optional<Users> optionalUser = usersRepo.findByEmail(loginRequest.getEmail());
//
//        if (optionalUser.isEmpty()) {
//            return false;
//        }
//
//        Users user = optionalUser.get();
//
//        // Compare raw password with hashed password
//        return passwordEncoder.matches(loginRequest.getPassword(), user.getPassword());
//    }
//}



import com.api.entity.Users;
import com.api.repo.UsersRepo;
import com.api.request.LoginRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UsersRepo usersRepo;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    // Save new user with hashed password
    public Users addUser(Users user) {
        String hashedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(hashedPassword);
        return usersRepo.save(user);
    }

    // New method to return user on successful login
    public Users getUserByEmailAndPassword(LoginRequest loginRequest) {
        Optional<Users> optionalUser = usersRepo.findByEmail(loginRequest.getEmail());

        if (optionalUser.isEmpty()) {
            return null;
        }

        Users user = optionalUser.get();

        if (passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            return user;
        } else {
            return null;
        }
    }
}



