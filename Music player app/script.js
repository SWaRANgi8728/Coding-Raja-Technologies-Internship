document.addEventListener('DOMContentLoaded', function() {
    let now_play = document.querySelector(".now-play");
    let track_art = document.querySelector(".track-art");
    let track_name = document.querySelector(".track-name");
    let track_artist = document.querySelector(".track-artist");

    let playpause_btn = document.querySelector(".playpause-track");
    let next_btn = document.querySelector(".next-track");
    let prev_btn = document.querySelector(".prev-track");

    let seek_slider = document.querySelector(".seek-slider");
    let volume_slider = document.querySelector(".volume-slider");
    let current_time = document.querySelector(".current-time");
    let total_duration = document.querySelector(".total-duration");

    // Specify global values
    let track_index = 0;
    let isPlaying = false;
    let updateTimer = 0;

    // Create audio element for the player
    let current_track = document.createElement('audio');

    // Define list of tracks 
    let tracklist = [
        {
            name: "Nature",
            artist: "Hotham",
            image: "img4.jpg",
            path: "Nature.mp3",
            bgColor:"#FA6E66"
        },
        {
            name: "Deva Deva",
            artist: "Arjit singh",
            image: "img3.png",
            path: "Deva Deva.mp3",
            bgColor:"#41bcf3"

        },
        {
            name: "Kabhi tumhe",
            artist: "Darshan ravel",
            image: "img1.jpg",
            path: "Kabhi Tumhe.mp3",
            bgColor:"#f79218"
        
        },
        {
        name: "Sweet Dreams",
        artist: "Batchbug",
        image: "nature.jpg",
        path: "batchbug-sweet-dream.mp3",
        bgColor:"#CD4770"
        }
    ];

    function loadTrack(track_index) {
        clearInterval(updateTimer);
        resetValues();

        
        current_track.src = tracklist[track_index].path;
        current_track.load();

        
        track_art.style.backgroundImage = "url(" + tracklist[track_index].image + ")";
        track_name.textContent = tracklist[track_index].name;
        track_artist.textContent = tracklist[track_index].artist;
        now_play.textContent = "Playing " + (track_index + 1) + " of " + tracklist.length;

        
        updateTimer = setInterval(seekUpdate, 1000);

        
        current_track.addEventListener("ended", nextTrack);

        let container = document.querySelector(".container");
        if (tracklist[track_index].bgColor) 
        {
           container.style.background = tracklist[track_index].bgColor;
        } 
        else 
        {
            container.style.background = ""; 
        }
    
    }

   
    function resetValues() {
        current_time.textContent = "00:00";
        total_duration.textContent = "00:00";
        seek_slider.value = 0;
    }

    function playpauseTrack() {
        if (!isPlaying) playTrack();
        else pauseTrack();
    }

    function playTrack() {
        current_track.play();
        isPlaying = true;

       
        playpause_btn.innerHTML = '<i class="fas fa-pause-circle fa-5x"></i>';
    }

    function pauseTrack() {
        current_track.pause();
        isPlaying = false;

        playpause_btn.innerHTML = '<i class="fas fa-play-circle fa-5x"></i>';
    }

    function nextTrack() {
        if (track_index < tracklist.length - 1)
            track_index += 1;
        else
            track_index = 0;

        
        loadTrack(track_index);
        playTrack();
    }

    function prevTrack() {
        if (track_index > 0)
            track_index -= 1;
        else
            track_index = tracklist.length - 1;

        
        loadTrack(track_index);
        playTrack();
    }

    function seekTo() {
        let seekto = current_track.duration * (seek_slider.value / 100);
        current_track.currentTime = seekto;
    }

    function setVolume() {
        current_track.volume = volume_slider.value / 100;
    }

    function seekUpdate() {
        let seekPosition = 0;

        if (!isNaN(current_track.duration)) {
            seekPosition = current_track.currentTime * (100 / current_track.duration);
            seek_slider.value = seekPosition;

            let currentMinutes = Math.floor(current_track.currentTime / 60);
            let currentSeconds = Math.floor(current_track.currentTime - currentMinutes * 60);
            let durationMinutes = Math.floor(current_track.duration / 60);
            let durationSeconds = Math.floor(current_track.duration - durationMinutes * 60);

            // Add zero to the single digit
            if (currentSeconds < 10) {
                currentSeconds = "0" + currentSeconds;
            }
            if (durationSeconds < 10) {
                durationSeconds = "0" + durationSeconds;
            }
            if (currentMinutes < 10) {
                currentMinutes = "0" + currentMinutes;
            }
            if (durationMinutes < 10) {
                durationMinutes = "0" + durationMinutes;
            }

            current_time.textContent = currentMinutes + ":" + currentSeconds;
            total_duration.textContent = durationMinutes + ":" + durationSeconds;
        }
    }

    // Load the 1st track
    loadTrack(track_index);

    // Event listeners
    playpause_btn.addEventListener("click", playpauseTrack);
    next_btn.addEventListener("click", nextTrack);
    prev_btn.addEventListener("click", prevTrack);


    seek_slider.addEventListener("input", seekTo);
    volume_slider.addEventListener("input", setVolume);
});




