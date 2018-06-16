package org.qs.air.rest.client;

import java.io.Serializable;

import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

import com.fasterxml.jackson.annotation.JsonProperty;

@XmlRootElement(name = "TokenModel")
@XmlType(name = "TokenModel")
public class TokenModel implements Serializable {
	private static final long serialVersionUID = 1L;

	private String access_token;
	private String refresh_token;
	private String token_type;
	private String session_state;
	private int expires_in;
	private int refresh_expires_in;

	@JsonProperty("not-before-policy")
	private int not_before_policy;

	public TokenModel() {
		// TODO Auto-generated constructor stub
	}

	public String getAccess_token() {
		return access_token;
	}

	public void setAccess_token(String access_token) {
		this.access_token = access_token;
	}

	public String getRefresh_token() {
		return refresh_token;
	}

	public void setRefresh_token(String refresh_token) {
		this.refresh_token = refresh_token;
	}

	public String getToken_type() {
		return token_type;
	}

	public void setToken_type(String token_type) {
		this.token_type = token_type;
	}

	public String getSession_state() {
		return session_state;
	}

	public void setSession_state(String session_state) {
		this.session_state = session_state;
	}

	public int getExpires_in() {
		return expires_in;
	}

	public void setExpires_in(int expires_in) {
		this.expires_in = expires_in;
	}

	public int getRefresh_expires_in() {
		return refresh_expires_in;
	}

	public void setRefresh_expires_in(int refresh_expires_in) {
		this.refresh_expires_in = refresh_expires_in;
	}

	public int getNot_before_policy() {
		return not_before_policy;
	}

	public void setNot_before_policy(int not_before_policy) {
		this.not_before_policy = not_before_policy;
	}

	@Override
	public String toString() {
		return "TokenModel [access_token=" + access_token + ", refresh_token=" + refresh_token + ", token_type="
				+ token_type + ", session_state=" + session_state + ", expires_in=" + expires_in
				+ ", refresh_expires_in=" + refresh_expires_in + ", not_before_policy=" + not_before_policy + "]";
	}

}
