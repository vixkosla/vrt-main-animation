precision mediump float;

varying vec2 vUv;
varying vec3 vPosition;

uniform float u_timer;
uniform float u_progress;
uniform float u_index;

float random (vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))*
        43758.5453123);
}

void main() {

    float blue = u_index * 0.1 + 0.6;
    vec3 color = vec3(0.1373, 0.0745, blue);
    color *= vec3(random(vUv));

    float rd = 0.06 * u_progress * 1.2 + 0.04;

    vec2 bl = step(vec2(rd), vUv);
    vec2 br = step(vec2(rd), 1.0 - vUv);

    float pct = bl.x * bl.y;
    pct *= br.x * br.y;

    color = clamp(color + vec3(pct), 0.0, 1.0);

    float alpha = 1.0;

    if (length(color - vec3(1.0)) < 0.1)
    alpha = 0.0;

    gl_FragColor = vec4(color, alpha);
}