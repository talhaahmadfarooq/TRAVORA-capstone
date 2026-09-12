import fs from 'fs';
import TextToSVG from 'text-to-svg';
import path from 'path';

const fontsDir = path.join(process.cwd(), 'fonts');

const fontPaths = {
  GreatVibes: path.join(fontsDir, 'GreatVibes.ttf'),
  CinzelDec: path.join(fontsDir, 'CinzelDec.ttf'),
  Kaisei: path.join(fontsDir, 'Kaisei.ttf'),
  PermanentMarker: path.join(fontsDir, 'PermanentMarker.ttf'),
  Anton: path.join(fontsDir, 'Anton.ttf'),
};

let pathsData = {};
function getPath(fontKey, text, size=150) {
  if (!fs.existsSync(fontPaths[fontKey])) return "";
  const textToSVG = TextToSVG.loadSync(fontPaths[fontKey]);
  return textToSVG.getD(text, { fontSize: size, anchor: 'top left' });
}

pathsData.Paris = getPath('GreatVibes', 'Paris', 200);
pathsData.Amsterdam = getPath('Kaisei', 'Amsterdam', 180); // Alternate
pathsData.Kyoto = getPath('Kaisei', 'Kyoto', 180);
pathsData.Lahore = getPath('GreatVibes', 'Lahore', 180); // Alternate
pathsData.Marrakech = getPath('CinzelDec', 'Marrakech', 170);
pathsData.VeniceMain = getPath('CinzelDec', 'VENICE', 160); // Alternate
pathsData.VeniceSub = getPath('CinzelDec', 'ITALY', 60); // Alternate
pathsData.Tokyo = getPath('PermanentMarker', 'Tokyo', 180);
pathsData.Santorini = getPath('CinzelDec', 'SANTORINI', 140);
pathsData.Istanbul = getPath('CinzelDec', 'ISTANBUL', 140);
pathsData.NewYork = getPath('Anton', 'NEW YORK', 160);

fs.writeFileSync('paths_complete.json', JSON.stringify(pathsData, null, 2));
console.log("Done");
