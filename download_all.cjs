const https = require('https');
const fs = require('fs');
const path = require('path');

const filesToDownload = [
  { id: "11oH5p1-19F1oqATnwBl0sL6kxX3AP9nh", name: "photo3.jpg" },
  { id: "1IZoHISv_O9e1mU8MSqsohoUU2aa48nMy", name: "photo4.jpg" },
  { id: "1LdQLXV9TxB0cenAgfK2ceA6Bez2V6a0R", name: "photo5.jpg" },
  { id: "1HWR1eO3VNYlmEdsWJbFch05KQXnSZHgh", name: "photo6.jpg" },
  { id: "1U7ZzU9qjast3Xb2uNS3x62jF-Yd8Rc0b", name: "photo7.jpg" },
  { id: "1vRNXEm4ruu0G_teLnPDMNRc8uG7YU1GU", name: "photo8.jpg" }
];

function downloadFile(url, destPath) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        let redirectUrl = response.headers.location;
        if (!redirectUrl.startsWith('http')) {
            const parsedUrl = new URL(url);
            redirectUrl = parsedUrl.origin + redirectUrl;
        }
        resolve(downloadFile(redirectUrl, destPath));
      } else if (response.statusCode === 200) {
        const file = fs.createWriteStream(destPath);
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve();
        });
      } else {
        reject(new Error(`Failed to download: ${response.statusCode} - ${response.statusMessage}`));
      }
    }).on('error', (err) => reject(err));
  });
}

async function downloadAll() {
    for (const item of filesToDownload) {
        const url = `https://drive.google.com/uc?export=download&id=${item.id}`;
        const dest = path.join(process.cwd(), 'public', item.name);
        console.log(`Starting download for ${item.name}...`);
        try {
            await downloadFile(url, dest);
            console.log(`Successfully downloaded ${item.name}!`);
        } catch(e) {
            console.error(`Failed ${item.name}: ${e}`);
        }
    }
}

downloadAll();
