var canvas;
var gl;

var fishGroup = []; // All the fish
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

var zView = boxSize * 3.0;

var proLoc;
var mvLoc;
var locColor;

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

var bodyTop = points.fish.upperBody.length;
var bodyBot = points.fish.lowerBody.length;
var tailCh = points.fish.tail.length;
var rightFin = points.fish.rightFin.length;
var leftFin = points.fish.leftFin.length;
var fishTank = points.boxFill.length;
var tankFrame = points.boxFrame.length;

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

    var bufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);

    var vPosition = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    locColor = gl.getUniformLocation(program, "fColor");
    proLoc = gl.getUniformLocation(program, "projection");
    mvLoc = gl.getUniformLocation(program, "modelview");

    // Projection array for viewer
    var proj = perspective(90.0, 1.0, 0.1, 100.0);
    gl.uniformMatrix4fv(proLoc, false, flatten(proj));

    for (let i = 0; i < fishCount; i++) {
        fishGroup.push(newFish());
    }

    canvas.addEventListener("mousedown", function (e) {
        movement = true;
        origX = e.offsetX;
        origY = e.offsetY;
        e.preventDefault();
    });

    canvas.addEventListener("touchstart", function (e) {
        movement = true;
        origX = e.clientX || e.targetTouches[0].pageX;
        origY = e.clientY || e.targetTouches[0].pageY;
        e.preventDefault();
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
                    fishGroup.pop();
                    fishCount--;
                } else {
                    fishGroup.push(newFish());
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
    var speedSet = -Math.random() * 2 - 3;
    var red = Math.random() * 0.7 + 0.3;
    var green = 1 - red + 0.3;
    var blue = Math.random() * 0.5 + 0.2;

    return {
        bodyColor: vec4(red, green, blue, 1.0),
        botColor: vec4(red - 0.8, green - 0.1, blue - 0.1, 1.0),
        finColor: vec4(red - 0.3, green - 0.3, blue - 0.3, 1.0),
        tailRotation: Math.random() * 70 - 35,
        finRotation: Math.random() * 70,
        tailSpeed: speedSet,
        finSpeed: speedSet,
        speed: speedSet / 10,
        size: Math.random() + 1,
        dir: randomDir(),
        pos: randomPos(boxSize - 1),
    };
}

function updateFish(fish, index) {
    var next = nextPos(fish);
    var inbound = true;
    Object.keys(next).map((d) => {
        if (
            -boxSize + fish.size * 0.5 >= next[d] ||
            next[d] >= boxSize - fish.size * 0.5
        ) {
            fish.pos[d] *= -1;
            inbound = false;
        }
    });

    if (inbound) {
        var sepFish = [{ dir: fish.dir.cart, dist: sepDist }];
        var cohFish = [{ dir: fish.dir.cart, dist: cohDist }];
        var alignFish = [{ dir: fish.dir.cart, dist: alignDist }];

        for (let i = 0; i < fishCount; i++) {
            if (i == index) {
                continue;
            }
            var f = fishGroup[i];
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

    fish.pos = nextPos(fish);
    fish.tailRotation += fish.tailSpeed * speed;
    fish.finRotation += fish.finSpeed * speed;

    if (fish.tailRotation > 35.0 || fish.tailRotation < -35.0)
        fish.tailSpeed *= -1;
    if (fish.finRotation > 70 || fish.finRotation < 0) fish.finSpeed *= -1;
}

function toDegrees(angle) {
    return angle * (180 / Math.PI);
}

function toRadians(angle) {
    return angle * (Math.PI / 180);
}

function sphToCart({ a, b }) {
    return {
        x: Math.sin(a) * Math.cos(b),
        y: Math.sin(a) * Math.sin(b),
        z: Math.cos(a),
    };
}

function cartToSph({ x, y, z }) {
    var p = Math.sqrt(x ** 2 + y ** 2 + z ** 2);
    return { a: Math.acos(z / p), b: Math.atan2(y, x) };
}

function randomDir() {
    var a = toRadians(Math.random() * 180);
    var b = toRadians(Math.random() * 360);
    return { sph: { a, b }, cart: sphToCart({ a, b }) };
}

function randomPos(limit) {
    var x = Math.random() * 2 * limit - limit;
    var y = Math.random() * 2 * limit - limit;
    var z = Math.random() * 2 * limit - limit;
    return { x, y, z };
}

function nextPos(fish) {
    return {
        x: fish.pos.x + fish.dir.cart.x * (fish.speed * speed),
        y: fish.pos.y + fish.dir.cart.y * (fish.speed * speed),
        z: fish.pos.z + fish.dir.cart.z * (fish.speed * speed),
    };
}

function calcDist(f1, f2) {
    return Math.sqrt(
        (f1.pos.x - f2.pos.x) ** 2 +
        (f1.pos.y - f2.pos.y) ** 2 +
        (f1.pos.z - f2.pos.z) ** 2
    );
}

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

function normalizeXYZ({ x, y, z }) {
    var len = Math.sqrt(x ** 2 + y ** 2 + z ** 2);
    return { x: x / len, y: y / len, z: z / len };
}

function getDirFromPos(from, to, dist) {
    return {
        x: (to.x - from.x) / dist,
        y: (to.y - from.y) / dist,
        z: (to.z - from.z) / dist,
    };
}

function drawFish(mv, fish) {
    mv = mult(mv, translate(fish.pos.x, fish.pos.y, fish.pos.z));
    mv = mult(mv, scalem(fish.size, fish.size, fish.size));

    mv = mult(mv, rotateZ(-toDegrees(fish.dir.sph.b)));
    mv = mult(mv, rotateY(-toDegrees(fish.dir.sph.a)));
    mv = mult(mv, rotateY(-90));

    gl.uniform4fv(locColor, fish.botColor);
    gl.uniformMatrix4fv(mvLoc, false, flatten(mv));
    gl.cullFace(gl.FRONT);
    gl.drawArrays(gl.TRIANGLES, 0, bodyBot);
    gl.cullFace(gl.BACK);
    gl.drawArrays(gl.TRIANGLES, 0, bodyBot);

    gl.uniform4fv(locColor, fish.bodyColor);
    gl.uniformMatrix4fv(mvLoc, false, flatten(mv));
    gl.cullFace(gl.FRONT);
    gl.drawArrays(gl.TRIANGLES, bodyBot, bodyTop);
    gl.cullFace(gl.BACK);
    gl.drawArrays(gl.TRIANGLES, bodyBot, bodyTop);

    gl.uniform4fv(locColor, fish.bodyColor);
    mv = mult(mv, translate(-0.4, 0.0, 0.0));
    mv = mult(mv, rotateY(fish.tailRotation));
    mv = mult(mv, translate(0.4, 0.0, 0.0));
    gl.uniformMatrix4fv(mvLoc, false, flatten(mv));
    gl.cullFace(gl.FRONT);
    gl.drawArrays(gl.TRIANGLES, bodyBot + bodyTop, tailCh);
    gl.cullFace(gl.BACK);
    gl.drawArrays(gl.TRIANGLES, bodyBot + bodyTop, tailCh);

    mv = mult(mv, translate(-0.4, 0.0, 0.0));
    mv = mult(mv, rotateY(-fish.tailRotation));
    mv = mult(mv, translate(0.4, 0.0, 0.0));

    gl.uniform4fv(locColor, fish.finColor);
    mv = mult(mv, translate(0.0, 0.0, 0.05));
    mv = mult(mv, rotateY(fish.finRotation));
    mv = mult(mv, translate(0.0, 0.0, -0.05));
    gl.uniformMatrix4fv(mvLoc, false, flatten(mv));
    gl.cullFace(gl.FRONT);
    gl.drawArrays(gl.TRIANGLES, bodyBot + bodyTop + tailCh, rightFin);
    gl.cullFace(gl.BACK);
    gl.drawArrays(gl.TRIANGLES, bodyBot + bodyTop + tailCh, rightFin);

    mv = mult(mv, translate(0.0, 0.0, 0.05));
    mv = mult(mv, rotateY(-fish.finRotation));
    mv = mult(mv, translate(0.0, 0.0, -0.05));

    gl.uniform4fv(locColor, fish.finColor);
    mv = mult(mv, translate(0.0, 0.0, -0.05));
    mv = mult(mv, rotateY(-fish.finRotation));
    mv = mult(mv, translate(0.0, 0.0, 0.05));
    gl.uniformMatrix4fv(mvLoc, false, flatten(mv));
    gl.cullFace(gl.FRONT);
    gl.drawArrays(
        gl.TRIANGLES,
        bodyBot + bodyTop + tailCh + rightFin,
        leftFin
    );
    gl.cullFace(gl.BACK);

    gl.drawArrays(
        gl.TRIANGLES,
        bodyBot + bodyTop + tailCh + rightFin,
        leftFin
    );

    mv = mult(mv, translate(0.0, 0.0, -0.05));
    mv = mult(mv, rotateY(-fish.finRotation));
    mv = mult(mv, translate(0.0, 0.0, 0.05));

    mv = mult(mv, rotateY(90));
    mv = mult(mv, rotateY(toDegrees(fish.dir.sph.a)));
    mv = mult(mv, rotateZ(toDegrees(fish.dir.sph.b)));
    mv = mult(mv, scalem(1 / fish.size, 1 / fish.size, 1 / fish.size));
    mv = mult(mv, translate(-fish.pos.x, -fish.pos.y, -fish.pos.z));
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

    for (let i = 0; i < fishCount; i++) {
        updateFish(fishGroup[i], i);
        drawFish(mv, fishGroup[i]);
    }

    mv = mult(mv, scalem(boxSize, boxSize, boxSize));

    gl.uniform4fv(locColor, vec4(0.0, 0.0, 0.0, 1.0));
    gl.uniformMatrix4fv(mvLoc, false, flatten(mv));
    gl.drawArrays(
        gl.LINE_STRIP,
        bodyBot + bodyTop + tailCh + rightFin + leftFin + fishTank,
        tankFrame
    );

    gl.uniform4fv(locColor, vec4(0.0, 0.0, 0.5, 0.2));
    gl.uniformMatrix4fv(mvLoc, false, flatten(mv));
    gl.cullFace(gl.FRONT);
    gl.drawArrays(
        gl.TRIANGLES,
        bodyBot + bodyTop + tailCh + rightFin + leftFin,
        fishTank
    );

    mv = mult(mv, scalem(1 / boxSize, 1 / boxSize, 1 / boxSize));

    requestAnimFrame(render);
}
