import type { GraphEntity } from './GraphEntity';

export interface EntityDetails {
  entity: GraphEntity;
  region: GraphEntity | null;
  attractions: GraphEntity[];
  activities: GraphEntity[];
}
