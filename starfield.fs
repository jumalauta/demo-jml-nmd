// based on vDropTunnel https://www.shadertoy.com/view/wsKXRK
in vec2 texCoord;
out vec4 fragColor;
uniform sampler2D texture0;
uniform float time;// = 1.0;


#define PI 3.14159


float vDrop(vec2 uv,float t)
{
    uv.x = uv.x*175.0;						// H-Count
    float dx = fract(uv.x);
    uv.x = 2.*floor(uv.x);
    float s=cos(uv.x*1.1)*.3 +.1;			// speed
    float trail = mix(15.0,35.0,s);			// trail length
    float yv = fract(uv.y*.26 + t*s) * trail;
    yv = 1.0/yv;
    yv = smoothstep(0.0,.5,yv*yv);
    yv = sin(yv*PI)*(s*15.0);
    float d2 = sin(dx*PI*2.);
    return yv*(d2*d2);
}

void main( )
{
    float t =  time*3.4;
	vec2 p = vec2(texCoord.x-.5,texCoord.y-.5);
	p = p*mat2(cos(t*.5), -sin(t*.5), sin(t*.5),cos(t*.5));
	p = vec2(atan(p.x, p.y) / PI, 1./length(p*5.1)+0.01);

    vec3 col = vec3(sin(t)+2.0,sin(t*1.2)+2.0,cos(t*.7)+2.0) * vDrop(p,t);	// red

	fragColor = vec4(col*(1./length(p*4.)), (col.r+col.g+col.b)/3.0);
	
}
