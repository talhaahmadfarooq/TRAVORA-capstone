import fs from 'fs';
import path from 'path';
import TextToSVG from 'text-to-svg';

const fontsDir = path.join(process.cwd(), 'fonts');
const outputFilePath = path.join(process.cwd(), '../src/components/destinations/TitleAssets.tsx');

if (!fs.existsSync(fontsDir)) {
  fs.mkdirSync(fontsDir, { recursive: true });
}

// Download function using fetch
async function downloadFont(url, filename) {
  const filepath = path.join(fontsDir, filename);
  if (fs.existsSync(filepath)) return filepath;
  
  console.log(`Downloading ${filename}...`);
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to download ${url}: ${response.statusText}`);
  const buffer = await response.arrayBuffer();
  fs.writeFileSync(filepath, Buffer.from(buffer));
  return filepath;
}

// Ensure URLs are correct (from raw.githubusercontent.com/google/fonts)
const fontUrls = {
  GreatVibes: 'https://raw.githubusercontent.com/google/fonts/main/ofl/greatvibes/GreatVibes-Regular.ttf',
  Playfair: 'https://raw.githubusercontent.com/google/fonts/main/ofl/playfairdisplay/PlayfairDisplay-Regular.ttf',
  CinzelDec: 'https://raw.githubusercontent.com/google/fonts/main/ofl/cinzeldecorative/CinzelDecorative-Regular.ttf',
  Cinzel: 'https://raw.githubusercontent.com/google/fonts/main/ofl/cinzel/Cinzel-Regular.ttf',
  Kaisei: 'https://raw.githubusercontent.com/google/fonts/main/ofl/kaiseidecol/KaiseiDecol-Regular.ttf',
  PermanentMarker: 'https://raw.githubusercontent.com/google/fonts/main/apache/permanentmarker/PermanentMarker-Regular.ttf',
  Anton: 'https://raw.githubusercontent.com/google/fonts/main/ofl/anton/Anton-Regular.ttf'
};

async function generate() {
  const fontPaths = {};
  for (const [name, url] of Object.entries(fontUrls)) {
    try {
      fontPaths[name] = await downloadFont(url, `${name}.ttf`);
    } catch (e) {
      console.error(e.message);
    }
  }

  let componentsCode = `import React from 'react';\n\nexport interface TitleAssetProps { color?: string; secondaryColor?: string; style?: React.CSSProperties; className?: string; }\n\n`;

  function createComponent(name, fontKey, text, options, modifications = '') {
    if (!fontPaths[fontKey]) {
      console.log(`Skipping ${name} due to missing font.`);
      return;
    }
    const textToSVG = TextToSVG.loadSync(fontPaths[fontKey]);
    const metrics = textToSVG.getMetrics(text, options);
    // getD returns the path data
    const pathD = textToSVG.getD(text, options);
    
    // We add modifications (e.g. secondary paths, Japanese characters, scale/rotate)
    const viewBox = `0 0 ${metrics.width + 50} ${metrics.height + 50}`;
    
    componentsCode += `
export const ${name}Title = ({ color = '#ffffff', secondaryColor = '#ff2a5f', style, className }: TitleAssetProps) => (
  <svg viewBox="${viewBox}" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', ...style }} className={className}>
    ${modifications}
    <path d="${pathD}" fill={color} />
  </svg>
);
`;
  }

  // Paris
  createComponent('Paris', 'GreatVibes', 'Paris', { fontSize: 180, anchor: 'top left' }, 
    `<filter id="noise"><feTurbulence type="fractalNoise" baseFrequency="0.05" result="noise"/><feDisplacementMap in="SourceGraphic" in2="noise" scale="2" /></filter>`
  );

  // Amsterdam (Condensed, tight tracking - simulated by negative kerning options if possible, or just scaleX)
  createComponent('Amsterdam', 'Playfair', 'Amsterdam', { fontSize: 160, anchor: 'top left', tracking: -0.05 },
    `<g transform="scale(0.85, 1.2)"><path d="..." fill={color} /></g>` // We will manually manipulate the path inside React!
  );

  // We can just generate the raw paths, and then write a robust TitleAssets.tsx manually!
  // It's better to just output the raw path strings, then I'll construct the React file carefully.
  
  let pathsData = {};
  function getPath(fontKey, text, size=150) {
    if (!fontPaths[fontKey]) return "";
    const textToSVG = TextToSVG.loadSync(fontPaths[fontKey]);
    return textToSVG.getD(text, { fontSize: size, anchor: 'top left' });
  }

  pathsData.Paris = getPath('GreatVibes', 'Paris', 200);
  pathsData.Amsterdam = getPath('Playfair', 'Amsterdam', 180);
  pathsData.Kyoto = getPath('Kaisei', 'Kyoto', 180);
  pathsData.Lahore = getPath('Playfair', 'Lahore', 180);
  pathsData.Marrakech = getPath('CinzelDec', 'Marrakech', 170);
  pathsData.VeniceMain = getPath('Cinzel', 'VENICE', 160);
  pathsData.VeniceSub = getPath('Cinzel', 'ITALY', 60);
  pathsData.Tokyo = getPath('PermanentMarker', 'Tokyo', 180);
  pathsData.Santorini = getPath('CinzelDec', 'SANTORINI', 140);
  pathsData.Istanbul = getPath('Cinzel', 'ISTANBUL', 140);
  pathsData.NewYork = getPath('Anton', 'NEW YORK', 160);
  
  fs.writeFileSync('paths.json', JSON.stringify(pathsData, null, 2));
  console.log("Generated paths.json");
}

generate();
