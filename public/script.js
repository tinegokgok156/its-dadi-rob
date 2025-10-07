let songs = [];
let currentIndex = 0;
let audio = document.getElementById('audio');
let isPlaying = false;

async function loadSongs() {
  const res = await fetch('/api/songs');
  songs = await res.json();
  shuffleSongs();
  loadSong(currentIndex);
}

function shuffleSongs() {
  songs = songs.sort(() => Math.random() - 0.5);
}

function loadSong(index) {
  audio.src = `/songs/${songs[index]}`;
  audio.load();
}

document.getElementById('play').addEventListener('click', () => {
  if (!isPlaying) {
    audio.play();
  } else {
    audio.pause();
  }
});

audio.addEventListener('play', () => isPlaying = true);
audio.addEventListener('pause', () => isPlaying = false);

document.getElementById('next').addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % songs.length;
  loadSong(currentIndex);
  audio.play();
});

document.getElementById('prev').addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + songs.length) % songs.length;
  loadSong(currentIndex);
  audio.play();
});

audio.addEventListener('ended', () => {
  currentIndex = (currentIndex + 1) % songs.length;
  loadSong(currentIndex);
  audio.play();
});

loadSongs();
