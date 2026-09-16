package com.macedoniaexplorer.backend.dto;

import com.macedoniaexplorer.backend.model.GraphEntity;

import java.util.List;

public class EntityDetailsResponse {

    private GraphEntity entity;
    private GraphEntity region;
    private List<GraphEntity> attractions;
    private List<GraphEntity> activities;

    public EntityDetailsResponse() {
    }

    public GraphEntity getEntity() {
        return entity;
    }

    public void setEntity(GraphEntity entity) {
        this.entity = entity;
    }

    public GraphEntity getRegion() {
        return region;
    }

    public void setRegion(GraphEntity region) {
        this.region = region;
    }

    public List<GraphEntity> getAttractions() {
        return attractions;
    }

    public void setAttractions(List<GraphEntity> attractions) {
        this.attractions = attractions;
    }

    public List<GraphEntity> getActivities() {
        return activities;
    }

    public void setActivities(List<GraphEntity> activities) {
        this.activities = activities;
    }
}