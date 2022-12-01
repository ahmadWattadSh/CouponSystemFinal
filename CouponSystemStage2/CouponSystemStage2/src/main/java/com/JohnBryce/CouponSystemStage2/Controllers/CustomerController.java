package com.JohnBryce.CouponSystemStage2.Controllers;

import com.JohnBryce.CouponSystemStage2.Entities.Category;
import com.JohnBryce.CouponSystemStage2.Entities.Coupon;
import com.JohnBryce.CouponSystemStage2.Entities.Customer;
import com.JohnBryce.CouponSystemStage2.Login.LoginManager;
import com.JohnBryce.CouponSystemStage2.Services.CompanyService;
import com.JohnBryce.CouponSystemStage2.Services.CustomerService;
import com.JohnBryce.CouponSystemStage2.Services.ServiceException;
import com.JohnBryce.CouponSystemStage2.TokenManager.Token;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@RequestMapping("customerApi")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class CustomerController extends ClientController {
    static LoginManager.ClientType type =LoginManager.ClientType.CUSTOMER ;

    @Override
    @GetMapping("/login/{email}/{password}") // http://localhost:8080/customerApi/login/{email}/{password}
    public ResponseEntity<String> login(@PathVariable("email") String email,@PathVariable("password") String password) {
        CustomerService customerService= (CustomerService) loginManager.Login(email,password, LoginManager.ClientType.CUSTOMER);
        if(customerService==null)
        {
            return new ResponseEntity<>("Invalid User", HttpStatus.BAD_REQUEST);
        }
        Token token = tokenManager.createNewToken(customerService);
        return new ResponseEntity<>(token.getToken(),HttpStatus.OK);
    }

    @PostMapping("/purchaseCoupon") // http://localhost:8080/customerApi/purchaseCoupon
    public ResponseEntity<String> purchaseCoupon(@RequestHeader("token") String token,@RequestBody Coupon coupon) {
        CustomerService customerService= (CustomerService) tokenManager.getService(token,type);
        if(customerService==null)
        {
            return new ResponseEntity<>("Invalid User", HttpStatus.BAD_REQUEST);
        }
         String msg= customerService.purchaseCoupon(coupon);
        if (msg.equals("Coupon has been purchased successfully!")) {
            return new ResponseEntity<>(msg,HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(msg, HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/purchaseAllCoupons") // http://localhost:8080/customerApi/purcahseAllCoupons
    public ResponseEntity<?> purchaseAllCoupons(@RequestHeader("token") String token,@RequestBody ArrayList<Coupon> couponList) {
        CustomerService customerService = (CustomerService) tokenManager.getService(token, type);
        ArrayList<String> messages = new ArrayList<String>();
        for (Coupon coupon : couponList
        ) {
            String message = customerService.purchaseCoupon(coupon);
            messages.add(message);
        }
        if (customerService == null) {
            return new ResponseEntity<String>("Service is not found", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<ArrayList<String>>(messages, HttpStatus.OK);

    }

        @GetMapping("/getCustomerCoupons") // http://localhost:8080/customerApi/getMyCoupons
    public ResponseEntity<?> getCustomerCoupons(@RequestHeader("token") String token){
        CustomerService customerService = (CustomerService) tokenManager.getService(token,type);
        if(customerService==null)
        {
            return new ResponseEntity<String>("Service is not found", HttpStatus.BAD_REQUEST);
        }
        ArrayList<Coupon> coupons=  customerService.getCustomerCoupons();
        return new ResponseEntity<ArrayList<Coupon>>(coupons,HttpStatus.OK);
    }

    @GetMapping("/getCustomerCouponsByCategory/{category}") // http://localhost:8080/customerApi/getMyCouponsCtg/{category}
    public ResponseEntity<?> getCustomerCoupons(@RequestHeader("token") String token, @PathVariable("category") String category){
        CustomerService customerService = (CustomerService) tokenManager.getService(token, type);
        if(customerService==null)
        {
            return new ResponseEntity<String>("Service is not found", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<ArrayList<Coupon>>(customerService.getCustomerCoupons(Category.valueOf(category)),HttpStatus.OK);
    }

    @GetMapping("/getCustomerCouponsByMaxPrice/{maxPrice}") // http://localhost:8080/customerApi/getCustomerCouponsByMaxPrice/{maxPrice}
    public ResponseEntity<?> getCustomerCoupons(@RequestHeader("token") String token, @PathVariable("maxPrice") double maxPrice){
        CustomerService customerService = (CustomerService) tokenManager.getService(token, type);
        if(customerService==null)
        {
            return new ResponseEntity<String>("Service is not found", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<ArrayList<Coupon>>(customerService.getCustomerCoupons(maxPrice),HttpStatus.OK);
    }

    @GetMapping("/getCustomerDetails") // http://localhost:8080/customerApi/getCustomerDetails
    public ResponseEntity<?> getCustomerDetails(@RequestHeader("token") String token){
        CustomerService customerService = (CustomerService) tokenManager.getService(token,type);
        if(customerService==null)
        {
            return new ResponseEntity<String>("Service is not found", HttpStatus.BAD_REQUEST);
        }
        Customer customer =  customerService.getCustomerDetails();
        return new ResponseEntity<Customer>(customer,HttpStatus.OK);
    }

    @GetMapping("/displayAllCoupons") // http://localhost:8080/customerApi/displayAllcoupons
    public ResponseEntity<?> getAllCoupons(@RequestHeader("token") String token){
        CustomerService customerService = (CustomerService) tokenManager.getService(token,type);
        if(customerService==null)
        {
            return new ResponseEntity<String>("Service is not found", HttpStatus.BAD_REQUEST);
        }
        ArrayList<Coupon> allCoupons = customerService.getAllCoupons() ;
        return new ResponseEntity<ArrayList<Coupon>>(allCoupons,HttpStatus.OK);

    }

}