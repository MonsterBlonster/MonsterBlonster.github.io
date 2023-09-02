"use strict";

var canvas;
var gl;

var points = [];

var NumTimesToSubdivide = 4;


window.onload = function init()
{
    canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    //
    //  Initialize our data for the Sierpinski Gasket
    //

    // First, initialize the corners of our gasket with three points.

    var vertices = [
        vec2( -1, -1 ),
        vec2(  -1, 1 ),
        vec2(  1, 1 ),
        vec2( 1, -1)
    ];

    divideSquare( vertices[0], vertices[1], vertices[2], vertices[3],
                    NumTimesToSubdivide);

    //
    //  Configure WebGL
    //
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

    //  Load shaders and initialize attribute buffers

    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    // Load the data into the GPU

    var bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );

    // Associate out shader variables with our data buffer

    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    render();
};

function square( a, b, c, d )
{
    points.push(a, b, c);
    points.push(a, c, d);
}

function divideSquare( a, b, c, d, count )
{
    if (count === 0) {
        square(a, b, c, d);
    } else {
        var mid1 = mix(a, b, 1/3);
        var mid2 = mix(b, c, 1/3);
        var mid3 = mix(c, d, 1/3);
        var mid4 = mix(d, a, 1/3);
        var center = mix(mix(a, c, 0.5), mix(b, d, 0.5), 0.5);

        --count;

        // Recursive division into 8 smaller squares
        divideSquare(a, mid1, center, mid4, count);
        divideSquare(mid1, mid2, mix(mid1, mid2, 0.5), mix(center, mid1, 0.5), count);
        divideSquare(mid2, mid3, mix(mid2, mid3, 0.5), mix(center, mid2, 0.5), count);
        divideSquare(mid3, mid4, mix(mid3, mid4, 0.5), mix(center, mid3, 0.5), count);
        divideSquare(center, mix(mid1, mid2, 0.5), mix(mid2, mid3, 0.5), mix(mid3, mid4, 0.5), count);
    

    // check for end of recursion

/*    if (count === 0) {
        square(a, b, c, d);
    } else {
        var ab = mix(a, b, 1 / 3);
        var ac = mix(a, c, 1 / 3);
        var bc = mix(b, c, 1 / 3);
        var ad = mix(a, d, 1 / 3);
        var dc = mix(d, c, 1 / 3);
        var bd = mix(b, d, 1 / 3);

        --count;

        divideSquare(a, ab, ad, bd, count);
       // divideSquare(b, bc, ab, ad, count);
        //divideSquare(c, bc, dc, ad, count);
        //divideSquare(d, ad, dc, bc, count);
        //divideSquare(ab, a, ac, b, count);
        //divideSquare(bc, b, c, dc, count);
        //divideSquare(dc, c, d, ab, count);
        //divideSquare(ad, a, bc, d, count);*/


    }
}

function render()
{
    gl.clear( gl.COLOR_BUFFER_BIT );
    gl.drawArrays(gl.TRIANGLES, 0, points.length);
}
