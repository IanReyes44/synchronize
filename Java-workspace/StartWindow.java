
import java.awt.FlowLayout;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JTextField;


public class StartWindow{
    public static void main(String[] args) {
       
        JFrame startPage = new JFrame("Synchronize Login");
      
        startPage.setSize(300,400);

        
        JLabel userLabel = new JLabel("Username: ");
        JTextField userField = new JTextField(20);
        JLabel passLabel = new JLabel("Password: ");
        JTextField passField = new JTextField(20);

        startPage.setLayout(new FlowLayout());
        startPage.add(userLabel);
        startPage.add(userField);
        startPage.add(passLabel);
        startPage.add(passField);

        startPage.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        startPage.setVisible(true);

    }
}