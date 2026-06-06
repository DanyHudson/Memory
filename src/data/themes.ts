import type { Theme } from '../types/theme';

export const THEMES: Theme[] = [
    {
        id: 'da-projects',
        label: 'DA projects theme',
        assets: {
            exit: {
                default: new URL(
                    '../assets/images/themes/da-projects/exit-icon-blue.svg',
                    import.meta.url,
                ).href,
                hover: new URL(
                    '../assets/images/shared/icons/exit-icon-white.svg',
                    import.meta.url,
                ).href,
            },
            playerPawns: {
                blue: new URL(
                    '../assets/images/shared/icons/pawn-icon-blue.svg',
                    import.meta.url,
                ).href,
                orange: new URL(
                    '../assets/images/shared/icons/pawn-icon-orange.svg',
                    import.meta.url,
                ).href,
                neutral: new URL(
                    '../assets/images/shared/icons/pawn-icon-mint.svg',
                    import.meta.url,
                ).href,
            },
            cardFaces: [
                {
                    id: 'basket',
                    image: new URL(
                        '../assets/images/themes/da-projects/basket.svg',
                        import.meta.url,
                    ).href,
                    alt: 'Basket',
                },
                {
                    id: 'chat',
                    image: new URL(
                        '../assets/images/themes/da-projects/chat.svg',
                        import.meta.url,
                    ).href,
                    alt: 'Chat',
                },
                {
                    id: 'chef-hat',
                    image: new URL(
                        '../assets/images/themes/da-projects/chef-hat.svg',
                        import.meta.url,
                    ).href,
                    alt: 'Chef hat',
                },
                {
                    id: 'code-cuisine',
                    image: new URL(
                        '../assets/images/themes/da-projects/code-cuisine.svg',
                        import.meta.url,
                    ).href,
                    alt: 'Code Cuisine',
                },
                {
                    id: 'coins',
                    image: new URL(
                        '../assets/images/themes/da-projects/coins.svg',
                        import.meta.url,
                    ).href,
                    alt: 'Coins',
                },
                {
                    id: 'emoji',
                    image: new URL(
                        '../assets/images/themes/da-projects/emoji.svg',
                        import.meta.url,
                    ).href,
                    alt: 'Emoji',
                },
                {
                    id: 'join-logo',
                    image: new URL(
                        '../assets/images/themes/da-projects/join-logo.svg',
                        import.meta.url,
                    ).href,
                    alt: 'Join logo',
                },
                {
                    id: 'pokedex',
                    image: new URL(
                        '../assets/images/themes/da-projects/pokedex.svg',
                        import.meta.url,
                    ).href,
                    alt: 'Pokedex',
                },
                {
                    id: 'poll-app-1',
                    image: new URL(
                        '../assets/images/themes/da-projects/poll-app-1.svg',
                        import.meta.url,
                    ).href,
                    alt: 'Poll app 1',
                },
                {
                    id: 'poll-app-2',
                    image: new URL(
                        '../assets/images/themes/da-projects/poll-app-2.svg',
                        import.meta.url,
                    ).href,
                    alt: 'Poll app 2',
                },
                {
                    id: 'pollo-loco',
                    image: new URL(
                        '../assets/images/themes/da-projects/pollo-loco.svg',
                        import.meta.url,
                    ).href,
                    alt: 'Pollo Loco',
                },
                {
                    id: 'profile',
                    image: new URL(
                        '../assets/images/themes/da-projects/profile.svg',
                        import.meta.url,
                    ).href,
                    alt: 'Profile',
                },
                {
                    id: 'sakura-eggs',
                    image: new URL(
                        '../assets/images/themes/da-projects/sakura-eggs.svg',
                        import.meta.url,
                    ).href,
                    alt: 'Sakura eggs',
                },
                {
                    id: 'sakura-logo',
                    image: new URL(
                        '../assets/images/themes/da-projects/sakura-logo.svg',
                        import.meta.url,
                    ).href,
                    alt: 'Sakura logo',
                },
                {
                    id: 'sakura-noodles',
                    image: new URL(
                        '../assets/images/themes/da-projects/sakura-noodles.svg',
                        import.meta.url,
                    ).href,
                    alt: 'Sakura noodles',
                },
                {
                    id: 'sakura-soup',
                    image: new URL(
                        '../assets/images/themes/da-projects/sakura-soup.svg',
                        import.meta.url,
                    ).href,
                    alt: 'Sakura soup',
                },
                {
                    id: 'tic-tac-toe',
                    image: new URL(
                        '../assets/images/themes/da-projects/tic-tac-toe.svg',
                        import.meta.url,
                    ).href,
                    alt: 'Tic tac toe',
                },
                {
                    id: 'wave',
                    image: new URL(
                        '../assets/images/themes/da-projects/wave.svg',
                        import.meta.url,
                    ).href,
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
                default: new URL(
                    '../assets/images/themes/foods/exit-icon-orange.svg',
                    import.meta.url,
                ).href,
                hover: new URL(
                    '../assets/images/shared/icons/exit-icon-white.svg',
                    import.meta.url,
                ).href,
            },
            playerPawns: {
                blue: new URL(
                    '../assets/images/shared/icons/pawn-icon-blue.svg',
                    import.meta.url,
                ).href,
                orange: new URL(
                    '../assets/images/shared/icons/pawn-icon-orange.svg',
                    import.meta.url,
                ).href,
                neutral: new URL(
                    '../assets/images/shared/icons/pawn-icon-mint.svg',
                    import.meta.url,
                ).href,
            },
            cardFaces: [
                {
                    id: 'brezel',
                    image: new URL(
                        '../assets/images/themes/foods/brezel.svg',
                        import.meta.url,
                    ).href,
                    alt: 'Brezel',
                },
                {
                    id: 'burger',
                    image: new URL(
                        '../assets/images/themes/foods/burger.svg',
                        import.meta.url,
                    ).href,
                    alt: 'Burger',
                },
                {
                    id: 'chocolate',
                    image: new URL(
                        '../assets/images/themes/foods/chocolate.svg',
                        import.meta.url,
                    ).href,
                    alt: 'Chocolate',
                },
                {
                    id: 'corn-dog',
                    image: new URL(
                        '../assets/images/themes/foods/corn-dog.svg',
                        import.meta.url,
                    ).href,
                    alt: 'Corn dog',
                },
                {
                    id: 'creme-brulee',
                    image: new URL(
                        '../assets/images/themes/foods/creme-brulee.svg',
                        import.meta.url,
                    ).href,
                    alt: 'Creme brulee',
                },
                {
                    id: 'cup-cake',
                    image: new URL(
                        '../assets/images/themes/foods/cup-cake.svg',
                        import.meta.url,
                    ).href,
                    alt: 'Cup cake',
                },
                {
                    id: 'donut',
                    image: new URL(
                        '../assets/images/themes/foods/donut.svg',
                        import.meta.url,
                    ).href,
                    alt: 'Donut',
                },
                {
                    id: 'fries',
                    image: new URL(
                        '../assets/images/themes/foods/fries.svg',
                        import.meta.url,
                    ).href,
                    alt: 'Fries',
                },
                {
                    id: 'ice-cream',
                    image: new URL(
                        '../assets/images/themes/foods/ice-cream.svg',
                        import.meta.url,
                    ).href,
                    alt: 'Ice cream',
                },
                {
                    id: 'macarons',
                    image: new URL(
                        '../assets/images/themes/foods/macarons.svg',
                        import.meta.url,
                    ).href,
                    alt: 'Macarons',
                },
                {
                    id: 'maki',
                    image: new URL(
                        '../assets/images/themes/foods/maki.svg',
                        import.meta.url,
                    ).href,
                    alt: 'Maki',
                },
                {
                    id: 'pizza',
                    image: new URL(
                        '../assets/images/themes/foods/pizza.svg',
                        import.meta.url,
                    ).href,
                    alt: 'Pizza',
                },
                {
                    id: 'pudding',
                    image: new URL(
                        '../assets/images/themes/foods/pudding.svg',
                        import.meta.url,
                    ).href,
                    alt: 'Pudding',
                },
                {
                    id: 'sandwich',
                    image: new URL(
                        '../assets/images/themes/foods/sandwich.svg',
                        import.meta.url,
                    ).href,
                    alt: 'Sandwich',
                },
                {
                    id: 'taco',
                    image: new URL(
                        '../assets/images/themes/foods/taco.svg',
                        import.meta.url,
                    ).href,
                    alt: 'Taco',
                },
                {
                    id: 'wings',
                    image: new URL(
                        '../assets/images/themes/foods/wings.svg',
                        import.meta.url,
                    ).href,
                    alt: 'Wings',
                },
                {
                    id: 'wrap',
                    image: new URL(
                        '../assets/images/themes/foods/wrap.svg',
                        import.meta.url,
                    ).href,
                    alt: 'Wrap',
                },
                {
                    id: 'salad',
                    image: new URL(
                        '../assets/images/themes/foods/salad.svg',
                        import.meta.url,
                    ).href,
                    alt: 'Salad',
                },
            ],
        },
    },
];