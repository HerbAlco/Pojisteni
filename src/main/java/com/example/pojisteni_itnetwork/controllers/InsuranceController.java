package com.example.pojisteni_itnetwork.controllers;

import com.example.pojisteni_itnetwork.models.dtos.InsuranceDTO;
import com.example.pojisteni_itnetwork.services.InsuranceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/insurances")
@CrossOrigin(origins = "http://localhost:5173")
public class InsuranceController {

	@Autowired
	private InsuranceService insuranceService;

	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@GetMapping
	public List<InsuranceDTO> getAllInsurances() {
		return insuranceService.getAllInsurances();
	}

	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@GetMapping("/{id}")
	public ResponseEntity<InsuranceDTO> getInsuranceById(@PathVariable Long id) {
		Optional<InsuranceDTO> insuranceDTO = insuranceService.getInsuranceById(id);
		return insuranceDTO.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
	}

	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@PostMapping
	public ResponseEntity<InsuranceDTO> createInsurance(@RequestBody InsuranceDTO insuranceDTO) {
		InsuranceDTO createdInsurance = insuranceService.createInsurance(insuranceDTO);
		return new ResponseEntity<>(createdInsurance, HttpStatus.CREATED);
	}

	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@PutMapping("/{id}")
	public ResponseEntity<InsuranceDTO> updateInsurance(@PathVariable Long id, @RequestBody InsuranceDTO insuranceDTO) {
		InsuranceDTO updatedInsurance = insuranceService.updateInsurance(id, insuranceDTO);
		return updatedInsurance != null ? ResponseEntity.ok(updatedInsurance) : ResponseEntity.notFound().build();
	}

	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteInsurance(@PathVariable Long id) {
		boolean isDeleted = insuranceService.deleteInsurance(id);
		return isDeleted ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
	}
}