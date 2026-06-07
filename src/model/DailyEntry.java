package model;

import java.util.UUID;

public class DailyEntry {

private String id;
private String customerName;
private String date;
private double grossWeight;
private double netWeight;
private double kgRate;
private double amount;

/* ---------------- DEFAULT ---------------- */
public DailyEntry() {
this.id = UUID.randomUUID().toString();
}

/* ---------------- CREATE ENTRY ---------------- */
public DailyEntry(
String customerName,
String date,
double grossWeight,
double netWeight,
double kgRate) {

this.id = UUID.randomUUID().toString();
this.customerName = customerName;
this.date = date;
this.grossWeight = grossWeight;
this.netWeight = netWeight;
this.kgRate = kgRate;
this.amount = netWeight * kgRate;
}

/* ---------------- GETTERS/SETTERS ---------------- */
public String getId() {
return id;
}

public String getCustomerName() {
return customerName;
}

public void setCustomerName(String customerName) {
this.customerName = customerName;
}

public String getDate() {
return date;
}

public void setDate(String date) {
this.date = date;
}

public double getGrossWeight() {
return grossWeight;
}

public void setGrossWeight(double grossWeight) {
this.grossWeight = grossWeight;
}

public double getNetWeight() {
return netWeight;
}

public void setNetWeight(double netWeight) {
this.netWeight = netWeight;
}

public double getKgRate() {
return kgRate;
}

public void setKgRate(double kgRate) {
this.kgRate = kgRate;
}

public double getAmount() {
return amount;
}

public void calculateAmount() {
this.amount = netWeight * kgRate;
}

/* ---------------- STRING ---------------- */
@Override
public String toString() {
return customerName + "," +
date + "," +
grossWeight + "," +
netWeight + "," +
kgRate + "," +
amount;
}
}