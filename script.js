const musicContainer = document.querySelector('.music-container');
const title = document.querySelector('.title');
const timelineContainer = document.querySelector('.timeline-container');
const timeLine = document.querySelector('.timeline');
const timePast = document.querySelector('.time-past');
const timeLeft = document.querySelector('.time-left');
const audio = document.querySelector('.audio');
const imgMusic = document.querySelector('.img-music');
const prev = document.getElementById('prev');
const play = document.getElementById('play');
const next = document.getElementById('next');
const volumeSlider = document.querySelector('.volumeSlider');

const songs = ["Pa Ghadam","Oon Rooza Ro Mikham","Delet Ye Daryast","Leyli","Tone Sedat","Golab Paeeze Delam"];

let songIndex = 5;

uploadSong(songs[songIndex]);
function uploadSong(song){
    title.innerHTML = song;
    audio.src =`./musics/${song}.mp3`;
    imgMusic.src =`./images/${song}.jpg`;
}
function playSong(){
    musicContainer.classList.add('play');
    play.querySelector('i.fa').classList.remove('fa-play');
    play.querySelector('i.fa').classList.add('fa-pause');

    audio.play();
}
function pauseSong() {
    musicContainer.classList.remove('play');
    play.querySelector('i.fa').classList.add('fa-play');
    play.querySelector('i.fa').classList.remove('fa-pause');
  
    audio.pause();
  }
function prevSong(){
    songIndex--;
    if(songIndex < 0){
        songIndex = songs.length - 1;
    }
    uploadSong(songs[songIndex]);
    playSong();
}
function nextSong(){
    songIndex++;
    if(songIndex > songs.length - 1){
        songIndex = 0;
    }
    uploadSong(songs[songIndex]);
    playSong();
}
function format(time){
  let minute = parseInt(time / 60);
  let second = parseInt(time - (minute * 60));
  if (second > 9)return minute.toString() + "." + second.toString();
  else return minute.toString() + ":0" + second.toString();
}
function fastupdatetimeline(ev){
  const width = this.clientWidth;
  const clickX = ev.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX/width)*duration;
};
function setVolume(){
  audio.volume = volumeSlider.value / 100;
}

play.addEventListener('click', () => {
    if (musicContainer.classList.contains('play')) {
      pauseSong();
    } else {
      playSong();
    }
});
prev.addEventListener('click',prevSong);
next.addEventListener('click',nextSong);
audio.addEventListener('timeupdate',function(){
  timePast.innerHTML = format(audio.currentTime);
  timeLeft.innerHTML = "-"+ format(audio.duration - audio.currentTime);
});
audio.addEventListener('timeupdate',() => {
  const percent = audio.currentTime / audio.duration * 100;
  timeLine.style.width = percent + "%";
});
audio.addEventListener('ended',nextSong);
timelineContainer.addEventListener('click',fastupdatetimeline);
volumeSlider.addEventListener('click',setVolume);
