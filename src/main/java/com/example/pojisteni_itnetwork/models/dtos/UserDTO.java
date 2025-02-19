package com.example.pojisteni_itnetwork.models.dtos;

import jakarta.persistence.CascadeType;
import jakarta.persistence.FetchType;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {

	private Long id;

	@NotBlank(message = "Vyplňte jméno")
	private String firstname;

	@NotBlank(message = "Vyplňte příjmení")
	private String lastname;

	@NotBlank(message = "Vyplňte datům narození")
	private LocalDate birthDate;

	@Email(message = "Vyplňte validní email")
	@NotBlank(message = "Vyplňte uživatelský email")
	@NotNull(message = "Vyplňte uživatelský email")
	private String email;

	@NotBlank(message = "Vyplňte telefonní číslo")
	private String phoneNumber;

	@NotBlank(message = "Vyplňte město")
	private String city;

	@NotBlank(message = "Vyplňte ulici")
	private String street;

	@NotBlank(message = "Vyplňte PSČ")
	private String postCode;

	private boolean admin;

	@NotBlank(message = "Vyplňte uživatelské heslo")
	@NotNull(message = "Vyplňte uživatelské heslo")
	@Size(min = 6, message = "Heslo musí mít alespoň 6 znaků")
	private String password;

	@NotBlank(message = "Vyplňte potvrzení hesla")
	@NotNull(message = "Vyplňte potvrzení hesla")
	@Size(min = 6, message = "Heslo musí mít alespoň 6 znaků")
	private String passwordConfirmation;

	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private List<InsuranceDTO> insurances;

	public boolean isPasswordConfirmed() {
		return password != null && password.equals(passwordConfirmation);
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

	public String getPassword()
	{
		return password;
	}

	public void setPassword(String password)
	{
		this.password = password;
	}

	public String getPasswordConfirmation()
	{
		return passwordConfirmation;
	}

	public void setPasswordConfirmation(String passwordConfirmation)
	{
		this.passwordConfirmation = passwordConfirmation;
	}

	public LocalDate getBirthDate()
	{
		return birthDate;
	}

	public void setBirthDate(LocalDate birthDate)
	{
		this.birthDate = birthDate;
	}

	public List<InsuranceDTO> getInsurances()
	{
		return insurances;
	}

	public void setInsurances(List<InsuranceDTO> insurances)
	{
		this.insurances = insurances;
	}

	@Override
	public String toString()
	{
		return "UserDTO{" + "id=" + id + ", firstname='" + firstname + '\'' + ", lastname='" + lastname + '\'' + ", birthDate=" + birthDate + ", email='" + email + '\'' + ", phoneNumber='" + phoneNumber + '\'' + ", city='" + city + '\'' + ", street='" + street + '\'' + ", postCode='" + postCode + '\'' + ", admin=" + admin + ", password='" + password + '\'' + ", passwordConfirmation='" + passwordConfirmation + '\'' + ", insurances=" + insurances + '}';
	}
}
