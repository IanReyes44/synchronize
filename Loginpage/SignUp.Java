import java.awt.EventQueue;
import java.awt.Font;

import javax.swing.JFrame;
import javax.swing.JTextField;
import javax.swing.JLabel;
import javax.swing.JButton;
import java.awt.event.ActionListener;
import java.awt.event.ActionEvent;

public class SignUp {

	private JFrame frame;
	private JTextField textField;
	private JTextField textField_1;
	private JTextField textField_2;
	private JTextField textField_3;

	/**
	 * Launch the application.
	 */
	public static void main(String[] args) {
		EventQueue.invokeLater(new Runnable() {
			public void run() {
				try {
					SignUp window = new SignUp();
					window.frame.setVisible(true);
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		});
	}

	/**
	 * Create the application.
	 */
	public SignUp() {
		initialize();
	}

	/**
	 * Initialize the contents of the frame.
	 */
	private void initialize() {
		frame = new JFrame();
		frame.setBounds(100, 100, 708, 633);
		frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		frame.getContentPane().setLayout(null);
		
		JLabel lblNewLabel_2 = new JLabel("Synchronize");
		lblNewLabel_2.setFont(new Font("Serif", Font.ITALIC, 20));
		lblNewLabel_2.setBounds(283, 62, 116, 27);
		frame.getContentPane().add(lblNewLabel_2);
		
		
		textField = new JTextField();
		textField.setBounds(294, 144, 86, 20);
		frame.getContentPane().add(textField);
		textField.setColumns(10);
		
		JLabel lblNewLabel = new JLabel("Email:");
		lblNewLabel.setBounds(294, 119, 86, 14);
		frame.getContentPane().add(lblNewLabel);
		
		JLabel lblUsername = new JLabel("Username:");
		lblUsername.setBounds(294, 195, 86, 14);
		frame.getContentPane().add(lblUsername);
		
		textField_1 = new JTextField();
		textField_1.setColumns(10);
		textField_1.setBounds(294, 220, 86, 20);
		frame.getContentPane().add(textField_1);
		
		JLabel lblPassword = new JLabel("Password:");
		lblPassword.setBounds(294, 265, 86, 14);
		frame.getContentPane().add(lblPassword);
		
		textField_2 = new JTextField();
		textField_2.setColumns(10);
		textField_2.setBounds(294, 290, 86, 20);
		frame.getContentPane().add(textField_2);
		
		JLabel lblConfirmPassword = new JLabel("Confirm Password:");
		lblConfirmPassword.setBounds(294, 332, 116, 14);
		frame.getContentPane().add(lblConfirmPassword);
		
		textField_3 = new JTextField();
		textField_3.setColumns(10);
		textField_3.setBounds(294, 357, 86, 20);
		frame.getContentPane().add(textField_3);
		
		JButton btnNewButton = new JButton("Sign In");
		btnNewButton.setBounds(294, 478, 89, 23);
		frame.getContentPane().add(btnNewButton);
		
		JButton btnNewButton_1 = new JButton("Sign Up");
		btnNewButton_1.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
			}
		});
		btnNewButton_1.setBounds(294, 407, 89, 23);
		frame.getContentPane().add(btnNewButton_1);
	}
}
