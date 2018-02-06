package lt.vtvpmc.ems.isveikata;

import java.security.MessageDigest;

public class Passwords {

	static public byte[] hashString(String password)  {
		try {
			MessageDigest sha256 = MessageDigest.getInstance("SHA-256");
			byte[] passBytes = password.getBytes();
			byte[] passHash = sha256.digest(passBytes);
			return passHash;

		} catch (Exception e) {
			// TODO: handle exception
		}
		return null;

	}

	static public boolean isValid(byte[] testPassword, byte[] dbPassword) {
		return MessageDigest.isEqual(testPassword, dbPassword);
	}

}