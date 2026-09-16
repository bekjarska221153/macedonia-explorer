package com.macedoniaexplorer.backend.controller;

import com.macedoniaexplorer.backend.dto.EntityDetailsResponse;
import com.macedoniaexplorer.backend.model.EntityType;
import com.macedoniaexplorer.backend.model.GraphEntity;
import com.macedoniaexplorer.backend.service.EntityRelationshipService;
import com.macedoniaexplorer.backend.service.GraphEntityService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/entities")
public class GraphEntityController {

    private final GraphEntityService graphEntityService;
    private final EntityRelationshipService entityRelationshipService;

    public GraphEntityController(
            GraphEntityService graphEntityService,
            EntityRelationshipService entityRelationshipService) {

        this.graphEntityService = graphEntityService;
        this.entityRelationshipService = entityRelationshipService;
    }

    @GetMapping
    public List<GraphEntity> getAllEntities(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) EntityType type) {

        return graphEntityService.getAllEntities(search, type);
    }

    @GetMapping("/{id}")
    public GraphEntity getEntityById(@PathVariable Long id) {
        return graphEntityService.getEntityById(id);
    }

    @GetMapping("/{id}/details")
    public EntityDetailsResponse getEntityDetails(@PathVariable Long id) {

        GraphEntity entity = graphEntityService.getEntityById(id);

        return entityRelationshipService.getEntityDetails(entity);
    }
}