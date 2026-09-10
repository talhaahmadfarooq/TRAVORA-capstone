const fs = require('fs');
const https = require('https');
const path = require('path');

const dir = path.join(__dirname, 'public', 'textures');
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
}

const textures = {
  'earth-diffuse.jpg': 'https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg',
  'earth-night.jpg': 'https://unpkg.com/three-globe/example/img/earth-night.jpg',
  'earth-specular.png': 'https://unpkg.com/three-globe/example/img/earth-water.png',
  'earth-bump.png': 'https://unpkg.com/three-globe/example/img/earth-topology.png',
  'earth-clouds.png': 'https://unpkg.com/three-globe/example/img/earth-clouds1024.png'
};

for (const [filename, url] of Object.entries(textures)) {
  const dest = path.join(dir, filename);
  https.get(url, (res) => {
    if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        // Handle redirect
        https.get('https://unpkg.com' + res.headers.location, (redirectRes) => {
             const file = fs.createWriteStream(dest);
             redirectRes.pipe(file);
        });
    } else {
        const file = fs.createWriteStream(dest);
        res.pipe(file);
    }
  });
}
console.log('Downloading textures...');
