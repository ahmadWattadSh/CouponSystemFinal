package com.JohnBryce.CouponSystemStage2.Controllers;

import com.JohnBryce.CouponSystemStage2.Entities.Company;
import com.JohnBryce.CouponSystemStage2.Entities.Customer;
import com.JohnBryce.CouponSystemStage2.Login.LoginManager;
import com.JohnBryce.CouponSystemStage2.Services.AdminService;
import com.JohnBryce.CouponSystemStage2.TokenManager.Token;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.ArrayList;

@RestController
@RequestMapping("adminApi")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class AdminController extends ClientController {
    static LoginManager.ClientType type = LoginManager.ClientType.ADMINISTRATOR;

    @GetMapping("/login/{email}/{password}") // http://localhost:8080/adminApi/login/{email}/{password}
    @Override
    public ResponseEntity<String> login(@PathVariable("email") String email, @PathVariable("password") String password) {
        AdminService adminService = (AdminService) loginManager.Login(email, password, LoginManager.ClientType.ADMINISTRATOR);
        if (adminService == null) {
            return new ResponseEntity<>("Invalid User", HttpStatus.BAD_REQUEST);
        } else {
            Token token = tokenManager.createNewToken(adminService);
            return new ResponseEntity<String>(token.getToken(), HttpStatus.OK);
        }
    }

    @PostMapping("/addCompany") // http://localhost:8080/adminApi/addCompany
    public ResponseEntity<?> addCompany(@RequestHeader("token") String token, @RequestBody Company company) throws Exception {
        AdminService adminService = (AdminService) tokenManager.getService(token, type);
        if (adminService == null) {
            return new ResponseEntity<>("Service is not found", HttpStatus.BAD_REQUEST);
        }
        int isExist = adminService.addCompany(company);

        if (isExist == 0) {
            return new ResponseEntity<>("either email or name already exists", HttpStatus.BAD_REQUEST);
        } else
            return new ResponseEntity<>(isExist, HttpStatus.OK);
    }

    @PutMapping("/updateCompany") // http://localhost:8080/adminApi/updateCompany
    public ResponseEntity<String> updateCompany(@RequestHeader("token") String token, @RequestBody Company company) {
        AdminService adminService = (AdminService) tokenManager.getService(token, type);
        if (adminService == null) {
            return new ResponseEntity<>("Service is not found", HttpStatus.BAD_REQUEST);
        } else {
            adminService.updateCompany(company);
            return new ResponseEntity<>("Company Was Updated", HttpStatus.OK);
        }
    }

    @DeleteMapping("/deleteCompany/{id}") // http://localhost:8080/adminApi/deleteCompany/{id}
    public ResponseEntity<String> deleteCompany(@PathVariable("id") int id, @RequestHeader("token") String token) {
        AdminService adminService = (AdminService) tokenManager.getService(token, type);
        if (adminService == null) {
            return new ResponseEntity<>("Service is not found", HttpStatus.BAD_REQUEST);
        }
        adminService.deleteCompany(id);
        return new ResponseEntity<>("Company Was Deleted Successfully!", HttpStatus.OK);


    }

    @GetMapping("/getAllCompanies") // http://localhost:8080/adminApi/getAllCompanies
    public ResponseEntity<?> getAllCompanies(@RequestHeader("token") String token) {
        AdminService adminService = (AdminService) tokenManager.getService(token, type);
        if (adminService == null) {
            return new ResponseEntity<String>("Service is not found", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<ArrayList<Company>>(adminService.getAllCompanies(), HttpStatus.OK);
    }

    @GetMapping("/getOneCompany/{id}") // http://localhost:8080/adminApi/getOneCompany/{id}
    public ResponseEntity<?> getOneCompany(@RequestHeader("token") String token, @PathVariable("id") int id) {
        AdminService adminService = (AdminService) tokenManager.getService(token, type);
        if (adminService == null) {
            return new ResponseEntity<String>("Service is not found", HttpStatus.BAD_REQUEST);
        }
        Company company = adminService.getOneCompany(id);
        return new ResponseEntity<Company>(company, HttpStatus.OK);

    }

    @PostMapping("/addCustomer") // http://localhost:8080/adminApi/addCustomer
    public ResponseEntity<?> addCustomer(@RequestHeader("token") String token, @RequestBody Customer customer) {
        AdminService adminService = (AdminService) tokenManager.getService(token, type);
        if (adminService == null) {
            return new ResponseEntity<String>("Service is not found", HttpStatus.BAD_REQUEST);
        }
        int isExist = adminService.addCustomer(customer);
        if (isExist == 0) {
            return new ResponseEntity<String>("The email already exists", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<Integer>(isExist, HttpStatus.OK);
    }

    @PutMapping("/updateCustomer") // http://localhost:8080/adminApi/updateCustomer
    public ResponseEntity<String> updateCustomer(@RequestHeader("token") String token, @RequestBody Customer customer) {
        AdminService adminService = (AdminService) tokenManager.getService(token, type);
        if (adminService == null) {
            return new ResponseEntity<>("Service is not found", HttpStatus.BAD_REQUEST);
        }
        adminService.updateCustomer(customer);
        return new ResponseEntity<>("Customer Was Updated Successfully!", HttpStatus.OK);
    }

    @DeleteMapping("/deleteCustomer/{id}") // http://localhost:8080/adminApi/deleteCustomer/{id}
    public ResponseEntity<String> deleteCustomer(@RequestHeader("token") String token, @PathVariable("id") int id) {
        AdminService adminService = (AdminService) tokenManager.getService(token, type);
        if (adminService == null) {
            return new ResponseEntity<>("Service is not found", HttpStatus.BAD_REQUEST);
        }
        adminService.deleteCustomer(id);
        return new ResponseEntity<>(" Customer Was Deleted Successfully!", HttpStatus.OK);
    }

    @GetMapping("/getAllCustomers") // http://localhost:8080/adminApi/getAllCustomers
    public ResponseEntity<?> getAllCustomers(@RequestHeader("token") String token) {
        AdminService adminService = (AdminService) tokenManager.getService(token, type);
        if (adminService == null) {
            return new ResponseEntity<String>("Service is not found", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<ArrayList<Customer>>(adminService.getAllCustomers(), HttpStatus.OK);

    }


    @GetMapping("/getOneCustomer/{id}") // http://localhost:8080/adminApi/getOneCustomer/{id}
    public ResponseEntity<?> getOneCustomer(@RequestHeader("token") String token, @PathVariable("id") int id) {
        AdminService adminService = (AdminService) tokenManager.getService(token, type);
        if (adminService == null) {
            return new ResponseEntity<String>("Service is not found", HttpStatus.BAD_REQUEST);
        }
        Customer customer = adminService.getOneCustomer(id);
        return new ResponseEntity<Customer>(customer, HttpStatus.OK);
    }
}
