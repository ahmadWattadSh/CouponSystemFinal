/**
 * This program was created by Wattad Ahmad and Wattad Oday.
 * This class contains two functions:
 * Clear() - the purpose of this function is to delete all data and load the categories table(for view)
 * TestAll() - tests all the program functions and asserts the availability to use this program safely.
 */
package com.JohnBryce.CouponSystemStage2;

import com.JohnBryce.CouponSystemStage2.ClearDataBase.ClearDataBase;
import com.JohnBryce.CouponSystemStage2.Data.InitialData;
import com.JohnBryce.CouponSystemStage2.Test.TestAll;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Period;

@SpringBootApplication
public class CouponSystemStage2Application {


    public static void main(String[] args) {
        ApplicationContext ctx = SpringApplication.run(CouponSystemStage2Application.class);
        ClearDataBase clearDataBase = ctx.getBean(ClearDataBase.class);
        clearDataBase.Clear();
        InitialData initialData = ctx.getBean(InitialData.class);
        initialData.fillData();
    }


}
