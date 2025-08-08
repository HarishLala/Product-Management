//package com.api.controller;
//
//import com.api.entity.Users;
//import com.api.repo.UsersRepo;
//import com.api.request.LoginRequest;
//import com.api.service.UserService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
////import org.springframework.http.HttpStatusCode;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.CrossOrigin;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RestController;
//
//import java.util.HashMap;
//import java.util.Map;
//
//
//@RestController
//public class UsersController {
//
//    @Autowired
//    UserService userService;
//
//    @PostMapping("/addUser")
//    @CrossOrigin(origins = "http://localhost:5173")
//    public Users addUser(@RequestBody Users user) {
//        return userService.addUser(user);
//    }
//
//    @PostMapping("/loginUser")
//    @CrossOrigin(origins = "http://localhost:5173")
//    public Boolean loginUser(@RequestBody LoginRequest loginRequest) {
//        return userService.loginUser(loginRequest);
//
//    }
//    @PostMapping("/login")
//    public ResponseEntity<String> login(@RequestBody LoginRequest loginRequest) {
//        boolean result = userService.loginUser(loginRequest);
//        return result ? ResponseEntity.ok("Login successful")
//                : ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid login");
//    }
//
//}
package com.api.controller;

import com.api.entity.Users;
import com.api.request.LoginRequest;
import com.api.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
public class UsersController {

    @Autowired
    private UserService userService;

    @PostMapping("/addUser")
    @CrossOrigin(origins = "http://localhost:5173")
    public Users addUser(@RequestBody Users user) {
        return userService.addUser(user);
    }

    @PostMapping("/loginUser")
    @CrossOrigin(origins = "http://localhost:5173")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest) {
        Users user = userService.getUserByEmailAndPassword(loginRequest);

        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }

        Map<String, Object> response = new HashMap<>();
        response.put("name", user.getName());  // Used by frontend
        response.put("role", user.getRole());  // Used by frontend

        return ResponseEntity.ok(response);
    }
}

