package controller;

import model.DailyEntry;
import service.EntryService;
import util.FileHandler;

import java.util.List;

public class EntryController {

private EntryService entryService = new EntryService();

/* ---------------- CREATE ENTRY ---------------- */
public void saveEntry(
String customerName,
String date,
double grossWeight,
double netWeight,
double kgRate) {

DailyEntry entry = entryService.createEntry(
customerName,
date,
grossWeight,
netWeight,
kgRate
);

FileHandler.appendEntry(entry);

System.out.println("Entry Saved Successfully");
}

/* ---------------- GET ALL ENTRIES ---------------- */
public List<DailyEntry> getAllEntries() {
return FileHandler.loadEntries();
}

/* ---------------- UPDATE ENTRY ---------------- */
public void updateEntry(int index, DailyEntry updatedEntry) {

List<DailyEntry> entries = FileHandler.loadEntries();

if (index >= 0 && index < entries.size()) {
entries.set(index, updatedEntry);
FileHandler.saveAll(entries);
System.out.println("Entry Updated Successfully");
} else {
System.out.println("Invalid Index");
}

}

/* ---------------- DELETE ENTRY ---------------- */
public void deleteEntry(int index) {

List<DailyEntry> entries = FileHandler.loadEntries();

if (index >= 0 && index < entries.size()) {
entries.remove(index);
FileHandler.saveAll(entries);
System.out.println("Entry Deleted Successfully");
} else {
System.out.println("Invalid Index");
}

}
}