package service;

import model.DailyEntry;

public class EntryService {

/* ---------------- CREATE ENTRY ---------------- */
public DailyEntry createEntry(
String customerName,
String date,
double grossWeight,
double netWeight,
double kgRate) {

DailyEntry entry = new DailyEntry(
customerName,
date,
grossWeight,
netWeight,
kgRate
);

entry.calculateAmount();

return entry;
}

/* ---------------- UPDATE ENTRY ---------------- */
public DailyEntry updateEntry(
DailyEntry existing,
String customerName,
String date,
double grossWeight,
double netWeight,
double kgRate) {

if (existing == null) {
return null;
}

existing.setCustomerName(customerName);
existing.setDate(date);
existing.setGrossWeight(grossWeight);
existing.setNetWeight(netWeight);
existing.setKgRate(kgRate);

/* Recalculate after update */
existing.calculateAmount();

return existing;
}

/* ---------------- VALIDATION ---------------- */
public boolean isValidEntry(
String customerName,
double netWeight,
double kgRate) {

if (customerName == null || customerName.trim().isEmpty()) {
return false;
}

if (netWeight <= 0 || kgRate <= 0) {
return false;
}

return true;
}

/* ---------------- CALCULATE ONLY ---------------- */
public double calculateAmount(double netWeight, double kgRate) {
return netWeight * kgRate;
}
}