/**
 * TokenManager is a class which generates a new token for each successful request of service from users.
 *
 * The functions and their uses:
 * createNewToken -
 * It creates a new token with the current date and a random number, attach it to a service in the static maps and return the token.
 * getService -
 * The function looks up a service based on the received token. It returns the service if any is found.
 * checkTokens -
 * This function is scheduled once every half hour. It removes an entry of service and token if half hour has passed since it was generated.
 */
package com.JohnBryce.CouponSystemStage2.TokenManager;

import com.JohnBryce.CouponSystemStage2.Login.LoginManager;
import com.JohnBryce.CouponSystemStage2.Services.AdminService;
import com.JohnBryce.CouponSystemStage2.Services.ClientService;
import com.JohnBryce.CouponSystemStage2.Services.CompanyService;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
@EnableScheduling
public class TokenManager {

    static Map<Token, ClientService> tokensToServices = new HashMap<>();
    static Map<String, Token> codeToTokens = new HashMap<>();
    final static int halfHour = 1000 * 60 * 30;

    public Token createNewToken(ClientService service) {
        LoginManager.ClientType type;
        if (service instanceof AdminService) {
            type = LoginManager.ClientType.ADMINISTRATOR;
        } else if (service instanceof CompanyService) {
            type = LoginManager.ClientType.COMPANY;
        } else {
            type = LoginManager.ClientType.CUSTOMER;
        }
        String tokenString = Token.createTokenCode();
        Date currentTime = new Date();
        Token token = new Token(tokenString, currentTime, type);
        tokensToServices.put(token, service);
        codeToTokens.put(token.getToken(), token);
        return token;
    }

    public ClientService getService(String token, LoginManager.ClientType type) {
        if (codeToTokens.get(token) == null) {
            return null;
        }
        Token newToken = codeToTokens.get(token);
        if (newToken.getType() == type)
            return tokensToServices.get(newToken);
        else return null;
    }

    @Scheduled(fixedRate = halfHour)
    public void checkTokens() {
        Date now = new Date();
        for (Map.Entry<Token, ClientService> entry : tokensToServices.entrySet()) {
            if (entry == null) {
                return;
            }
            if ((now.getTime() - entry.getKey().getSessionBeginning().getTime()) > halfHour) {
                tokensToServices.remove(entry.getKey());
                codeToTokens.remove(entry.getKey().getToken());
            }
        }


    }
}
