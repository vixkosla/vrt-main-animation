// vertex.glsl
uniform float uTime;

varying vec2 vUv;

void main() {

  vec3 pos = position;
  float time = uTime * 0.1;

  pos.y += sin(pos.x * 1.0 + time) * 1.05;

  vUv = uv; // передаём UV координаты во фрагментный шейдер
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
