/**
 *  The Coupon is a class that we create objects from in the program
 *  The fields of the Coupon are: id, companyId, category, title, description, startDate, endDate, amount, price, image
 */
package com.JohnBryce.CouponSystemStage2.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;
import javax.persistence.*;
import java.sql.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "coupons")
@Getter
@Setter
@AllArgsConstructor
@RequiredArgsConstructor
@Builder
public class Coupon {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "company_id")
    private Company company;


    @Enumerated(EnumType.ORDINAL)
    private Category category;

    private String title;

    private String description;

    private Date startDate;

    private Date endDate;

    private int amount;

    private double price;

    private String image;

    public int getCompany() {
        return company.getId();
    }

    @ManyToMany(mappedBy = "couponList", fetch = FetchType.LAZY)
    @ToString.Exclude
    @JsonIgnore
    private Set<Customer> customerList = new HashSet<>();


    public Coupon(Category category, String title, String description, Date startDate, Date endDate, int amount, double price, String image) {
        this.category = category;
        this.title = title;
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
        this.amount = amount;
        this.price = price;
        this.image = image;
    }

    @Override
    public String toString() {
        return getClass().getSimpleName() + "(" +
                "id = " + id + ", " +
                "category = " + category + ", " +
                "companyId = " + company.getId() + ", " +
                "title = " + title + ", " +
                "description = " + description + ", " +
                "startDate = " + startDate + ", " +
                "endDate = " + endDate + ", " +
                "amount = " + amount + ", " +
                "price = " + price + ", " +
                "image = " + image + ")";
    }
}


