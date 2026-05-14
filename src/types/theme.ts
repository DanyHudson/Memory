export type ThemeId = 'da-projects' | 'foods';

export type CardFace = {
    id: string;
    image: string;
    alt: string;
};

export type ThemeAssets = {
    exit: {
        default: string;
        hover: string;
    };
    playerPawns: {
        blue: string;
        orange: string;
        neutral: string;
    };
    cardFaces: CardFace[];
};

export type Theme = {
    id: ThemeId;
    label: string;
    assets: ThemeAssets;
};