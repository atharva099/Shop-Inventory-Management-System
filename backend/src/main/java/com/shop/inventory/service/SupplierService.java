package com.shop.inventory.service;

import java.util.List;

import com.shop.inventory.entity.Supplier;

public interface SupplierService {

    Supplier addSupplier(Supplier supplier);

    List<Supplier> getAllSuppliers();

    Supplier getSupplierById(int id);

    Supplier updateSupplier(int id, Supplier supplier);

    void deleteSupplier(int id);
}