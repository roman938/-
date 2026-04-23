const https = require('https');
const fs = require('fs');
const path = require('path');

const url = "https://drive.google.com/uc?export=download&id=1OV5hOYnDkLzQiztxoZ2w3g_zrh6dIqBk";
const dest = path.join(process.cwd(), 'public', 'photo2.jpg');

function downloadFile(url, destPath) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        // Handle redirect
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

console.log("Starting download for photo2 from Drive...");
downloadFile(url, dest)
  .then(() => {
    console.log("Successfully downloaded photo2.jpg!");
    const stats = fs.statSync(dest);
    console.log("File size:", stats.size);
  })
  .catch(err => console.error(err));
