/**
 * CompanyService includes all the functions that the user(Company) can do in this program. The Service uses the repositories in order to connect
 * to the DataBase.
 * <p>
 * The functions and their uses:
 * 1. Login: The user needs to log in before he can do any functions. Here the program checks if the details he/she entered are correct.
 * 2. getCompanyIDByEmailAndPassword: Not available to the company. The loginManager uses this function.
 * 3. addCoupon: The company can add a coupon to its couponsList and in the database through this function.
 * 4. updateCoupon: The company can update its coupons' details except for the CompanyId. The program would throw a custom exception
 * (FacadeException).
 * 5. deleteCoupon: The company is able to delete one of its coupons entirely from the database and from the customer who already purchased it.
 * 6. getCompanyCoupons: The company is able to view it's all coupons/ it's coupons sorted by category of their choice
 * /it's coupons sorted by maxPrice of their choice.
 * 7. getCompanyDetails: The company is able to view it's all details (excluding the couponsList).
 */

package com.JohnBryce.CouponSystemStage2.Services;

import com.JohnBryce.CouponSystemStage2.DesignColors.TextColors;
import com.JohnBryce.CouponSystemStage2.Entities.Category;
import com.JohnBryce.CouponSystemStage2.Entities.Company;
import com.JohnBryce.CouponSystemStage2.Entities.Coupon;
import org.hibernate.service.spi.ServiceException;
import org.springframework.context.annotation.Scope;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;

@org.springframework.stereotype.Service
@Scope("prototype")
public class CompanyService extends ClientService {

    public int companyID;
    private Company company;

    @Override
    public boolean login(String email, String password) {
        return companyRepository.existsByEmailAndPassword(email, password);
    }

    public CompanyService() {

    }

    public boolean addCoupon(Coupon coupon) {

        boolean exist = couponRepository.existsByCompanyAndTitle(company, coupon.getTitle());
        if (!exist) {
            coupon.setCompany(this.company);
            couponRepository.save(coupon);
            System.out.println(TextColors.ANSI_BLUE + "Coupon was added successfully!" + TextColors.ANSI_RESET);
            return false;
        } else {
            try {
                throw new ServiceException("This coupon already exists!");
            } catch (ServiceException e) {
                System.out.println(TextColors.ANSI_RED + "Exception: " + e.getMessage() + "" + TextColors.ANSI_RESET);
                return true;
            }
        }

    }

    public void updateCoupon(Coupon coupon) {
        couponRepository.updateCoupon(coupon);
    }

    @Transactional
    public void deleteCoupon(int couponID) {
        couponRepository.deleteById(couponID);
        couponRepository.deletePurchasedCoupon(couponID);
        System.out.println(TextColors.ANSI_BLUE + "Coupon was deleted successfully!" + TextColors.ANSI_RESET);
    }

    public ArrayList<Coupon> getCompanyCoupons() {
        return couponRepository.findAllByCompany(this.company);
    }


    public ArrayList<Coupon> getCompanyCoupons(Category category) {
        return couponRepository.findAllByCompanyAndCategory(this.company, category);
    }

    public ArrayList<Coupon> getCompanyCoupons(double maxPrice) {
        return couponRepository.findAllByCompanyAndPriceLessThan(company, maxPrice);
    }

    public Company getCompanyDetails() {
        return this.company;
    }


    public void setCompanyIdAndCompany(int companyID) {
        this.companyID = companyID;
        this.company = companyRepository.getById(companyID);
    }

    public int getCompanyIDByEmailPassword(String email, String password) {
        Company company = companyRepository.findByEmailAndPassword(email, password);
        return company.getId();
    }


}
