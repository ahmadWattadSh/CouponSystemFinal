/**
 * AdminService includes all the functions that the user(admin) can do in this program. The Service uses the repositories in order to connect
 * to the DataBase.
 * <p>
 * The functions and their uses:
 * 1. Login: The user needs to log in before he can do any functions. Here the program checks if the details he/she entered are correct.
 * 2. addCompany: The admin can add a new company to the dataBase. However, he can't add an already existing company. if he does,
 * The program will throw a custom exception (ServiceException).
 * 3. updateCompany: The admin is able to update the company details except for its name. The program would throw a
 * custom exception (ServiceException).
 * 4. deleteCompany: The admin can delete a company, and automatically it will delete its coupons entirely from the dataBase along with its logs.
 * 5. getAllCompanies: The admin is able to see all the companies details except for the couponsList with this function.
 * 6. getOneCompany: The admin is able to see all the details (excluding the couponsList) of one company through its id.
 * 7. addCustomer: The admin can add a new customer to the dataBase. However, he can't add a customer with an email similar to
 * another from the dataBase.If he does,The program will throw a custom exception (ServiceException).
 * 8. update Customer: The admin is able to update all the Customer's details.
 * 9. deleteCustomer: The admin is able to delete a customer and his coupons from the dataBase.
 * 10. getAllCustomers: The admin is able to see all the customers' details except for the couponsList with this function.
 * 11. getOneCustomer: The admin is able to see all the details (excluding the couponsList) of one customer through the id.
 */
package com.JohnBryce.CouponSystemStage2.Services;

import com.JohnBryce.CouponSystemStage2.DesignColors.TextColors;
import com.JohnBryce.CouponSystemStage2.Entities.Company;
import com.JohnBryce.CouponSystemStage2.Entities.Customer;
import org.springframework.context.annotation.Scope;

import java.util.ArrayList;

@org.springframework.stereotype.Service
@Scope("prototype")
public class AdminService extends ClientService {


    private final String email = "admin@admin.com";
    private final String password = "admin123";

    public AdminService() {
    }

    @Override
    public boolean login(String email, String password) {

        return email.equals(this.email) && password.equals(this.password);
    }

    public int addCompany(Company company) {
        if (!companyRepository.existsByNameAndEmail(company.getName(), company.getEmail())) {
            System.out.println(TextColors.ANSI_BLUE + "" + company.getName() + " Added Successfully!" + TextColors.ANSI_RESET);
            Company companyForId = companyRepository.save(company);
            return companyForId.getId();
        } else
            try {
                throw new ServiceException("Company already exists!\nCannot be added!");
            } catch (ServiceException e) {
                System.out.println(TextColors.ANSI_RED + "Exception: " + e.getMessage() + "" + TextColors.ANSI_RESET);
                return 0;
            }
    }


    public void updateCompany(Company company) {
        Company old_company = companyRepository.findById(company.getId()).get();
        if (old_company.getName().equals(company.getName())) {
            companyRepository.updateCompany(company);
            System.out.println(TextColors.ANSI_BLUE + "" + company.getName() + " Updated Successfully!" + TextColors.ANSI_RESET);
        } else
            try {
                throw new ServiceException("Cannot update with different name!");
            } catch (ServiceException e) {
                System.out.println(TextColors.ANSI_RED + "Exception: " + e.getMessage() + "" + TextColors.ANSI_RESET);
            }
    }

    public void deleteCompany(int companyID) {
        companyRepository.deleteFromJoinTableByCompanyId(companyID);
        companyRepository.deleteById(companyID);
        System.out.println(TextColors.ANSI_BLUE + "Company " + companyID + " was deleted successfully!" + TextColors.ANSI_RESET);
    }

    public ArrayList<Company> getAllCompanies() {

        return (ArrayList<Company>) companyRepository.findAll();

    }

    public Company getOneCompany(int companyID) {
        return companyRepository.getById(companyID);
    }

    public int addCustomer(Customer customer) {
        if (!customerRepository.existsByEmail(customer.getEmail())) {
            Customer customerForId = customerRepository.save(customer);
            System.out.println(TextColors.ANSI_BLUE + "Customer was added successfully!" + TextColors.ANSI_RESET);
            return customerForId.getId();
        } else {
            try {
                throw new ServiceException("Customer already exists!");
            } catch (ServiceException e) {
                System.out.println(TextColors.ANSI_RED + "Exception: " + e.getMessage() + "" + TextColors.ANSI_RESET);
                return 0;
            }
        }
    }

    public void updateCustomer(Customer customer) {
        customerRepository.updateCustomer(customer);
        System.out.println(TextColors.ANSI_BLUE + "Customer was updated successfully!" + TextColors.ANSI_RESET);
    }

    public void deleteCustomer(int customerID) {
        customerRepository.deleteById(customerID);
        System.out.println(TextColors.ANSI_BLUE + "Customer was deleted successfully!" + TextColors.ANSI_RESET);
    }

    public ArrayList<Customer> getAllCustomers() {
        return (ArrayList<Customer>) customerRepository.findAll();
    }

    public Customer getOneCustomer(int customerID) {
        return customerRepository.getById(customerID);
    }


}
