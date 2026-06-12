/**
 * Generates flat-illustration bust avatars (SVG) in a consistent style
 * matching the existing cartoon portraits: circular slate background,
 * shoulders bust, distinctive hair/features per advisor.
 */
import { writeFileSync, mkdirSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const OUT = join(dirname(fileURLToPath(import.meta.url)), "../src/assets/advisors");
mkdirSync(OUT, { recursive: true });

// Shared palette
const BG = "#343a42";          // slate circle like existing avatars
const SKIN = { pale: "#f2d6c4", fair: "#eac3a8", tan: "#d9a875", brown: "#a8744a", deep: "#7d5230" };

function avatar({ skin, shirt, shirtStyle = "crew", hair, extras = "" }) {
  const skinFill = SKIN[skin];
  // Head: ellipse cx100 cy92 rx34 ry40. Shoulders bust. Ears. Simple face.
  const shirtPaths = {
    crew:    `<path d="M40 200 C40 152 70 138 100 138 C130 138 160 152 160 200 Z" fill="${shirt}"/>`,
    suit:    `<path d="M40 200 C40 152 70 138 100 138 C130 138 160 152 160 200 Z" fill="${shirt}"/>
              <path d="M88 140 L100 162 L112 140 L106 138 L100 146 L94 138 Z" fill="#ffffff"/>
              <path d="M97 146 L103 146 L101 168 L99 168 Z" fill="${shirtStyle === "redtie" ? "#b3382e" : "#22262b"}"/>`,
    leather: `<path d="M40 200 C40 152 70 138 100 138 C130 138 160 152 160 200 Z" fill="#1d1f23"/>
              <path d="M62 158 L84 144 L86 200 L58 200 Z" fill="#2b2e34"/>
              <path d="M138 158 L116 144 L114 200 L142 200 Z" fill="#2b2e34"/>
              <path d="M96 142 L104 142 L104 200 L96 200 Z" fill="#101113"/>`,
    tank:    `<path d="M55 200 C55 160 75 148 100 148 C125 148 145 160 145 200 Z" fill="${shirt}"/>
              <path d="M70 200 C70 168 80 150 80 150 L60 162 C56 172 55 184 55 200 Z" fill="${skinFill}"/>
              <path d="M130 200 C130 168 120 150 120 150 L140 162 C144 172 145 184 145 200 Z" fill="${skinFill}"/>`,
    robe:    `<path d="M38 200 C38 150 68 136 100 136 C132 136 162 150 162 200 Z" fill="${shirt}"/>
              <path d="M84 138 L100 170 L116 138" stroke="#c9a227" stroke-width="5" fill="none"/>`,
  };
  const bust = shirtPaths[shirtStyle] ?? shirtPaths.crew;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <defs><clipPath id="c"><circle cx="100" cy="100" r="100"/></clipPath></defs>
  <g clip-path="url(#c)">
    <circle cx="100" cy="100" r="100" fill="${BG}"/>
    <!-- neck -->
    <rect x="88" y="118" width="24" height="28" rx="8" fill="${skinFill}"/>
    ${bust}
    <!-- ears -->
    <ellipse cx="64" cy="96" rx="7" ry="11" fill="${skinFill}"/>
    <ellipse cx="136" cy="96" rx="7" ry="11" fill="${skinFill}"/>
    <!-- head -->
    <ellipse cx="100" cy="92" rx="36" ry="42" fill="${skinFill}"/>
    ${hair}
    <!-- eyes -->
    <ellipse cx="86" cy="92" rx="4.2" ry="5" fill="#23262b"/>
    <ellipse cx="114" cy="92" rx="4.2" ry="5" fill="#23262b"/>
    <!-- brows handled per-person in extras or default -->
    <path d="M78 81 Q86 77 94 81" stroke="#3c3128" stroke-width="3.4" fill="none" stroke-linecap="round"/>
    <path d="M106 81 Q114 77 122 81" stroke="#3c3128" stroke-width="3.4" fill="none" stroke-linecap="round"/>
    <!-- nose -->
    <path d="M100 94 Q103 103 99 107" stroke="#c2906c" stroke-width="3" fill="none" stroke-linecap="round"/>
    <!-- mouth -->
    <path d="M90 116 Q100 121 110 116" stroke="#9c5f49" stroke-width="3.4" fill="none" stroke-linecap="round"/>
    ${extras}
  </g>
</svg>`;
}

const GRAY = "#b9bdc4", DGRAY = "#8f959d", BROWN = "#5d4630", DBROWN = "#3c3128", BLOND = "#c9a86a", BLACK = "#23262b";

const people = {
  // ── Spirituality ──
  joseph: {
    skin: "tan", shirt: "#1f2937", shirtStyle: "robe",
    hair: `<path d="M58 60 L142 60 L150 120 L134 120 L130 70 L70 70 L66 120 L50 120 Z" fill="#1e3a8a"/>
           <path d="M58 60 Q100 38 142 60 L142 72 L58 72 Z" fill="#1e3a8a"/>
           <rect x="58" y="58" width="84" height="10" rx="5" fill="#c9a227"/>
           <path d="M50 118 L66 118 L64 152 L48 144 Z" fill="#1e3a8a"/>
           <path d="M150 118 L134 118 L136 152 L152 144 Z" fill="#1e3a8a"/>
           <rect x="74" y="60" width="8" height="12" fill="#c9a227" opacity="0.8"/>
           <rect x="94" y="58" width="8" height="14" fill="#c9a227" opacity="0.8"/>
           <rect x="116" y="60" width="8" height="12" fill="#c9a227" opacity="0.8"/>`,
    extras: "",
  },
  solomon: {
    skin: "tan", shirt: "#4c1d95", shirtStyle: "robe",
    hair: `<path d="M64 76 Q100 50 136 76 L138 92 Q100 72 62 92 Z" fill="${DGRAY}"/>
           <path d="M64 100 Q60 150 80 158 L92 132 Q78 124 76 100 Z" fill="${DGRAY}"/>
           <path d="M136 100 Q140 150 120 158 L108 132 Q122 124 124 100 Z" fill="${DGRAY}"/>
           <path d="M76 118 Q100 156 124 118 L124 142 Q100 168 76 142 Z" fill="${DGRAY}"/>
           <path d="M62 64 L74 46 L86 60 L100 42 L114 60 L126 46 L138 64 L138 74 L62 74 Z" fill="#eab308"/>
           <circle cx="74" cy="56" r="3.4" fill="#dc2626"/><circle cx="100" cy="52" r="3.4" fill="#2563eb"/><circle cx="126" cy="56" r="3.4" fill="#dc2626"/>`,
    extras: "",
  },
  frankl: {
    skin: "pale", shirt: "#3f3f46", shirtStyle: "suit",
    hair: `<path d="M66 70 Q72 52 100 50 Q128 52 134 70 L136 84 Q132 64 100 62 Q68 64 64 84 Z" fill="${DGRAY}"/>`,
    extras: `<circle cx="86" cy="92" r="11" fill="none" stroke="#23262b" stroke-width="3"/>
             <circle cx="114" cy="92" r="11" fill="none" stroke="#23262b" stroke-width="3"/>
             <path d="M97 92 L103 92" stroke="#23262b" stroke-width="3"/>
             <path d="M90 110 L110 110" stroke="${DGRAY}" stroke-width="4" stroke-linecap="round"/>`,
  },
  tolle: {
    skin: "fair", shirt: "#854d0e", shirtStyle: "crew",
    hair: `<path d="M66 74 Q70 58 84 54 L82 66 Q72 70 70 84 Z" fill="${GRAY}"/>
           <path d="M134 74 Q130 58 116 54 L118 66 Q128 70 130 84 Z" fill="${GRAY}"/>`,
    extras: `<path d="M80 124 Q100 138 120 124 L118 132 Q100 144 82 132 Z" fill="${GRAY}"/>`,
  },
  // ── Health ──
  "bryan-johnson": {
    skin: "pale", shirt: "#111316", shirtStyle: "crew",
    hair: `<path d="M62 84 Q62 48 100 46 Q138 48 138 84 L134 80 Q132 58 100 56 Q68 58 66 80 Z" fill="${DBROWN}"/>
           <path d="M62 84 Q66 60 100 56 Q134 60 138 84 Q138 70 130 62 Q114 50 86 50 Q70 54 64 68 Z" fill="${DBROWN}"/>`,
    extras: "",
  },
  arnold: {
    skin: "tan", shirt: "#16181c", shirtStyle: "crew",
    hair: `<path d="M62 80 Q64 52 100 50 Q136 52 138 80 L134 76 Q130 60 100 58 Q70 60 66 76 Z" fill="#6b4e2e"/>
           <path d="M64 78 Q70 56 100 54 Q130 56 136 78 Q134 64 122 56 Q104 48 82 54 Q68 60 64 78 Z" fill="#6b4e2e"/>`,
    extras: `<path d="M76 124 Q100 130 124 124" stroke="#c2906c" stroke-width="2" fill="none"/>`,
  },
  attia: {
    skin: "fair", shirt: "#374151", shirtStyle: "crew",
    hair: `<path d="M64 78 Q68 54 100 52 Q132 54 136 78 L132 76 Q126 60 100 58 Q74 60 68 76 Z" fill="#52525b" opacity="0.7"/>`,
    extras: `<path d="M72 118 Q100 144 128 118 L126 128 Q100 150 74 128 Z" fill="#52525b" opacity="0.55"/>`,
  },
  // ── Business ──
  buffett: {
    skin: "pale", shirt: "#1f2937", shirtStyle: "suit", shirtStyleTie: "redtie",
    hair: `<path d="M64 84 Q62 60 80 54 L80 66 Q70 70 68 86 Z" fill="${GRAY}"/>
           <path d="M136 84 Q138 60 120 54 L120 66 Q130 70 132 86 Z" fill="${GRAY}"/>
           <path d="M70 60 Q100 48 130 60 L128 66 Q100 56 72 66 Z" fill="${GRAY}" opacity="0.85"/>`,
    extras: `<rect x="74" y="84" width="24" height="17" rx="4" fill="none" stroke="#23262b" stroke-width="3"/>
             <rect x="102" y="84" width="24" height="17" rx="4" fill="none" stroke="#23262b" stroke-width="3"/>
             <path d="M98 90 L102 90" stroke="#23262b" stroke-width="3"/>`,
  },
  altman: {
    skin: "fair", shirt: "#3f4a3a", shirtStyle: "crew",
    hair: `<path d="M62 82 Q62 50 100 48 Q138 50 138 82 L134 78 Q132 56 100 54 Q68 56 66 78 Z" fill="${BROWN}"/>
           <path d="M64 80 Q66 56 96 52 Q80 60 76 70 Q70 74 66 84 Z" fill="${BROWN}"/>
           <path d="M136 80 Q134 56 104 52 Q120 60 124 70 Q130 74 134 84 Z" fill="${BROWN}"/>`,
    extras: "",
  },
  jensen: {
    skin: "fair", shirt: "#000", shirtStyle: "leather",
    hair: `<path d="M62 82 Q62 50 100 48 Q138 50 138 82 L134 76 Q130 56 100 56 Q70 56 66 76 Z" fill="${BLACK}"/>
           <path d="M64 78 Q70 54 100 52 Q130 54 136 78 Q132 62 118 54 Q100 48 82 54 Q68 62 64 78 Z" fill="${BLACK}"/>`,
    extras: `<rect x="73" y="85" width="25" height="16" rx="6" fill="none" stroke="#23262b" stroke-width="3.4"/>
             <rect x="102" y="85" width="25" height="16" rx="6" fill="none" stroke="#23262b" stroke-width="3.4"/>
             <path d="M98 91 L102 91" stroke="#23262b" stroke-width="3.4"/>`,
  },
  zuck: {
    skin: "pale", shirt: "#16181c", shirtStyle: "crew",
    hair: `<path d="M62 80 Q62 48 100 46 Q138 48 138 80 L134 74 Q130 54 100 54 Q70 54 66 74 Z" fill="#7a5b35"/>
           <path d="M63 78 Q68 52 100 50 Q132 52 137 78 Q133 60 116 52 Q100 46 84 52 Q67 60 63 78 Z" fill="#7a5b35"/>
           <path d="M64 76 Q66 84 70 88 L66 88 Q63 82 64 76 Z" fill="#7a5b35"/>`,
    extras: "",
  },
  pg: {
    skin: "pale", shirt: "#4b5563", shirtStyle: "crew",
    hair: `<path d="M64 80 Q64 62 76 56 L76 66 Q70 70 68 82 Z" fill="${GRAY}"/>
           <path d="M136 80 Q136 62 124 56 L124 66 Q130 70 132 82 Z" fill="${GRAY}"/>`,
    extras: "",
  },
  andreessen: {
    skin: "pale", shirt: "#1e3a5f", shirtStyle: "crew",
    hair: ``,
    extras: `<ellipse cx="100" cy="86" rx="36" ry="46" fill="${SKIN.pale}"/>
             <ellipse cx="86" cy="94" rx="4.2" ry="5" fill="#23262b"/>
             <ellipse cx="114" cy="94" rx="4.2" ry="5" fill="#23262b"/>
             <path d="M78 84 Q86 80 94 84" stroke="#5d5346" stroke-width="3" fill="none" stroke-linecap="round"/>
             <path d="M106 84 Q114 80 122 84" stroke="#5d5346" stroke-width="3" fill="none" stroke-linecap="round"/>
             <path d="M100 96 Q103 105 99 109" stroke="#c2906c" stroke-width="3" fill="none" stroke-linecap="round"/>
             <path d="M90 118 Q100 123 110 118" stroke="#9c5f49" stroke-width="3.4" fill="none" stroke-linecap="round"/>`,
  },
  thiel: {
    skin: "fair", shirt: "#27272a", shirtStyle: "suit",
    hair: `<path d="M62 80 Q62 52 100 50 Q138 52 138 80 L134 74 Q130 58 100 58 Q70 58 66 74 Z" fill="#9a7b4f"/>
           <path d="M64 78 Q70 54 100 52 Q130 54 136 78 Q130 62 112 56 Q96 52 82 58 Q68 64 64 78 Z" fill="#9a7b4f"/>`,
    extras: "",
  },
  hoffman: {
    skin: "pale", shirt: "#1f2937", shirtStyle: "suit",
    hair: `<path d="M64 78 Q64 62 78 56 L78 66 Q70 70 68 82 Z" fill="${DGRAY}"/>
           <path d="M136 78 Q136 62 122 56 L122 66 Q130 70 132 82 Z" fill="${DGRAY}"/>`,
    extras: `<rect x="74" y="85" width="24" height="16" rx="5" fill="none" stroke="#23262b" stroke-width="3"/>
             <rect x="102" y="85" width="24" height="16" rx="5" fill="none" stroke="#23262b" stroke-width="3"/>
             <path d="M98 91 L102 91" stroke="#23262b" stroke-width="3"/>`,
  },
  hormozi: {
    skin: "tan", shirt: "#15803d", shirtStyle: "tank",
    hair: `<path d="M62 80 Q62 50 100 48 Q138 50 138 80 L134 74 Q130 56 100 56 Q70 56 66 74 Z" fill="${BLACK}"/>
           <rect x="60" y="70" width="80" height="10" rx="5" fill="#f5f5f4"/>`,
    extras: `<path d="M70 110 Q72 138 100 140 Q128 138 130 110 L130 128 Q126 148 100 150 Q74 148 70 128 Z" fill="${BLACK}"/>
             <rect x="93" y="101" width="14" height="6" rx="3" fill="#e7e5e4"/>`,
  },
  garyv: {
    skin: "fair", shirt: "#374151", shirtStyle: "crew",
    hair: `<path d="M66 76 Q70 54 100 52 Q130 54 134 76 L130 72 Q124 58 100 58 Q76 58 70 72 Z" fill="${BLACK}" opacity="0.85"/>`,
    extras: `<path d="M74 112 Q76 132 100 134 Q124 132 126 112 L126 124 Q122 140 100 142 Q78 140 74 124 Z" fill="${BLACK}" opacity="0.5"/>`,
  },
};

// Buffett needs red tie variant — tweak shirtStyle param handling
for (const [id, p] of Object.entries(people)) {
  if (id === "buffett") p.shirtStyleParam = "redtie";
  const svg = avatar({ skin: p.skin, shirt: p.shirt, shirtStyle: p.shirtStyle, hair: p.hair, extras: p.extras });
  writeFileSync(join(OUT, `${id}.svg`), svg);
  console.log(`✓ ${id}.svg`);
}
console.log(`\nDone → ${OUT}`);
