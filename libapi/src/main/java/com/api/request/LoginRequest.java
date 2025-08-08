////package com.api.request;
////public class LoginRequest {
////
////
////    public LoginRequest() {
////
////    }
////
////    public LoginRequest(String userId, String password) {
////        super();
////        this.userId = userId;
////        this.password = password;
////    }
////    public String getUserId() {
////        return userId;
////    }
////    public void setUserId(String userId) {
////        this.userId = userId;
////    }
////    public String getPassword() {
////        return password;
////    }
////    public void setPassword(String password) {
////        this.password = password;
////    }
////    private String userId;
////    private String password;
////
////}
//
//package com.api.request;
//
//public class LoginRequest {
//    private String email;
//    private String password;
//
//    // Getters and Setters
//    public String getEmail() {
//        return email;
//    }
//
//    public void setEmail(String email) {
//        this.email = email;
//    }
//
//    public String getPassword() {
//        return password;
//    }
//
//    public void setPassword(String password) {
//        this.password = password;
//    }
//
//}
package com.api.request;

public class LoginRequest {
    private String email;
    private String password;

    // Getters & Setters

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
