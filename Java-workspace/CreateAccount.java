

import java.awt.Font;
import java.awt.event.ActionEvent;
import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JTextField;

public class CreateAccount {
	
	JFrame frame = new JFrame();
	JLabel lblNewLabel_2 = new JLabel("Synchronize");
	JTextField textField = new JTextField();
	JLabel lblNewLabel = new JLabel("Email:");
	JLabel lblUsername = new JLabel("Username:");
	JTextField textField_1 = new JTextField();
	JLabel lblPassword = new JLabel("Password:");
	JTextField textField_2 = new JTextField();
	JTextField textField_3 = new JTextField();
	JButton btnNewButton = new JButton("Sign In");
	JButton btnNewButton_1 = new JButton("Sign Up");
	
	
	
	CreateAccount() {
		initialize();
	}

	/**
	 * Initialize the contents of the frame.
	 */
	private void initialize() {
		
		frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		frame.setSize(708, 633);
		frame.setLayout(null);
		frame.setVisible(true);
		frame.setTitle("Sign Up");
		
		lblNewLabel_2.setFont(new Font("Serif", Font.ITALIC, 20));
		lblNewLabel_2.setBounds(283, 62, 116, 27);
		frame.getContentPane().add(lblNewLabel_2);
		
		
		
		textField.setBounds(294, 144, 86, 20);
		frame.getContentPane().add(textField);
		textField.setColumns(10);
		
		
		lblNewLabel.setBounds(294, 119, 86, 14);
		frame.getContentPane().add(lblNewLabel);
		
		
		lblUsername.setBounds(294, 195, 86, 14);
		frame.getContentPane().add(lblUsername);
		
		
		textField_1.setColumns(10);
		textField_1.setBounds(294, 220, 86, 20);
		frame.getContentPane().add(textField_1);
		
		
		lblPassword.setBounds(294, 265, 86, 14);
		frame.getContentPane().add(lblPassword);
		
		
		textField_2.setColumns(10);
		textField_2.setBounds(294, 290, 86, 20);
		frame.getContentPane().add(textField_2);
		
		JLabel lblConfirmPassword = new JLabel("Confirm Password:");
		lblConfirmPassword.setBounds(294, 332, 116, 14);
		frame.getContentPane().add(lblConfirmPassword);
		
		
		textField_3.setColumns(10);
		textField_3.setBounds(294, 357, 86, 20);
		frame.getContentPane().add(textField_3);
		
		btnNewButton.addActionListener((ActionEvent e) -> {
                    if(e.getSource()==btnNewButton) {
                        frame.dispose();
                        MainLog mainLog = new MainLog();
                    }
                });
		btnNewButton.setBounds(294, 478, 89, 23);
		frame.getContentPane().add(btnNewButton);
		
		/*implement username and password database and update after
		//Temp using "admin" and "password" to show implementation
		btnNewButton_1.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {

			}
		});
		
		
	*/	
		//Temp using "admin" and "password" to show implementation
		btnNewButton_1.addActionListener((ActionEvent e) -> {
                });
		
		btnNewButton_1.setBounds(294, 407, 89, 23);
		frame.getContentPane().add(btnNewButton_1);
	}
}
