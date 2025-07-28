precision mediump float;

uniform float u_timer;

varying vec2 vUv;
varying vec3 vPosition;

void main() {
    vUv = uv;
    vPosition = position;

    float test = pow(position.x, 1.0);
    vec2 pos = vec2(position.x * 0.3 , position.y);
    // pos.x *= 1.1 * sin(u_timer);

    gl_Position = projectionMatrix * modelViewMatrix * vec4(vec3(pos, position.z), 1.0);
}