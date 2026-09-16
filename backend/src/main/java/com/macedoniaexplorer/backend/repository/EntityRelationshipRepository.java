package com.macedoniaexplorer.backend.repository;

import com.macedoniaexplorer.backend.model.EntityRelationship;
import com.macedoniaexplorer.backend.model.RelationshipType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EntityRelationshipRepository extends JpaRepository<EntityRelationship, Long> {

    boolean existsBySourceEntityIdAndTargetEntityIdAndType(
            Long sourceEntityId,
            Long targetEntityId,
            RelationshipType type
    );

    List<EntityRelationship> findBySourceEntityId(Long sourceEntityId);

    List<EntityRelationship> findByTargetEntityId(Long targetEntityId);

    List<EntityRelationship> findByTargetEntityIdAndType(
            Long targetEntityId,
            RelationshipType type
    );
}