const fillbar = document.querySelector('.fill');
const seekbar = document.querySelector('.seek input');
const title = ['Blitzkrieg bop','Mikasa','Master Of Puppets','True Friends'];
const artist = ['RAMONES','VEIL OF MAYA','METALLICA','BRING ME THE HORIZON'];
const audios = ['Blitzkrieg_bop.mp3','Mikasa.mp3','Master_Of_Puppets.mp3','True Friends.mp3'];
const covers = ['cover1.jpg','cover2.jpg','cover3.jpg','cover4.jpg'];
const currentTime = document.querySelector('.time');
const startTime = document.querySelector('.startTime');
const endTime = document.querySelector('.endTime');
const img = document.querySelector(".img").firstElementChild;
const favorite = document.querySelector('.favorite');

const song = [
    {
        id : 1,
        title : 'Blitzkrieg bop',
        artist : 'RAMONES',
        audio : 'Blitzkrieg_bop.mp3',
        cover : 'cover1.jpg'
    },
    {
        id : 2,
        title : 'Mikasa',
        artist : 'VEIL OF MAYA',
        audio : 'Mikasa.mp3',
        cover : 'cover2.jpg'
    },
    {
        id : 3,
        title : 'Master Of Puppets',
        artist : 'METALLICA',
        audio : 'Master_Of_Puppets.mp3',
        cover : 'cover3.jpg'
    },
    {
        id : 4,
        title : 'True Friends',
        artist : 'BRING ME THE HORIZON',
        audio : 'True Friends.mp3',
        cover : 'cover4.jpg'
    }
]


// Create an Object of Audio
let audio =new Audio();
let currentSong = 0;


// Play lagu saat website reload
    window.onload = playSong();

    function playSong(){
        // audio.src = `Song/${audios[currentSong]}`; -- BENER
        audio.src = `Song/${song[currentSong].audio}`;
        // audio.play();

        seekbar.setAttribute('value', 0);
        seekbar.setAttribute('min', 0);
        seekbar.setAttribute('max', 0);
    }


// Play lagu saat tekan tombol play
function togglePlayPause(){
    if(audio.paused){
        audio.play();
        let playBtn = document.querySelector('.play-pause');
        playBtn.innerHTML = '<i class="fa fa-pause"></i>';
        playBtn.style.paddingLeft = '30px';
    }
    else{
        audio.pause();
        const playBtn = document.querySelector('.play-pause');
        playBtn.innerHTML = '<i class="fa fa-play"></i>';
        playBtn.style.paddingLeft = '30px';
    }
}

// Membuat fillbar durasi
audio.addEventListener('timeupdate', function(){
    // let position = audio.currentTime / audio.duration;
    // fillbar.style.width = position * 100 +'%'; 
    
    seekbar.setAttribute('max', parseInt(audio.duration));
    setInterval(() => {
        seekbar.value = parseInt(audio.currentTime);
    }, 1000);

    seekbar.addEventListener('change', ()=>{
        audio.currentTime = seekbar.value;
    })

    
    // durasi
    convertTime(Math.round(audio.currentTime));
    
    // Next song saat lagu habis
    if(audio.ended){
        nextSong();
    }
})



function convertTime(seconds){
    let min = Math.floor(seconds/60);
    let sec = seconds % 60;

    min = min < 10 ? "0" + min : min;
    sec = sec < 10 ? "0" + sec : sec;

    startTime.textContent = min + ':' + sec;

    totalTime(Math.round(audio.duration));
}

function totalTime(seconds){
    let min = Math.floor(seconds/60);
    let sec = seconds % 60;

    min = min < 10 ? "0" + min : min;
    sec = sec < 10 ? "0" + sec : sec;

    endTime.textContent = min + ':' + sec;
}

function nextSong(){
    currentSong++;
    if(currentSong > song.length-1){
        currentSong = 0;
    }
    audio.src = `Song/${song[currentSong].audio}`;
        audio.play();
        let playBtn = document.querySelector('.play-pause');
        playBtn.innerHTML = '<i class="fa fa-pause"></i>';
        playBtn.style.paddingLeft = '30px';

    // Ubah cover
    img.setAttribute('src', song[currentSong].cover);

    ubahJudulArtis();
}

function prevSong(){
    currentSong--;
    if(currentSong < 0){
        currentSong = song.length-1;
    }
    audio.src = `Song/${song[currentSong].audio}`;
        audio.play();
        let playBtn = document.querySelector('.play-pause');
        playBtn.innerHTML = '<i class="fa fa-pause"></i>';
        playBtn.style.paddingLeft = '30px';

    // Ubah Cover
    img.setAttribute('src', song[currentSong].cover);

    ubahJudulArtis();
}

function increaseVolume(){
    audio.volume += 0.25;
}

function decreaseVolume(){
    audio.volume -= 0.25;
}

// Muted Volume button
// const volumeUp = document.querySelector('.volume-up');
// volumeUp.addEventListener('click', () => {
//     if(audio.volume === 1){
//         audio.volume = 0;
//         volumeUp.firstElementChild.className = "fa fa-volume-mute";
//     }
//     else{
//         audio.volume = 1;
//         volumeUp.firstElementChild.className = "fa fa-volume-up";
//     }
// })

function ubahJudulArtis(){
    // Ubah Judul lagu
    const titleText = document.querySelector('.title h1');
    titleText.innerHTML = title[currentSong];

    // Ubah Artist
    const artistText = document.querySelector('.title p');
    artistText.innerHTML = artist[currentSong];
}

favorite.addEventListener('click', ()=>{
    favorite.firstElementChild.classList.toggle('favorite-active');
})