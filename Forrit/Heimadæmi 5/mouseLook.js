var UAngle = 0; // Global variable to store current direction of the viewer
var viewerPosition = [0, 0, 0]; // Global variable to store viewer's position

function mouseLook(key, mdelta) {
    var movementSpeed = 0.1; // Adjust the movement speed as needed

    if (key === 'w') {
        // Move viewer forward
        viewerPosition[2] -= movementSpeed * Math.cos(UAngle);
        viewerPosition[0] -= movementSpeed * Math.sin(UAngle);
    } else if (key === 's') {
        // Move viewer backward
        viewerPosition[2] += movementSpeed * Math.cos(UAngle);
        viewerPosition[0] += movementSpeed * Math.sin(UAngle);
    } else if (key === 'a') {
        // Move viewer left
        viewerPosition[0] += movementSpeed * Math.cos(UAngle);
        viewerPosition[2] += movementSpeed * Math.sin(UAngle);
    } else if (key === 'd') {
        // Move viewer right
        viewerPosition[0] -= movementSpeed * Math.cos(UAngle);
        viewerPosition[2] -= movementSpeed * Math.sin(UAngle);
    }

    // Turn viewer to the sides
    UAngle += mdelta;

    var v = normalize(subtract(viewerPosition, [0, 0, 1]));  // view direction vector
    var n = normalize(cross(v, [0, 1, 0]));       // perpendicular vector
    var u = normalize(cross(n, v));        // "new" up vector

    v = negate(v);

    var result = mat4(
        vec4(n, -dot(n, viewerPosition)),
        vec4(u, -dot(u, viewerPosition)),
        vec4(v, -dot(v, viewerPosition)),
        vec4()
    );

    return result;
}
