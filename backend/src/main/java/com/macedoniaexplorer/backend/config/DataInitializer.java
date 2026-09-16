package com.macedoniaexplorer.backend.config;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.macedoniaexplorer.backend.dto.EntitySeedData;
import com.macedoniaexplorer.backend.dto.RelationshipSeedData;
import com.macedoniaexplorer.backend.model.EntityRelationship;
import com.macedoniaexplorer.backend.model.GraphEntity;
import com.macedoniaexplorer.backend.repository.EntityRelationshipRepository;
import com.macedoniaexplorer.backend.repository.GraphEntityRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.InputStream;
import java.util.List;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initDatabase(
            GraphEntityRepository entityRepository,
            EntityRelationshipRepository relationshipRepository) {

        return args -> {

            ObjectMapper objectMapper = new ObjectMapper();

            // Load entities from JSON
            InputStream entitiesStream =
                    getClass().getResourceAsStream("/seed/entities.json");

            List<EntitySeedData> entityData =
                    objectMapper.readValue(
                            entitiesStream,
                            new TypeReference<List<EntitySeedData>>() {}
                    );

            for (EntitySeedData data : entityData) {

                getOrCreateEntity(
                        entityRepository,
                        data
                );
            }

            // Load relationships from JSON
            InputStream relationshipsStream =
                    getClass().getResourceAsStream("/seed/relationships.json");

            List<RelationshipSeedData> relationshipData =
                    objectMapper.readValue(
                            relationshipsStream,
                            new TypeReference<List<RelationshipSeedData>>() {}
                    );

            for (RelationshipSeedData data : relationshipData) {

                GraphEntity source =
                        entityRepository.findByName(data.getSource())
                                .orElseThrow(() ->
                                        new RuntimeException(
                                                "Source entity not found: "
                                                        + data.getSource()
                                        )
                                );

                GraphEntity target =
                        entityRepository.findByName(data.getTarget())
                                .orElseThrow(() ->
                                        new RuntimeException(
                                                "Target entity not found: "
                                                        + data.getTarget()
                                        )
                                );

                boolean exists =
                        relationshipRepository
                                .existsBySourceEntityIdAndTargetEntityIdAndType(
                                        source.getId(),
                                        target.getId(),
                                        data.getType()
                                );

                if (!exists) {

                    EntityRelationship relationship =
                            new EntityRelationship();

                    relationship.setSourceEntity(source);
                    relationship.setTargetEntity(target);
                    relationship.setType(data.getType());

                    relationshipRepository.save(relationship);
                }
            }
        };
    }

    private GraphEntity getOrCreateEntity(
            GraphEntityRepository repository,
            EntitySeedData data) {

        GraphEntity entity = repository.findByName(data.getName())
                .orElseGet(GraphEntity::new);

        entity.setName(data.getName());
        entity.setType(data.getType());
        entity.setDescription(data.getDescription());
        entity.setLatitude(data.getLatitude());
        entity.setLongitude(data.getLongitude());
        entity.setImageUrl(data.getImageUrl());

        return repository.save(entity);
    }

}

