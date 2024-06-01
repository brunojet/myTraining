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
            "developer": "King",
            "icon": "candy-crush.svg",
            "category": C_JOGOS,
            "subCategory": [SC_PUZZLE],
            "tags": [T_HIGHLIGHTS, T_MOST_DOWNLOADED],
        },
        {
            "name": "Pokémon GO",
            "developer": "Niantic",
            "icon": "pokemon-go.svg",
            "category": C_JOGOS,
            "subCategory": SC_AVENTURA
        },
        {
            "name": "Minecraft",
            "developer": "Mojang",
            "icon": "minecraft.svg",
            "category": C_JOGOS,
            "subCategory": [SC_SIMULACAO],
            "tags": [T_HIGHLIGHTS, T_MOST_DOWNLOADED, T_RECOMMENDED]
        },
        {
            "name": "Facebook",
            "category": C_REDES_SOCIAIS,
            "developer": "Facebook, Inc.",
            "icon": "facebook.svg"
        },
        {
            "name": "Instagram",
            "category": C_REDES_SOCIAIS,
            "developer": "Facebook, Inc.",
            "icon": "instagram.svg",
            "tags": T_RECOMMENDED
        },
        {
            "name": "Twitter",
            "category": C_REDES_SOCIAIS,
            "developer": "Twitter, Inc.",
            "icon": "twitter.svg"
        },
        {
            "name": "Microsoft Office",
            "category": C_PRODUTIVIDADE,
            "developer": "Microsoft Corporation",
            "icon": "microsoft-office.svg",
            "tags": T_RECOMMENDED
        },
        {
            "name": "Trello",
            "category": C_PRODUTIVIDADE,
            "developer": "Atlassian",
            "icon": "trello.svg"
        },
        {
            "name": "Evernote",
            "category": [C_PRODUTIVIDADE],
            "developer": "Evernote Corporation",
            "icon": "evernote.svg",
            "tags": [T_MOST_DOWNLOADED]
        },
        {
            "name": "LinkedIn",
            "category": [C_REDES_SOCIAIS, C_PRODUTIVIDADE],
            "developer": "LinkedIn, Inc.",
            "icon": "linkedin.svg"
        }
    ]
};