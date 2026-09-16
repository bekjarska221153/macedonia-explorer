package com.macedoniaexplorer.backend.service;

import com.macedoniaexplorer.backend.model.EntityType;
import com.macedoniaexplorer.backend.model.GraphEntity;
import com.macedoniaexplorer.backend.repository.GraphEntityRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GraphEntityService {

    private final GraphEntityRepository graphEntityRepository;

    public GraphEntityService(GraphEntityRepository graphEntityRepository) {
        this.graphEntityRepository = graphEntityRepository;
    }

    public List<GraphEntity> getAllEntities(String search, EntityType type) {
        if ((search == null || search.isBlank()) && type == null) {
            return graphEntityRepository.findAll();
        }

        if (search != null && !search.isBlank() && type != null) {
            return graphEntityRepository
                    .findByNameContainingIgnoreCaseAndType(search, type);
        }

        if (search != null && !search.isBlank()) {
            return graphEntityRepository.findByNameContainingIgnoreCase(search);
        }

        return graphEntityRepository.findByType(type);
    }

    public GraphEntity getEntityById(Long id) {
        return graphEntityRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Entity not found: " + id));
    }
}