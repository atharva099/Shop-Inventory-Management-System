package com.shop.inventory.repository;

import org.springframework.data.repository.CrudRepository;

import com.shop.inventory.entity.Supplier;

public interface SupplierRepository extends CrudRepository<Supplier, Integer> {

}