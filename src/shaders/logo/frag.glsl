precision highp float;

varying vec2 vUv;
varying vec3 vPosition;

uniform float u_timer;
uniform float u_progress;

vec2 brickTile(vec2 _st, float _zoom){
    _st *= _zoom;

    // Here is where the offset is happening
    _st.x += step(1., mod(_st.y,2.0)) * 0.5;

    return fract(_st);
}

float box(vec2 _st, vec2 _size){
    _size = vec2(0.5)-_size*0.5;
    vec2 uv = smoothstep(_size,_size+vec2(1e-4),_st);
    uv *= smoothstep(_size,_size+vec2(1e-4),vec2(1.0)-_st);
    return uv.x*uv.y;
}

float random (vec2 st) {
    return fract(sin(dot(st.xy, 
                         vec2(sin (u_timer / 100000.0) * 1.5989898,
                         1.5989898 * cos (u_timer / 100000.0))))*
        43758.5453123);
}

vec3 pal( in float t, in vec3 a, in vec3 b, in vec3 c, in vec3 d )
{
    return a + b*cos( 6.28318*(c*t+d) );
}

void main() {

    vec2 st = gl_FragCoord.xy/vUv;
    vec2 p = gl_FragCoord.xy/vUv;
    vec2 uv =  (2.0 * gl_FragCoord.xy - vec2(1920.0, 1080.0) * 0.3) / 1080.0;

    st = uv;
    // p = vUv;
    p *= 10.10;
    // p.y *= 5.0;
    p.x += 0.1*u_timer;

    float pct = distance(vec2(st.x, st.y), vec2(0.1));

    vec3 pos = vPosition;
    vec3 color = vec3(0.0);
    st *= 1.0;
    if (u_progress < 0.3) {
        color.b = st.y * 0.3 * (1.0 - u_progress * 3.33);
    } else if (u_progress < 0.7) {
        color.b -= st.y * 0.1 * (u_progress - 0.3) / (0.7 - 0.3);
    } else {
        color.b += (1.5 - st.y) * 0.25 * (u_progress - 0.7) / (1.0 - 0.7);
    }
    // color.b = st.y * 0.6 + ((0.8 - st.y)) * 0.3 + (0.3 - st.y) * (u_progress - 0.3) / (0.0 - 0.3);
    color.g = 0.0 * st.y;
    color.r =  1920.0 * 0.5 / pos.y * 0.0001 * (u_progress - 0.7) / (1.0 - 0.7);

    

    // Modern metric brick of 215mm x 102.5mm x 65mm
    // http://www.jaharrison.me.uk/Brickwork/Sizes.html
    // st /= vec2(2.15,0.65)/1.5;

    // Apply the brick tiling
    // st = brickTile(st,69.0);

    // color = vec3(box(st,vec2(0.95)));

    // Uncomment to see the space coordinates
    // color = vec3(st,0.0);

    gl_FragColor = vec4(color,1.0);
}