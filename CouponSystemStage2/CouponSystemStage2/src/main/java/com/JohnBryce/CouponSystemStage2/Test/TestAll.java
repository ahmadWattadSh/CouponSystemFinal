/**
 * testAll is a class used for testing all the functions in this program. It provides proper messages for each function.
 * The "job" is stated at the beginning and is closed at the end of the program.
 * The whole code is wrapped by a try catch for the exceptions that are thrown from all the classes like SQL and Interrupted exceptions
 * and provides a proper custom exception (SQL exception) which needs to be handled carefully if found.
 * Moreover, the testAll is accompanied by ClearAll class which clears all the database from the SQL. WithOut this function, there
 * is a need to clear the dataBase by hand which is a lot of work.
 */
package com.JohnBryce.CouponSystemStage2.Test;

import com.JohnBryce.CouponSystemStage2.DesignColors.TextColors;
import com.JohnBryce.CouponSystemStage2.Entities.Category;
import com.JohnBryce.CouponSystemStage2.Entities.Company;
import com.JohnBryce.CouponSystemStage2.Entities.Coupon;
import com.JohnBryce.CouponSystemStage2.Entities.Customer;
import com.JohnBryce.CouponSystemStage2.Job.CouponExpirationDailyJob;
import com.JohnBryce.CouponSystemStage2.Login.LoginManager;
import com.JohnBryce.CouponSystemStage2.Services.AdminService;
import com.JohnBryce.CouponSystemStage2.Services.CompanyService;
import com.JohnBryce.CouponSystemStage2.Services.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import java.sql.Date;
import java.util.ArrayList;

@Component
@Scope("singleton")
public class TestAll {

    @Autowired
    LoginManager loginManager;
    @Autowired
    CouponExpirationDailyJob couponExpirationDailyJob;

    public void testAll() {

        try {
            Thread expirationThread = new Thread(couponExpirationDailyJob);
            expirationThread.start();
            //ADMINS
            System.out.println(TextColors.ANSI_CYAN + "****  Entries  ****" + TextColors.ANSI_RESET);
            String admin_email = "admin@admin.com";
            String admin_password = "admin123";
            String wrong_admin_email = "adminXadmin";
            String wrong_admin_password = "adminX";

            LoginManager.ClientType admin_clientType = LoginManager.ClientType.ADMINISTRATOR;
            AdminService adminService = (AdminService) loginManager.Login(admin_email, admin_password, admin_clientType);
            loginManager.Login(wrong_admin_email, wrong_admin_password, admin_clientType);


            System.out.println(TextColors.ANSI_CYAN + "****  Creating Companies  ****" + TextColors.ANSI_RESET);
            for (int i = 0; i < 10; i++) {
                Company company = new Company("company_name" + (i + 1), "company_email" + (i + 1) + "@company.com", "password" + (i + 1));
                adminService.addCompany(company);
            }

            //Wrong Entry
            adminService.addCompany(new Company("company_name1", "company_email1@company.com", "password1"));

            System.out.println(TextColors.ANSI_CYAN + "***** **** ****" + TextColors.ANSI_RESET);

            System.out.println(TextColors.ANSI_CYAN + "***** Show Companies List*****" + TextColors.ANSI_RESET);
            ArrayList<Company> companies = adminService.getAllCompanies();
            System.out.println(companies);
            System.out.println(TextColors.ANSI_CYAN + "***** **** ****" + TextColors.ANSI_RESET);

            System.out.println(TextColors.ANSI_CYAN + "**** UPDATE COMPANY *****" + TextColors.ANSI_RESET);
            Company companyToUpdate = companies.get(companies.size() - 1);
            System.out.println(TextColors.ANSI_BLUE + "Company: " + TextColors.ANSI_RESET + "" + companyToUpdate);
            companyToUpdate.setEmail("updatedEmail");
            companyToUpdate.setPassword("updatedPassword");
            adminService.updateCompany(companyToUpdate);
            System.out.println(TextColors.ANSI_BLUE + "This is the updated Company: " + TextColors.ANSI_RESET + "" + companyToUpdate);


            companyToUpdate = companies.get(companies.size() - 2);
            System.out.println(TextColors.ANSI_BLUE + "Company: " + TextColors.ANSI_RESET + "" + companyToUpdate);
            companyToUpdate.setName("updatedName");
            adminService.updateCompany(companyToUpdate);
            System.out.println(TextColors.ANSI_BLUE + "Unsuccessful company update: " + TextColors.ANSI_RESET + "" + companyToUpdate);

            System.out.println(TextColors.ANSI_CYAN + "***** **** ****" + TextColors.ANSI_RESET);


            System.out.println(TextColors.ANSI_CYAN + "**** ADD CUSTOMERS *****" + TextColors.ANSI_RESET);
            for (int i = 1; i <= 10; i++) {
                Customer customer = new Customer("firstName" + i, "lastName" + i, "customer_email" + i + "@customer.com", "password" + i);
                adminService.addCustomer(customer);
            }
            adminService.addCustomer(new Customer("firstName1", "LastName1", "customer_email1@customer.com", "password1"));
            System.out.println(TextColors.ANSI_CYAN + "***** **** ****" + TextColors.ANSI_RESET);
            System.out.println(TextColors.ANSI_CYAN + "**** SHOW ALL CUSTOMERS *****" + TextColors.ANSI_RESET);
            System.out.println(adminService.getAllCustomers());
            System.out.println(TextColors.ANSI_CYAN + "***** **** ****" + TextColors.ANSI_RESET);


            System.out.println(TextColors.ANSI_CYAN + "**** UPDATE CUSTOMERS *****" + TextColors.ANSI_RESET);
            ArrayList<Customer> customers = adminService.getAllCustomers();
            Customer customerToUpdate = customers.get(customers.size() - 1);
            System.out.println(TextColors.ANSI_BLUE + "Customer: " + TextColors.ANSI_RESET + "" + customerToUpdate);
            customerToUpdate.setEmail("UpdatedEmail@Updated.com");
            customerToUpdate.setFirstName("UpdatedFirstName");
            customerToUpdate.setLastName("UpdatedLastName");
            adminService.updateCustomer(customerToUpdate);
            System.out.println(TextColors.ANSI_BLUE + "Updated customer: " + TextColors.ANSI_RESET + "" + customerToUpdate + TextColors.ANSI_RESET);

            System.out.println(TextColors.ANSI_CYAN + "***** **** ****" + TextColors.ANSI_RESET);


            System.out.println(TextColors.ANSI_CYAN + "***** Login Company Service *******" + TextColors.ANSI_RESET);
            CompanyService companyService1 = (CompanyService) loginManager.Login("company_email1@company.com", "password1", LoginManager.ClientType.COMPANY);
            CompanyService companyService2 = (CompanyService) loginManager.Login("company_email2@company.com", "password2", LoginManager.ClientType.COMPANY);
            loginManager.Login("company_emailX@Xcompany.com", "passwordX", LoginManager.ClientType.COMPANY);
            System.out.println(TextColors.ANSI_CYAN + "******** **** ***** " + TextColors.ANSI_RESET);

            System.out.println(TextColors.ANSI_CYAN + "***** Show Company 1 Details *******" + TextColors.ANSI_RESET);
            System.out.println(companyService1.getCompanyDetails());
            System.out.println(TextColors.ANSI_CYAN + "******** **** ***** " + TextColors.ANSI_RESET);

            System.out.println(TextColors.ANSI_CYAN + "***** Show Company 2 Details *******" + TextColors.ANSI_RESET);
            System.out.println(companyService2.getCompanyDetails());
            System.out.println(TextColors.ANSI_CYAN + "******** **** ***** " + TextColors.ANSI_RESET);

            companyService1.addCoupon(new Coupon(Category.FOOD, "ProteinChocolate", "All-In", Date.valueOf("2015-3-29"), Date.valueOf("2070-7-25"), 2, 70, "image1"));
            companyService1.addCoupon(new Coupon(Category.TOYS, "Bikachu", "Cartoon-Toys", Date.valueOf("2020-2-2"), Date.valueOf("2021-2-2"), 2, 115, "image2"));
            companyService1.addCoupon(new Coupon(Category.ELECTRICITY, "FAN", "ELECTRA", Date.valueOf("2020-2-2"), Date.valueOf("2023-2-2"), 1, 250, "image3"));
            companyService1.addCoupon(new Coupon(Category.ELECTRICITY, "FAN", "ELECTRA", Date.valueOf("2020-2-2"), Date.valueOf("2023-2-2"), 1, 250, "image3"));

            companyService2.addCoupon(new Coupon(Category.FURNITURE, "SOFA", "ComfortableSofa", Date.valueOf("2020-2-2"), Date.valueOf("2023-2-2"), 2, 1000, "imageSOFA"));
            companyService2.addCoupon(new Coupon(Category.TOYS, "Cards", "Card Games", Date.valueOf("2020-2-2"), Date.valueOf("2022-2-2"), 2, 20, "imageCard"));
            companyService2.addCoupon(new Coupon(Category.ELECTRICITY, "TV", "MAC", Date.valueOf("2020-2-2"), Date.valueOf("2023-2-2"), 1, 1250, "imageElectra"));
            companyService2.addCoupon(new Coupon(Category.ELECTRICITY, "TV", "MAC", Date.valueOf("2023-2-2"), Date.valueOf("2023-2-2"), 1, 1250, "imageElectra"));


            System.out.println(TextColors.ANSI_CYAN + "***** Show Company 1 Coupons *******" + TextColors.ANSI_RESET);
            System.out.println(companyService1.getCompanyCoupons());
            System.out.println(TextColors.ANSI_CYAN + "******** **** ***** " + TextColors.ANSI_RESET);

            System.out.println(TextColors.ANSI_CYAN + "***** Show Company 2 Coupons *******" + TextColors.ANSI_RESET);
            System.out.println(companyService2.getCompanyCoupons());
            System.out.println(TextColors.ANSI_CYAN + "******** **** ***** " + TextColors.ANSI_RESET);

            System.out.println(TextColors.ANSI_CYAN + "******** Update Coupons ******" + TextColors.ANSI_RESET);
            Coupon couponToUpdate = companyService1.getCompanyCoupons().get(1);
            couponToUpdate.setImage("UpdatedImage");
            couponToUpdate.setStartDate(Date.valueOf("2222-2-2"));
            couponToUpdate.setEndDate(Date.valueOf("2222-2-3"));
            couponToUpdate.setDescription("UpdatedDescription");
            couponToUpdate.setTitle("UpdatedTitle");
            companyService1.updateCoupon(couponToUpdate);
            System.out.println(TextColors.ANSI_CYAN + "After update:" + companyService1.getCompanyCoupons().get(1) + TextColors.ANSI_RESET);

            couponToUpdate.setCompany(adminService.getOneCompany(5));
            companyService1.updateCoupon(couponToUpdate);
            System.out.println(TextColors.ANSI_CYAN + "Unsuccessful update:" + companyService1.getCompanyCoupons().get(1) + TextColors.ANSI_RESET);

            System.out.println(TextColors.ANSI_CYAN + "******** **** ***** " + TextColors.ANSI_RESET);


            System.out.println(TextColors.ANSI_CYAN + "*********** Show Coupons From Company By Category and BY MAX PRICE *******" + TextColors.ANSI_RESET);
            System.out.println(TextColors.ANSI_BLUE + "Show Company 1 coupons sorted by category" + TextColors.ANSI_RESET);
            System.out.println(companyService1.getCompanyCoupons(Category.FOOD));
            System.out.println(TextColors.ANSI_BLUE + "Show Company 1 coupons sorted by maxPrice (300)" + TextColors.ANSI_RESET);
            System.out.println(companyService1.getCompanyCoupons(300));

            System.out.println(TextColors.ANSI_CYAN + "******************** ************* ********" + TextColors.ANSI_RESET);


            System.out.println(TextColors.ANSI_CYAN + "******* Login Customer Service *******" + TextColors.ANSI_RESET);
            CustomerService customerService1 = (CustomerService) loginManager.Login("customer_email1@customer.com", "password1", LoginManager.ClientType.CUSTOMER);
            CustomerService customerService2 = (CustomerService) loginManager.Login("customer_email2@customer.com", "password2", LoginManager.ClientType.CUSTOMER);
            CustomerService customerService3 = (CustomerService) loginManager.Login("customer_email3@customer.com", "password3", LoginManager.ClientType.CUSTOMER);
            loginManager.Login("customer_emailX@Xcustomer.com", "passwordX", LoginManager.ClientType.CUSTOMER);
            System.out.println(TextColors.ANSI_CYAN + "******************** ************* ********" + TextColors.ANSI_RESET);

            System.out.println(TextColors.ANSI_CYAN + "******* Customer Details ********" + TextColors.ANSI_RESET);
            System.out.println(customerService1.getCustomerDetails());
            System.out.println(customerService2.getCustomerDetails());
            System.out.println(customerService3.getCustomerDetails());
            System.out.println(TextColors.ANSI_CYAN + "**********************************************" + TextColors.ANSI_RESET);

            System.out.println(TextColors.ANSI_CYAN + "******** Add Coupon Purchases **********" + TextColors.ANSI_RESET);
            customerService1.purchaseCoupon(companyService1.getCompanyCoupons().get(0));
            customerService1.purchaseCoupon(companyService1.getCompanyCoupons().get(0));
            customerService1.purchaseCoupon(companyService1.getCompanyCoupons().get(1));
            customerService1.purchaseCoupon(companyService1.getCompanyCoupons().get(2));
            customerService1.purchaseCoupon(companyService1.getCompanyCoupons().get(2));
            customerService2.purchaseCoupon(companyService1.getCompanyCoupons().get(2));
            customerService1.purchaseCoupon(companyService2.getCompanyCoupons().get(0));
            customerService1.purchaseCoupon(companyService2.getCompanyCoupons().get(1));
            customerService1.purchaseCoupon(companyService2.getCompanyCoupons().get(2));
            customerService1.purchaseCoupon(companyService2.getCompanyCoupons().get(2));
            customerService2.purchaseCoupon(companyService2.getCompanyCoupons().get(0));
            customerService2.purchaseCoupon(companyService2.getCompanyCoupons().get(1));
            customerService2.purchaseCoupon(companyService2.getCompanyCoupons().get(2));
            customerService3.purchaseCoupon(companyService1.getCompanyCoupons().get(0));
            customerService3.purchaseCoupon(companyService1.getCompanyCoupons().get(1));
            customerService3.purchaseCoupon(companyService1.getCompanyCoupons().get(2));
            System.out.println(TextColors.ANSI_CYAN + "**********************************************" + TextColors.ANSI_RESET);


            System.out.println(TextColors.ANSI_CYAN + "****** Get All Customer Coupons *********" + TextColors.ANSI_RESET);
            System.out.println(TextColors.ANSI_BLUE + "Customer 1:" + TextColors.ANSI_RESET);
            System.out.println(customerService1.getCustomerCoupons());
            System.out.println(TextColors.ANSI_BLUE + "Customer 2:" + TextColors.ANSI_RESET);
            System.out.println(customerService2.getCustomerCoupons());
            System.out.println(TextColors.ANSI_BLUE + "Customer 3:" + TextColors.ANSI_RESET);
            System.out.println(customerService3.getCustomerCoupons());

            System.out.println(TextColors.ANSI_CYAN + "**************************************" + TextColors.ANSI_RESET);

            System.out.println(TextColors.ANSI_CYAN + "****** Get Customer Coupons By MaxPrice *********" + TextColors.ANSI_RESET);
            System.out.println(TextColors.ANSI_BLUE + "Customer 1: maxPrice (100) " + TextColors.ANSI_RESET);
            System.out.println(customerService1.getCustomerCoupons(100));
            System.out.println(TextColors.ANSI_BLUE + "Customer 2: maxPrice (200) " + TextColors.ANSI_RESET);
            System.out.println(customerService2.getCustomerCoupons(100));
            System.out.println(TextColors.ANSI_BLUE + "Customer 3: maxPrice (300) " + TextColors.ANSI_RESET);
            System.out.println(customerService3.getCustomerCoupons(200));

            System.out.println(TextColors.ANSI_CYAN + "**************************************" + TextColors.ANSI_RESET);

            System.out.println(TextColors.ANSI_CYAN + "****** Get Customer Coupons By Category *********" + TextColors.ANSI_RESET);
            System.out.println(TextColors.ANSI_BLUE + "Customer 1: Category (Food) " + TextColors.ANSI_RESET);
            System.out.println(customerService1.getCustomerCoupons(Category.FOOD));
            System.out.println(TextColors.ANSI_BLUE + "Customer 2: Category (Electricity) " + TextColors.ANSI_RESET);
            System.out.println(customerService2.getCustomerCoupons(Category.ELECTRICITY));
            System.out.println(TextColors.ANSI_BLUE + "Customer 3: Category (Toys) " + TextColors.ANSI_RESET);
            System.out.println(customerService3.getCustomerCoupons(Category.TOYS));
            System.out.println(TextColors.ANSI_CYAN + "**************************************" + TextColors.ANSI_RESET);

            System.out.println(TextColors.ANSI_CYAN + "************ DELETE DELETE DELETE ********************" + TextColors.ANSI_RESET);
            companyService1.deleteCoupon(companyService1.getCompanyCoupons().get(0).getId());
            adminService.deleteCustomer(adminService.getAllCustomers().get(2).getId());
            adminService.deleteCompany(adminService.getAllCompanies().get(1).getId());
            System.out.println(TextColors.ANSI_CYAN + "***************************************************" + TextColors.ANSI_RESET);

            couponExpirationDailyJob.stop();
            expirationThread.interrupt();

            System.out.println(TextColors.ANSI_CYAN + "DONE SUCCESSFULLY!!" + TextColors.ANSI_RESET);
        } catch
        (Exception e) {

            System.out.println(TextColors.ANSI_RED + "Exception: there is either problem in sql functions or threads functionality!" + TextColors.ANSI_RESET);
        }


    }
}
