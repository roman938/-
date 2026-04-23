const https = require('https');
const fs = require('fs');
const path = require('path');

const filesToDownload = [
  { id: "1AyhUnUm8d8WpSZB5Fax2FTyoDlGhMlad", name: "song1.mp3" },
  { id: "1FqVdP6EJoLRkjLpjZq9AiE5RIvBd6kD5", name: "song2.mp3" },
  { id: "1vtt9NFhIWZmtUGFjbeagzWvhK_pPedzJ", name: "song3.mp3" },
  { id: "1H7lqQ4EsmN7WLALIIPHi90NR9n90h7pv", name: "song4.mp3" }
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
