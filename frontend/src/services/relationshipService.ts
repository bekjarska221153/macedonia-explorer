import type { GraphEntity } from '../models/GraphEntity';

export interface EntityRelationship {
  id: number;
  sourceEntity: GraphEntity;
  targetEntity: GraphEntity;
  type: string;
}

const API_URL = 'http://localhost:8080/api/relationships';

export async function getRelationships(): Promise<EntityRelationship[]> {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error('Failed to fetch relationships');
  }

  return response.json();
}
