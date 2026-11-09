package com.shop.inventory.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.shop.inventory.entity.Supplier;
import com.shop.inventory.repository.SupplierRepository;

@Service
public class SupplierServiceImpl implements SupplierService {

    @Autowired
    private SupplierRepository supplierRepository;

    @Override
    public Supplier addSupplier(Supplier supplier) {
        return supplierRepository.save(supplier);
    }

    @Override
    public List<Supplier> getAllSuppliers() {
        List<Supplier> suppliers = new ArrayList<>();

        supplierRepository.findAll().forEach(suppliers::add);

        return suppliers;
    }

    @Override
    public Supplier getSupplierById(int id) {
        return supplierRepository.findById(id).orElse(null);
    }

    @Override
    public Supplier updateSupplier(int id, Supplier supplier) {
        Supplier existingSupplier = supplierRepository.findById(id).orElse(null);

        if (existingSupplier != null) {
            existingSupplier.setSupplierName(supplier.getSupplierName());
            existingSupplier.setSupplierPhone(supplier.getSupplierPhone());
            existingSupplier.setSupplierEmail(supplier.getSupplierEmail());

            return supplierRepository.save(existingSupplier);
        }

        return null;
    }

    @Override
    public void deleteSupplier(int id) {
        supplierRepository.deleteById(id);
    }
}