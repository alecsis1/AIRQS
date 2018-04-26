package org.qs.air.security;

import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;

import org.apache.commons.net.util.Base64;

public class AESUtil {

	public static String encrypt(String plainText, String encryptionKey) throws Exception {
		Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding", "SunJCE");
		SecretKeySpec key = new SecretKeySpec(encryptionKey.getBytes("UTF-8"), "AES");
		cipher.init(Cipher.ENCRYPT_MODE, key, new IvParameterSpec("025AIRQS050".getBytes("UTF-8")));
		return Base64.encodeBase64String(cipher.doFinal(plainText.getBytes("UTF-8")));
	}

	public static String decrypt(String cipherText, String encryptionKey) throws Exception {
		Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding", "SunJCE");
		SecretKeySpec key = new SecretKeySpec(encryptionKey.getBytes("UTF-8"), "AES");
		cipher.init(Cipher.DECRYPT_MODE, key, new IvParameterSpec("025AIRQS050".getBytes("UTF-8")));
		return new String(cipher.doFinal(Base64.decodeBase64(cipherText)));
	}
}
