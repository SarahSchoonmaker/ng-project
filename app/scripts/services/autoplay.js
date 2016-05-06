SongPlayer.next = function() {
  var currentSongIndex = getSongIndex(SongPlayer.currentSong);
  currentSongIndex++;

  var lastSongIndex = currentAlbum.songs.length - 1;
  var nextSongIndex = currentAlbum.songs.length + 1;

    if (currentSongIndex > lastSongIndex) {
        stopSong(SongPlayer.currentSong);
    } else {
        var song = currentAlbum.songs[currentSongIndex];
        setSong(song);
        playSong(song);
    }
    if (currentSongIndex >= )
};


