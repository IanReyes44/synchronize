
import java.awt.Font;
import java.awt.event.ActionEvent;
import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JTextField;



public class MainLog {
	
	JFrame frame = new JFrame();
	JLabel lblNewLabel = new JLabel("Username/Email:");
	JTextField userField = new JTextField();
	JLabel lblNewLabel_1 = new JLabel("Password: ");
	JTextField passField = new JTextField();
	JLabel lblNewLabel_2 = new JLabel("Synchronize");
	JButton btnNewButton = new JButton("Login");
	JLabel lblNewLabel_3 = new JLabel("New? Sign up.");
	JButton btnNewButton_1 = new JButton("Sign up");
	
	MainLog() {
		
		frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		frame.setSize(960, 720);
		frame.setLayout(null);
		frame.setVisible(true);
		frame.setTitle("Synchronize Login");
		
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
		
		
		frame.add(btnNewButton);
		//Temp using "admin" and "password" to show implementation
		
		/*implement username and password database and update after
		//Temp using "admin" and "password" to show implementation
		btnNewButton.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {

			}
		});
		
		
	*/	
		btnNewButton.addActionListener((ActionEvent e) -> {
                    if(e.getSource()==btnNewButton_1) {
                        String username = userField.getText();
                        String password = passField.getText();
                        
                        if ("admin".equals(username) && "password".equals(password))
                        {
                            
                        } else {
                            
                        }
                        
                        
                    }
                });
		
		btnNewButton.setBounds(435, 380, 90, 23);
		
		
		frame.add(lblNewLabel_3);
		lblNewLabel_3.setBounds(412, 414, 80, 14);
		
		
		frame.add(btnNewButton_1);
		btnNewButton_1.addActionListener((ActionEvent e) -> {
                    if(e.getSource()==btnNewButton_1) {
                        frame.dispose();
                        CreateAccount createAccount = new CreateAccount();
                    }
                });
		btnNewButton_1.setBounds(435, 443, 90, 23);
		

	}
}
