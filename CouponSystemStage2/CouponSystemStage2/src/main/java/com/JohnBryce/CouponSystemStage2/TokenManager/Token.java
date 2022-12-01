/**
 * Token is a class which defines the token properties.
 * The fields of the token are: token ,sessionBeginning and type.
 */
package com.JohnBryce.CouponSystemStage2.TokenManager;

import com.JohnBryce.CouponSystemStage2.Login.LoginManager;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.Random;

@Data
public class Token {

    static int index = 0 ;
    private String token ;
    private Date sessionBeginning ;
    private LoginManager.ClientType type;


    public Token(String token, Date sessionBeginning, LoginManager.ClientType type ) {
        this.token = token;
        this.sessionBeginning = sessionBeginning;
        this.type =type ;
    }

    static public String createTokenCode() {
        Random random = new Random() ;
        int randomNumber = random.nextInt() ;
        if (Token.index==1000) {
            Token.index=0 ;
        }
         return "token_"+index+"_" +randomNumber ;
    }

}
