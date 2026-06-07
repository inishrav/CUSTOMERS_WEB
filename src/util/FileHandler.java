package util;

import java.io.*;
import java.nio.file.*;

public class FileHandler {

    private static final String FILE_PATH = "data/entries.json";

    public static void saveEntry(String data) {

        try {

            FileWriter writer = new FileWriter(FILE_PATH, true);

            writer.write(data + System.lineSeparator());

            writer.close();

        } catch (IOException e) {

            e.printStackTrace();

        }
    }

    public static String readEntries() {

        try {

            return Files.readString(Paths.get(FILE_PATH));

        } catch (IOException e) {

            return "";

        }
    }
}