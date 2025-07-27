#ifdef GL_ES
precision highp float;
#endif
// vertex.glsl
// uniform float uTime;

varying vec2 vUv;

void main() {

  vec3 pos = position;
  // float time = uTime * 0.1;

  // pos.y += sin(pos.x * 1.0 + time) * 1.05;

  // pos.y *= sqrt(pos.x);
  // pos.y += cos(uTime) * 0.5;
  // pos.x *= sqrt(pos.y);

  // if (uTime > 10.0) {
    // pos.x += mix(sqrt(pos.y * 0.015), abs(pow(pos.y, 0.150)), sin(uTime));
    // pos.x += mix(sqrt(pos.y * 0.015), pow(pos.y, 0.150), sin(uTime));
  // }
  // pos.x += pow(pos.y, 2.4);

  vUv = uv; // передаём UV координаты во фрагментный шейдер
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
