
export type Category = 
  | 'Logo Design'
  | 'Poster Design'
  | 'Business Card'
  | 'UI UX Design'
  | 'Thumbnail Design'
  | 'Video Editing';

export interface Project {
  id: string;
  name: string;
  category: Category;
  imageUrl: string;
  timestamp: number;
}

export const CATEGORIES: Category[] = [
  'Logo Design',
  'Poster Design',
  'Business Card',
  'UI UX Design',
  'Thumbnail Design',
  'Video Editing'
];
