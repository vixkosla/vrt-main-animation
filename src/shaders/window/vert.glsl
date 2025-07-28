precision mediump float;

uniform float u_timer;

varying vec2 vUv;
varying vec3 vPosition;

void main() {
    vUv = uv;
    vPosition = position;

    vec2 pos = vec2(vUv.x, vUv.y);
    // pos.x *= 1.1 * sin(u_timer);

    gl_Position = projectionMatrix * modelViewMatrix * vec4(vec3(pos, position.z), 1.0);
}