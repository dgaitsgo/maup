import p5 from 'p5'

/*
 * getLevel() from the p5.Amplitude object
 * and map it to the ellipse position.
 */

var soundFile;
var amplitude;
var mapMax = 1.0;

function preload() {
  // load the sound, but don't play it yet
  soundFile = loadSound('assets/Stabs.wav')
}

function setup() {
  c = createCanvas(windowWidth, windowHeight);
  background(0);
  fill(255);
  noStroke();

  mic = new p5.AudioIn();

  // soundFile.play();

  amplitude = new p5.Amplitude();
  amplitude.setInput(mic);
  // amplitude.smooth(0.8); // <-- try this!
}

function draw() {
  background(0);

  var level = amplitude.getLevel();
  text('Amplitude: ' + level, 20, 20);
  text('mapMax: ' + mapMax, 20, 40);

  // map ellipse height
  var ellipseHeight = map(level, 0, mapMax, height, 0);
  ellipse(width/2, ellipseHeight, 100, 100);
}



export default Visuals
