package com.example.pojisteni_itnetwork.models.dtos;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
public class InsuranceDTO {

	private Long id;

	@NotBlank(message = "Vyplňte název pojištění")
	private String name;

	@NotNull(message = "Vyplňte částku pojištění")
	@Positive(message = "Částka musí být kladná")
	private BigDecimal amount;

	@NotBlank(message = "Vyplňte pojištěnou věc")
	private String insuranceItem;

	@NotNull(message = "Vyplňte datum začátku pojištění")
	private LocalDate validFrom;

	@NotNull(message = "Vyplňte datum konce pojištění")
	private LocalDate validTo;

	@NotNull(message = "Doplňte ID uživatele")
	private Long userId;

	public Long getUserId()
	{
		return userId;
	}

	public void setUserId(Long userId)
	{
		this.userId = userId;
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

	@Override
	public String toString()
	{
		return "InsuranceDTO{" + "id=" + id + ", name='" + name + '\'' + ", amount=" + amount + ", insuranceItem='" + insuranceItem + '\'' + ", from=" + validFrom + ", to=" + validTo + ", userId=" + userId + '}';
	}
}
