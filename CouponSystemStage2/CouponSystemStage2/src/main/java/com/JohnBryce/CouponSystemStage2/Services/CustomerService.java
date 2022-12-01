/**
 * CustomerService includes all the functions that the user(Customer) can do in this program. The facade uses the repositories in order to connect
 * to the DataBase.
 * <p>
 * The functions and their uses:
 * 1. Login: The user needs to log in before he can do any functions. Here the program checks if the details he/she entered are correct.
 * 2. getCustomerIDByEmailAndPassword: Not available to the company. The loginManager uses this function.
 * 3. Purchase Coupon: The customer is able to purchase a coupon of his choice. Yet, he can't purchase the same coupon more than once,
 * he can't purchase a coupon that the company run out of ,and he can't purchase it if it is already expired. if he does, The program
 * will throw a custom exception (ServiceException) attached with proper message.
 * 4. getCustomerCoupons: The customer is able to view all of his coupons, or he can view them sorted by Category of their choice ,
 * or he can view them sorted by maxPrice of their choice.
 * 5. getCustomerDetails: The customer is able to view all of his details. (excluding couponsList).
 * 6. getAllCoupons: The customer is able to view all the coupons, so he can choose a coupon to purchase.
 */
package com.JohnBryce.CouponSystemStage2.Services;

import com.JohnBryce.CouponSystemStage2.DesignColors.TextColors;
import com.JohnBryce.CouponSystemStage2.Entities.Category;
import com.JohnBryce.CouponSystemStage2.Entities.Coupon;
import com.JohnBryce.CouponSystemStage2.Entities.Customer;
import org.springframework.context.annotation.Scope;

import java.util.ArrayList;
import java.util.Calendar;

@org.springframework.stereotype.Service
@Scope("prototype")
public class CustomerService extends ClientService {

    private int customerID;


    @Override
    public boolean login(String email, String password) {
        return customerRepository.existsByEmailAndPassword(email, password);
    }

    public CustomerService() {
    }


    public String purchaseCoupon(Coupon coupon) {

        boolean isExist = couponRepository.existsByIdAndCustomerListId(coupon.getId(), customerID);
        try {
            if (!isExist) {
                if (coupon.getAmount() > 0) {
                    if (coupon.getEndDate().after((Calendar.getInstance()).getTime())) {
                        Customer customer = customerRepository.findById(customerID).get();
                        coupon.setAmount(coupon.getAmount() - 1);
                        couponRepository.updateCoupon(coupon);
                        customer.addCoupon(coupon);
                        customerRepository.save(customer);
                        System.out.println(TextColors.ANSI_BLUE + "Coupon has been purchased successfully!" + TextColors.ANSI_RESET);
                        return "" + coupon.getTitle() + " has been purchased successfully!";
                    } else throw new ServiceException("This coupon has expired!");
                } else throw new ServiceException("We have run out of this coupon!");
            } else throw new ServiceException("You have already purchased this coupon!");
        } catch (ServiceException e) {
            System.out.println(TextColors.ANSI_RED + "Exception: " + e.getMessage() + "" + TextColors.ANSI_RESET);
            return "" + coupon.getTitle() + "" + e.getMessage();

        }
    }

    public ArrayList<Coupon> getCustomerCoupons() {
        return couponRepository.findAllByCustomerListId(customerID);
    }

    public ArrayList<Coupon> getCustomerCoupons(Category category) {
        return couponRepository.findAllByCategoryAndCustomerListId(category, customerID);
    }

    public ArrayList<Coupon> getCustomerCoupons(double maxPrice) {
        return couponRepository.findAllByPriceLessThanAndCustomerListId(maxPrice, customerID);
    }

    public Customer getCustomerDetails() {
        return customerRepository.findById(customerID).get();
    }

    public void setCustomerID(int customerID) {
        this.customerID = customerID;
    }

    public int getCustomerIDByEmailPassword(String email, String password) {
        return customerRepository.getByEmailAndPassword(email, password).getId();
    }

    public ArrayList<Coupon> getAllCoupons() {
        return (ArrayList<Coupon>) couponRepository.findAll();
    }
}
