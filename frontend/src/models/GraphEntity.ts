export type EntityType =
  | 'DESTINATION'
  | 'ATTRACTION'
  | 'ACTIVITY'
  | 'REGION'
  | 'CATEGORY';

export interface GraphEntity {
  id: number;
  name: string;
  type: EntityType;
  description: string;
  latitude: number | null;
  longitude: number | null;
  imageUrl: string | null;
}
