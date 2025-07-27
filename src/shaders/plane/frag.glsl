// fragment.glsl
#ifdef GL_ES
precision lowp float;
#endif

uniform vec2 u_resolution;
uniform float uTime;
uniform float u_progress;

varying vec2 vUv;

float circle(in vec2 _st, in float _radius){
    vec2 dist = _st-vec2(0.5);
	return 1.-smoothstep(_radius-(_radius*0.5),
                         _radius+(_radius*0.5),
                         dot(dist,dist)*2.0);
}

float plot (vec2 st, float pct, float offset) {
  return smoothstep(pct + offset, pct, st.y) - smoothstep(pct , pct + offset, st.y);
}

float plotB (vec2 st, float pct, float offset) {
  return smoothstep(pct + offset, pct + offset, st.y) - smoothstep(pct + offset , pct + offset, st.y);
}

float plotA (vec2 st, float pct, float offset) {
  return smoothstep(pct + 0.02 + offset, 0.0, abs(st.y - st.x));
}

void main() {
  vec2 st = vUv / 4.0; // используем UV координаты из вершинного шейдера
  float time = uTime * 0.1;

  vec3 circle = vec3(0.8039 * u_progress, 0.1098 , 0.8941) * vec3(circle(vUv, 0.3)); // создаём круг с радиусом 0.5

  float y2 = pow(vUv.x, 0.01) - pow(vUv.x, 0.5) + sqrt(vUv.x);
  float y3 = mod(vUv.x, 0.9);
  float y = smoothstep(0.1, 0.5 , vUv.x ) - smoothstep(0.1, 0.8, vUv.x);
  float y1 = smoothstep(0.1, 0.7, vUv.x) - pow(vUv.x, 1.8);
  float b = plot(vUv, y3, 0.3);

  float b1 = plot(vUv, y1, 0.15 * abs(sin(3.14 * time)));
  float b11 = plot(vUv, y, 0.25 * abs(sin(1.5 * time)));

  float b3 = plot(vUv, y, 0.05);
  // vec3 color = mix(vec3(1.0, 1.0, 1.0), vec3(0.8039, 0.0627, 0.9176), circle); // смешиваем цвет круга с черным
  vec3 a = vec3(vUv.y, (1.0 - vUv.y), 1.0 - vUv.y);
  vec3 color = vec3(y1);
  // color = a * min( 1.0 - u_progress * 2.0, 1.0) ; // градиент по UV
  vec3 a0 = a + b1 + b11;
  // color = a0;

if (u_progress < 0.15) {
  color = a;
} else if (u_progress < 0.35) {
  float t = (u_progress - 0.15) / (0.35 - 0.15); // t от 0 до 1
  color = mix(a, a0, t); // плавный переход от a → a0
} else {
  float t = (u_progress - 0.35) / (1.0 - 0.35); // нормализуем от 0 до 1
  color = mix(a0, a, t); // плавный возврат a0 → a
}

  

  // color = a;
  

  // color += b + b1;
  // color += (1.0 - b1 )* vec3(y) + b * vec3(0.8039, 0.1098, 0.8941); // добавляем цвет круга
  // color += (1.0 - b )* vec3(y) + b1 * vec3(0.8039, 0.1098, 0.8941); // добавляем цвет круга
  color *= circle;
  // color = (1.0 - b) * color + color * 1.0;
  // color *= (1.0 - b1);

  float alpha = 1.0;

  if (length(color - vec3(0.0)) < 0.1)
    alpha = 0.0;

  gl_FragColor = vec4(color, alpha);
}
