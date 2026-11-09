package com.shop.inventory.service;

import com.shop.inventory.entity.Category;

public interface CategoryService {

    public Category addCategory(Category category);

    public Iterable<Category> getAllCategories();

    public Category getCategoryById(int categoryId);

    public Category updateCategory(Category category);

    public void deleteCategory(int categoryId);
}