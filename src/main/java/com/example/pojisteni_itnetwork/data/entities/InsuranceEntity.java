package com.example.pojisteni_itnetwork.data.entities;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
public class InsuranceEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false)
	private String name;

	@Column(nullable = false)
	private BigDecimal amount;

	@Column(nullable = false)
	private String insuranceItem;

	@Column(nullable = false)
	private LocalDate validFrom;

	@Column(nullable = false)
	private LocalDate validTo;

	@ManyToOne
	@JoinColumn(name = "user_id")
	private UserEntity user;

	public InsuranceEntity()
	{
	}

	public InsuranceEntity(Long id, String name, BigDecimal amount, String insuranceItem, LocalDate validFrom,
		LocalDate validTo, UserEntity user)
	{
		this.id = id;
		this.name = name;
		this.amount = amount;
		this.insuranceItem = insuranceItem;
		this.validFrom = validFrom;
		this.validTo = validTo;
		this.user = user;
	}

	public Long getId()
	{
		return id;
	}

	public void setId(Long id)
	{
		this.id = id;
	}

	public String getName()
	{
		return name;
	}

	public void setName(String name)
	{
		this.name = name;
	}

	public BigDecimal getAmount()
	{
		return amount;
	}

	public void setAmount(BigDecimal amount)
	{
		this.amount = amount;
	}

	public String getInsuranceItem()
	{
		return insuranceItem;
	}

	public void setInsuranceItem(String insuranceItem)
	{
		this.insuranceItem = insuranceItem;
	}

	public LocalDate getValidFrom()
	{
		return validFrom;
	}

	public void setValidFrom(LocalDate validFrom)
	{
		this.validFrom = validFrom;
	}

	public LocalDate getValidTo()
	{
		return validTo;
	}

	public void setValidTo(LocalDate validTo)
	{
		this.validTo = validTo;
	}

	public UserEntity getUser()
	{
		return user;
	}

	public void setUser(UserEntity user)
	{
		this.user = user;
	}

	@Override
	public String toString()
	{
		return "InsuranceEntity{" + "id=" + id + ", name='" + name + '\'' + ", amount=" + amount + ", insuranceItem='" + insuranceItem + '\'' + ", from=" + validFrom + ", to=" + validTo + ", user=" + user + '}';
	}
}
