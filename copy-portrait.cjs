const fs = require('fs');
const path = require('path');

const src = path.join('C:', 'Users', 'USER', 'OneDrive', 'Documents', 'Muthukumaran.jpeg');
const dest = path.join('c:', 'Users', 'USER', 'Downloads', 'portfolio', 'src', 'assets', 'muthukumaran-portrait.jpg');

fs.mkdirSync(path.dirname(dest), { recursive: true });
fs.copyFileSync(src, dest);
console.log('Done! Copied portrait to:', dest);
