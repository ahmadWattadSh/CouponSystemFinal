package com.JohnBryce.CouponSystemStage2.Controllers;

import com.JohnBryce.CouponSystemStage2.Entities.Category;
import com.JohnBryce.CouponSystemStage2.Entities.Company;
import com.JohnBryce.CouponSystemStage2.Entities.Coupon;
import com.JohnBryce.CouponSystemStage2.Login.LoginManager;
import com.JohnBryce.CouponSystemStage2.Services.CompanyService;
import com.JohnBryce.CouponSystemStage2.TokenManager.Token;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@RequestMapping("companyApi")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class CompanyController extends ClientController {

    static LoginManager.ClientType type = LoginManager.ClientType.COMPANY;

    @Override
    @GetMapping("/login/{email}/{password}") // http://localhost:8080/companyApi/login/{email}/{password}
    @ResponseBody
    public ResponseEntity<String> login(@PathVariable("email") String email, @PathVariable("password") String password) {
        CompanyService service = (CompanyService) loginManager.Login(email, password, LoginManager.ClientType.COMPANY);
        if (service == null) {
            return new ResponseEntity<String>("Invalid User", HttpStatus.BAD_REQUEST);
        }
        Token token = tokenManager.createNewToken(service);
        return ResponseEntity.ok(token.getToken());
    }

    @PostMapping("/addCoupon") // http://localhost:8080/companyApi/addCoupon
    @ResponseBody
    public ResponseEntity<String> addCoupon(@RequestBody Coupon coupon, @RequestHeader("token") String token) {
        CompanyService companyService = (CompanyService) tokenManager.getService(token, type);
        if (companyService == null) {
            return new ResponseEntity<String>("Service is not found", HttpStatus.BAD_REQUEST);
        } else {
            boolean isExist = companyService.addCoupon(coupon);
            if (isExist) {
                return new ResponseEntity<String>("The coupon already exists", HttpStatus.BAD_REQUEST);
            } else
                return new ResponseEntity<String>("The coupon was added", HttpStatus.OK);

        }
    }

    @PutMapping("/updateCoupon") // http://localhost:8080/companyApi/updateCoupon
    @ResponseBody
    public ResponseEntity<?> updateCoupon(@RequestBody Coupon coupon, @RequestHeader("token") String token) {
        CompanyService companyService = (CompanyService) tokenManager.getService(token, type);
        if (companyService == null) {
            return new ResponseEntity<String>("Service is not found", HttpStatus.BAD_REQUEST);
        } else {
            companyService.updateCoupon(coupon);
            return new ResponseEntity<String>("The coupon was updated", HttpStatus.OK);
        }

    }

    @DeleteMapping("/deleteCoupon/{couponId}") // http://localhost:8080/companyApi/deleteCoupon
    @ResponseBody
    public ResponseEntity<?> deleteCoupon(@PathVariable int couponId, @RequestHeader("token") String token) {
        CompanyService companyService = (CompanyService) tokenManager.getService(token, type);
        if (companyService == null) {
            return new ResponseEntity<String>("Service is not found", HttpStatus.BAD_REQUEST);
        } else {
            companyService.deleteCoupon(couponId);
            return new ResponseEntity<String>("The coupon was deleted", HttpStatus.OK);
        }

    }

    @GetMapping("/getCompanyCoupons") // http://localhost:8080/companyApi/getCompanyCoupons
    @ResponseBody
    public ResponseEntity<?> getCompanyCoupons(@RequestHeader("token") String token) {
        CompanyService companyService = (CompanyService) tokenManager.getService(token, type);
        if (companyService == null) {
            return new ResponseEntity<String>("Service is not found", HttpStatus.BAD_REQUEST);
        } else {
            return new ResponseEntity<ArrayList<Coupon>>(companyService.getCompanyCoupons(), HttpStatus.OK);
        }

    }

    @GetMapping("/getCompanyCouponsByCategory/{category}") // http://localhost:8080/companyApi/getCompanyCouponsByCategory/{category}
    @ResponseBody
    public ResponseEntity<?> getCompanyCouponsByCategory(@PathVariable Category category, @RequestHeader("token") String token) {
        CompanyService companyService = (CompanyService) tokenManager.getService(token, type);
        if (companyService == null) {
            return new ResponseEntity<String>("Service is not found", HttpStatus.BAD_REQUEST);
        } else {
            return new ResponseEntity<ArrayList<Coupon>>(companyService.getCompanyCoupons(category), HttpStatus.OK);
        }

    }

    @GetMapping("/getCompanyCouponsByMaxPrice/{maxPrice}") // http://localhost:8080/companyApi/getCompanyCouponsByMaxPrice/{maxPrice}
    @ResponseBody
    public ResponseEntity<?> getCompanyCouponsByMaxPrice(@PathVariable int maxPrice, @RequestHeader("token") String token) {
        CompanyService companyService = (CompanyService) tokenManager.getService(token, type);
        if (companyService == null) {
            return new ResponseEntity<String>("Service is not found", HttpStatus.BAD_REQUEST);
        } else {
            return new ResponseEntity<ArrayList<Coupon>>(companyService.getCompanyCoupons(maxPrice), HttpStatus.OK);
        }

    }

    @GetMapping("/getCompanyDetails") // http://localhost:8080/companyApi/getCompanyDetails
    @ResponseBody
    public ResponseEntity<?> getCompanyDetails(@RequestHeader("token") String token) {
        CompanyService companyService = (CompanyService) tokenManager.getService(token, type);
        if (companyService == null) {
            return new ResponseEntity<String>("Service is not found", HttpStatus.BAD_REQUEST);
        } else {
            return new ResponseEntity<Company>(companyService.getCompanyDetails(), HttpStatus.OK);
        }

    }
}
