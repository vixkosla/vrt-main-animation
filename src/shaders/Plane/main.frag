// fragment.glsl
#ifdef GL_ES
precision lowp float;
#endif

varying vec2 vUv;

void main() {
  vec3 color = vec3(vUv.x, 1.0 - vUv.y, 1.0 - vUv.x); // градиент по UV
  gl_FragColor = vec4(color, 1.0);
}
