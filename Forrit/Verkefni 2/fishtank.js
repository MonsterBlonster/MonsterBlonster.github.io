var canvas;
var gl;

var school = []; // All the fish
var boxSize = 15; // Fish container

var fishCount = 50; // Number of fish

// flocking
var sepDist = 50 / boxSize;
var sepForce = 0.2;
var alignDist = 100 / boxSize;
var alignForce = 0.1;
var cohDist = 100 / boxSize;
var cohForce = 0.1;
var speed = 0.2;

var movement = false;
var spinX = 0;
var spinY = 0;
var origX;
var origY;

var zView = boxSize * 2.5;

var proLoc;
var mvLoc;
var colorLoc;

var points = {
    fish: {
        upperBody: [
            vec4(0.5, 0.0, 0.0, 1.0),
            vec4(0.2, -0.2, 0.0, 1.0),
            vec4(0.2, 0.0, 0.1, 1.0),
            vec4(0.5, 0.0, 0.0, 1.0),
            vec4(0.2, -0.2, 0.0, 1.0),
            vec4(0.2, 0.0, -0.1, 1.0),
            vec4(-0.42, 0.0, 0.01, 1.0),
            vec4(0.2, -0.2, 0.0, 1.0),
            vec4(0.2, 0.0, 0.1, 1.0),
            vec4(-0.42, 0.0, -0.01, 1.0),
            vec4(0.2, -0.2, 0.0, 1.0),
            vec4(0.2, 0.0, -0.1, 1.0),
            vec4(-0.42, 0.0, -0.01, 1.0),
            vec4(-0.42, 0.0, 0.01, 1.0),
            vec4(0.2, -0.2, 0.0, 1.0),
        ],
        lowerBody: [
            vec4(0.5, 0.0, 0.0, 1.0),
            vec4(0.2, 0.2, 0.0, 1.0),
            vec4(0.2, 0.0, 0.1, 1.0),
            vec4(0.5, 0.0, 0.0, 1.0),
            vec4(0.2, 0.2, 0.0, 1.0),
            vec4(0.2, 0.0, -0.1, 1.0),
            vec4(-0.42, 0.0, 0.01, 1.0),
            vec4(0.2, 0.2, 0.0, 1.0),
            vec4(0.2, 0.0, 0.1, 1.0),
            vec4(-0.42, 0.0, -0.01, 1.0),
            vec4(0.2, 0.2, 0.0, 1.0),
            vec4(0.2, 0.0, -0.1, 1.0),
            vec4(-0.42, 0.0, -0.01, 1.0),
            vec4(-0.42, 0.0, 0.01, 1.0),
            vec4(0.2, 0.2, 0.0, 1.0),
        ],
        tail: [
            vec4(-0.38, 0.0, 0.01, 1.0),
            vec4(-0.6, 0.17, 0.0, 1.0),
            vec4(-0.6, -0.17, 0.0, 1.0),
            vec4(-0.38, 0.0, -0.01, 1.0),
            vec4(-0.6, 0.17, 0.0, 1.0),
            vec4(-0.6, -0.17, 0.0, 1.0),
            vec4(-0.38, 0.0, -0.01, 1.0),
            vec4(-0.38, 0.0, 0.01, 1.0),
            vec4(-0.6, -0.17, 0.0, 1.0),
            vec4(-0.38, 0.0, -0.01, 1.0),
            vec4(-0.38, 0.0, 0.01, 1.0),
            vec4(-0.6, -0.17, 0.0, 1.0),
        ],
        leftFin: [
            vec4(0.0, 0.0, 0.05, 1.0),
            vec4(0.0, 0.1, 0.15, 1.0),
            vec4(0.0, -0.1, 0.15, 1.0),
        ],
        rightFin: [
            vec4(0.0, 0.0, -0.05, 1.0),
            vec4(0.0, 0.1, -0.15, 1.0),
            vec4(0.0, -0.1, -0.15, 1.0),
        ],
    },
    boxFill: [
        //Front
        vec4(-1.0, -1.0, 1.0, 1.0),
        vec4(1.0, -1.0, 1.0, 1.0),
        vec4(1.0, 1.0, 1.0, 1.0),
        vec4(-1.0, -1.0, 1.0, 1.0),
        vec4(1.0, 1.0, 1.0, 1.0),
        vec4(-1.0, 1.0, 1.0, 1.0),
        //Right
        vec4(1.0, 1.0, 1.0, 1.0),
        vec4(1.0, -1.0, -1.0, 1.0),
        vec4(1.0, 1.0, -1.0, 1.0),
        vec4(1.0, 1.0, 1.0, 1.0),
        vec4(1.0, -1.0, 1.0, 1.0),
        vec4(1.0, -1.0, -1.0, 1.0),
        //Back
        vec4(-1.0, -1.0, -1.0, 1.0),
        vec4(1.0, 1.0, -1.0, 1.0),
        vec4(1.0, -1.0, -1.0, 1.0),
        vec4(-1.0, -1.0, -1.0, 1.0),
        vec4(-1.0, 1.0, -1.0, 1.0),
        vec4(1.0, 1.0, -1.0, 1.0),
        //Left
        vec4(-1.0, -1.0, -1.0, 1.0),
        vec4(-1.0, -1.0, 1.0, 1.0),
        vec4(-1.0, 1.0, 1.0, 1.0),
        vec4(-1.0, -1.0, -1.0, 1.0),
        vec4(-1.0, 1.0, 1.0, 1.0),
        vec4(-1.0, 1.0, -1.0, 1.0),
        //Top
        vec4(1.0, 1.0, 1.0, 1.0),
        vec4(-1.0, 1.0, -1.0, 1.0),
        vec4(-1.0, 1.0, 1.0, 1.0),
        vec4(1.0, 1.0, 1.0, 1.0),
        vec4(1.0, 1.0, -1.0, 1.0),
        vec4(-1.0, 1.0, -1.0, 1.0),
        //Bot
        vec4(-1.0, -1.0, -1.0, 1.0),
        vec4(1.0, -1.0, -1.0, 1.0),
        vec4(1.0, -1.0, 1.0, 1.0),
        vec4(-1.0, -1.0, -1.0, 1.0),
        vec4(1.0, -1.0, 1.0, 1.0),
        vec4(-1.0, -1.0, 1.0, 1.0),
    ],
    boxFrame: [
        vec4(1.0, 1.0, 1.0, 1.0),
        vec4(1.0, -1.0, 1.0, 1.0),
        vec4(-1.0, -1.0, 1.0, 1.0),
        vec4(-1.0, 1.0, 1.0, 1.0),
        vec4(1.0, 1.0, 1.0, 1.0),
        vec4(1.0, 1.0, -1.0, 1.0),
        vec4(1.0, -1.0, -1.0, 1.0),
        vec4(1.0, -1.0, 1.0, 1.0),
        vec4(1.0, -1.0, -1.0, 1.0),
        vec4(-1.0, -1.0, -1.0, 1.0),
        vec4(-1.0, -1.0, 1.0, 1.0),
        vec4(-1.0, -1.0, -1.0, 1.0),
        vec4(-1.0, 1.0, -1.0, 1.0),
        vec4(-1.0, 1.0, 1.0, 1.0),
        vec4(-1.0, 1.0, -1.0, 1.0),
        vec4(1.0, 1.0, -1.0, 1.0),
    ],
};

var NumBodyTop = points.fish.upperBody.length;
var NumBodyBot = points.fish.lowerBody.length;
var NumTail = points.fish.tail.length;
var NumRFin = points.fish.rightFin.length;
var NumLFin = points.fish.leftFin.length;
var NumFishTank = points.boxFill.length;
var NumTankFrame = points.boxFrame.length;

var vertices = points.fish.upperBody.concat(
    points.fish.lowerBody,
    points.fish.tail,
    points.fish.leftFin,
    points.fish.rightFin,
    points.boxFill,
    points.boxFrame
);

window.onload = function init() {
    canvas = document.getElementById("gl-canvas");

    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) {
        alert("WebGL isn't available");
    }

    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(1.0, 1.0, 1.0, 1.0);

    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.BLEND);
    gl.enable(gl.CULL_FACE);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

    //  Load shaders and initialize attribute buffers
    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    var vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);

    var vPosition = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    colorLoc = gl.getUniformLocation(program, "fColor");

    proLoc = gl.getUniformLocation(program, "projection");
    mvLoc = gl.getUniformLocation(program, "modelview");

    // Projection array for viewer
    var proj = perspective(90.0, 1.0, 0.1, 100.0);
    gl.uniformMatrix4fv(proLoc, false, flatten(proj));

    // Generating fish
    for (let i = 0; i < fishCount; i++) {
        school.push(newFish());
    }

    // Mouse handlers
    canvas.addEventListener("mousedown", function (e) {
        movement = true;
        origX = e.offsetX;
        origY = e.offsetY;
        e.preventDefault(); // Disable drag and drop
    });

    canvas.addEventListener("touchstart", function (e) {
        movement = true;
        origX = e.clientX || e.targetTouches[0].pageX;
        origY = e.clientY || e.targetTouches[0].pageY;
        e.preventDefault(); // Disable drag and drop
    });

    canvas.addEventListener("mouseup", function (e) {
        movement = false;
    });
    canvas.addEventListener("touchend", function (e) {
        movement = false;
    });

    canvas.addEventListener("mousemove", function (e) {
        if (movement) {
            spinY += (e.offsetX - origX) % 360;
            spinX += (e.offsetY - origY) % 360;
            origX = e.offsetX;
            origY = e.offsetY;
        }
    });
    canvas.addEventListener("touchmove", function (e) {
        if (movement) {
            var currx = e.clientX || e.targetTouches[0].pageX;
            var curry = e.clientY || e.targetTouches[0].pageY;
            spinY += (currx - origX) % 360;
            spinX += (curry - origY) % 360;
            origX = currx;
            origY = curry;
        }
    });

    render();
};

function updateSliders(val, change) {
    switch (change) {
        case "sepDist":
            sepDist = val / boxSize;
            break;
        case "sepForce":
            sepForce = val;
            break;
        case "cohDist":
            cohDist = val / boxSize;
            break;
        case "cohForce":
            cohForce = val;
            break;
        case "alignDist":
            alignDist = val / boxSize;
            break;
        case "alignForce":
            alignForce = val;
            break;
        case "speed":
            speed = val;
            break;
        case "fishCount":
            while (fishCount != val) {
                if (fishCount > val) {
                    school.pop();
                    fishCount--;
                } else {
                    school.push(newFish());
                    fishCount++;
                }
            }
            break;
        default:
            break;
    }

    document.getElementById(change).innerHTML = val;
}

function newFish() {
    var s = -Math.random() * 2 - 3;
    var R = Math.random() * 0.7 + 0.3;
    var G = 1 - R + 0.3;
    var B = Math.random() * 0.5 + 0.2;

    return {
        bodyColor: vec4(R, G, B, 1.0),
        botColor: vec4(R - 0.8, G - 0.1, B - 0.1, 1.0),
        finColor: vec4(R - 0.3, G - 0.3, B - 0.3, 1.0),
        tailRotation: Math.random() * 70 - 35,
        finRotation: Math.random() * 70,
        tailSpeed: s,
        finSpeed: s,
        speed: s / 10,
        size: Math.random() + 1,
        dir: randomDir(),
        pos: randomPos(boxSize - 1),
    };
}

function updateFish(fish, index) {
    var next = nextPos(fish);
    var iFish = true;
    Object.keys(next).map((d) => {
        if (
            -boxSize + fish.size * 0.5 >= next[d] ||
            next[d] >= boxSize - fish.size * 0.5
        ) {
            fish.pos[d] *= -1;
            iFish = false;
        }
    });

    // if inbound use flocking algorithm
    if (iFish) {
        var sepFish = [{ dir: fish.dir.cart, dist: sepDist }];
        var cohFish = [{ dir: fish.dir.cart, dist: cohDist }];
        var alignFish = [{ dir: fish.dir.cart, dist: alignDist }];

        for (let i = 0; i < fishCount; i++) {
            if (i == index) {
                continue;
            }
            var f = school[i];
            var dist = calcDist(fish, f);
            if (dist < cohDist) {
                cohFish.push({ dir: getDirFromPos(f.pos, fish.pos, dist), dist });
            }
            if (dist < alignDist) {
                alignFish.push({ dir: f.dir.cart, dist });
            }
            if (dist < sepDist) {
                sepFish.push({ dir: getDirFromPos(fish.pos, f.pos, dist), dist });
            }
        }
        var avgAlign = calcAvgXYZ(alignFish, alignDist);
        var avgCoh = calcAvgXYZ(cohFish, cohDist);
        var avgSep = calcAvgXYZ(sepFish, sepFish);

        fish.dir.cart = normalizeXYZ(
            calcDir(avgSep, avgCoh, avgAlign, fish.dir.cart)
        );
        fish.dir.sph = cartToSph(fish.dir.cart);
    }

    // Update elements
    fish.pos = nextPos(fish);
    fish.tailRotation += fish.tailSpeed * speed;
    fish.finRotation += fish.finSpeed * speed;

    if (fish.tailRotation > 35.0 || fish.tailRotation < -35.0)
        fish.tailSpeed *= -1;
    if (fish.finRotation > 70 || fish.finRotation < 0) fish.finSpeed *= -1;
}

// Conversion from radians to degrees
function toDegrees(angle) {
    return angle * (180 / Math.PI);
}

// Conversion from degrees to radians
function toRadians(angle) {
    return angle * (Math.PI / 180);
}

// Conversion from from spherical coordinates to cartesian coordinates
function sphToCart({ a, b }) {
    return {
        x: Math.sin(a) * Math.cos(b),
        y: Math.sin(a) * Math.sin(b),
        z: Math.cos(a),
    };
}

// Conversion from from cartesian coordinates to spherical coordinates
function cartToSph({ x, y, z }) {
    var p = Math.sqrt(x ** 2 + y ** 2 + z ** 2);
    return { a: Math.acos(z / p), b: Math.atan2(y, x) };
}

// Returns a random direction in the 3d plane, both spherical and cartesian coordinates
function randomDir() {
    var a = toRadians(Math.random() * 180);
    var b = toRadians(Math.random() * 360);
    return { sph: { a, b }, cart: sphToCart({ a, b }) };
}

// Returns a random position in cartesian coordinates within the +/- limit on all axis
function randomPos(limit) {
    var x = Math.random() * 2 * limit - limit;
    var y = Math.random() * 2 * limit - limit;
    var z = Math.random() * 2 * limit - limit;
    return { x, y, z };
}

// Returns the next fish position
function nextPos(fish) {
    return {
        x: fish.pos.x + fish.dir.cart.x * (fish.speed * speed),
        y: fish.pos.y + fish.dir.cart.y * (fish.speed * speed),
        z: fish.pos.z + fish.dir.cart.z * (fish.speed * speed),
    };
}

// The distance between two fishes
function calcDist(f1, f2) {
    return Math.sqrt(
        (f1.pos.x - f2.pos.x) ** 2 +
        (f1.pos.y - f2.pos.y) ** 2 +
        (f1.pos.z - f2.pos.z) ** 2
    );
}

// The average direction of directional 3d vectors
function calcAvgXYZ(arr) {
    var len = arr.length;
    var tot = { x: 0, y: 0, z: 0 };
    arr.map((curr) => {
        Object.keys(tot).map((d) => {
            tot[d] += curr.dir[d];
        });
    });
    return { x: tot.x / len, y: tot.y / len, z: tot.z / len };
}

// Calculates the direction of obj based on seperation, cohesion and alignment and their force
function calcDir(sep, coh, align, curr) {
    return {
        x:
            curr.x +
            ((+sep.x * sepForce + coh.x * cohForce + align.x * alignForce) % 1),
        y:
            curr.y +
            ((+sep.y * sepForce + coh.y * cohForce + align.y * alignForce) % 1),
        z:
            curr.z +
            ((+sep.z * sepForce + coh.z * cohForce + align.z * alignForce) % 1),
    };
}

// Normalizes a vector
function normalizeXYZ({ x, y, z }) {
    var len = Math.sqrt(x ** 2 + y ** 2 + z ** 2);
    return { x: x / len, y: y / len, z: z / len };
}

// Returns a normalized directional vector from a point to another
function getDirFromPos(from, to, dist) {
    return {
        x: (to.x - from.x) / dist,
        y: (to.y - from.y) / dist,
        z: (to.z - from.z) / dist,
    };
}

function drawFish(mv, fish) {
    // Translate to fish pos
    mv = mult(mv, translate(fish.pos.x, fish.pos.y, fish.pos.z));
    mv = mult(mv, scalem(fish.size, fish.size, fish.size));

    // Rotate to swim direction
    mv = mult(mv, rotateZ(-toDegrees(fish.dir.sph.b)));
    mv = mult(mv, rotateY(-toDegrees(fish.dir.sph.a)));
    mv = mult(mv, rotateY(-90));

    // Draw fish botom
    gl.uniform4fv(colorLoc, fish.botColor);
    gl.uniformMatrix4fv(mvLoc, false, flatten(mv));
    gl.cullFace(gl.FRONT); // Inside
    gl.drawArrays(gl.TRIANGLES, 0, NumBodyBot);
    gl.cullFace(gl.BACK); // Outside
    gl.drawArrays(gl.TRIANGLES, 0, NumBodyBot);

    // Draw fish top
    gl.uniform4fv(colorLoc, fish.bodyColor);
    gl.uniformMatrix4fv(mvLoc, false, flatten(mv));
    gl.cullFace(gl.FRONT); // Inside
    gl.drawArrays(gl.TRIANGLES, NumBodyBot, NumBodyTop);
    gl.cullFace(gl.BACK); // Outside
    gl.drawArrays(gl.TRIANGLES, NumBodyBot, NumBodyTop);

    // Draw tail and rotate
    gl.uniform4fv(colorLoc, fish.bodyColor);
    mv = mult(mv, translate(-0.4, 0.0, 0.0));
    mv = mult(mv, rotateY(fish.tailRotation));
    mv = mult(mv, translate(0.4, 0.0, 0.0));
    gl.uniformMatrix4fv(mvLoc, false, flatten(mv));
    gl.cullFace(gl.FRONT); // Inside
    gl.drawArrays(gl.TRIANGLES, NumBodyBot + NumBodyTop, NumTail);
    gl.cullFace(gl.BACK); // Outside
    gl.drawArrays(gl.TRIANGLES, NumBodyBot + NumBodyTop, NumTail);

    // reverse to fish 0.0.0
    mv = mult(mv, translate(-0.4, 0.0, 0.0)); //___REVERSING___
    mv = mult(mv, rotateY(-fish.tailRotation)); //___REVERSING___
    mv = mult(mv, translate(0.4, 0.0, 0.0)); //___REVERSING___

    // Right fin and rotation
    gl.uniform4fv(colorLoc, fish.finColor);
    mv = mult(mv, translate(0.0, 0.0, 0.05));
    mv = mult(mv, rotateY(fish.finRotation));
    mv = mult(mv, translate(0.0, 0.0, -0.05));
    gl.uniformMatrix4fv(mvLoc, false, flatten(mv));
    gl.cullFace(gl.FRONT); // Inside
    gl.drawArrays(gl.TRIANGLES, NumBodyBot + NumBodyTop + NumTail, NumRFin);
    gl.cullFace(gl.BACK); // Outside
    gl.drawArrays(gl.TRIANGLES, NumBodyBot + NumBodyTop + NumTail, NumRFin);

    // reverse to fish 0.0.0
    mv = mult(mv, translate(0.0, 0.0, 0.05)); //___REVERSING___
    mv = mult(mv, rotateY(-fish.finRotation)); //___REVERSING___
    mv = mult(mv, translate(0.0, 0.0, -0.05)); //___REVERSING___

    // Left fin and rotation
    gl.uniform4fv(colorLoc, fish.finColor);
    mv = mult(mv, translate(0.0, 0.0, -0.05));
    mv = mult(mv, rotateY(-fish.finRotation));
    mv = mult(mv, translate(0.0, 0.0, 0.05));
    gl.uniformMatrix4fv(mvLoc, false, flatten(mv));
    gl.cullFace(gl.FRONT); // Inside
    gl.drawArrays(
        gl.TRIANGLES,
        NumBodyBot + NumBodyTop + NumTail + NumRFin,
        NumLFin
    );
    gl.cullFace(gl.BACK); // Outside

    gl.drawArrays(
        gl.TRIANGLES,
        NumBodyBot + NumBodyTop + NumTail + NumRFin,
        NumLFin
    );

    // reverse to fish 0.0.0
    mv = mult(mv, translate(0.0, 0.0, -0.05)); //___REVERSING___
    mv = mult(mv, rotateY(-fish.finRotation)); //___REVERSING___
    mv = mult(mv, translate(0.0, 0.0, 0.05)); //___REVERSING___

    // reverse to main 0.0.0
    mv = mult(mv, rotateY(90)); //___REVERSING___
    mv = mult(mv, rotateY(toDegrees(fish.dir.sph.a))); //___REVERSING___
    mv = mult(mv, rotateZ(toDegrees(fish.dir.sph.b))); //___REVERSING___
    mv = mult(mv, scalem(1 / fish.size, 1 / fish.size, 1 / fish.size)); //___REVERSING___
    mv = mult(mv, translate(-fish.pos.x, -fish.pos.y, -fish.pos.z)); //___REVERSING___
}

function render() {
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    var mv = lookAt(
        vec3(0.0, 0.0, zView),
        vec3(0.0, 0.0, 0.0),
        vec3(0.0, 1.0, 0.0)
    );
    mv = mult(mv, rotateX(spinX));
    mv = mult(mv, rotateY(spinY));

    // Update and draw all fish
    for (let i = 0; i < fishCount; i++) {
        updateFish(school[i], i);
        drawFish(mv, school[i]);
    }

    // Scale for fish container
    mv = mult(mv, scalem(boxSize, boxSize, boxSize));

    //  Draw the frame for fish container
    gl.uniform4fv(colorLoc, vec4(0.0, 0.0, 0.0, 1.0));
    gl.uniformMatrix4fv(mvLoc, false, flatten(mv));
    gl.drawArrays(
        gl.LINE_STRIP,
        NumBodyBot + NumBodyTop + NumTail + NumRFin + NumLFin + NumFishTank,
        NumTankFrame
    );

    gl.uniform4fv(colorLoc, vec4(0.0, 0.0, 0.5, 0.2));
    gl.uniformMatrix4fv(mvLoc, false, flatten(mv));
    gl.cullFace(gl.FRONT); // Inside
    gl.drawArrays(
        gl.TRIANGLES,
        NumBodyBot + NumBodyTop + NumTail + NumRFin + NumLFin,
        NumFishTank
    );

    // Reverse
    mv = mult(mv, scalem(1 / boxSize, 1 / boxSize, 1 / boxSize));

    requestAnimFrame(render);
}
