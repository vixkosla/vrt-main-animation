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

float circle(vec2 _st, float _radius){
    vec2 dist = _st-vec2(0.5);
	return 1.-smoothstep(_radius-(_radius*0.01),
                         _radius+(_radius*0.01),
                         dot(dist,dist)*4.0);
}

void main() {

    float blue = u_index * 0.1 + 0.6;
    float red = mix(0.1371, 0.1371 + u_progress * 0.7, u_progress);
    
    vec3 color = vec3(red, 0.0745, blue);
    color *= vec3(random(vUv));

    float rd = 0.06 * u_progress * 1.2 + 0.02;

    vec2 bl = step(vec2(rd), vUv);
    vec2 br = step(vec2(rd), 1.0 - vUv);

    float ci1 = circle(vUv, 0.7);
    float ci2 = circle(vUv, 0.8);

    // float pct = bl.x * bl.y;
    // pct *= br.x * br.y;
    // pct = circle(vUv, 5.0);
    float pct = ci1 + ci2;

    color = clamp(color * vec3(pct), 0.0, 1.0);

    float alpha = 1.0;

    if (length(ci1 - ci2) < 0.1)
    alpha = 0.0;

    gl_FragColor = vec4(vec3(color), alpha);
}