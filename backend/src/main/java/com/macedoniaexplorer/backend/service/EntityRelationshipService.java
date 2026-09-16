package com.macedoniaexplorer.backend.service;

import com.macedoniaexplorer.backend.model.EntityRelationship;
import com.macedoniaexplorer.backend.repository.EntityRelationshipRepository;
import org.springframework.stereotype.Service;
import com.macedoniaexplorer.backend.model.GraphEntity;
import com.macedoniaexplorer.backend.model.RelationshipType;
import com.macedoniaexplorer.backend.dto.EntityDetailsResponse;
import com.macedoniaexplorer.backend.model.EntityType;

import java.util.List;

@Service
public class EntityRelationshipService {

    private final EntityRelationshipRepository entityRelationshipRepository;

    public EntityRelationshipService(EntityRelationshipRepository entityRelationshipRepository) {
        this.entityRelationshipRepository = entityRelationshipRepository;
    }

    public List<EntityRelationship> getAllRelationships() {
        return entityRelationshipRepository.findAll();
    }

    public List<EntityRelationship> getRelationshipsForEntity(Long entityId) {

        List<EntityRelationship> relationships =
                entityRelationshipRepository.findBySourceEntityId(entityId);

        relationships.addAll(
                entityRelationshipRepository.findByTargetEntityId(entityId)
        );

        return relationships;
    }

    public List<GraphEntity> getEntitiesInRegion(Long regionId) {

        List<EntityRelationship> relationships =
                entityRelationshipRepository.findByTargetEntityIdAndType(
                        regionId,
                        RelationshipType.LOCATED_IN
                );

        return relationships.stream()
                .map(EntityRelationship::getSourceEntity)
                .toList();
    }

    public EntityDetailsResponse getEntityDetails(GraphEntity entity) {

        List<EntityRelationship> relationships =
                entityRelationshipRepository.findBySourceEntityId(entity.getId());

        EntityDetailsResponse response = new EntityDetailsResponse();

        response.setEntity(entity);

        response.setRegion(
                relationships.stream()
                        .filter(r -> r.getType() == RelationshipType.LOCATED_IN)
                        .map(EntityRelationship::getTargetEntity)
                        .findFirst()
                        .orElse(null)
        );

        response.setAttractions(
                relationships.stream()
                        .filter(r -> r.getType() == RelationshipType.HAS_ATTRACTION)
                        .map(EntityRelationship::getTargetEntity)
                        .filter(e -> e.getType() == EntityType.ATTRACTION)
                        .toList()
        );

        response.setActivities(
                relationships.stream()
                        .filter(r -> r.getType() == RelationshipType.OFFERS_ACTIVITY)
                        .map(EntityRelationship::getTargetEntity)
                        .filter(e -> e.getType() == EntityType.ACTIVITY)
                        .toList()
        );

        return response;
    }
}