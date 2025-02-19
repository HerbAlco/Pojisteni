package com.example.pojisteni_itnetwork.data.repositories;

import com.example.pojisteni_itnetwork.data.entities.InsuranceEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InsuranceRepository extends JpaRepository<InsuranceEntity, Long>
{
}
