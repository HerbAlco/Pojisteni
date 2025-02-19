package com.example.pojisteni_itnetwork.init;

import com.example.pojisteni_itnetwork.data.entities.UserEntity;
import com.example.pojisteni_itnetwork.data.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDate;

@Configuration
public class DataInitializer {

	@Autowired
	private UserRepository userRepository;
	@Autowired
	private PasswordEncoder passwordEncoder;

	public DataInitializer(UserRepository userRepository, PasswordEncoder passwordEncoder) {
		this.userRepository = userRepository;
		this.passwordEncoder = passwordEncoder;
	}

	@Bean
	public ApplicationRunner initializer() {
		return args -> {
			if (userRepository.findByEmail("admin").isEmpty()) {
				UserEntity admin = new UserEntity();
				admin.setEmail("admin");
				admin.setFirstname("admin");
				admin.setLastname("admin");
				admin.setBirthDate(LocalDate.of(1990, 2,28));
				admin.setCity("Adminov");
				admin.setStreet("Adminovin 489");
				admin.setPostCode("123 54");
				admin.setPhoneNumber("654987321");
				admin.setPassword(passwordEncoder.encode("admin"));
				admin.setAdmin(true);
				userRepository.save(admin);
			}
		};
	}

}
