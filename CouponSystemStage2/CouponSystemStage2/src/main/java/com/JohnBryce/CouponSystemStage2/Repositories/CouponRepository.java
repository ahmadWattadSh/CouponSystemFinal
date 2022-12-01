/**
 *   The CouponsRepository holds the functions that will be used by the Services. TThese functions form a connection to the dataBase
 *   by JPA and hibernate.
 *
 *   ABOUT THE FUNCTIONS AND THEIR USES:
 *   existsByCompanyAndTitle - checks if the coupon exists in the dataBase by id and title.
 *   findAllByCompany - returns all the coupons of a certain company.
 *   findAllByCompanyAndCategory - returns the coupons of a certain company that belongs to a certain category.
 *   findAllByCompanyAndPriceLessThan - returns the coupons of a certain company that has a price lower than certain Price.
 *   findAllByCategoryAndCustomerListId - returns the coupons that belong to a certain category and a customer id.
 *   findAllByPriceLessThanAndCustomerListId - returns the coupons that have a price lower than certain Price and belongs to a customer id.
 *   existsByIdAndCustomerListId - checks if the coupon exists in the dataBase by id and a certain customer id.
 *   findAllByCustomerListId - returns all the coupons that belong to a certain customer.
 *   findAllByEndDateLessThan - returns all the coupons that are before a certain date.
 *   updateCoupon - This function updates the new details that you changed to the current coupon object in the DataBase.
 *   deletePurchasedCoupon - deletes the logs (from coupons_vs_customers) by the coupon's id.
 */

package com.JohnBryce.CouponSystemStage2.Repositories;

import com.JohnBryce.CouponSystemStage2.Entities.Category;
import com.JohnBryce.CouponSystemStage2.Entities.Company;
import com.JohnBryce.CouponSystemStage2.Entities.Coupon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Date;

public interface CouponRepository extends JpaRepository<Coupon, Integer> {

    boolean existsByCompanyAndTitle(Company company, String title);

    ArrayList<Coupon> findAllByCompany(Company company);

    ArrayList<Coupon> findAllByCompanyAndCategory(Company company, Category category);

    ArrayList<Coupon> findAllByCompanyAndPriceLessThan(Company company, double maxPrice);

//joined
    ArrayList<Coupon> findAllByCategoryAndCustomerListId(Category category, int customerId);

    ArrayList<Coupon> findAllByPriceLessThanAndCustomerListId(double maxPrice, int customerId);

    Boolean existsByIdAndCustomerListId(int couponId, int customerId);

    ArrayList<Coupon> findAllByCustomerListId(int customerID);

    ArrayList<Coupon> findAllByEndDateLessThan(Date date);

    @Modifying
    @Transactional
    @Query(value = "update coupons as c set c.amount = :#{#coupon.amount}, c.category = :#{#coupon.category.ordinal()}, c.description = :#{#coupon.description}, c.start_date = :#{#coupon.startDate}, c.end_date = :#{#coupon.endDate}, c.title = :#{#coupon.title}, c.price = :#{#coupon.price}, c.image = :#{#coupon.image} where c.id = :#{#coupon.id}", nativeQuery = true)
    void updateCoupon(@Param("coupon") Coupon coupon);


    @Modifying
    @Transactional
    @Query(value = "delete from coupons_vs_customers where coupon_id=:couponId", nativeQuery = true)
    void deletePurchasedCoupon(@Param("couponId") int couponId);


}
