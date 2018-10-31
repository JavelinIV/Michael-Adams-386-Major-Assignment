var loading;
var button;
var osc, env, effect;
var currentPositionX;
var currentPositionY;
var scalePitch = [0,63,66,68,70,73,75,78,80,82,85];
var filterLevel = [0,100, 200, 400, 1000]
var dynamicLevel = [0, 0.2, 0.4, 0.7, 0.9]
var currentKey = 'DOWN';
var sustain = false;
var sustainValue = 0.9
var backingTrack = false
var reverb
var distortion
var delay
var song

function soundLoaded(song){
  button = createButton('Start!');
  button.position(width*0.45, height*0.75);
  button.size((windowWidth*0.16), (windowHeight*0.212));
  button.mousePressed(changeLoadState);
  backingTrackFile = song;
  backingTrackFile.play();
  backingTrackFile.loop()
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  background(30, 68, 30)
  fill('#119822');
  textSize(50);
  loading = true
  distortion = new p5.Distortion(0.8);
  modulator1 = new p5.Oscillator();
  modulator1.setType('sine');
  modulator1.amp(300, 0.1); //modulation depth
  modulator1.freq(30);
  modulator1.disconnect();
  modulator1.start();
  lowPassed = new p5.LowPass();
  lowPassed.freq(1000);
  reverb = new p5.Reverb(2,1);
  delay = new p5.Delay();
  delay.delayTime(0.2);
  env1 = new p5.Env();
  env1.setADSR(0.01, 0.0, 0.9, 0.5);
  env1.setExp();
  env2 = new p5.Env();
  env2.setADSR(0.01, 0.0, 0.9, 0.5);
  env2.setExp();
  env3 = new p5.Env();
  env3.setADSR(0.01, 0.0, 0.9, 0.5);
  env3.setExp();
  env4 = new p5.Env();
  env4.setADSR(0.01, 0.0, 0.9, 0.5);
  env4.setExp();
  osc1 = new p5.Oscillator();
  osc1.setType('triangle');
  osc1.amp(env1);
  osc1.disconnect()
  osc1.connect(distortion)
  osc1.start();
  osc2 = new p5.Oscillator();
  osc2.setType('sine');
  osc2.amp(env2);
  osc2.disconnect()
  osc2.connect(delay)
  osc2.start();
  osc3 = new p5.Oscillator();
  osc3.setType('sawtooth');
  osc3.amp(env3);
  osc3.disconnect()
  osc3.connect(reverb)
  osc3.start();
  osc4 = new p5.Oscillator();
  osc4.setType('sine');
  osc4.amp(env4);
  osc4.disconnect()
  osc4.connect(lowPassed)
  osc4.start();

  soundFormats('mp3','wav');
  backingTrackFile = loadSound('/assets/backingTrack.mp3', soundLoaded);
  backingTrackFile.setVolume(0.0);
}

function draw() {
  if(loading === true){
    background(25);
    strokeWeight(4);
    stroke(255);
    for(i = 0; i < 10; i++){
      fill(15, 119, 7)
      rect((i*(windowWidth*0.09)+(windowWidth*0.1)),(windowHeight*0.05), (windowWidth*0.06), (windowHeight*0.106))
      fill(29, 163, 19)
      rect((i*(windowWidth*0.09)+(windowWidth*0.08)),(windowHeight*0.20), (windowWidth*0.06), (windowHeight*0.106))
      fill(54, 211, 42)
      rect((i*(windowWidth*0.09)+(windowWidth*0.09)),(windowHeight*0.35), (windowWidth*0.06), (windowHeight*0.106))
      fill(117, 255, 107)
      rect((i*(windowWidth*0.09)+(windowWidth*0.11)),(windowHeight*0.50), (windowWidth*0.06), (windowHeight*0.106))
    }
    fill(155, 255, 147)
    rect((windowWidth*0.09),windowHeight*0.80, (windowWidth*0.33), (windowHeight*0.106))
    rect((windowWidth*0.7),windowHeight*0.68, (windowWidth*0.06), (windowHeight*0.106))
    rect((windowWidth*0.7),windowHeight*0.80, (windowWidth*0.06), (windowHeight*0.106))
    rect((windowWidth*0.633),windowHeight*0.80, (windowWidth*0.06), (windowHeight*0.106))
    rect((windowWidth*0.767),windowHeight*0.80, (windowWidth*0.06), (windowHeight*0.106))
    textSize(70)
    fill(54, 211, 42)
    text('PITCH', windowWidth*0.45, windowHeight*0.69);
    text('SUSTAIN', windowWidth*0.18, windowHeight*0.98);
    text('SOUND', windowWidth*0.67, windowHeight*0.98);
    text('D', windowWidth*0.023, windowHeight*0.17)
    text('Y', windowWidth*0.023, windowHeight*0.23)
    text('N', windowWidth*0.022, windowHeight*0.29)
    text('A', windowWidth*0.023, windowHeight*0.35)
    text('M', windowWidth*0.02, windowHeight*0.41)
    text(' I', windowWidth*0.02, windowHeight*0.47)
    text('C', windowWidth*0.022, windowHeight*0.53)
    stroke(25);
    text('Z', windowWidth*0.13, windowHeight*0.58)
    text('A', windowWidth*0.11, windowHeight*0.43)
    text('Q', windowWidth*0.095, windowHeight*0.28)
    text('2', windowWidth*0.12, windowHeight*0.125)
    text('/', windowWidth*0.94, windowHeight*0.58)
    text(';', windowWidth*0.925, windowHeight*0.43)
    text('P', windowWidth*0.91, windowHeight*0.28)
    text('-', windowWidth*0.93, windowHeight*0.125)
    text('🡡', windowWidth*0.712, windowHeight*0.75)
    text('🡣', windowWidth*0.712, windowHeight*0.88)
    text('🡠', windowWidth*0.645, windowHeight*0.88)
    text('🡢', windowWidth*0.779, windowHeight*0.88)

  }
  else{
    removeElements();
    background(30, 68, 30);
    if(backingTrack === true){
      backingTrackFile.setVolume(0.5);
    }
    else{
      backingTrackFile.setVolume(0.0);
    }
    if( key === 'z'){      currentPositionX = 1;    currentPositionY = 1;    console.log(currentPositionX);  }
    if( key === 'x'){      currentPositionX = 2;    currentPositionY = 1;    console.log(currentPositionX);  }
    if( key === 'c'){      currentPositionX = 3;    currentPositionY = 1;    console.log(currentPositionX);  }
    if( key === 'v'){      currentPositionX = 4;    currentPositionY = 1;    console.log(currentPositionX);  }
    if( key === 'b'){      currentPositionX = 5;    currentPositionY = 1;    console.log(currentPositionX);  }
    if( key === 'n'){      currentPositionX = 6;    currentPositionY = 1;    console.log(currentPositionX);  }
    if( key === 'm'){      currentPositionX = 7;    currentPositionY = 1;    console.log(currentPositionX);  }
    if( key === ','){      currentPositionX = 8;    currentPositionY = 1;    console.log(currentPositionX);  }
    if( key === '.'){      currentPositionX = 9;    currentPositionY = 1;    console.log(currentPositionX);  }
    if( key === '/'){      currentPositionX = 10;   currentPositionY = 1;    console.log(currentPositionX);  }
    if( key === 'a'){      currentPositionX = 1;    currentPositionY = 2;    console.log(currentPositionX);  }
    if( key === 's'){      currentPositionX = 2;    currentPositionY = 2;    console.log(currentPositionX);  }
    if( key === 'd'){      currentPositionX = 3;    currentPositionY = 2;    console.log(currentPositionX);  }
    if( key === 'f'){      currentPositionX = 4;    currentPositionY = 2;    console.log(currentPositionX);  }
    if( key === 'g'){      currentPositionX = 5;    currentPositionY = 2;    console.log(currentPositionX);  }
    if( key === 'h'){      currentPositionX = 6;    currentPositionY = 2;    console.log(currentPositionX);  }
    if( key === 'j'){      currentPositionX = 7;    currentPositionY = 2;    console.log(currentPositionX);  }
    if( key === 'k'){      currentPositionX = 8;    currentPositionY = 2;    console.log(currentPositionX);  }
    if( key === 'l'){      currentPositionX = 9;    currentPositionY = 2;    console.log(currentPositionX);  }
    if( key === ';'){      currentPositionX = 10;   currentPositionY = 2;    console.log(currentPositionX);  }
    if( key === 'q'){      currentPositionX = 1;   currentPositionY = 3;    console.log(currentPositionX);  }
    if( key === 'w'){      currentPositionX = 2;    currentPositionY = 3;    console.log(currentPositionX);  }
    if( key === 'e'){      currentPositionX = 3;    currentPositionY = 3;    console.log(currentPositionX);  }
    if( key === 'r'){      currentPositionX = 4;    currentPositionY = 3;    console.log(currentPositionX);  }
    if( key === 't'){      currentPositionX = 5;    currentPositionY = 3;    console.log(currentPositionX);  }
    if( key === 'y'){      currentPositionX = 6;    currentPositionY = 3;    console.log(currentPositionX);  }
    if( key === 'u'){      currentPositionX = 7;    currentPositionY = 3;    console.log(currentPositionX);  }
    if( key === 'i'){      currentPositionX = 8;    currentPositionY = 3;    console.log(currentPositionX);  }
    if( key === 'o'){      currentPositionX = 9;    currentPositionY = 3;    console.log(currentPositionX);  }
    if( key === 'p'){      currentPositionX = 10;   currentPositionY = 3;    console.log(currentPositionX);  }
    if( key === '2'){      currentPositionX = 1;    currentPositionY = 4;    console.log(currentPositionX);  }
    if( key === '3'){      currentPositionX = 2;    currentPositionY = 4;    console.log(currentPositionX);  }
    if( key === '4'){      currentPositionX = 3;    currentPositionY = 4;    console.log(currentPositionX);  }
    if( key === '5'){      currentPositionX = 4;    currentPositionY = 4;    console.log(currentPositionX);  }
    if( key === '6'){      currentPositionX = 5;    currentPositionY = 4;    console.log(currentPositionX);  }
    if( key === '7'){      currentPositionX = 6;    currentPositionY = 4;    console.log(currentPositionX);  }
    if( key === '8'){      currentPositionX = 7;    currentPositionY = 4;    console.log(currentPositionX);  }
    if( key === '9'){      currentPositionX = 8;    currentPositionY = 4;    console.log(currentPositionX);  }
    if( key === '0'){      currentPositionX = 9;    currentPositionY = 4;    console.log(currentPositionX);  }
    if( key === '-'){      currentPositionX = 10;   currentPositionY = 4;    console.log(currentPositionX);  }

    if( keyCode === UP_ARROW){   currentKey = 'UP'     }
    if( keyCode === DOWN_ARROW){  currentKey = 'DOWN'   }
    if( keyCode === LEFT_ARROW){   currentKey = 'LEFT'    }
    if( keyCode === RIGHT_ARROW){   currentKey = 'RIGHT'    }

    if(sustain === false){
      sustainValue = 0.5
    }
    if(sustain === true){
      sustainValue = 5
    }
    osc1.freq(midiToFreq(scalePitch[currentPositionX]));
    osc2.freq(midiToFreq(scalePitch[currentPositionX]));
    osc3.freq(midiToFreq(scalePitch[currentPositionX]));
    osc4.freq(midiToFreq(scalePitch[currentPositionX]));
    osc4.freq(modulator1);
    env1.setADSR(0.01, 0.0, (dynamicLevel[currentPositionY])*0.01, sustainValue);
    env2.setADSR(0.01, 0.0, (dynamicLevel[currentPositionY]), sustainValue);
    env3.setADSR(0.01, 0.0, (dynamicLevel[currentPositionY]), sustainValue);
    env4.setADSR(0.01, 0.0, (dynamicLevel[currentPositionY])*0.4, sustainValue);
    ellipse(map(currentPositionX, 1, 10, 50, (windowWidth-50)), map(currentPositionY, 1,4, (windowHeight-50), 50), 95,95);
  }
}

function keyPressed(){
  if( currentKey === 'UP'){
    env1.play();
  }
  if( currentKey === 'DOWN'){
    env2.play();
  }
  if( currentKey === 'LEFT'){
    env3.play();
  }
  if( currentKey === 'RIGHT'){
    env4.play();
  }
  if( key === ' '){
    sustain = !sustain
  }
}

function changeLoadState() {
  loading = false;
}

function doubleClicked(){
  backingTrack = !backingTrack
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
