export interface GalleryImage {
  src: string;
  alt: string;
}

export interface EventGalleryData {
  id: string;
  eventName: string;
  category?: string;
  date?: string;
  location?: string;
  description?: string;
  images: GalleryImage[];
}

/**
 * Generates a clean solid-colored SVG placeholder data URI.
 * No external network requests or image URLs needed.
 */
export function createColorPlaceholder(
  bgColor: string,
  width = 1200,
  height = 800
): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <rect width="100%" height="100%" fill="${bgColor}"/>
</svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

// Demo data for previewing the component across multiple events with solid colored images
export const demoEventGalleries: EventGalleryData[] = [
  {
    id: 'demo-devfest-2026',
    eventName: 'DevFest RMKEC Flagship Edition',
    category: 'Flagship DevFest',
    date: 'January 2026',
    location: 'Open Air Amphitheatre & Central Auditorium',
    images: [
      {
        src: createColorPlaceholder('#4285F4', 1200, 800),
        alt: 'Google Blue Tile 1',
      },
      {
        src: createColorPlaceholder('#EA4335', 800, 600),
        alt: 'Google Red Tile 2',
      },
      {
        src: createColorPlaceholder('#FBBC05', 800, 600),
        alt: 'Google Yellow Tile 3',
      },
      {
        src: createColorPlaceholder('#34A853', 800, 600),
        alt: 'Google Green Tile 4',
      },
      {
        src: createColorPlaceholder('#1A73E8', 800, 600),
        alt: 'Indigo Blue Tile 5',
      },
      {
        src: createColorPlaceholder('#1A1A2E', 1200, 600),
        alt: 'Dark Navy Tile 6',
      },
    ],
  },
  {
    id: 'demo-solution-challenge',
    eventName: 'GenAI Hackathon & Solution Challenge',
    category: 'Hackathon Sprint',
    date: 'February 2026',
    location: 'Innovation & Research Hub, RMKEC',
    images: [
      {
        src: createColorPlaceholder('#34A853', 1200, 800),
        alt: 'Google Green Tile 1',
      },
      {
        src: createColorPlaceholder('#4285F4', 800, 600),
        alt: 'Google Blue Tile 2',
      },
      {
        src: createColorPlaceholder('#EA4335', 800, 600),
        alt: 'Google Red Tile 3',
      },
      {
        src: createColorPlaceholder('#FBBC05', 800, 600),
        alt: 'Google Yellow Tile 4',
      },
      {
        src: createColorPlaceholder('#0D1117', 800, 600),
        alt: 'Dark Slate Tile 5',
      },
    ],
  },
];
