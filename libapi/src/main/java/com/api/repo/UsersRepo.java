//package com.api.repo;
//
//
//import com.api.entity.Users;
//import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.stereotype.Repository;
//
//
//
//@Repository
//public interface UsersRepo extends JpaRepository<Users, String> {
//
//    Users findByEmail(String email);
//
//
//}
//
//package com.api.repo;
//
//import com.api.entity.Users;
//import org.springframework.data.jpa.repository.JpaRepository;
//
//import java.util.Optional;
//
//public interface UsersRepo extends JpaRepository<Users, Long> {
//    Optional<Users> findByEmail(String email); // Custom method to find by email
//}
package com.api.repo;

import com.api.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UsersRepo extends JpaRepository<Users, Long> {
    Optional<Users> findByEmail(String email);  // Needed for login
}


