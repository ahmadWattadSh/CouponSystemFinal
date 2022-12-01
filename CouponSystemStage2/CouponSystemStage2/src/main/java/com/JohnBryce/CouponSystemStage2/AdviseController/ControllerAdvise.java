package com.JohnBryce.CouponSystemStage2.AdviseController;

import com.JohnBryce.CouponSystemStage2.Controllers.AdminController;
import com.JohnBryce.CouponSystemStage2.Controllers.ClientController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice("com.JohnBryce.CouponSystemStage2.Controllers")
@RestController
public class ControllerAdvise {

    @ExceptionHandler(value = {Exception.class})
    public ResponseEntity<ErrorDetails> handle(Exception e){
        ErrorDetails error = new ErrorDetails("Custom Error", e.getMessage());
        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }


}
