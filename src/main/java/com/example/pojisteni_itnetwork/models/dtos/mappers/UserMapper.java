package com.example.pojisteni_itnetwork.models.dtos.mappers;

import com.example.pojisteni_itnetwork.data.entities.UserEntity;
import com.example.pojisteni_itnetwork.models.dtos.UserDTO;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface UserMapper
{
	UserDTO toDTO(UserEntity userEntity);

	UserEntity toEntity(UserDTO userDTO);

	void updateEntity(UserDTO source, @MappingTarget UserEntity target);
}
