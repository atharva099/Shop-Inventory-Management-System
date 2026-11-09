package com.shop.inventory.repository;

import org.springframework.data.repository.CrudRepository;

import com.shop.inventory.entity.Category;

public interface CategoryRepository extends CrudRepository<Category, Integer> {

}