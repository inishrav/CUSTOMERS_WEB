import controller.EntryController;

public class Main {

    public static void main(String[] args) {

        EntryController controller = new EntryController();

        controller.saveEntry(
                "2026-06-05",
                150,
                140,
                220);

        System.out.println("Application Started");
    }
}