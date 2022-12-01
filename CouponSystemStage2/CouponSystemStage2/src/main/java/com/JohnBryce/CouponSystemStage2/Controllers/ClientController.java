package com.JohnBryce.CouponSystemStage2.Controllers;

import com.JohnBryce.CouponSystemStage2.Login.LoginManager;
import com.JohnBryce.CouponSystemStage2.TokenManager.TokenManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

public abstract class ClientController {

    @Autowired
    LoginManager loginManager;
    @Autowired
    TokenManager tokenManager;

    public abstract ResponseEntity<String> login(String email, String password);

}
