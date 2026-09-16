import { useEffect, useState, useCallback, useMemo } from 'react';
import {
    ReactFlow,
    Background,
    Controls,
    MarkerType,
    type Node,
    type Edge,
    type NodeMouseHandler,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { getEntities } from '../services/entityService';
import { getRelationships } from '../services/relationshipService';
import type { GraphEntity, EntityType } from '../models/GraphEntity';

interface GraphRelationship {
    id: number;
    type: string;
    sourceEntity: GraphEntity;
    targetEntity: GraphEntity;
}

const NODE_WIDTH = 200;
const COLUMN_WIDTH = 320;
const ROW_HEIGHT = 80;


const COLUMN_BY_TYPE: Record<EntityType, number> = {
    REGION: 0,
    DESTINATION: 1,
    ATTRACTION: 2,
    ACTIVITY: 2,
    CATEGORY: 3,
};


function layoutByColumns(nodes: Node[], edges: Edge[]) {
    const columns = new Map<number, string[]>();

    nodes.forEach((node) => {
        const type = (node.data as { type: EntityType }).type;
        const col = COLUMN_BY_TYPE[type] ?? 4;
        if (!columns.has(col)) columns.set(col, []);
        columns.get(col)!.push(node.id);
    });

    const adjacency = new Map<string, string[]>();
    edges.forEach((edge) => {
        if (!adjacency.has(edge.source)) adjacency.set(edge.source, []);
        if (!adjacency.has(edge.target)) adjacency.set(edge.target, []);
        adjacency.get(edge.source)!.push(edge.target);
        adjacency.get(edge.target)!.push(edge.source);
    });

    const sortedColumns = Array.from(columns.keys()).sort((a, b) => a - b);
    const orderInColumn = new Map<string, number>();

    sortedColumns.forEach((col) => {
        columns.get(col)!.forEach((id, idx) => orderInColumn.set(id, idx));
    });

    const PASSES = 4;
    for (let pass = 0; pass < PASSES; pass++) {
        const sequence =
            pass % 2 === 0 ? sortedColumns : [...sortedColumns].reverse();

        sequence.forEach((col) => {
            const ids = columns.get(col)!;
            const withBarycenter = ids.map((id) => {
                const neighbors = adjacency.get(id) ?? [];
                const neighborOrders = neighbors
                    .map((n) => orderInColumn.get(n))
                    .filter((v): v is number => v !== undefined);
                const barycenter =
                    neighborOrders.length > 0
                        ? neighborOrders.reduce((a, b) => a + b, 0) /
                          neighborOrders.length
                        : orderInColumn.get(id) ?? 0;
                return { id, barycenter };
            });

            withBarycenter.sort((a, b) => a.barycenter - b.barycenter);
            withBarycenter.forEach((item, idx) => orderInColumn.set(item.id, idx));
            columns.set(col, withBarycenter.map((item) => item.id));
        });
    }

    const positions = new Map<string, { x: number; y: number }>();
    sortedColumns.forEach((col) => {
        columns.get(col)!.forEach((id, idx) => {
            positions.set(id, { x: col * COLUMN_WIDTH, y: idx * ROW_HEIGHT });
        });
    });

    const layoutedNodes = nodes.map((node) => ({
        ...node,
        position: positions.get(node.id) ?? { x: 0, y: 0 },
    }));

    return { nodes: layoutedNodes, edges };
}

function getDirectNeighbors(
    destinationId: string,
    relationships: GraphRelationship[]
): Set<string> {
    const visited = new Set<string>([destinationId]);

    relationships.forEach((rel) => {
        const a = String(rel.sourceEntity.id);
        const b = String(rel.targetEntity.id);

        if (a === destinationId) visited.add(b);
        if (b === destinationId) visited.add(a);
    });

    return visited;
}

function GraphPage() {
    const [allEntities, setAllEntities] = useState<GraphEntity[]>([]);
    const [allRelationships, setAllRelationships] = useState<GraphRelationship[]>([]);
    const [selectedDestinationId, setSelectedDestinationId] = useState<string>('ALL');

    const [nodes, setNodes] = useState<Node[]>([]);
    const [edges, setEdges] = useState<Edge[]>([]);
    const [selectedEntity, setSelectedEntity] = useState<GraphEntity | null>(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        Promise.all([getEntities(), getRelationships()])
            .then(([entities, relationships]) => {
                setAllEntities(entities);
                setAllRelationships(relationships);
            })
            .catch(() => {
                setError('Failed to load graph data.');
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const destinations = useMemo(
        () => allEntities.filter((e) => e.type === 'DESTINATION'),
        [allEntities]
    );

    useEffect(() => {
        if (allEntities.length === 0) return;

        let visibleEntities = allEntities;
        let visibleRelationships = allRelationships;

        if (selectedDestinationId !== 'ALL') {
            const visibleIds = getDirectNeighbors(selectedDestinationId, allRelationships);
            visibleEntities = allEntities.filter((e) => visibleIds.has(String(e.id)));
            visibleRelationships = allRelationships.filter(
                (r) =>
                    visibleIds.has(String(r.sourceEntity.id)) &&
                    visibleIds.has(String(r.targetEntity.id))
            );
        }

        const rawNodes: Node[] = visibleEntities.map((entity) => {
            let backgroundColor = '#ffffff';

            if (entity.type === 'DESTINATION') {
                backgroundColor = '#d62828';
            } else if (entity.type === 'ATTRACTION') {
                backgroundColor = '#f4a261';
            } else if (entity.type === 'ACTIVITY') {
                backgroundColor = '#2a9d8f';
            } else if (entity.type === 'REGION') {
                backgroundColor = '#457b9d';
            } else if (entity.type === 'CATEGORY') {
                backgroundColor = '#6c757d';
            }

            return {
                id: String(entity.id),
                position: { x: 0, y: 0 },
                data: {
                    label: `${entity.name} (${entity.type})`,
                    type: entity.type,
                },
                style: {
                    background: backgroundColor,
                    color: '#ffffff',
                    border: '1px solid #333',
                    borderRadius: '8px',
                    padding: '10px',
                    fontWeight: 'bold',
                    width: NODE_WIDTH,
                },
            };
        });

        const rawEdges: Edge[] = visibleRelationships.map((relationship) => ({
            id: String(relationship.id),
            source: String(relationship.sourceEntity.id),
            target: String(relationship.targetEntity.id),
            label: relationship.type,
            type: 'smoothstep',
            markerEnd: { type: MarkerType.ArrowClosed },
            style: { stroke: '#999' },
            labelStyle: { fontSize: 10, fill: '#555' },
            labelBgStyle: { fill: '#fff', fillOpacity: 0.8 },
        }));

        const { nodes: layoutedNodes, edges: layoutedEdges } = layoutByColumns(
            rawNodes,
            rawEdges
        );

        setNodes(layoutedNodes);
        setEdges(layoutedEdges);
        setSelectedEntity(null);
    }, [allEntities, allRelationships, selectedDestinationId]);

    const handleNodeClick: NodeMouseHandler = useCallback(
        (_event, node) => {
            const entity = allEntities.find((e) => String(e.id) === node.id);
            if (entity) {
                setSelectedEntity(entity);
            }
        },
        [allEntities]
    );

    if (loading) {
        return <p>Loading graph...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <main style={{ width: '100%', height: 'calc(100vh - 73px)', position: 'relative' }}>
            <div
                style={{
                    position: 'absolute',
                    top: '20px',
                    left: '20px',
                    zIndex: 10,
                    background: 'white',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
                }}
            >
                <label
                    htmlFor="destination-filter"
                    style={{ marginRight: '8px', fontWeight: 'bold', fontSize: '13px' }}
                >
                    Destinations
                </label>
                <select
                    id="destination-filter"
                    value={selectedDestinationId}
                    onChange={(e) => setSelectedDestinationId(e.target.value)}
                    style={{ padding: '4px 8px', borderRadius: '6px' }}
                >
                    <option value="ALL">All destinations</option>
                    {destinations.map((destination) => (
                        <option key={destination.id} value={String(destination.id)}>
                            {destination.name}
                        </option>
                    ))}
                </select>
            </div>

            <ReactFlow
                nodes={nodes}
                edges={edges}
                fitView
                fitViewOptions={{ padding: 0.25, maxZoom: 1.2 }}
                onNodeClick={handleNodeClick}
                minZoom={0.05}
            >
                <Background />
                <Controls />
            </ReactFlow>

            {selectedEntity && (
                <div
                    style={{
                        position: 'absolute',
                        top: '90px',
                        right: '20px',
                        width: '300px',
                        background: 'white',
                        padding: '20px',
                        borderRadius: '10px',
                        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.15)',
                        zIndex: 10,
                    }}
                >
                    <button
                        onClick={() => setSelectedEntity(null)}
                        style={{
                            float: 'right',
                            border: 'none',
                            background: 'transparent',
                            fontSize: '20px',
                            cursor: 'pointer',
                        }}
                    >
                        ×
                    </button>

                    <span
                        style={{ fontSize: '12px', fontWeight: 'bold', color: '#d62828' }}
                    >
                        {selectedEntity.type}
                    </span>

                    <h2>{selectedEntity.name}</h2>

                    <p>{selectedEntity.description}</p>
                </div>
            )}
        </main>
    );
}

export default GraphPage;
