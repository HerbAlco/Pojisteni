package com.example.pojisteni_itnetwork.data.repositories;

import com.example.pojisteni_itnetwork.data.entities.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<UserEntity, Long>
{
	Optional<UserEntity> findByEmail(String email);
}
