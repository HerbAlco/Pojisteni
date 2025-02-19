package com.example.pojisteni_itnetwork.models.dtos.mappers;

import com.example.pojisteni_itnetwork.data.entities.InsuranceEntity;
import com.example.pojisteni_itnetwork.models.dtos.InsuranceDTO;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface InsuranceMapper
{
	InsuranceEntity toEntity(InsuranceDTO source);

	InsuranceDTO toDTO(InsuranceEntity source);

	void updateEntity(InsuranceDTO source, @MappingTarget InsuranceEntity target);

}
