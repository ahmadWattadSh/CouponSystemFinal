/**
 * The companyRepository holds the functions that will be used by the Services. These functions form a connection to the dataBase
 * by JPA and hibernate.
 *
 * ABOUT THE FUNCTIONS AND THEIR USES:
 * existsByNameAndEmail - checks if the company exists in the dataBase by name and email.
 * findByEmailAndPassword - returns the company instance from the dataBase by email and password.
 * existsByEmailAndPassword - checks if the company exists in the dataBase by email and password.
 * updateCompany - This function updates the new details that you changed to the current company object in the DataBase.
 * deleteFromJoinTableByCompanyId - this function deletes the logs of the company coupons by the company id.
 */

package com.JohnBryce.CouponSystemStage2.Repositories;

import com.JohnBryce.CouponSystemStage2.Entities.Company;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import javax.transaction.Transactional;

public interface CompanyRepository extends JpaRepository<Company, Integer> {

    Boolean existsByNameAndEmail(String name, String email);

    Company findByEmailAndPassword(String email, String password);

    Boolean existsByEmailAndPassword(String email, String password);


    @Modifying
    @Transactional
    @Query(value = "update companies as c set c.email = :#{#comp.email}, c.password = :#{#comp.password} where c.name = :#{#comp.name}", nativeQuery = true)
    void updateCompany(@Param("comp") Company company);

    @Modifying
    @Transactional
    @Query(value = "delete coupons_vs_customers from coupons_vs_customers join coupons on coupons_vs_customers.coupon_id=coupons.id where company_id=:companyID", nativeQuery = true)
    void deleteFromJoinTableByCompanyId(@Param("companyID") int companyId);

}

