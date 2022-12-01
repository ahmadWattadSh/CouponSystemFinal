/**
 * The clientService is the Factory of all the possible clients that are able to log in.
 * The login Function  is abstract in order for any class inheriting the ClientFace can have the ability to log in.
 * All the repositories: customerRepository, couponRepository and companyRepository are injected here and to be inherited.
 */
package com.JohnBryce.CouponSystemStage2.Services;

import com.JohnBryce.CouponSystemStage2.Repositories.CompanyRepository;
import com.JohnBryce.CouponSystemStage2.Repositories.CouponRepository;
import com.JohnBryce.CouponSystemStage2.Repositories.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import java.sql.SQLException;


public abstract class ClientService {
    @Autowired
    protected CustomerRepository customerRepository;
    @Autowired
    protected CouponRepository couponRepository;
    @Autowired
    protected CompanyRepository companyRepository;

    public abstract boolean login(String email, String password) throws SQLException, InterruptedException;
}
