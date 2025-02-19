package com.example.pojisteni_itnetwork.auth;

import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;

@NoArgsConstructor
public class AuthResponse {

	private String token;
	private Collection<? extends GrantedAuthority> admin;
	private long userId;

	public AuthResponse(String token, Collection<? extends GrantedAuthority> admin, long userId)
	{
		this.token = token;
		this.admin = admin;
		this.userId = userId;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public Collection<? extends GrantedAuthority> getAdmin()
	{
		return admin;
	}

	public void setAdmin(Collection<? extends GrantedAuthority> admin)
	{
		this.admin = admin;
	}

	public long getUserId()
	{
		return userId;
	}

	public void setUserId(long userId)
	{
		this.userId = userId;
	}
}



