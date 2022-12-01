/**
 * InitialData is a class which is responsible for generating initial data for the program.
 *
 * It has one function:
 * fillData - It creates 300 customers and 300 companies. For each company, it generates 20 coupons to be used by the customers.
 */
package com.JohnBryce.CouponSystemStage2.Data;

import com.JohnBryce.CouponSystemStage2.Entities.Category;
import com.JohnBryce.CouponSystemStage2.Entities.Company;
import com.JohnBryce.CouponSystemStage2.Entities.Coupon;
import com.JohnBryce.CouponSystemStage2.Entities.Customer;
import com.JohnBryce.CouponSystemStage2.Services.ClientService;
import com.JohnBryce.CouponSystemStage2.Services.CompanyService;
import com.github.javafaker.Faker;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.sql.Date;
import java.util.Random;

@Component
public class InitialData extends ClientService {

    @Autowired
    CompanyService companyService;
    Faker faker = new Faker();

    public void fillData() {
        int im = 0;
        for (int i = 0; i < 300; i++) {

            String companyName = faker.company().name();
            String companyEmail = faker.name().firstName() + "_" + faker.name().lastName() + "." + (new Random().nextInt(31) + 1990) + "@company.com";
            String companyPassword = faker.number().digits(11);
            Company company = new Company(companyName, companyEmail, companyPassword);
            companyRepository.save(company);
            for (int m = 0; m < 20; m++) {
                im++;
                String couponTitle = faker.name().title();
                int startYear = new Random().nextInt(4) + 2018;
                int day = new Random().nextInt(30) + 1;
                int month = new Random().nextInt(11) + 1;
                int endYear = new Random().nextInt(3) + 2023;
                String startDate = startYear + "-" + month + "-" + day;
                day = new Random().nextInt(30) + 1;
                month = new Random().nextInt(11) + 1;
                String endDate = endYear + "-" + month + "-" + day;
                String description = "This coupon will give you discount for " + (new Random().nextInt(35) + 10) + "% " + " for all " + companyName + " products.";
                String image = "https://picsum.photos/500/300?random=" + im;

                Coupon coupon = new Coupon(faker.options().option(Category.class), couponTitle, description, Date.valueOf(startDate), Date.valueOf(endDate), new Random().nextInt(17) + 3, new Random().nextInt(300) + 100, image);
                coupon.setCompany(company);
                couponRepository.save(coupon);
            }

            String firstName = faker.name().firstName();
            String lastName = faker.name().lastName();
            String customerEmail = firstName + "_" + lastName + "" + (new Random().nextInt(100)) + "@customer.com";
            String customerPassword = faker.number().digits(11);
            Customer customer = new Customer(firstName, lastName, customerEmail, customerPassword);
            customerRepository.save(customer);
        }
    }

    @Override
    public boolean login(String email, String password) {
        return false;
    }
}