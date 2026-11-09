package com.shop.inventory.repository;

import org.springframework.data.repository.CrudRepository;
import com.shop.inventory.entity.Product;

public interface ProductRepository extends CrudRepository<Product, Integer> {

}