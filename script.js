document.addEventListener("DOMContentLoaded", () => {

    const audio = document.getElementById("audio-player");
    const playButton = document.getElementById("play");

    const progressContainer = document.querySelector(".progress-container");
    const progress = document.querySelector(".progress");

    const currentTime = document.getElementById("current-time");
    const duration = document.getElementById("duration");

    const volumeButton = document.getElementById("volume-button");
    const volumeSlider = document.getElementById("volume-slider");
    audio.volume = 0.5;

    const libraryButton = document.getElementById("library-button");
const songList = document.getElementById("song-list");

    const prevButton = document.getElementById("prev");
    const nextButton = document.getElementById("next");

    const enterButton = document.querySelector(".enter-button");
    const musicPlayer = document.getElementById("musicPlayer");

    enterButton.addEventListener("click", () => {

    console.log("ENTRAR FUNCIONA");
    console.log("musicPlayer:", musicPlayer);

    musicPlayer.classList.add("visible");
    libraryButton.classList.add("visible");

    console.log("display:", musicPlayer.style.display);

});

const songItems = document.querySelectorAll(".song-item");

const albumCover = document.getElementById("album-cover");
const songTitle = document.getElementById("song-title");
const songArtist = document.getElementById("song-artist");

const songs = [
    {
        title: "Dancing in the crowd",
        artist: "Dyar Pshder",
        file: "music/Dyar Pshder - Dancing in the crowd (Official Audio) - Dyar Pshder.mp3",
        cover: "images/Portada canción 1.jpg"
    },

    {
        title: "Let The Ligt In",
        artist: "Lana Del Rey ft. Father John Misty",
        file: "music/Lana Del Rey - Let The Light In (Audio) ft. Father John Misty.mp3",
        cover: "images/Portada canción 2.jpg"
    },

        {
        title: "Pretty Boy",
        artist: "The Neighborhood",
        file: "music/The Neighborhood - Pretty Boy.mp3",
        cover: "images/Portada cancion 3.jpg"
    },

            {
        title: "Show Me How",
        artist: "Men I Trust",
        file: "music/Men I Trust - Show Me How.mp3",
        cover: "images/Portada cancion 4.jpg"
    },

            {
        title: "Hot",
        artist: "Cigarettes After Sex",
        file: "music/Hot - Cigarettes After Sex.mp3",
        cover: "images/Portada cancion 5.jpg"
    },

                {
        title: "Risk",
        artist: "Lace",
        file: "music/lace - risk.mp3",
        cover: "images/Portada cancion 6.jpg"
    },
    
                {
        title: "So In Love",
        artist: "Breezee",
        file: "music/Breezee - So In Love.mp3",
        cover: "images/Portada cancion 7.jpg"
    },

    {
        title: "Loverboy",
        artist: "A-Wall",
        file: "music/A-Wall - Loverboy.mp3",
        cover: "images/Portada cancion 8.jpg"
    },
    
];

let currentSong = 0;

function loadSong(index) {

    currentSong = index;

    const song = songs[currentSong];

    audio.src = song.file;

    albumCover.src = song.cover;
    songTitle.textContent = song.title;
    songArtist.textContent = song.artist;

    audio.play();

    playButton.textContent = "⏸";
}

console.log(libraryButton);
console.log(songList);

libraryButton.addEventListener("click", () => {

    songList.classList.toggle("open");

    console.log(songList.className);

});

    playButton.addEventListener("click", () => {

        if (audio.paused) {
            audio.play();
            playButton.textContent = "⏸";
        } else {
            audio.pause();
            playButton.textContent = "▶";
        }

    });

    audio.addEventListener("timeupdate", () => {

    const percentage = (audio.currentTime / audio.duration) * 100;

    progress.style.width = percentage + "%";

});

audio.addEventListener("ended", () => {

    currentSong++;

    if (currentSong >= songs.length) {
        currentSong = 0;
    }

    loadSong(currentSong);

});

songItems.forEach(item => {

    item.addEventListener("click", () => {

        const songIndex = Number(item.dataset.song);

        loadSong(songIndex);

    });

});

audio.addEventListener("timeupdate", () => {

    const percentage = (audio.currentTime / audio.duration) * 100;

    progress.style.width = percentage + "%";

    currentTime.textContent = formatTime(audio.currentTime);

});

progressContainer.addEventListener("click", (event) => {

    const width = progressContainer.clientWidth;
    const clickX = event.offsetX;

    const newTime = (clickX / width) * audio.duration;

    audio.currentTime = newTime;

});

prevButton.addEventListener("click", () => {

    currentSong--;

    if (currentSong < 0) {
        currentSong = songs.length - 1;
    }

    loadSong(currentSong);

});

nextButton.addEventListener("click", () => {

    currentSong++;

    if (currentSong >= songs.length) {
        currentSong = 0;
    }

    loadSong(currentSong);

});

audio.addEventListener("loadedmetadata", () => {

    duration.textContent = formatTime(audio.duration);

});

volumeSlider.addEventListener("input", () => {

    audio.volume = volumeSlider.value;

});

volumeButton.addEventListener("click", () => {

    if (audio.volume > 0) {

        audio.volume = 0;
        volumeSlider.value = 0;
        volumeButton.textContent = "♡";

    } else {

        audio.volume = 1;
        volumeSlider.value = 1;
        volumeButton.textContent = "♥";

    }

});

});

function formatTime(seconds) {

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    return minutes + ":" + String(remainingSeconds).padStart(2, "0");
}