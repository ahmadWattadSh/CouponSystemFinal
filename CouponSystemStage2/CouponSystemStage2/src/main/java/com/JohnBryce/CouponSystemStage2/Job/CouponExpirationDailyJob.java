/**
 * CouponExpirationDailyJob is a thread with a daily task of erasing all the coupons that have already expired.
 * The task is done every 24hrs. (with the use of the sleep function)
 * It doesn't stop till the end of program where the program closes it with the flag "quit" where it interrupts the sleep.
 * This thread runs parallel to the whole program.
 */
package com.JohnBryce.CouponSystemStage2.Job;

import com.JohnBryce.CouponSystemStage2.DesignColors.TextColors;
import com.JohnBryce.CouponSystemStage2.Entities.Coupon;
import com.JohnBryce.CouponSystemStage2.Repositories.CouponRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;
import java.util.Date;

@Component
@Scope("singleton")
public class CouponExpirationDailyJob implements Runnable {
    final static long DAY = 1000 * 60 * 60 * 24;
    private boolean quit = false;

    @Autowired
    CouponRepository couponRepository;

    public CouponExpirationDailyJob() {
    }

    @Override
    public void run() {
        while (!quit) {

            for (Coupon coupon : couponRepository.findAllByEndDateLessThan(new Date(System.currentTimeMillis()))) {
                if (coupon != null) {
                    couponRepository.deletePurchasedCoupon(coupon.getId());
                    couponRepository.delete(coupon);
                }
            }
            try {
                Thread.sleep(DAY);
            } catch (InterruptedException e) {
                System.out.println(TextColors.ANSI_PURPLE + "We are closing the program\nThe JOB has stopped its activity!" + TextColors.ANSI_RESET);
            }

        }
    }


    public void stop() {
        quit = true;
    }
}
