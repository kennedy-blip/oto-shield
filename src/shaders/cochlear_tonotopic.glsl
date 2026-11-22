#version 300 es
precision highp float;
out vec4 color;
uniform vec2 resolution;
uniform float time;
void main() {
 vec2 p = (gl_FragCoord.xy - .5*resolution)/resolution.y;
 float angle = atan(p.y,p.x); float radius = length(p);
 float spiral = abs(radius - (.08 + .045 * mod(angle + time*.1 + 6.283, 6.283)));
 float glow = .004 / max(spiral,.004);
 color = vec4(vec3(.05,.55,.43)*glow,1.);
}
