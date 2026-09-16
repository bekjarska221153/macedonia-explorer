package com.macedoniaexplorer.backend.repository;

import com.macedoniaexplorer.backend.model.EntityType;
import com.macedoniaexplorer.backend.model.GraphEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface GraphEntityRepository extends JpaRepository<GraphEntity, Long> {

    Optional<GraphEntity> findByName(String name);

    List<GraphEntity> findByNameContainingIgnoreCase(String name);

    List<GraphEntity> findByType(EntityType type);

    List<GraphEntity> findByNameContainingIgnoreCaseAndType(
            String name,
            EntityType type
    );
}