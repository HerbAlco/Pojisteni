package com.example.pojisteni_itnetwork.auth;

import com.example.pojisteni_itnetwork.config.JwtService;
import com.example.pojisteni_itnetwork.data.repositories.UserRepository;
import com.example.pojisteni_itnetwork.models.exceptions.UserAlreadyExistsException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.example.pojisteni_itnetwork.data.entities.UserEntity;

@Service
@RequiredArgsConstructor
public class AuthService {

	@Autowired
	private UserRepository userRepository;
	@Autowired
	private JwtService jwtService;
	@Autowired
	private AuthenticationManager authManager;
	@Autowired
	private PasswordEncoder passwordEncoder;

	public AuthResponse register(RegisterRequest request) {
		var existUser = userRepository.findByEmail(request.getEmail());
		if (existUser.isPresent()) {
			throw new UserAlreadyExistsException("Uživatel s touto emailovou adresou již existuje, prosím zadejte jiný email.");
		}

		var user = new UserEntity(request.getEmail(), passwordEncoder.encode(request.getPassword()), false);

		userRepository.save(user);
		var jwtToken = jwtService.generateToken(user);

		return new AuthResponse(jwtToken, user.getAuthorities(), user.getId());
	}

	public AuthResponse authenticate(AuthRequest request){
		authManager.authenticate(
			new UsernamePasswordAuthenticationToken(
				request.getUsername(),
				request.getPassword()
			)
		);
		var user = userRepository.findByEmail(request.getUsername()).orElseThrow();
		var jwtToken = jwtService.generateToken(user);
		return new AuthResponse(jwtToken, user.getAuthorities(), user.getId());
	}
}
