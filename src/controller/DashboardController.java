package controller;

import util.FileHandler;

public class DashboardController {

    public String getAllEntries() {

        return FileHandler.readEntries();

    }
}