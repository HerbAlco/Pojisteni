package com.example.pojisteni_itnetwork.services.serviceImpl;

import com.example.pojisteni_itnetwork.data.entities.UserEntity;
import com.example.pojisteni_itnetwork.data.repositories.UserRepository;
import com.example.pojisteni_itnetwork.models.dtos.UserDTO;
import com.example.pojisteni_itnetwork.models.dtos.mappers.UserMapper;
import com.example.pojisteni_itnetwork.models.exceptions.EmailAlreadyExistsException;
import com.example.pojisteni_itnetwork.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService
{

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private UserMapper userMapper;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Override
	public List<UserDTO> getAllUsers() {
		List<UserEntity> users = userRepository.findAll();
		return users.stream()
			.map(userMapper::toDTO)
			.toList();
	}

	@Override
	public Optional<UserDTO> getUserById(Long id) {
		Optional<UserEntity> userEntity = userRepository.findById(id);
		return userEntity.map(userMapper::toDTO);
	}

	@Override
	public UserDTO createUser(UserDTO userDTO) {
		userRepository.findByEmail(userDTO.getEmail()).ifPresent(existingUser -> {
			throw new EmailAlreadyExistsException();
		});

		UserEntity userEntity = userMapper.toEntity(userDTO);
		//default password set on reversed year of birthdate
		String yearOfBirthDate = String.valueOf(userEntity.getBirthDate().getYear());
		userEntity.setPassword(passwordEncoder.encode(new StringBuilder(yearOfBirthDate).reverse().toString()));
		userEntity = userRepository.save(userEntity);
		return userMapper.toDTO(userEntity);
	}

	@Override
	public UserDTO updateUser(Long id, UserDTO userDTO) {
		if (!userRepository.existsById(id)) {
			return null;
		}

		UserEntity existingUser = userRepository.findById(id)
			.orElseThrow(() -> new RuntimeException("Uživatel s tímto ID neexistuje"));

		if (userDTO.getPassword() == null || userDTO.getPassword().isEmpty()) {
			userDTO.setPassword(existingUser.getPassword());
		}
		userDTO.setId(existingUser.getId());
		userMapper.updateEntity(userDTO, existingUser);
		existingUser = userRepository.save(existingUser);

		return userMapper.toDTO(existingUser);
	}


	@Override
	public boolean deleteUser(Long id) {
		if (userRepository.existsById(id)) {
			userRepository.deleteById(id);
			return true;
		}
		return false;
	}
}
