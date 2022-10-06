// declare global album variables
const album1 = document.querySelector('#album1-img');
const album2 = document.querySelector('#album2-img');
const album3 = document.querySelector('#album3-img');
const album4 = document.querySelector('#album4-img');
//const turntable = document.querySelector('#turntable-img');

// declare audios
const song1 = new Audio('../media/dhl.mp3');
const song2 = new Audio('../media/arctic-monkeys.mp3');
const song3 = new Audio('../media/one-more-hour.mp3');
const song4 = new Audio('../media/redbone.mp3');

// booleans for albums
let a1Clicked = false;
let a2Clicked = false;
let a3Clicked = false;
let a4Clicked = false;

// variables for mouse vinyl
let mouseVinyl = document.querySelector("#mouse-vinyl");

//declare global variables for position
const turntableX = 50;
const turntableY = 50;
const turntableW = 300;
const turntableH = 300;
let turntableClicked = false;

const vinylX = 150;
const vinylY = 150;
const vinylDL = 150;
const vinylDM = 50;
const vinylDS = 15;
let vinylClicked = false;

const jointX = 265;
const jointY = 80; 

const armX = 261;
const armY = 90;

const stylistX = 259; 
const stylistY = 180;

const pathX = 300;
const pathY = 100;

const knobX = 298;
const knobY = 120;

let vinyl, tonearm, slider, turntable;

const followMouse = (e) => {
  const X = e.clientX;
  const Y = e.clientY;

  mouseVinyl.style.transform = `translate3d(${X - 250}px, ${Y - 300}px, 0)`;
};

function setup() {
  createCanvas(400, 400);
  
  vinyl = new Vinyl(vinylX, vinylY, vinylDL, vinylDM, vinylDS);
  turntable = new Turntable(turntableX, turntableY, turntableW, turntableH);
  tonearm = new Tonearm(armX, armY, jointX, jointY, stylistX, stylistY);
  slider = new Slider(pathX, pathY, knobX, knobY);
}

function draw() {
  background('white');
  noStroke();
  
  turntable.display();
  tonearm.display();
  slider.display();
  
  mouseClicked(); 
  
  if(turntableClicked == true && a1Clicked == true){
    vinyl.display();
    song1.play();
    vinylClicked = false;
    mouseVinyl.src = 'img/empty-vinyl.png';
    mouseVinyl.alt = 'transparent vinyl';
  }
  
  mouseClicked();
  
  if(vinylClicked == true && a1Clicked == true){
    //console.log('inside');
    turntable.display();
    tonearm.display();
    slider.display();
    turntableClicked = false;
    song1.pause();
    mouseVinyl.src = 'img/mouse-vinyl.png';
    mouseVinyl.alt = 'black vinyl record';
  }
}

function mouseClicked(){
  if(mouseIsPressed == true && a1Clicked == true){
    turntable.clicked();
    vinyl.clicked();
  }
}

function showAlbum1(value){
  a1Clicked = value;

  if (a1Clicked){
    mouseVinyl.src = 'img/mouse-vinyl.png';
    mouseVinyl.alt = 'black vinyl record';
  }
}

function Slider(pathX, pathY, knobX, knobY){
  this.pathX = pathX;
  this.pathY = pathY;
  this.knobX = knobX;
  this.knobY = knobY;
  
  this.display = function(){
    fill('white');
    rect(this.pathX, this.pathY, 15, 90);
    fill('black');
    rect(this.knobX, this.knobY, 19, 19);
  }
}

function Tonearm(armX, armY, jointX, jointY, stylistX, stylistY){
  this.armX = armX;
  this.armY = armY;
  this.jointX = jointX;
  this.jointY = jointY;
  this.stylistX = stylistX;
  this.stylistY = stylistY;
  
  this.display = function(){
    //arm
    fill('white');
    rect(this.armX, this.armY, 8, 90);
    //joint
    fill('black');
    circle(this.jointX, this.jointY, 30);
    //stylist
    fill('black');
    rect(this.stylistX, this.stylistY, 12, 20);
  }
}

function Vinyl(x, y, dl, dm, ds){
  this.x = x;
  this.y = y;
  this.dl = dl; // large diameter
  this.halfDL = dl/2;
  this.dm = dm; // medium diameter
  this.ds = ds; // small diameter
  
  this.display = function(){
    fill('black');
    circle(this.x, this.y, this.dl);
    fill('yellow');
    circle(this.x, this.y, this.dm);
    fill('black');
    circle(this.x, this.y, this.ds);
  }
  
  this.clicked = function(){
    let d = dist(mouseX, mouseY, this.x, this.y);
    // vinyl is clicked
    if (d < this.halfDL){ 
      vinylClicked = true;
    }
  }
}

function Turntable(x, y, w, h){
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.halfW = w/2;
  this.halfH = h/2;
  this.centerX = this.halfW + x;
  this.centerY = this.halfH + y;
  
  
  this.display = function(){
    fill('pink');
    rect(this.x, this.y, this.w, this.h);
  }
  
  this.clicked = function(){
    let d = dist(mouseX, mouseY, this.centerX, this.centerY);
    // turntable is clicked
    if (d < this.halfW){ 
      turntableClicked = true;
    }
  }
}

// event listener to follow mouse
window.addEventListener('mousemove', followMouse);

// if click on album1 run showAlbum1 function
album1.addEventListener('mousedown', () => {
  showAlbum1(true);
});

// if click on album2 run showAlbum2 function
album2.addEventListener('mousedown', () => {
  showAlbum2(true);
});

// if click on album3 run showAlbum3 function
album3.addEventListener('mousedown', () => {
  showAlbum3(true);
});

// if click on album4 run showAlbum4 function
album4.addEventListener('mousedown', () => {
  showAlbum4(true);
});
