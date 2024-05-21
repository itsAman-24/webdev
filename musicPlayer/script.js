const song = document.querySelector("#song");
const ctrlIcon = document.querySelector("#ctrlIcon");
const progress = document.querySelector("#progress");
const musicPlayer = document.querySelector(".music-player");
const forwardIcon = document.querySelector("#forwardIcon");
const backwardIcon = document.querySelector("#backwardIcon");


// Retrieve and apply saved state on page load
window.addEventListener("load",() => {
    const savedTime = localStorage.getItem('songCurrentTime');
    const savedState = localStorage.getItem('songCurrentState');

    if(savedTime) {
        song.currentTime = savedTime;
        progress.value = song.currentTime;
    }

    if(savedState == 'paused') {
        song.pause();
        ctrlIcon.classList.add('fa-play');
        ctrlIcon.classList.remove('fa-pause');
    } else {
        song.play();
        ctrlIcon.classList.add('fa-pause');
        ctrlIcon.classList.remove('fa-play');
    }

})


//Storing the values beforeunload event into the localStorage
window.addEventListener("beforeunload",() => {
    localStorage.setItem('songCurrentTime',song.currentTime);
    localStorage.setItem('songCurrentState',song.pause ? 'paused' : 'playing');
})


//setting the progress bar maximum value and corresponds the progress bar with song's currentTime
song.onloadedmetadata = function() {
    progress.max = song.duration;
    progress.value = song.currentTime;
}

//play and pause the song with the click on the play pause button
function playPause() {
    if(ctrlIcon.classList.contains("fa-play")) {
        song.play();
        ctrlIcon.classList.add("fa-pause");
        ctrlIcon.classList.remove("fa-play");
    }

    else {
        song.pause();
        ctrlIcon.classList.add("fa-play");
        ctrlIcon.classList.remove("fa-pause");
    }
}

// Responsible for the Movement of song's progress bar 
if(song.play()) {
    setInterval(() => {
        progress.value = song.currentTime;
    },1000)
}

//forward OR backward the song with manuall change in the progress bar 
progress.onchange = function() {
    song.play();
    song.currentTime = progress.value;
    ctrlIcon.classList.add("fa-pause");
    ctrlIcon.classList.remove("fa-play");
}


// Forward function with a 5-second increment
function forWard() {
    if (song.currentTime + 5 < song.duration) {
        song.currentTime += 5;
        progress.value = song.currentTime;
    } else {
        song.currentTime = song.duration;
        progress.value = song.currentTime;
    }
    song.play();
    ctrlIcon.classList.add("fa-pause");
    ctrlIcon.classList.remove("fa-play");
}

// Backward function with a 5-second decrement
function backWard() {
    if (song.currentTime - 5 > 0) {
        song.currentTime -= 5;
        progress.value = song.currentTime;
    } else {
        song.currentTime = 0;
        progress.value = song.currentTime;
    }
    song.play();
    ctrlIcon.classList.add("fa-pause");
    ctrlIcon.classList.remove("fa-play");
}
