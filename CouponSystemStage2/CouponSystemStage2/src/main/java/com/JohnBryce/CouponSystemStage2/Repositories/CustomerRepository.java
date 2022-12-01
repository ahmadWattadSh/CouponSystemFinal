/**
 *   The customerRepository holds the functions that will be used by the Services. TThese functions form a connection to the dataBase
 *   by JPA and hibernate.
 *
 *   ABOUT THE FUNCTIONS AND THEIR USES:
 *   existsByEmailAndPassword - checks if the customer exists in the dataBase by email and password.
 *   existsByEmail - checks if the customer exists in the dataBase by email.
 *   getByEmailAndPassword - returns a customer instance by its email and password.
 *   updateCustomer - This function updates the new details that you changed to the current customer object in the DataBase.
 */
package com.JohnBryce.CouponSystemStage2.Repositories;


import com.JohnBryce.CouponSystemStage2.Entities.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import javax.transaction.Transactional;

public interface CustomerRepository extends JpaRepository<Customer, Integer> {
    Boolean existsByEmailAndPassword(String email, String password);

    Boolean existsByEmail(String email);

    Customer getByEmailAndPassword(String email, String password);

    @Modifying
    @Transactional
    @Query(value = "update customers as c set c.first_name = :#{#customer.firstName}, c.last_name = :#{#customer.lastName}, c.email = :#{#customer.email}, c.password = :#{#customer.password} where c.id = :#{#customer.id}", nativeQuery = true)
    void updateCustomer(@Param("customer") Customer customer);

}
