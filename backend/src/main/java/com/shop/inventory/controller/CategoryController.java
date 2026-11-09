package com.shop.inventory.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import com.shop.inventory.entity.Category;
import com.shop.inventory.service.CategoryService;
import org.springframework.web.bind.annotation.CrossOrigin;

@Controller
@CrossOrigin(origins = "http://localhost:3000")
public class CategoryController {

    @Autowired
    CategoryService categoryService;

    // Add Category
    @PostMapping("/categories")
    public ResponseEntity<Category> addCategory(@RequestBody Category category) {

        category.setCategoryId(0);

        Category savedCategory = categoryService.addCategory(category);

        return new ResponseEntity<Category>(savedCategory, HttpStatus.CREATED);
    }

    // Get All Categories
    @GetMapping("/categories")
    public ResponseEntity<Iterable<Category>> getAllCategories() {

        Iterable<Category> categories = categoryService.getAllCategories();

        return new ResponseEntity<Iterable<Category>>(categories, HttpStatus.OK);
    }

    // Get Category By ID
    @GetMapping("/categories/{id}")
    public ResponseEntity<Category> getCategoryById(@PathVariable int id) {

        Category category = categoryService.getCategoryById(id);

        if (category == null) {
            return new ResponseEntity<Category>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<Category>(category, HttpStatus.OK);
    }

    // Update Category
    @PutMapping("/categories/{id}")
    public ResponseEntity<Category> updateCategory(
            @PathVariable int id,
            @RequestBody Category category) {

        Category existingCategory = categoryService.getCategoryById(id);

        if (existingCategory == null) {
            return new ResponseEntity<Category>(HttpStatus.NOT_FOUND);
        }

        category.setCategoryId(id);

        Category updatedCategory = categoryService.updateCategory(category);

        return new ResponseEntity<Category>(updatedCategory, HttpStatus.OK);
    }

    // Delete Category
    @DeleteMapping("/categories/{id}")
    public ResponseEntity<Void> deleteCategory(@PathVariable int id) {

        Category category = categoryService.getCategoryById(id);

        if (category == null) {
            return new ResponseEntity<Void>(HttpStatus.NOT_FOUND);
        }

        categoryService.deleteCategory(id);

        return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
    }
}