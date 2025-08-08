package com.api.controller;

import com.api.entity.Product;
import com.api.helper.Helper;
import com.api.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RestController
// Enable React access
@CrossOrigin(origins = "http://localhost:5173")
public class ProductController {

    @Autowired
    private ProductService productService;

    @PostMapping("/product/upload")
    public ResponseEntity<?> upload(@RequestParam("file") MultipartFile file) {
        if (Helper.checkExcelFormat(file)) {
            //true

            this.productService.save(file);

            return ResponseEntity.ok(Map.of("success", true,"message", "File is uploaded and data is saved to db"));


        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Please upload excel file ");
    }




    @GetMapping("/product")
    public List<Product> getAllProduct() {
        return this.productService.getAllProducts();
    }


    @PutMapping("/product/update-price/{productId}")

    public ResponseEntity<?> updateProductPrice(
            @PathVariable int productId,
            @RequestBody Map<String, Object> requestBody) {

        try {
            if (!requestBody.containsKey("productPrice")) {
                return ResponseEntity.badRequest().body("Missing 'productPrice' in request body");
            }

            double newPrice = Double.parseDouble(requestBody.get("productPrice").toString());

            boolean updated = productService.updateProductPrice(productId, newPrice);
//            System.out.println("Received price: " + newPrice);
                    System.out.println("Product ID: " + productId);
                    System.out.println("Request body: " + requestBody);
                    System.out.println("Extracted price: " + requestBody.get("productPrice"));

            if (updated) {
                return ResponseEntity.ok(Map.of("success", true, "message", "Price updated successfully"));
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(Map.of("success", false, "message", "Product not found"));
            }

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("success", false, "message", "Error: " + e.getMessage()));
        }
    }

}
