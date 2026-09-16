package com.macedoniaexplorer.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "entity_relationships")
public class EntityRelationship {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "source_entity_id", nullable = false)
    private GraphEntity sourceEntity;

    @ManyToOne
    @JoinColumn(name = "target_entity_id", nullable = false)
    private GraphEntity targetEntity;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private RelationshipType type;

    public EntityRelationship() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public GraphEntity getSourceEntity() {
        return sourceEntity;
    }

    public void setSourceEntity(GraphEntity sourceEntity) {
        this.sourceEntity = sourceEntity;
    }

    public GraphEntity getTargetEntity() {
        return targetEntity;
    }

    public void setTargetEntity(GraphEntity targetEntity) {
        this.targetEntity = targetEntity;
    }

    public RelationshipType getType() {
        return type;
    }

    public void setType(RelationshipType type) {
        this.type = type;
    }
}
