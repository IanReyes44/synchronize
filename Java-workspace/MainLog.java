
import java.awt.Color;
import java.awt.Font;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.security.DigestOutputStream;
import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JTextField;
import java.util.HashMap;
import javax.swing.JPasswordField;
//import 

public class MainLog implements ActionListener{
	
	HashMap<String, String> logininfo = new HashMap<String,String>();

	JFrame frame = new JFrame();
	JLabel lblNewLabel = new JLabel("Username/Email:");
	JTextField userField = new JTextField();
	JLabel lblNewLabel_1 = new JLabel("Password: ");
	JPasswordField passField = new JPasswordField();
	JLabel lblNewLabel_2 = new JLabel("Synchronize");
	JButton loginButton = new JButton("Login");
	JLabel lblNewLabel_3 = new JLabel("New? Sign up.");
	JButton signUpButton = new JButton("Sign up");
	JLabel messageLabel = new JLabel();


	MainLog(HashMap<String,String> logininfoOriginal) {
		
		logininfo = logininfoOriginal;

		frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		frame.setSize(960, 720);
		frame.setLayout(null);
		frame.setVisible(true);
		frame.setTitle("Synchronize Login");
		frame.add(messageLabel);
		messageLabel.setBounds(380, 220, 256, 20);
		messageLabel.setFont(new Font(null,Font.ITALIC,12));
		frame.add(lblNewLabel);
		lblNewLabel.setBounds(412, 246, 118, 14);
	
		frame.add(userField);
		userField.setBounds(412, 271, 136, 20);
		userField.setColumns(10);
		
		frame.add(lblNewLabel_1);
		lblNewLabel_1.setBounds(412, 302, 80, 20);
		
		
		frame.add(passField);
		passField.setBounds(412, 327, 136, 20);
		passField.setColumns(10);
		
		frame.add(lblNewLabel_2);
		lblNewLabel_2.setFont(new Font("Serif", Font.ITALIC, 20));
		lblNewLabel_2.setBounds(430, 180, 100, 27);
		
		
		frame.add(loginButton);
		//Temp using "admin" and "password" to show implementation
		
		/*implement username and password database and update after
		//Temp using "admin" and "password" to show implementation
		btnNewButton.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {

			}
		});
		
		
	*/	
		loginButton.addActionListener(this);

		
		loginButton.setBounds(435, 380, 90, 23);
		
		
		frame.add(lblNewLabel_3);
		lblNewLabel_3.setBounds(412, 414, 80, 14);
		
		
		frame.add(signUpButton);
		signUpButton.addActionListener(this);

		signUpButton.setBounds(435, 443, 90, 23);
		

	}

    @Override
    public void actionPerformed(ActionEvent e) {
        if(e.getSource() == loginButton){
			String userID = userField.getText();
			String password = String.valueOf(passField.getPassword());

			if(logininfo.containsKey(userID)){
				if(logininfo.get(userID).equals(password)){
					frame.dispose();
				}
				//execute calander application
			} 
			else{
				messageLabel.setForeground(Color.red);
				messageLabel.setText("Incorrect username and/or password.");
				userField.setText("");
				passField.setText("");
			}	
		}
		if(e.getSource()== signUpButton){
			frame.dispose();
			CreateAccount createAccount = new CreateAccount(logininfo);
		}
    }
}
