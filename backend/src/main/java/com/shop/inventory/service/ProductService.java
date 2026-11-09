package com.shop.inventory.service;

import java.util.List;
import com.shop.inventory.entity.Product;

public interface ProductService {

    Product addProduct(Product product);

    List<Product> getAllProducts();

    Product getProductById(int id);

    Product updateProduct(int id, Product product);

    void deleteProduct(int id);
}