export type BoardSizeId = 16 | 24 | 36 ;

export type BoardSize = {
  id: BoardSizeId;
  label: string;
  totalCards: number;
  pairCount: number;
  columns: number;
  rows: number;
};

export const BOARD_SIZES: BoardSize[] = [
  {
    id: 16,
    label: '16 cards',
    totalCards: 16,
    pairCount: 8,
    columns: 4,
    rows: 4,
  },
  {
    id: 24,
    label: '24 cards',
    totalCards: 24,
    pairCount: 12,
    columns: 6,
    rows: 4,
  },
  {
    id: 36,
    label: '36 cards',
    totalCards: 36,
    pairCount: 18,
    columns: 6,
    rows: 6,
  },
];