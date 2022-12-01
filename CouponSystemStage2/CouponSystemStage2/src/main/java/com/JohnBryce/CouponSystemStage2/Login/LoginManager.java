/**
 * The loginManager is responsible for checking the correctness of the login details of the client.
 * Also, it is responsible for returning ClientService object that fits the user's clientType.
 * The loginManager makes use of the functions: getCompanyIdByEmailAndPassword and getCustomerIdByEmailAndPassword
 * In order to get the id of the client by using the email and password in order to assert the client in the dataBase.
 * The ctx is injected here to make use of multiple service instances.
 *
 * It throws custom Exceptions when entered wrong details: (LoginException) with proper message to the user.
 */

package com.JohnBryce.CouponSystemStage2.Login;


import com.JohnBryce.CouponSystemStage2.DesignColors.TextColors;
import com.JohnBryce.CouponSystemStage2.Services.AdminService;
import com.JohnBryce.CouponSystemStage2.Services.ClientService;
import com.JohnBryce.CouponSystemStage2.Services.CompanyService;
import com.JohnBryce.CouponSystemStage2.Services.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

@Component
@Scope("singleton")
public class LoginManager {

    public enum ClientType {ADMINISTRATOR, COMPANY, CUSTOMER}

    @Autowired
    ConfigurableApplicationContext ctx;


    public ClientService Login(String email, String password, ClientType clientType) {
        switch (clientType) {
            case COMPANY: {
                CompanyService companyService = ctx.getBean(CompanyService.class);
                if (companyService.login(email, password)) {
                    int companyID = companyService.getCompanyIDByEmailPassword(email, password);
                    companyService.setCompanyIdAndCompany(companyID);
                    System.out.println(TextColors.ANSI_YELLOW + "Company has logged-in successfully!" + TextColors.ANSI_RESET);
                    return companyService;
                } else {
                    try {
                        throw new LoginException("Either email or password does not exist for this company");
                    } catch (LoginException e) {
                        System.out.println(TextColors.ANSI_RED + "Exception: " + e.getMessage() + "" + TextColors.ANSI_RESET);
                    }
                    return null;
                }
            }

            case CUSTOMER: {
                CustomerService customerService = ctx.getBean(CustomerService.class);
                if (customerService.login(email, password)) {
                    int customerID = customerService.getCustomerIDByEmailPassword(email, password);
                    customerService.setCustomerID(customerID);
                    System.out.println(TextColors.ANSI_YELLOW + "Customer has logged-in successfully!" + TextColors.ANSI_RESET);
                    return customerService;
                } else {
                    try {
                        throw new LoginException("Either email or password does not exist for this customer");
                    } catch (LoginException e) {
                        System.out.println(TextColors.ANSI_RED + "Exception: " + e.getMessage() + "" + TextColors.ANSI_RESET);
                    }
                    return null;

                }

            }

            case ADMINISTRATOR: {
                AdminService adminService = ctx.getBean(AdminService.class);
                if (adminService.login(email, password)) {
                    System.out.println(TextColors.ANSI_YELLOW + "Admin has logged-in successfully!" + TextColors.ANSI_RESET);
                    return adminService;
                } else {
                    try {
                        throw new LoginException("Either email or password does not exist");
                    } catch (LoginException e) {
                        System.out.println(TextColors.ANSI_RED + "Exception: " + e.getMessage() + "" + TextColors.ANSI_RESET);
                    }
                    return null;

                }
            }

        }
        return null;
    }


}
