import type { Theme } from '../types/theme';

export const THEMES: Theme[] = [
    {
        id: 'da-projects',
        label: 'DA projects theme',
        assets: {
            exit: {
                default: '/src/assets/images/themes/da-projects/exit-icon-blue.svg',
                hover: '/src/assets/images/shared/icons/exit-icon-white.svg',
            },
            playerPawns: {
                // blue: '/src/assets/images/shared/icons/pawn-icon-blue.svg',
                blue: '../assets/images/shared/icons/pawn-icon-blue.svg',
                orange: '/src/assets/images/shared/icons/pawn-icon-orange.svg',
                neutral: '/src/assets/images/shared/icons/pawn-icon-mint.svg',
            },
            cardFaces: [
                {
                    id: 'basket',
                    image: '/src/assets/images/themes/da-projects/basket.svg',
                    alt: 'Basket',
                },
                {
                    id: 'chat',
                    image: '/src/assets/images/themes/da-projects/chat.svg',
                    alt: 'Chat',
                },
                {
                    id: 'chef-hat',
                    image: '/src/assets/images/themes/da-projects/chef-hat.svg',
                    alt: 'Chef hat',
                },
                {
                    id: 'code-cuisine',
                    image: '/src/assets/images/themes/da-projects/code-cuisine.svg',
                    alt: 'Code Cuisine',
                },
                {
                    id: 'coins',
                    image: '/src/assets/images/themes/da-projects/coins.svg',
                    alt: 'Coins',
                },
                {
                    id: 'emoji',
                    image: '/src/assets/images/themes/da-projects/emoji.svg',
                    alt: 'Emoji',
                },
                {
                    id: 'join-logo',
                    image: '/src/assets/images/themes/da-projects/join-logo.svg',
                    alt: 'Join logo',
                },
                {
                    id: 'pokedex',
                    image: '/src/assets/images/themes/da-projects/pokedex.svg',
                    alt: 'Pokedex',
                },
                {
                    id: 'poll-app-1',
                    image: '/src/assets/images/themes/da-projects/poll-app-1.svg',
                    alt: 'Poll app 1',
                },
                {
                    id: 'poll-app-2',
                    image: '/src/assets/images/themes/da-projects/poll-app-2.svg',
                    alt: 'Poll app 2',
                },
                {
                    id: 'pollo-loco',
                    image: '/src/assets/images/themes/da-projects/pollo-loco.svg',
                    alt: 'Pollo Loco',
                },
                {
                    id: 'profile',
                    image: '/src/assets/images/themes/da-projects/profile.svg',
                    alt: 'Profile',
                },
                {
                    id: 'sakura-eggs',
                    image: '/src/assets/images/themes/da-projects/sakura-eggs.svg',
                    alt: 'Sakura eggs',
                },
                {
                    id: 'sakura-logo',
                    image: '/src/assets/images/themes/da-projects/sakura-logo.svg',
                    alt: 'Sakura logo',
                },
                {
                    id: 'sakura-noodles',
                    image: '/src/assets/images/themes/da-projects/sakura-noodles.svg',
                    alt: 'Sakura noodles',
                },
                {
                    id: 'sakura-soup',
                    image: '/src/assets/images/themes/da-projects/sakura-soup.svg',
                    alt: 'Sakura soup',
                },
                {
                    id: 'tic-tac-toe',
                    image: '/src/assets/images/themes/da-projects/tic-tac-toe.svg',
                    alt: 'Tic tac toe',
                },
                {
                    id: 'wave',
                    image: '/src/assets/images/themes/da-projects/wave.svg',
                    alt: 'Wave',
                },
            ],
        },
    },
    {
        id: 'foods',
        label: 'Foods theme',
        assets: {
            exit: {
                default: '/src/assets/images/themes/foods/exit-icon-foods.svg',
                hover: '/src/assets/images/shared/icons/exit-icon-white.svg',
            },
            playerPawns: {
                blue: '/src/assets/images/shared/icons/pawn-icon-blue.svg',
                orange: '/src/assets/images/shared/icons/pawn-icon-orange.svg',
                neutral: '/src/assets/images/shared/icons/pawn-icon-mint.svg',
            },
            cardFaces: [
                {
                    id: 'brezel',
                    image: '/src/assets/images/themes/foods/brezel.svg',
                    alt: 'Brezel',
                },
                {
                    id: 'burger',
                    image: '/src/assets/images/themes/foods/burger.svg',
                    alt: 'Burger',
                },
                {
                    id: 'chocolate',
                    image: '/src/assets/images/themes/foods/chocolate.svg',
                    alt: 'Chocolate',
                },
                {
                    id: 'corn-dog',
                    image: '/src/assets/images/themes/foods/corn-dog.svg',
                    alt: 'Corn dog',
                },
                {
                    id: 'creme-brulee',
                    image: '/src/assets/images/themes/foods/creme-brulee.svg',
                    alt: 'Creme brulee',
                },
                {
                    id: 'cup-cake',
                    image: '/src/assets/images/themes/foods/cup-cake.svg',
                    alt: 'Cup cake',
                },
                {
                    id: 'donut',
                    image: '/src/assets/images/themes/foods/donut.svg',
                    alt: 'Donut',
                },
                {
                    id: 'fries',
                    image: '/src/assets/images/themes/foods/fries.svg',
                    alt: 'Fries',
                },
                {
                    id: 'ice-cream',
                    image: '/src/assets/images/themes/foods/ice-cream.svg',
                    alt: 'Ice cream',
                },
                {
                    id: 'macarons',
                    image: '/src/assets/images/themes/foods/macarons.svg',
                    alt: 'Macarons',
                },
                {
                    id: 'maki',
                    image: '/src/assets/images/themes/foods/maki.svg',
                    alt: 'Maki',
                },
                {
                    id: 'pizza',
                    image: '/src/assets/images/themes/foods/pizza.svg',
                    alt: 'Pizza',
                },
                {
                    id: 'pudding',
                    image: '/src/assets/images/themes/foods/pudding.svg',
                    alt: 'Pudding',
                },
                {
                    id: 'sandwich',
                    image: '/src/assets/images/themes/foods/sandwich.svg',
                    alt: 'Sandwich',
                },
                {
                    id: 'taco',
                    image: '/src/assets/images/themes/foods/taco.svg',
                    alt: 'Taco',
                },
                {
                    id: 'wings',
                    image: '/src/assets/images/themes/foods/wings.svg',
                    alt: 'Wings',
                },
                {
                    id: 'wrap',
                    image: '/src/assets/images/themes/foods/wrap.svg',
                    alt: 'Wrap',
                },
                {
                    id: 'salad',
                    image: '/src/assets/images/themes/foods/salad.svg',
                    alt: 'Salad',
                }
            ],
        },
    },
];