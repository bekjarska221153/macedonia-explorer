package com.macedoniaexplorer.backend.controller;

import com.macedoniaexplorer.backend.model.EntityRelationship;
import com.macedoniaexplorer.backend.model.GraphEntity;
import com.macedoniaexplorer.backend.service.EntityRelationshipService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/relationships")
public class EntityRelationshipController {

    private final EntityRelationshipService entityRelationshipService;

    public EntityRelationshipController(EntityRelationshipService entityRelationshipService) {
        this.entityRelationshipService = entityRelationshipService;
    }

    @GetMapping
    public List<EntityRelationship> getAllRelationships() {
        return entityRelationshipService.getAllRelationships();
    }

    @GetMapping("/entity/{entityId}")
    public List<EntityRelationship> getRelationshipsForEntity(
            @PathVariable Long entityId) {

        return entityRelationshipService.getRelationshipsForEntity(entityId);
    }

    @GetMapping("/region/{regionId}")
    public List<GraphEntity> getEntitiesInRegion(
            @PathVariable Long regionId) {

        return entityRelationshipService.getEntitiesInRegion(regionId);
    }
}