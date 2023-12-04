import Plyr from "plyr";
export default class Lightbox {
  constructor(el) {
    this.el = el;

    // play video button
    this.playVideoButton = el.querySelectorAll(".c-lightbox--trigger");
    var playVideoButton = this.playVideoButton[0];

    // lightbox container
    this.lightboxContainer = el.querySelectorAll(".c-lightbox");
    var lightboxContainer = this.lightboxContainer[0];
    lightboxContainer.addEventListener("animationend", lightboxContainerAnimationEnd, false);

    // lightbox container background
    this.lightboxContainerBackground = el.querySelectorAll(".c-lightbox--background");
    var lightboxContainerBackground = this.lightboxContainerBackground[0];

    // video
    this.videoPlayer = el.querySelectorAll(".c-lightbox--content");
    var videoPlayer = this.videoPlayer[0]; // easier variable

    // open lightbox
    playVideoButton.addEventListener( "click", handleVideoButtonClick );

    // close lightbox
    lightboxContainerBackground.addEventListener( "click", handleLightboxContainerBackgroundClick ); // function on click

    function handleVideoButtonClick(e) {
      e.preventDefault();
      console.log('clicked video play button');
      if ( !lightboxContainer.classList.contains('active') ) {
        lightboxContainer.classList.add('active');
      } else {
        lightboxContainer.classList.remove('active');
      }
    }

    // run when lightbox fade in keyframe animation ends
    function lightboxContainerAnimationEnd(event) {
      lightboxContainerBackground.classList.add('background-visible'); // add class when faded in
      videoPlayer.classList.add('video-active');
      player.play();
    }

    // close lightbox
    function handleLightboxContainerBackgroundClick(event) {
      lightboxContainer.classList.remove('active');
      videoPlayer.classList.remove('video-active');
      lightboxContainerBackground.classList.remove('background-visible');
      player.stop();
    }

    const player = new Plyr("[data-video]", {
      autoplay: false,
    });

    this.init();
  }

  init() {

  }
}

