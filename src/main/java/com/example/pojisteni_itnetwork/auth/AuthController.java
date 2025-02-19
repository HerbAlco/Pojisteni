package com.example.pojisteni_itnetwork.auth;

import com.example.pojisteni_itnetwork.models.exceptions.UserAlreadyExistsException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class AuthController {

	@Autowired
	private AuthService service;

	@PostMapping("/register")
	public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
		try {
			AuthResponse response = service.register(request);
			return ResponseEntity.ok(response);
		} catch (UserAlreadyExistsException e) {
			return new ResponseEntity<>(e.getMessage(), HttpStatus.CONFLICT);
		}
	}

	@PostMapping("/authenticate")
	public ResponseEntity<AuthResponse> authenticate(
		@RequestBody AuthRequest request
	){
		return ResponseEntity.ok(service.authenticate(request));
	}

	@GetMapping("/authResponse")
	public ResponseEntity<String> responseOk(){
		return ResponseEntity.ok("Token is authorized");
	}
}
