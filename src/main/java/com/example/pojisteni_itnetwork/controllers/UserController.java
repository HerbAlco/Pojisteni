package com.example.pojisteni_itnetwork.controllers;

import com.example.pojisteni_itnetwork.models.dtos.UserDTO;
import com.example.pojisteni_itnetwork.models.exceptions.EmailAlreadyExistsException;
import com.example.pojisteni_itnetwork.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

	@Autowired
	private UserService userService;

	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@GetMapping
	public List<UserDTO> getAllUsers() {
		return userService.getAllUsers();
	}

	@GetMapping("/{id}")
	public ResponseEntity<UserDTO> getUserById(@PathVariable Long id) {
		Optional<UserDTO> userDTO = userService.getUserById(id);
		return userDTO.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
	}

	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@PostMapping
	public ResponseEntity<UserDTO> createUser(@RequestBody UserDTO userDTO) {
		UserDTO createdUser = userService.createUser(userDTO);
		return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
	}

	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@PutMapping("/{id}")
	public ResponseEntity<UserDTO> updateUser(@PathVariable Long id, @RequestBody UserDTO userDTO) {
		UserDTO updatedUser = userService.updateUser(id, userDTO);
		return updatedUser != null ? ResponseEntity.ok(updatedUser) : ResponseEntity.notFound().build();
	}

	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
		boolean isDeleted = userService.deleteUser(id);
		return isDeleted ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
	}

	@ExceptionHandler(EmailAlreadyExistsException.class)
	public ResponseEntity<String> handleEmailAlreadyExists(EmailAlreadyExistsException ex) {
		return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
	}
}
