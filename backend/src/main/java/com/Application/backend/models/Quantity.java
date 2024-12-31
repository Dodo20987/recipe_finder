package com.Application.backend.models;

import jakarta.persistence.*;

@Entity
@Table(name = "QUANTITY")
public class Quantity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long quantityID;

    public long getQuantityID() {return quantityID;}
    public void setQuantityID(long quantityID) {this.quantityID = quantityID;}

    private String quantityAmount;

    public String getQuantityAmount() {return quantityAmount;}
    public void setQuantityAmount(String quantityAmount) {this.quantityAmount = quantityAmount;}
}
