var canvas;
var gl;
var bufferId;
var locBox;

var vertices = new Float32Array([-0.05, -0.05, 0.05, -0.05, 0.05, 0.05, -0.05, 0.05]);

var spadi = {
    vertSpadi: [
        vec2( -0.1, -0.9 ),
        vec2( -0.1, -0.86 ),
        vec2(  0.1, -0.86 ),
        vec2(  0.1, -0.9 ) ],
    
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
        gl.drawArrays( gl.TRIANGLE_FAN, 0, this.vertSpadi.length );
    },
};

var bouncingBox = {
    position: vec2(0.0, 0.0),
    velocity: vec2(Math.random()*0.1-0.05, Math.random()*0.1-0.05),
    radius: 0.05,

    update: function() {
        if (Math.abs(this.position[0] + this.velocity[0]) > maxX - this.radius) this.velocity[0] = -this.velocity[0];
        if (Math.abs(this.position[1] + this.velocity[1]) > maxY - this.radius) this.velocity[1] = -this.velocity[1];
        
        this.position[0] += this.velocity[0];
        this.position[1] += this.velocity[1];
    },

    render: function() {
        gl.uniform2fv(locBox, flatten(this.position));
        gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
    }
};

window.onload = function init() {

    canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }
    
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.8, 0.8, 0.8, 1.0 );

    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
    
    bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.DYNAMIC_DRAW );

    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    locBox = gl.getUniformLocation( program, "boxPos" );

    window.addEventListener("keydown", function(e){
        switch( e.keyCode ) {
            case 38:    // upp ör
                bouncingBox.velocity[0] *= 1.1;
                bouncingBox.velocity[1] *= 1.1;
                break;
            case 40:    // niður ör
                bouncingBox.velocity[0] /= 1.1;
                bouncingBox.velocity[1] /= 1.1;
                break;
        }
    } );

    render();
}

function render() {

    spadi.render();
    bouncingBox.update();

    gl.clear( gl.COLOR_BUFFER_BIT );

    bouncingBox.render();

    window.requestAnimFrame(render);
}
