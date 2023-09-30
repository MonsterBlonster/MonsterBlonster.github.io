var canvas;
var gl;

var box = vec2(0.0, 0.0);
var dX = 0.01;
var dY = 0.01;
var maxX = 1.0;
var maxY = 1.0;
var boxRad = 0.05;
var vertices = new Float32Array([-0.05, -0.05, 0.05, -0.05, 0.05, 0.05, -0.05, 0.05]);

var spadi = {
    vertSpadi: [
        vec2(-0.1, -0.9),
        vec2(-0.1, -0.86),
        vec2(0.1, -0.86),
        vec2(0.1, -0.9)],
    move: function (x, y) {
        let outOfBounds = false;
        for (let i = 0; i < 3; i++) {
            let newVertex = add(this.vertSpadi[i], vec2(x, y));
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
        if (!outOfBounds) {
            for (let i = 0; i < 3; i++) {
                this.vertSpadi[i] = add(this.vertSpadi[i], vec2(x, y));
            }
        }
    },
    render: function () {
        gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
        gl.bufferSubData(gl.ARRAY_BUFFER, 0, flatten(this.vertSpadi));

        gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
        gl.drawArrays(gl.TRIANGLE_FAN, 0, this.vertSpadi.length);
    },
};

var bufferId;
var locBox;
var vPosition;

var xmove = 0.0;

var ball = {
    position: vec2(0.0, 0.0),
    velocity: vec2(0.01, 0.02),
    radius: 0.05,
};

window.onload = function init() {

    canvas = document.getElementById("gl-canvas");

    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) { alert("WebGL isn't available"); }

    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0.8, 0.8, 0.8, 1.0);

    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    bufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.DYNAMIC_DRAW);

    vPosition = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    locBox = gl.getUniformLocation(program, "boxPos");

    window.addEventListener("keydown", function (e) {
        switch (e.keyCode) {
            case 37:    // vinstri ör
                xmove = -0.04;
                break;
            case 39:    // hægri ör
                xmove = 0.04;
                break;
            default:
                xmove = 0.0;
        }
        for (i = 0; i < 4; i++) {
            spadi.vertSpadi[i][0] += xmove;
        }

        gl.bufferSubData(gl.ARRAY_BUFFER, 0, flatten(spadi.vertSpadi));
    });

    render();
}

function render() {
    spadi.render();

    if (Math.abs(box[0] + dX) > maxX - boxRad) dX = -dX;
    if (Math.abs(box[1] + dY) > maxY - boxRad) dY = -dY;

    box[0] += dX;
    box[1] += dY;

    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.uniform2fv(locBox, flatten(box));
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);

    ball.position[0] += ball.velocity[0];
    ball.position[1] += ball.velocity[1];

    if (Math.abs(ball.position[0]) + ball.radius > 1.0) ball.velocity[0] = -ball.velocity[0];
    if (Math.abs(ball.position[1]) + ball.radius > 1.0) ball.velocity[1] = -ball.velocity[1];

    gl.uniform2fv(locBox, flatten(ball.position));
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);

    window.requestAnimFrame(render);
}
