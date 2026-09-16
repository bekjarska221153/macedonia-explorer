package com.macedoniaexplorer.backend.dto;

import com.macedoniaexplorer.backend.model.RelationshipType;

public class RelationshipSeedData {

    private String source;
    private String target;
    private RelationshipType type;

    public RelationshipSeedData() {
    }

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }

    public String getTarget() {
        return target;
    }

    public void setTarget(String target) {
        this.target = target;
    }

    public RelationshipType getType() {
        return type;
    }

    public void setType(RelationshipType type) {
        this.type = type;
    }
}