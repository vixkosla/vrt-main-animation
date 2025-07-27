#ifdef GL_ES
precision highp float;
#endif

uniform float u_time;

varying vec2 vUv;

void main() {

    vUv = uv;
    vec3 new_position = position;

    if (u_time < 5.0) {
        new_position.z *= abs(sin(u_time));
    } else if (u_time < 10.0) {
        new_position.z += abs(sin(u_time * uv.x * 5.8)) * 31.9;
    } else if (u_time < 15.0) {
        new_position.z += abs(sin(u_time * uv.x * uv.y * 15.8)) * 50.15;
    } else {
        float b = new_position.z + abs(sin(u_time * uv.x * uv.y * 15.8)) * 10.15;
        float a = smoothstep(new_position.z, b, u_time - 15.0);
        new_position.z = mix(new_position.z, b, a);
    }



    gl_Position = projectionMatrix * modelViewMatrix * vec4(new_position, 1.0);
}

// to do
// 1. limit mouse interaction
// 2. delay mouse
// 3. add correct timing for each stage
// 4. add more slow motion between stages
// 6. cancel fast frequancy and change to new stage of animation
