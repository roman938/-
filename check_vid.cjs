const fs = require('fs');
try {
  const stats = fs.statSync('public/hero_video.mp4');
  console.log("File size in bytes:", stats.size);
} catch (e) {
  console.error("File error:", e.message);
}
