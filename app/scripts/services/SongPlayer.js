(function() {
  function SongPlayer($rootScope, Fixtures) {
    var SongPlayer = {};

    /**
        * @desc Information for current album
        * @type {Object}
        */

    var currentAlbum = Fixtures.getAlbum();

    var getSongIndex = function(song) {
     return currentAlbum.songs.indexOf(song);
    };
    SongPlayer.currentSong = null;
    /**
    * @desc Current playback time (in seconds) of currently playing song
    * @type {Number}
    */
    SongPlayer.currentTime = null;

    /**
    * @desc Buzz object audio file
    * @type {Object}
    */
    var currentBuzzObject = null;

    /**
   * @function setSong
   * @desc Stops currently playing song and loads new audio file as currentBuzzObject
   * @param {Object} song
   */
    var setSong = function(song) {

      if (currentBuzzObject) {
      currentBuzzObject.stop();

      if (SongPlayer.currentSong)
      {
      SongPlayer.currentSong.playing = null;
       }
      }
    
      currentBuzzObject = new buzz.sound(song.audioUrl, {
        formats: ['mp3'],
        preload: true
      });

      currentBuzzObject.bind('timeupdate', function() {
         $rootScope.$apply(function() {
             SongPlayer.currentTime = currentBuzzObject.getTime();
         });
     });

      SongPlayer.currentSong = song;

    };

    /**
    * @function playSong
    * @desc Play a song
    * @param {Object} song
    */

    var playSong = function(song) {
      currentBuzzObject.play();
      song.playing = true;
      };

    SongPlayer.play = function(song) {
      song = song || SongPlayer.currentSong;
       if (currentSong !== song) {
        setSong(song);
        currentBuzzObject.play();
        song.playing = true;
      } else if (SongPlayer.currentSong === song) {
          if (currentBuzzObject.isPaused()) {
              currentBuzzObject.play();
          }
      }
    };

    SongPlayer.pause = function(song) {
      song = song || SongPlayer.currentSong;
      currentBuzzObject.pause();
      song.playing = false;
      };       

    /**
      * @function previous
      * @desc Set song to previous song in album
      */
    SongPlayer.previous = function() {
       var currentSongIndex = getSongIndex(SongPlayer.currentSong);
       currentSongIndex--;

       if (currentSongIndex < 0) {
           currentBuzzObject.stop();
           SongPlayer.currentSong.playing = null;
       } else {
           var song = currentAlbum.songs[currentSongIndex];
           setSong(song);
           playSong(song);
       }
    };

     /**
      * @function next
      * @desc Set song to next song in album
      */
      SongPlayer.next = function() {
          var currentSongIndex = getSongIndex(SongPlayer.currentSong);
          currentSongIndex++;

          var lastSongIndex = currentAlbum.songs.length - 1;

            if (currentSongIndex > lastSongIndex) {
                stopSong(SongPlayer.currentSong);
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };

     /**
     * @function setCurrentTime
     * @desc Set current time (in seconds) of currently playing song
     * @param {Number} time
     */
     SongPlayer.setCurrentTime = function(time) {
         if (currentBuzzObject) {
             currentBuzzObject.setTime(time);
         }
     };

     /**
     * @function setVolume
     * @desc Set volume of the song player
     * @param {Number} volume
     */
    SongPlayer.setVolume = function(volume) {
      if (currentBuzzObject) {
        currentBuzzObject.setVolume(volume)
      }
    };
 
     angular
       .module('blocJams')
       .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
}});

