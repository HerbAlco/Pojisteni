package com.example.pojisteni_itnetwork.services;

import com.example.pojisteni_itnetwork.models.dtos.UserDTO;

import java.util.List;
import java.util.Optional;

public interface UserService
{
	List<UserDTO> getAllUsers();

	Optional<UserDTO> getUserById(Long id);

	UserDTO createUser(UserDTO userDTO);

	UserDTO updateUser(Long id, UserDTO userDTO);

	boolean deleteUser(Long id);
}
