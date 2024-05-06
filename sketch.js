let angle = 0.01;
let song, playbutton, fft, fileInput, x, y, bg, myFont, myFont2, fileName;
let ampColor = [0, 255, 0];
let cenColor = [0, 255, 0];
let bins = 16;
let Boxes = [];
let fileUpload = false;
let bgImages = [];
let currentBgIndex = 0;
let previousTime = 0;


//Loads sample song, background, and fonts.
function preload() {
  song = loadSound("Sound/mixkit-tech-house-vibes-130.mp3");
  bgImages[0] = loadImage("Image/Windows10.jpg");
  bgImages[1] = loadImage("Image/AppleCarplay.jpg");
  bgImages[2] = loadImage("Image/Treadmill2.jpg");

  //bg.resize(10000, 10000);
  myFont = loadFont("Font/Neon Rave.ttf");
  myFont2 = loadFont("Font/batmfa__.ttf");
  setBgImage();
}
//creates 3d canvas, play button, file upload, prepares for sound analyzation/sets volume
function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  playbutton = createButton("Play");
  playbutton.mousePressed(togglePlay);
  fft = new p5.FFT(0.8, bins);
  fileInput = createFileInput(handleFile);
  outputVolume(0.1);
}
function setBgImage(){
  bg = bgImages[currentBgIndex];
  // bg.resize(windowWidth,windowHeight);
  currentBgIndex++;
      print(currentBgIndex);
  if (currentBgIndex >= bgImages.length){
    currentBgIndex = 0;
  }
}
function toggleFullScreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else if (document.exitFullscreen) {
    document.exitFullscreen();
  }
}

document.addEventListener(
  'keydown',
  (e) => {
    if (e.key === 'Enter') {
      toggleFullScreen();
    }
  },
  false,
);

//checks to make sure uploaded file is audio then sets the current song to the uploaded files
function handleFile(file) {
  if (song.isPlaying()){
      song.stop();
  }
  if (file.type == "audio") {
    fileName = file.name;
    song = loadSound(file);
    fileUpload = true;
  }
}
//toggle play button
function togglePlay() {
  if (song.isPlaying()){
      song.stop();
  }
  if (!song.isPlaying()) {
    song.play();
  }
}

function draw() {
   if (millis() - previousTime > 30000) {
    // 30 seconds have passed, load next image
    setBgImage();
    previousTime = millis();
     clear();
     print("1");
  }
  background(0, 0, 0);
  push();
  //When no song is playing, displays instructions
  if (!song.isPlaying()) {
    textAlign(CENTER);
    fill("lime");
    textFont(myFont);
    textSize(32);
    text("Welcome!", 0, -100);
    textFont(myFont2);
    textSize(12);
    text('Press "Play" to view sample', 0, -25);
    text("OR", 0, 25);
    text("Upload audio file to view your own music", 0, 75);
  }
  //When song plays: displays song name, sets and rotates background
  if (song.isPlaying()) {
    push();
    translate(-windowWidth / 2, -windowHeight / 2); 
    // rotateZ(angle / 10);
    // angle += 0.001;
    // scale(0.8);
    background(0,0,0,0);
    image(bg, 0, 0, windowWidth, windowHeight);
    
    // texture(bg);
    // plane(2000, 2000);
    pop();
    if (fileUpload == true) {
      push();
      textSize(10);
      text("Now Playing: " + fileName, 0, -150);
      pop();
    } else {
      push();
      textSize(10);
      text("Now Playing: mixkit-tech-house-vibes-130.mp3", 0, -150);
      pop();
    }
    //rotates shape around x,y,z axis
    rotateX(angle*2);
    rotateY(angle*1.25);
    rotateZ(angle*2);
    angle += 0.01;
    //gathers information about song(amplitude,spectral centroid/Brightness)
    let spectrum = fft.analyze();
    for (let i = 0; i < spectrum.length; i++) {
      let spectralCentroid = fft.getCentroid();
      //Changes specular material color based on brightness of sound and controls y-value of blob
      if (spectralCentroid <= 0) {
        spectralCentroid = spectralCentroid + 20;
        cenColor = color(0, 255, 0, 247);
      }
      if (spectralCentroid > 0 && spectralCentroid <= 2500) {
        spectralCentroid = spectralCentroid / 1.2;
        cenColor = color(0, 255, 0, 247);
      }
      if (spectralCentroid > 2500 && spectralCentroid <= 5000) {
        spectralCentroid = spectralCentroid / 1.1;
        cenColor = color(173, 255, 47, 247);
      }
      if (spectralCentroid > 5000 && spectralCentroid <= 7000) {
        spectralCentroid = spectralCentroid * 1.1;
        cenColor = color(255, 255, 0, 247);
      }
      if (spectralCentroid > 7000) {
        spectralCentroid = spectralCentroid * 1.2;
        cenColor = color(255, 0, 0, 247);
      }
      //Changes blob fill color based on amplitude(volume) and controls x-value of blob
      if (spectrum[i] <= 0) {
        spectrum[i] = spectrum[i] + 20;
        ampColor = color(0, 255, 0, 247);
      }
      if (spectrum[i] > 0 && spectrum[i] <= 25) {
        spectrum[i] = spectrum[i] / 1.05;
        ampColor = color(0, 255, 0, 247);
      }
      if (spectrum[i] > 25 && spectrum[i] <= 50) {
        spectrum[i] = spectrum[i] / 1.05;
        ampColor = color(146, 255, 28, 247);
      }
      if (spectrum[i] > 50 && spectrum[i] <= 75) {
        spectrum[i] = spectrum[i] / 1.05;
        ampColor = color(225, 255, 30, 247);
      }
      if (spectrum[i] > 75 && spectrum[i] <= 100) {
        spectrum[i] = spectrum[i] / 1.05;
        ampColor = color(221, 235, 60, 247);
      }
      if (spectrum[i] > 100 && spectrum[i] <= 125) {
        spectrum[i] = spectrum[i] * 1.05;
        ampColor = color(255, 255, 0, 247);
      }
      if (spectrum[i] > 125 && spectrum[i] <= 150) {
        spectrum[i] = spectrum[i] * 1.1;
        ampColor = color(255, 213, 28, 247);
      }
      if (spectrum[i] > 150 && spectrum[i] <= 175) {
        spectrum[i] = spectrum[i] * 1.15;
        ampColor = color(255, 117, 28, 247);
      }
      if (spectrum[i] > 175 && spectrum[i] <= 200) {
        spectrum[i] = spectrum[i] * 1.2;
        ampColor = color(225, 0, 0, 247);
      }
      if (spectrum[i] > 200 && spectrum[i] <= 205) {
        spectrum[i] = spectrum[i] / 1.1;
        ampColor = color(255, 0, 0, 247);
      }
      if (spectrum[i] > 205) {
        spectrum[i] = spectrum[i] / 1.2;
        ampColor = color(255, 0, 0, 247);
      }
      //merges amplitude color and centroid color to make the fill for the blob
      let cenAmp = lerpColor(ampColor, cenColor, 0.33);
      //Makes new blobs based on previous information, do not ask why the array is called boxes and the class Cube, whenever I try to change them I start getting errors.
      Boxes.splice(
        0,
        0,
        new Cube(
          spectrum[i] * 1.15,
          spectralCentroid / 50,
          50,
          100,
          100,
          cenAmp,
          ampColor,
          cenColor
        )
      );
      spectrum.splice(0, 1);
    }
    //displays and lights the blob(s) in the sketch
    for (let v = 0; v < Boxes.length; v++) {
      Boxes[v].Show();
      Boxes[v].Light();
      Boxes.splice(0, 4);
    }
  }
}
//The blob creator
class Cube {
  //initializes local variables
  constructor(x, y, z, sidesX, sidesY, cenAmp, ampColor, cenColor) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.sidesX = sidesX;
    this.sidesY = sidesY;
    this.cenAmp = cenAmp;
    this.ampColor = ampColor;
    this.cenColor = cenColor;
  }
  //builds the blob
  Show() {
    fill(this.cenAmp);
    smooth();
    noStroke();
    frameRate(75);
    specularMaterial(this.cenColor);
    ellipsoid(this.x / 1.25, this.y / 1.75, this.z,this.sidesX,this.sidesY);
    shininess(100);
    // print(this.y);
  }
  //builds the directional lights and mouse based light
  Light() {
    lights();
    let xloc = mouseX - width / 2;
    let yloc = mouseY - height / 2;
    pointLight(127, 127, 127, xloc, yloc, 50);
    directionalLight(127, 127, 127, 1, 1, 1);
    directionalLight(127, 127, 127, 1, 0, 0);
    directionalLight(127, 127, 127, -1, 0, 0);
    directionalLight(127, 127, 127, -1, -1, -1);
    directionalLight(127, 127, 127, 0, 1, 0);
  }
}
    this.x = x;
    this.y = y;
    this.z = z;
    this.sidesX = sidesX;
    this.sidesY = sidesY;
    this.cenAmp = cenAmp;
    this.ampColor = ampColor;
    this.cenColor = cenColor;
  }
  //builds the blob
  Show() {
    fill(this.cenAmp);
    smooth();
    noStroke();
    frameRate(75);
    specularMaterial(this.cenColor);
    ellipsoid(this.x / 1.25, this.y / 1.75, this.z,this.sidesX,this.sidesY);
    shininess(100);
    // print(this.y);
  }
  //builds the directional lights and mouse based light
  Light() {
    lights();
    let xloc = mouseX - width / 2;
    let yloc = mouseY - height / 2;
    pointLight(127, 127, 127, xloc, yloc, 50);
    directionalLight(127, 127, 127, 1, 1, 1);
    directionalLight(127, 127, 127, 1, 0, 0);
    directionalLight(127, 127, 127, -1, 0, 0);
    directionalLight(127, 127, 127, -1, -1, -1);
    directionalLight(127, 127, 127, 0, 1, 0);
  }
}
