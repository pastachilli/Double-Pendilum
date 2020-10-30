// =============================================================================
// Program: Double Pendilum Simulator
// Author: Gabe Postacchini
// Description: Double Pendilum Simulator, largely based on the Code Train Project 
// Date Last Modified: 10-30-2020  
// Version: 1.2

// 'use strict';

// =============================================================================


// External Force Variables:
let g = 1;
let dr = 0.999
let trailLength = 10000;
let coords = [0, 0];
let button;

// Circle 1 Variables:
let c1x = 0;
let c1y = 0;
let c1v = 0
let a1 = 3;
let m1 = 25
let r1 = 200;


// Circle 2 Variables:
let c2x = 0;
let c2y = 0;
let c2v = 0;
let a2 = 0;
let m2 = 25;
let r2 = 200;

// Sliders and Buttons:

function setup() {
  createCanvas(windowWidth, windowHeight);
  translate(windowWidth / 2, windowHeight / 6);
  
  // Sliders text and buttons:
  slider1 = createSlider(100, 500, 200);
  slider1.position(25, 60);
  slider1.style('width', '200px');
  
  slider2 = createSlider(100, 500, 200);
  slider2.position(25, 100);
  slider2.style('width', '200px')
  
  slider3 = createSlider(10, 250, 25);
  slider3.position(25, 140);
  slider3.style('width', '200px')
  
  slider4 = createSlider(10, 250, 25);
  slider4.position(25, 180);
  slider4.style('width', '200px')
  
  slider5 = createSlider(0, 10, 1);
  slider5.position(25, 220);
  slider5.style('width', '200px')
  
  slider6 = createSlider(0.5, 1, 1, 0.001);
  slider6.position(25, 260);
  slider6.style('width', '200px')
  
  slider7 = createSlider(0, 10000, 0, 2);
  slider7.position(25, 300);
  slider7.style('width', '200px')
  
  button1= createButton('Reset');
  button1.position(25, 340);
  button1.mousePressed(reset);
}
function reset () {
  a1 = 3
  a2 = 0
  c1v = 0
  c2v = 0
  c1a = 0
  c2a = 0
  coords = [];
  
}

function draw() {
  translate(windowWidth / 2, windowHeight / 6);
  background(100);
  
  // Trail
  coords.push(c2x);
  coords.push(c2y);
  
  for(i = coords.length; i > 0; i -= 2){
    line(coords[i] + 0, coords[i - 1] + 0, coords[i - 2], coords[i - 3]);
  }
  
  while(coords.length > trailLength){
      coords.shift();
  } 
  
  c1x = r1 * sin(a1); // c1x calculation
  c1y = r1 * cos(a1); // c1y calculation
  
  c2x = c1x + r2 * sin(a2) // c2x calculation
  c2y = c1y + r2 * cos(a2) // c2y calculation
  
  // Large Equation Definitions:

// Equation 1
let eq1 = -g * (2 * m1 + m2) * sin(a1);
let eq2 = m2 * g * sin(a1 - 2 * a2);
let eq3 = 2 * sin(a1 - a2) * m2;
let eq4 = (c2v * c2v * r2) + (c1v * c1v * r1 * cos(a1 - a2));
let den1 = r1 * (2 * m1 + m2 - m2 * cos(2 * a1 - 2 * a2));
let c1a = (eq1 - eq2 - eq3 * eq4) / den1;

// Equation 2
let eq5 = 2 * sin(a1 - a2);
let eq6 = c1v * c1v * r1 * (m1 + m2);
let eq7 = g * (m1 + m2) * cos(a1);
let eq8 = c2v * c2v * r2 * m2 * cos(a1 - a2);
let den2 = r2 * (2 * m1 + m2 - m2 * cos(2 * a1 - 2 * a2));
let c2a = (eq5 * (eq6 + eq7 + eq8)) / den2;
  
  
  c1v += c1a;
  c2v += c2a;
  a2 += c2v;
  a1 += c1v;
  c1v *= dr
  c2v *= dr  
  
  // Drawing to canvas:
  
  strokeWeight(3);
  line(0, 0, c1x, c1y); // Line 1
  line(c1x, c1y, c2x, c2y) // Line 2
  
  fill('black');
  circle(0,0,20);
  fill('white');
  circle(c1x, c1y, m1); // Circle 1
  circle(c2x, c2y, m2); // Circle 2
  
  // Sliders and text:
  translate(-windowWidth / 2, -windowHeight / 6);
  
  strokeWeight(1)
  fill('grey');
  rect(0, 0, 300, 400);
  
  fill('black');
  textSize(20);
  textStyle(BOLD);
  
  text('Double Pendilum Simulator', 20, 30);
  
  textSize(12);
  textStyle(NORMAL);
  
  text('R1 Slider :' + r1, 50, 60)
  let val1 = slider1.value();
  r1 = val1;
  
  text('R2 Slider :' + r2, 50, 100)
  let val2 = slider2.value();
  r2 = val2;
  
  text('M1 Slider :' + m1,50, 140)
  let val3 = slider3.value();
  m1 = val3;
  
  text('M2 Slider :' + m2, 50, 180)
  let val4 = slider4.value();
  m2 = val4;
  
  text('Gravity Slider :' + g, 50, 220)
  let val5 = slider5.value();
  g = val5;
  
  text('Decay Rate :' + dr, 50, 260)
  let val6 = slider6.value();
  dr = val6;
  
  text('Trail Length :' + trailLength, 50, 300)
  let val7 = slider7.value();
  trailLength = val7;
   
   // Drawing circles and lines
  translate(windowWidth / 2, windowHeight / 6);
  strokeWeight(3);
  line(0, 0, c1x, c1y); // Line 1
  line(c1x, c1y, c2x, c2y) // Line 2
  
  fill('black');
  circle(0,0,20);
  fill('white');
  circle(c1x, c1y, m1); // Circle 1
  circle(c2x, c2y, m2); // Circle 2
}



// Event Listener:
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}