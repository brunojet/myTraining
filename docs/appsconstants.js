const T_HIGHLIGHTS = "highlights";
const T_RECOMMENDED = "recommended";
const T_MOST_DOWNLOADED = "mostDownloaded";

const SVG_HIGHLIGHTS = "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5";
const SVG_RECOMMENDED = "M22 12h-4l-3 9L9 3l-3 9H2";

const C_RECOMMENDED = { id: 1001, name: "Recomendados" };

const HIGHLIGHTS = { id: 1, name: "Destaques", svg: SVG_HIGHLIGHTS, tag: T_HIGHLIGHTS };
const RECOMMENDED = { id: 2, name: "Recomendados", svg: SVG_RECOMMENDED, showCategory: true, tag: T_RECOMMENDED };
const SC_MOST_DOWNLOADED = { id: 1003, name: "Mais baixados", tag: T_MOST_DOWNLOADED };

const SC_OTHER_ID = 1001;
const SC_OTHER_TEMPLATE = JSON.stringify({ "id": -1, "name": "Outros", "category": "*" });

const tabs = [HIGHLIGHTS, RECOMMENDED];
