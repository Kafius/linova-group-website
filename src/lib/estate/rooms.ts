// Room guidance library for the builder's Step 3 (the house tour).
//
// For each room category we provide: a one-line "how to shoot it" guidance
// string, and a checklist of recommended angles (each with a capture tip).
// The builder shows these as prompts and tracks a completeness meter.
//
// `defaultRooms(beds, baths)` produces a sensible starting room list from the
// listing's numbers, so the flow never depends on a floor plan being uploaded.

import type { RoomCategory } from './types';

export interface ShotGuide {
  angle: string; // the shot to take
  tip: string; // how to take it well
}

export interface RoomGuide {
  label: string; // default display name for a room of this category
  guidance: string; // overall direction for the room
  shots: ShotGuide[]; // recommended angles, in order
}

export const ROOM_GUIDES: Record<RoomCategory, RoomGuide> = {
  exterior: {
    label: 'Exterior',
    guidance:
      'Shoot in soft light — early morning or the golden hour before sunset. Straighten verticals and keep the whole facade in frame.',
    shots: [
      { angle: 'Straight-on facade', tip: 'Square to the house, camera at chest height, whole structure in frame.' },
      { angle: 'Three-quarter angle', tip: 'Step to one side so the house reads with depth, not flat.' },
      { angle: 'Approach / entrance', tip: 'The walk up to the front door — this is the buyer’s first impression.' },
      { angle: 'Twilight (optional)', tip: 'Lights on inside, sky still blue — the most cinematic exterior shot.' },
    ],
  },
  foyer: {
    label: 'Foyer',
    guidance: 'Capture the sense of arrival and the sightline into the home.',
    shots: [
      { angle: 'From the front door', tip: 'Show the entry and the view deeper into the home.' },
      { angle: 'Stair or feature detail', tip: 'A staircase, light fixture, or millwork that sets the tone.' },
    ],
  },
  living: {
    label: 'The Great Room',
    guidance: 'The hero interior. Get the widest clean angle, shoot into the light, and turn every lamp on.',
    shots: [
      { angle: 'Widest corner', tip: 'Back into a corner at chest height to capture the whole room.' },
      { angle: 'Toward the windows', tip: 'Show the light and any view — expose for the outside, then lift shadows.' },
      { angle: 'Fireplace / focal wall', tip: 'The room’s anchor — art, hearth, or media wall, shot straight on.' },
      { angle: 'Detail', tip: 'A material or styled vignette — texture that sells the finish level.' },
    ],
  },
  kitchen: {
    label: 'The Kitchen',
    guidance: 'Clear the counters completely. Turn on under-cabinet lighting. Shoot the island and the run of cabinetry.',
    shots: [
      { angle: 'From the entrance corner', tip: 'Chest height, capturing the island, backsplash, and cabinetry in one frame.' },
      { angle: 'Along the island', tip: 'Low and down the length of the island to show stone and seating.' },
      { angle: 'Range / backsplash', tip: 'The cooking wall straight on — the detail buyers scrutinize.' },
      { angle: 'Pantry / appliances (optional)', tip: 'Show storage and integrated appliances if they’re a selling point.' },
    ],
  },
  dining: {
    label: 'Dining Room',
    guidance: 'Style the table simply. Capture the room’s proportion and its connection to the kitchen or living space.',
    shots: [
      { angle: 'Full room', tip: 'Table centred, light fixture in frame, from the widest corner.' },
      { angle: 'Sightline to adjacent space', tip: 'Show how it flows to the kitchen or great room.' },
    ],
  },
  primary: {
    label: 'Primary Suite',
    guidance: 'Make the bed crisply. Shoot toward the light and capture the sense of retreat.',
    shots: [
      { angle: 'From the doorway', tip: 'Bed and window in frame — the classic hero bedroom shot.' },
      { angle: 'Toward the windows / view', tip: 'Show the light and any outlook.' },
      { angle: 'Walk-in closet', tip: 'If it’s a feature, shoot it — buyers love storage.' },
      { angle: 'Ensuite peek', tip: 'A glimpse through to the ensuite bath.' },
    ],
  },
  bedroom: {
    label: 'Bedroom',
    guidance: 'Bed made, blinds open, one wide clean angle.',
    shots: [
      { angle: 'From the doorway', tip: 'Bed and window, chest height, widest angle.' },
      { angle: 'Toward the window', tip: 'Show the light and any closet.' },
    ],
  },
  bathroom: {
    label: 'Bathroom',
    guidance: 'Everything off the counters. Shoot the vanity straight on and capture the shower or tub.',
    shots: [
      { angle: 'Vanity straight on', tip: 'Mirror and stone, camera just off-centre to avoid your reflection.' },
      { angle: 'Tub / shower', tip: 'The feature fixture — freestanding tub or glass shower.' },
    ],
  },
  office: {
    label: 'Office / Study',
    guidance: 'Tidy the desk. Capture built-ins and the light.',
    shots: [
      { angle: 'Full room', tip: 'Widest angle showing desk, shelving, and window.' },
    ],
  },
  basement: {
    label: 'Lower Level',
    guidance: 'Light it fully — basements photograph dark. Show the finished use (rec room, gym, theatre).',
    shots: [
      { angle: 'Main space', tip: 'Widest angle; add lamps if the ceiling lights aren’t enough.' },
      { angle: 'Feature area', tip: 'Bar, theatre, or gym — whatever makes it special.' },
    ],
  },
  outdoor: {
    label: 'Backyard & Grounds',
    guidance: 'Shoot in soft light. Capture the yard, any pool or patio, and how the outdoor space lives.',
    shots: [
      { angle: 'Yard / garden', tip: 'The full outdoor space from the house looking out.' },
      { angle: 'Patio / entertaining', tip: 'Where people gather — deck, patio, or outdoor kitchen.' },
      { angle: 'Pool / feature (optional)', tip: 'A pool, firepit, or landscape feature, shot low and wide.' },
    ],
  },
  view: {
    label: 'The View',
    guidance: 'If the outlook is a selling point, give it its own frame. Shoot from the best window or terrace.',
    shots: [
      { angle: 'The outlook', tip: 'Expose for the view; shoot from the primary vantage point.' },
    ],
  },
  detail: {
    label: 'Details',
    guidance: 'The finishing touches — materials, hardware, millwork, light. These prove the quality.',
    shots: [
      { angle: 'Material close-up', tip: 'Stone, wood, or metal — texture in raking light.' },
      { angle: 'Lifestyle vignette', tip: 'A styled corner that suggests how the home feels to live in.' },
    ],
  },
};

/** Guess a category from a free-text room name. */
export function categoryFromName(name: string): RoomCategory {
  const n = name.toLowerCase();
  if (/exterior|facade|front|curb/.test(n)) return 'exterior';
  if (/foyer|entry|hall/.test(n)) return 'foyer';
  if (/kitchen/.test(n)) return 'kitchen';
  if (/dining/.test(n)) return 'dining';
  if (/primary|master/.test(n)) return 'primary';
  if (/bed/.test(n)) return 'bedroom';
  if (/bath|ensuite|powder|spa/.test(n)) return 'bathroom';
  if (/office|study|den|library/.test(n)) return 'office';
  if (/basement|lower|rec|theatre|theater|gym/.test(n)) return 'basement';
  if (/yard|garden|patio|pool|deck|outdoor|grounds/.test(n)) return 'outdoor';
  if (/view|outlook|skyline|water/.test(n)) return 'view';
  if (/detail|material|vignette/.test(n)) return 'detail';
  if (/living|great|family|lounge/.test(n)) return 'living';
  return 'detail';
}

export interface DefaultRoom {
  name: string;
  category: RoomCategory;
}

/**
 * Build a starting room list from the listing's numbers. Reliable fallback for
 * when there's no floor plan — the agent can add, remove, or rename freely.
 */
export function defaultRooms(beds?: number | null, baths?: number | null): DefaultRoom[] {
  const rooms: DefaultRoom[] = [
    { name: 'Exterior', category: 'exterior' },
    { name: 'Foyer', category: 'foyer' },
    { name: 'The Great Room', category: 'living' },
    { name: 'The Kitchen', category: 'kitchen' },
    { name: 'Dining Room', category: 'dining' },
  ];

  const bedCount = Math.max(0, Math.min(beds ?? 3, 8));
  if (bedCount >= 1) rooms.push({ name: 'Primary Suite', category: 'primary' });
  for (let i = 2; i <= bedCount; i++) rooms.push({ name: `Bedroom ${i}`, category: 'bedroom' });

  const bathCount = Math.max(0, Math.min(baths ?? 2, 6));
  for (let i = 1; i <= Math.min(bathCount, 3); i++)
    rooms.push({ name: i === 1 ? 'Primary Bath' : `Bathroom ${i}`, category: 'bathroom' });

  rooms.push({ name: 'Backyard & Grounds', category: 'outdoor' });
  return rooms;
}
