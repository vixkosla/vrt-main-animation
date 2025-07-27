#ifdef GL_ES
precision highp float;
#endif

uniform float u_progress;
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


    if (u_time < 16.0) {
        pct = pow(pct, abs(sin(u_time) * 0.4) + 0.0);
    } else {
        pct = pow(pct, 1.0 * 0.4 + 0.0);
    }
    // vec4 color = vec4(vec3(pct), 1.0);

    float red = 0.0;
    float green = 0.0;

    if (u_progress > 0.7) {
        red = mix(0.0, 0.5, (u_progress - 0.7) / (1.0 - 0.7)* 1.0);
        green = mix(0.0, 0.1, (u_progress - 0.7) / (1.0 - 0.7) * 1.0);
    }

    vec3 color = vec3(red, green, 0.5) - pct;
 
    gl_FragColor = vec4(color, 1.0); // Set the fragment color to black
}