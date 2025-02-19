package com.example.pojisteni_itnetwork.services;

import com.example.pojisteni_itnetwork.models.dtos.InsuranceDTO;

import java.util.List;
import java.util.Optional;

public interface InsuranceService {

	List<InsuranceDTO> getAllInsurances();

	Optional<InsuranceDTO> getInsuranceById(Long id);

	InsuranceDTO createInsurance(InsuranceDTO insuranceDTO);

	InsuranceDTO updateInsurance(Long id, InsuranceDTO insuranceDTO);

	boolean deleteInsurance(Long id);
}