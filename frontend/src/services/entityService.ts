import type { GraphEntity } from '../models/GraphEntity';

const API_URL = '/api/entities';

export async function getEntities(
  search?: string,
  type?: string
): Promise<GraphEntity[]> {
  const params = new URLSearchParams();

  if (search) {
    params.append('search', search);
  }

  if (type) {
    params.append('type', type);
  }

  const query = params.toString();

  const response = await fetch(
    query ? `${API_URL}?${query}` : API_URL
  );

  if (!response.ok) {
    throw new Error('Failed to fetch entities');
  }

  return response.json();
}

import type { EntityDetails } from '../models/EntityDetails';

export async function getEntityDetails(
  id: number
): Promise<EntityDetails> {
  const response = await fetch(`${API_URL}/${id}/details`);

  if (!response.ok) {
    throw new Error('Failed to fetch entity details');
  }

  return response.json();
}
