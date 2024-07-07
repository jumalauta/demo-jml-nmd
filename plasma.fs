in vec2 texCoord;
out vec4 fragColor;
uniform sampler2D texture0;
uniform float time;// = 1.0;


void main()
{
	vec2 uv = 7.0*texCoord.xy;
   
	float t = time*3.0;

    float v5 = cos(length(uv*2.0+sin(t)) -5.7*t);	
    float v1 = sin(uv.x-cos(t*2.)-uv.y*sin(t))-sin(t);
    float v2 = sin(uv.y +sin(sin(sin(t))));
    float v3 = sin(uv.x-uv.y -sin(1.5*t));
    float v4 = sin(length(sin(uv)) +1.7*t);

	float v = mix(v1,v2,v3)+v4+v5;

	vec3 pixel = vec3(.5+sin(v),.5+cos(v),.5+sin(v*2.*sin(t)));

    fragColor = vec4(pixel, 1.);
}