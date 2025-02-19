package com.example.pojisteni_itnetwork.data.entities;

import jakarta.persistence.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDate;
import java.util.Collection;
import java.util.List;


@Entity
public class UserEntity implements UserDetails
{

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String firstname;

	private String lastname;

	private LocalDate birthDate;

	@Column(nullable = false, unique = true)
	private String email;

	private String phoneNumber;

	private String city;

	private String street;

	private String postCode;

	private boolean admin;

	@Column(nullable = false)
	private String password;

	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private List<InsuranceEntity> insurances;

	public UserEntity(String email, String password, boolean admin) {
		this.email = email;
		this.password = password;
		this.admin = admin;
	}

	public UserEntity()
	{
	}

	public UserEntity(Long id, String firstname, String lastname, LocalDate birthDate, String email, String phoneNumber,
		String city, String street, String postCode, boolean admin, String password, List<InsuranceEntity> insurances)
	{
		this.id = id;
		this.firstname = firstname;
		this.lastname = lastname;
		this.birthDate = birthDate;
		this.email = email;
		this.phoneNumber = phoneNumber;
		this.city = city;
		this.street = street;
		this.postCode = postCode;
		this.admin = admin;
		this.password = password;
		this.insurances = insurances;
	}


	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities()
	{
		SimpleGrantedAuthority authority = new SimpleGrantedAuthority("ROLE_" + (admin ? "ADMIN" : "USER"));
		return List.of(authority);
	}

	@Override
	public String getUsername()
	{
		return email;
	}

	@Override
	public String getPassword()
	{
		return password;
	}

	public Long getId()
	{
		return id;
	}

	public void setId(Long id)
	{
		this.id = id;
	}

	public String getFirstname()
	{
		return firstname;
	}

	public void setFirstname(String firstname)
	{
		this.firstname = firstname;
	}

	public String getLastname()
	{
		return lastname;
	}

	public void setLastname(String lastname)
	{
		this.lastname = lastname;
	}

	public String getEmail()
	{
		return email;
	}

	public void setEmail(String email)
	{
		this.email = email;
	}

	public String getPhoneNumber()
	{
		return phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber)
	{
		this.phoneNumber = phoneNumber;
	}

	public String getCity()
	{
		return city;
	}

	public void setCity(String city)
	{
		this.city = city;
	}

	public String getStreet()
	{
		return street;
	}

	public void setStreet(String street)
	{
		this.street = street;
	}

	public String getPostCode()
	{
		return postCode;
	}

	public void setPostCode(String postCode)
	{
		this.postCode = postCode;
	}

	public boolean isAdmin()
	{
		return admin;
	}

	public void setAdmin(boolean admin)
	{
		this.admin = admin;
	}

	public void setPassword(String password)
	{
		this.password = password;
	}

	public LocalDate getBirthDate()
	{
		return birthDate;
	}

	public void setBirthDate(LocalDate birthDate)
	{
		this.birthDate = birthDate;
	}

	public List<InsuranceEntity> getInsurances()
	{
		return insurances;
	}

	public void setInsurances(List<InsuranceEntity> insurances)
	{
		this.insurances = insurances;
	}

	@Override
	public String toString()
	{
		return "UserEntity{" + "id=" + id + ", firstname='" + firstname + '\'' + ", lastname='" + lastname + '\'' + ", birthDate=" + birthDate + ", email='" + email + '\'' + ", phoneNumber='" + phoneNumber + '\'' + ", city='" + city + '\'' + ", street='" + street + '\'' + ", postCode='" + postCode + '\'' + ", admin=" + admin + ", password='" + password + '\'' + '}';
	}
}
