const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use('/songs', express.static(path.join(__dirname, 'songs')));

// Get song list dynamically
app.get('/api/songs', (req, res) => {
  const songsDir = path.join(__dirname, 'songs');
  fs.readdir(songsDir, (err, files) => {
    if (err) return res.status(500).send('Error reading songs');
    const songFiles = files.filter(f =>
      ['.mp3', '.wav', '.ogg'].includes(path.extname(f).toLowerCase())
    );
    res.json(songFiles);
  });
});

app.listen(PORT, () => console.log(`🎵 Music player running on http://localhost:${PORT}`));
