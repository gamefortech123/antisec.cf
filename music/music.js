var context = new(window.AudioContext || window.webkitAudioContext) // Create an audio context

// Create an XML HTTP Request to collect your audio files
// https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
var xhr1 = new XMLHttpRequest();
var xhr2 = new XMLHttpRequest();
var audio_buffer_1, audio_buffer_2;
xhr1.open("GET","music/dark.mp3");
xhr1.responseType = 'arraybuffer';
xhr1.onload = function() {
  // Decode the audio data
  context.decodeAudioData(request.response, function(buffer) {
    audio_buffer_1 = buffer;
  }, function(error){});
};

xhr2.open("GET","music/dark.mp3");
xhr2.responseType = 'arraybuffer';
xhr2.onload = function() {
  // Decode the audio data
  context.decodeAudioData(request.response, function(buffer) {
    audio_buffer_2 = buffer;
  }, function(error){});
};

xhr1.send();
xhr2.send();