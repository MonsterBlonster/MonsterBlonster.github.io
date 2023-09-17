/////////////////////////////////
//    Tölvugrafík, haust 2023 //
//     Frogger, verkefni 1    //
////////////////////////////////
var canvas;
var gl;
var locColor;
var score = 0;
var goalUpper = true;
var maxScores = 10;

var gray = vec4(0.6, 0.6, 0.6, 1.0);
var green = vec4(0.0, 1.0, 0.0, 1.0);
var blue = vec4(0.0, 0.0, 1.0, 1.0);
var white = vec4(1.0, 1.0, 1.0, 1.0);
var carColor1 = vec4(Math.random(), Math.random(), Math.random(), 1.0);
var carColor2 = vec4(Math.random(), Math.random(), Math.random(), 1.0);
var carColor3 = vec4(Math.random(), Math.random(), Math.random(), 1.0);
var carColor4 = vec4(Math.random(), Math.random(), Math.random(), 1.0);
var carColor5 = vec4(Math.random(), Math.random(), Math.random(), 1.0);
var carColor6 = vec4(Math.random(), Math.random(), Math.random(), 1.0);

window.onload = function init() {
  canvas = document.getElementById("gl-canvas");

  gl = WebGLUtils.setupWebGL(canvas);
  if (!gl) {
    alert("WebGL isn't available");
  }

  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.clearColor(0.2, 0.2, 0.2, 1.0);

  //  Load shaders and initialize attribute buffers
  var program = initShaders(gl, "vertex-shader", "fragment-shader");
  gl.useProgram(program);

  bufferId = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
  gl.bufferData(gl.ARRAY_BUFFER, 8 * 5000, gl.DYNAMIC_DRAW);

  locColor = gl.getUniformLocation(program, "rcolor");

  // Associate out shader variables with our data buffer
  vPosition = gl.getAttribLocation(program, "vPosition");
  gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(vPosition);

  // Event listener for keyboard
  window.addEventListener("keydown", function (e) {
    //To prevent the browser from scrolling when using arrows
    e.preventDefault();

    switch (e.keyCode) {
      case 37: // left arrow
        frogger.move(-0.05, 0.0);
        break;
      case 39: // right arrow
        frogger.move(0.05, 0.0);
        break;
      case 40: // down arrow
        frogger.move(0.0, -0.05);
        break;
      case 38: // up arrow
        frogger.move(0.0, 0.05);
        break;
      default:
    }
  });

  main();
};

var frogger = {
  vertices: [vec2(-0.05, -1.0), vec2(0.0, -0.9), vec2(0.05, -1.0)],

  move: function (x, y) {
    // Check if movement would put triangle out of bounds
    let outOfBounds = false;
    for (let i = 0; i < 3; i++) {
      let newVertex = add(this.vertices[i], vec2(x, y));
      if (
        newVertex[0] > 1.0 ||
        newVertex[0] < -1.0 ||
        newVertex[1] > 1.0 ||
        newVertex[1] < -1.0
      ) {
        outOfBounds = true;
        break;
      }
    }

    // If not out of bounds, apply translation
    if (!outOfBounds) {
      for (let i = 0; i < 3; i++) {
        this.vertices[i] = add(this.vertices[i], vec2(x, y));
      }
    }
  },

  checkForCollision: function (carVertices) {
    var froggerLeft = Math.min(
      this.vertices[0][0],
      this.vertices[1][0],
      this.vertices[2][0]
    );
    var froggerRight = Math.max(
      this.vertices[0][0],
      this.vertices[1][0],
      this.vertices[2][0]
    );
    var froggerTop = Math.max(
      this.vertices[0][1],
      this.vertices[1][1],
      this.vertices[2][1]
    );
    var froggerBottom = Math.min(
      this.vertices[0][1],
      this.vertices[1][1],
      this.vertices[2][1]
    );

    var carX1 = carVertices[0][0];
    var carX2 = carVertices[2][0];
    var carY1 = carVertices[0][1];
    var carY2 = carVertices[1][1];

    if (
      froggerLeft <= carX2 &&
      froggerRight >= carX1 &&
      ((froggerTop >= carY1 && froggerBottom <= carY2) ||
        (froggerBottom <= carY1 && froggerTop >= carY2))
    ) {
      // Collision detected
      return true;
    }

    return false;
  },

  render: function () {
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
    gl.bufferSubData(gl.ARRAY_BUFFER, 0, flatten(this.vertices));

    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.uniform4fv(locColor, flatten(green));
    gl.drawArrays(gl.TRIANGLE_FAN, 0, this.vertices.length);
  },
};

var sidewalks = {
  vertices1: [
    vec2(1.0, 1.0),
    vec2(1.0, 0.75),
    vec2(-1.0, 0.75),
    vec2(-1.0, 1.0),
  ],

  vertices2: [
    vec2(-1.0, -1.0),
    vec2(-1.0, -0.75),
    vec2(1.0, -0.75),
    vec2(1.0, -1.0),
  ],

  render: function (vertices) {
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
    gl.bufferSubData(gl.ARRAY_BUFFER, 0, flatten(vertices));

    // Draw sidewalks
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.uniform4fv(locColor, flatten(gray));
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
  },

  drawSidewalks: function () {
    this.render(this.vertices1);
    this.render(this.vertices2);
  },
};

var carLanes = {
  laneWidth: 0.02, //width of lines generated
  laneSegmentWidth: 0.3, //width between line instances
  numRows: 4,

  generateLaneSegment: function (startX, startY) {
    let vertices = [
      [startX, startY],
      [startX, startY + this.laneWidth],
      [startX + this.laneSegmentWidth, startY],
      [startX + this.laneSegmentWidth, startY + this.laneWidth],
    ];
    return vertices;
  },

  render: function () {
    for (let row = 0; row < this.numRows; row++) {
      let startY = -0.5 + row * (this.laneWidth + this.laneSegmentWidth);
      for (let col = 0; col < 5; col++) {
        let startX = -1.1 + col * (this.laneSegmentWidth + this.laneSegmentWidth);
        let vertices = this.generateLaneSegment(startX, startY);

        gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
        gl.bufferSubData(gl.ARRAY_BUFFER, 0, flatten(vertices));

        gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
        gl.uniform4fv(locColor, flatten(white));
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, vertices.length);
      }
    }
  },
};

var leftCars = {
  position: vec2(0, 0),
  vertices: [
    // Car 1
    [vec2(0.2, 0.53), vec2(0.2, 0.72), vec2(1.5, 0.72), vec2(1.5, 0.53)],
    // Car 2
    [vec2(1.0, 0.13), vec2(1.0, -0.14), vec2(1.5, -0.14), vec2(1.5, 0.13)],
    // Car 3
    [vec2(1.0, -0.73), vec2(1.0, -0.52), vec2(1.5, -0.52), vec2(1.5, -0.73)],
  ],

  driveCarLeft: function (carIndex) {
    var vertices = this.vertices[carIndex];
    // Set car speed
    for (var i = 0; i < vertices.length; i++) {
      if (vertices == this.vertices[0]) {
        vertices[i][0] += 0.0065;
      } else if (vertices == this.vertices[1]) {
        vertices[i][0] += 0.0055;
      } else {
        vertices[i][0] += 0.0030;
      }
      // Get new car in lane
      if (vertices[i][0] > 1.5) {
        var p = (i + 2) % vertices.length;
        vertices[i][0] = -1.0;
        vertices[p][0] = -1.5;
      }
    }
  },

  render: function (carIndex) {
    var vertices = this.vertices[carIndex];
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
    gl.bufferSubData(gl.ARRAY_BUFFER, 0, flatten(vertices));

    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    if (carIndex == 0) {
      gl.uniform4fv(locColor, flatten(carColor1));
    } else if (carIndex == 1) {
      gl.uniform4fv(locColor, flatten(carColor2));
    } else {
      gl.uniform4fv(locColor, flatten(carColor3));
    }
    gl.drawArrays(gl.TRIANGLE_FAN, 0, vertices.length);

    this.driveCarLeft(carIndex);
  },

  startleftCars: function () {
    for (var i = 0; i < this.vertices.length; i++) {
      this.render(i);
    }
  },
};

var rightCars = {
  position: vec2(0, 0),
  vertices: [
    // Car 1
    [vec2(0.2, 0.2), vec2(0.2, 0.43), vec2(1.5, 0.43), vec2(1.5, 0.2)],
    // Car 2
    [vec2(1.0, -0.45), vec2(1.0, -0.2), vec2(1.5, -0.2), vec2(1.5, -0.45)],
    // Car 3
    [vec2(2.0, -0.45), vec2(2.0, -0.2), vec2(2.5, -0.2), vec2(2.5, -0.45)],
  ],

  driveCarRight: function (carIndex) {
    var vertices = this.vertices[carIndex];
    for (var i = 0; i < vertices.length; i++) {
      if (vertices == this.vertices[0]) {
        vertices[i][0] -= 0.007; // Subtract to move left
      } else if (vertices == this.vertices[1]) {
        vertices[i][0] -= 0.004;
      } else {
        vertices[i][0] -= 0.004;
      }
      if (vertices[i][0] < -1.5) {
        var p = (i + 2) % vertices.length;
        vertices[i][0] = 1.0; // Reset to right side
        vertices[p][0] = 1.5; // Reset to right side
      }
    }
  },

  render: function (carIndex) {
    var vertices = this.vertices[carIndex];
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
    gl.bufferSubData(gl.ARRAY_BUFFER, 0, flatten(vertices));

    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    if (carIndex == 0) {
      gl.uniform4fv(locColor, flatten(carColor4));
    } else if (carIndex == 1) {
      gl.uniform4fv(locColor, flatten(carColor5));
    } else {
      gl.uniform4fv(locColor, flatten(carColor6));
    }
    gl.drawArrays(gl.TRIANGLE_FAN, 0, vertices.length);

    this.driveCarRight(carIndex);
  },

  startRightCars: function () {
    for (var i = 0; i < this.vertices.length; i++) {
      this.render(i);
    }
  },
};

var addScore = {
  vertices: new Float32Array(8 * maxScores),
  stickSpace: 0.01,
  add: function () {
    score += 1;
    var x = -0.9 + (score - 1) * this.stickSpace * 2;
    var y = 0.9;

    var startIndex = (score - 1) * 8;
    this.vertices[startIndex] = x;
    this.vertices[startIndex + 1] = y;
    this.vertices[startIndex + 2] = 0;
    this.vertices[startIndex + 3] = 1;

    this.vertices[startIndex + 4] = x;
    this.vertices[startIndex + 5] = y - 0.1;
    this.vertices[startIndex + 6] = 0;
    this.vertices[startIndex + 7] = 1;

    if (score === 10) {
      alert("Congratulations! You won the game!");
      window.removeEventListener("keydown", keydownHandler);
      cancelAnimationFrame(animationFrameId);
    }
  },

  render: function () {
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
    gl.bufferData(gl.ARRAY_BUFFER, this.vertices, gl.DYNAMIC_DRAW);

    if (score > 0) {
      gl.vertexAttribPointer(vPosition, 4, gl.FLOAT, false, 0, 0);
      gl.uniform4fv(locColor, flatten(blue));
      gl.drawArrays(gl.LINES, 0, score * 2);
    }
  },
};

var turnFrog = {
  up: function (up) {
    if (up) {
      frogger.vertices[0][1] = 0.9;
      frogger.vertices[1][1] = 0.8;
      frogger.vertices[2][1] = 0.9;
    } else {
      frogger.vertices[0][1] = -0.9;
      frogger.vertices[1][1] = -0.8;
      frogger.vertices[2][1] = -0.9;
    }
  },
};

function main() {
  gl.clear(gl.COLOR_BUFFER_BIT);
  sidewalks.drawSidewalks();
  carLanes.render();
  rightCars.startRightCars();
  leftCars.startleftCars();

  // Check collision with left-moving cars
  for (var i = 0; i < leftCars.vertices.length; i++) {
    if (frogger.checkForCollision(leftCars.vertices[i])) {
      frogger.vertices = [vec2(-0.05, -1.0), vec2(0.0, -0.9), vec2(0.05, -1.0)];
      goalUpper = true;
      addScore.vertices = new Float32Array(8 * maxScores);
      score = 0;
    }
  }

  // Check collision with right-moving cars
  for (var i = 0; i < rightCars.vertices.length; i++) {
    if (frogger.checkForCollision(rightCars.vertices[i])) {
      frogger.vertices = [vec2(-0.05, -1.0), vec2(0.0, -0.9), vec2(0.05, -1.0)];
      goalUpper = true;
      addScore.vertices = new Float32Array(8 * maxScores);
      score = 0;
    }
  }

  addScore.render();
  frogger.render();

  // Handle goals
  if (frogger.vertices[1][1] > 0.85 && goalUpper) {
    turnFrog.up(true);
    goalUpper = false;
    addScore.add();
  }

  if (frogger.vertices[1][1] < -0.85 && !goalUpper) {
    turnFrog.up(false);
    goalUpper = true;
    addScore.add();
  }

  window.requestAnimationFrame(main);
}
