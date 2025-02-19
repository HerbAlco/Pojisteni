package com.example.pojisteni_itnetwork.services.serviceImpl;

import com.example.pojisteni_itnetwork.data.entities.InsuranceEntity;
import com.example.pojisteni_itnetwork.data.repositories.InsuranceRepository;
import com.example.pojisteni_itnetwork.data.repositories.UserRepository;
import com.example.pojisteni_itnetwork.models.dtos.InsuranceDTO;
import com.example.pojisteni_itnetwork.models.dtos.mappers.InsuranceMapper;
import com.example.pojisteni_itnetwork.services.InsuranceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class InsuranceServiceImpl implements InsuranceService
{

	@Autowired
	private InsuranceRepository insuranceRepository;

	@Autowired
	private InsuranceMapper insuranceMapper;

	@Autowired
	private UserRepository userRepository;

	@Override
	public List<InsuranceDTO> getAllInsurances() {
		List<InsuranceEntity> insurances = insuranceRepository.findAll();
		return insurances.stream()
			.map(insuranceMapper::toDTO)
			.toList();
	}

	@Override
	public Optional<InsuranceDTO> getInsuranceById(Long id) {
		Optional<InsuranceEntity> insuranceEntity = insuranceRepository.findById(id);
		return insuranceEntity.map(insuranceMapper::toDTO);
	}

	@Override
	public InsuranceDTO createInsurance(InsuranceDTO insuranceDTO) {
		InsuranceEntity insuranceEntity = insuranceMapper.toEntity(insuranceDTO);
		insuranceEntity.setUser(userRepository.findById(insuranceDTO.getUserId()).orElseThrow());
		insuranceEntity = insuranceRepository.save(insuranceEntity);
		return insuranceMapper.toDTO(insuranceEntity);
	}

	@Override
	public InsuranceDTO updateInsurance(Long id, InsuranceDTO insuranceDTO) {
		if (!insuranceRepository.existsById(id)) {
			return null;
		}
		InsuranceEntity existingInsurance = insuranceRepository.findById(id).orElseThrow();
		insuranceMapper.updateEntity(insuranceDTO, existingInsurance);
		existingInsurance = insuranceRepository.save(existingInsurance);
		return insuranceMapper.toDTO(existingInsurance);
	}


	@Override
	public boolean deleteInsurance(Long id) {
		if (insuranceRepository.existsById(id)) {
			insuranceRepository.deleteById(id);
			return true;
		}
		return false;
	}
}
