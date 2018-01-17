package lt.vtvpmc.ems.isveikata;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class Passwords {

	static public byte[] hashString(String password) throws NoSuchAlgorithmException {
		MessageDigest sha256 = MessageDigest.getInstance("SHA-256");
		byte[] passBytes = password.getBytes();
		byte[] passHash = sha256.digest(passBytes);
		return passHash;
	}
	
	static public boolean isValid(byte[] testPassword, byte[] dbPassword) {
		return testPassword.equals(dbPassword);
	}
}