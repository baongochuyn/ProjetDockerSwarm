package com.example.backend.controller;

import com.example.backend.security.JwtUtil;
import com.example.backend.security.MyUserDetailsService;
import com.example.backend.service.UserService;
import com.example.backend.model.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private MyUserDetailsService userDetailsService;

    @Autowired
    private UserService userService; // <--- injecte UserService

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/login")
    public String login(@RequestBody AuthRequest authRequest) throws Exception {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword()));
        } catch (Exception e) {
            throw new Exception("Nom d'utilisateur ou mot de passe incorrect");
        }

        final UserDetails userDetails = userDetailsService.loadUserByUsername(authRequest.getUsername());
        final String token = jwtUtil.generateToken(userDetails.getUsername());

        return token;
    }

    @PostMapping("/register")
    public String register(@RequestBody AuthRequest authRequest) {
        User newUser = userService.createUser(authRequest.getUsername(), authRequest.getPassword());
        return "Utilisateur créé avec succès : " + newUser.getUsername();
    }
}

class AuthRequest {
    private String username;
    private String password;

    // getters & setters
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
