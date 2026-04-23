const https = require('https');
const fs = require('fs');
const path = require('path');

const url = "https://storage.googleapis.com/aistudio-chat-blobs-prod/5s6sryx81y/Snaptik.app_7408794101898743058.mp4";
const dir = path.join(process.cwd(), 'public');

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

const dest = path.join(dir, 'hero_video.mp4');
const file = fs.createWriteStream(dest);

console.log("Starting download...");

https.get(url, (response) => {
  if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
    console.log("Redirected to:", response.headers.location);
    https.get(response.headers.location, (res) => {
        res.pipe(file);
        res.on('end', () => console.log('Successfully downloaded!'));
    }).on('error', err => console.error(err));
  } else {
    response.pipe(file);
    response.on('end', () => console.log('Successfully downloaded!'));
  }
}).on('error', (err) => {
  console.error("Download failed:", err);
});
