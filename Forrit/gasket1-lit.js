var gl;
var points;

var NumTriangles = 100;
var colorLoc;
var program;

var triangleSize = 0.05; // Fixed size for all triangles

window.onload = function init() {
    var canvas = document.getElementById("gl-canvas");

    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) { alert("WebGL isn't available"); }

    // Initialize WebGL and shaders here

    // Initialize points array with random triangles
    points = [];
    for (var i = 0; i < NumTriangles; i++) {
        // Generate a random center point within the canvas
        var centerX = Math.random() * 2 - 1;
        var centerY = Math.random() * 2 - 1;

        // Calculate the vertices of the triangle around the center point
        var vertices = [
            vec2(centerX - triangleSize, centerY - triangleSize),
            vec2(centerX + triangleSize, centerY - triangleSize),
            vec2(centerX, centerY + triangleSize)
        ];

        // Add the vertices to the points array
        points = points.concat(vertices);
    }

    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(1.0, 1.0, 1.0, 1.0);

    // Load shaders and initialize attribute buffers
    program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    // Load the data into the GPU
    var bufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW);

    var vPosition = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    colorLoc = gl.getUniformLocation(program, "fColor");

    render();
};

function render() {
    gl.clear(gl.COLOR_BUFFER_BIT);

    for (var i = 0; i < NumTriangles; i++) {
        // Generate a random color for each triangle
        var randomColor = vec4(Math.random(), Math.random(), Math.random(), 1.0);

        // Set the color uniform
        gl.uniform4fv(colorLoc, randomColor);

        // Draw one triangle at a time
        gl.drawArrays(gl.TRIANGLES, i * 3, 3);
    }
}
