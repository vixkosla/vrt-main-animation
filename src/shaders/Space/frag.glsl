#ifdef GL_ES
precision highp float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;


varying vec2 vUv;

void main() {
    vec2 st = gl_FragCoord.xy / u_resolution;

    float offsetX_vUv = vUv.x - 0.255 + (0.1 * u_mouse.x);
    float offsetY_vUv = vUv.y + 0.505 + (0.1 * u_mouse.y);

    float pct = distance(vec2(offsetX_vUv  * 1.0, offsetY_vUv * 0.5), vec2(0.5));

    // pct = pow(pct, 2.0)


    if (u_time < 15.0) {
        pct = pow(pct, abs(sin(u_time) * 0.4) + 0.0);
    } else {
        pct = pow(pct, 1.0 * 0.4 + 0.0);
    }
    // vec4 color = vec4(vec3(pct), 1.0);

    gl_FragColor = vec4(0.0, 0.0, 0.5 - pct, 1.0); // Set the fragment color to black
}