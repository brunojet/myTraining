const C_JOGOS = 1;
const C_REDES_SOCIAIS = 2;
const C_PRODUTIVIDADE = 3;

const SC_PUZZLE = 1;
const SC_AVENTURA = 2;
const SC_SIMULACAO = 3;

var appData = {
    "categories": [
        { "id": C_JOGOS, "name": "Jogos" },
        { "id": C_REDES_SOCIAIS, "name": "Redes Sociais" },
        { "id": C_PRODUTIVIDADE, "name": "Produtividade" }
    ],
    "subCategories": [
        { "id": SC_PUZZLE, "name": "Puzzle", "category": C_JOGOS },
        { "id": SC_AVENTURA, "name": "Aventura", "category": C_JOGOS },
        { "id": SC_SIMULACAO, "name": "Simulação", "category": C_JOGOS }
    ],
    "apps": [
        {
            "name": "Candy Crush",
            "category": C_JOGOS,
            "subCategory": [SC_PUZZLE],
            "developer": "King",
            "tags": [T_HIGHLIGHTS, T_MOST_DOWNLOADED],
            "svg": "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
        },
        {
            "name": "Pokémon GO",
            "category": C_JOGOS,
            "subCategory": SC_AVENTURA,
            "developer": "Niantic",
            "svg": "M50,10 C70,10 90,30 90,50 C90,70 70,90 50,90 C30,90 10,70 10,50 C10,30 30,10 50,10 M50,30 C40,30 30,40 30,50 C30,60 40,70 50,70 C60,70 70,60 70,50 C70,40 60,30 50,30 M50,40 C55,40 60,45 60,50 C60,55 55,60 50,60 C45,60 40,55 40,50 C40,45 45,40 50,40 M50,45 C52,45 55,48 55,50 C55,52 52,55 50,55 C48,55 45,52 45,50 C45,48 48,45 50,45"
        },
        {
            "name": "Minecraft",
            "category": C_JOGOS,
            "subCategory": [SC_SIMULACAO],
            "developer": "Mojang",
            "tags": [T_HIGHLIGHTS, T_MOST_DOWNLOADED, T_RECOMMENDED],
            "svg": "M10 10l80 0 0 80 -80 0z M30 10l0 80 M50 10l0 80 M70 10l0 80 M10 30l80 0 M10 50l80 0 M10 70l80 0"
        },
        {
            "name": "Facebook",
            "category": C_REDES_SOCIAIS,
            "developer": "Facebook, Inc."
        },
        {
            "name": "Instagram",
            "category": C_REDES_SOCIAIS,
            "developer": "Facebook, Inc.",
            tags: T_RECOMMENDED
        },
        {
            "name": "Twitter",
            "category": C_REDES_SOCIAIS,
            "developer": "Twitter, Inc."
        },
        {
            "name": "Microsoft Office",
            "category": C_PRODUTIVIDADE,
            "developer": "Microsoft Corporation",
            "tags": T_RECOMMENDED,
            "svg": "M 60 10 L 60 90 L 90 90 L 90 10 Z"
        },
        {
            "name": "Trello",
            "category": C_PRODUTIVIDADE,
            "developer": "Atlassian",
            "svg": "M 10 10 L 10 90 L 90 90 L 90 10 Z"
        },
        {
            "name": "Evernote",
            "category": [C_PRODUTIVIDADE],
            "developer": "Evernote Corporation",
            "tags": [T_MOST_DOWNLOADED],
            "svg": "M 10 10 L 90 10 L 50 50 Z"
        },
        {
            "name": "LinkedIn",
            "category": [C_REDES_SOCIAIS, C_PRODUTIVIDADE],
            "developer": "LinkedIn, Inc.",
            "svg": "M 10 90 L 90 90 L 50 10 Z"
        }
    ]
};