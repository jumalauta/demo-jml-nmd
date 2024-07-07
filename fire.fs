// based on Fire by kbjwes77 https://shadertoy.com/view/3slcRM
in vec2 texCoord;
out vec4 fragColor;
uniform sampler2D texture0;
uniform float time;// = 1.0;


#define PI 3.14159

void main( )
{
    float off_y = -time/4.0;
    
    // sample
    vec2 uv = texCoord.xy;
    float v = texture(texture0,vec2(uv.x*.1-time*.1,uv.y+off_y)).r/(texCoord.y)*.5;
    float v2=(texCoord.y)*texture(texture0,vec2(uv.x-time*.1,uv.y+off_y)).r;
    v=v/v2;

	uv+=.5;
    float vv = texture(texture0,vec2(uv.x*.1+time*.05,uv.y+off_y)).r/(texCoord.y)*.5;
    float vv2=(texCoord.y)*texture(texture0,vec2(uv.x+time*.05,uv.y+off_y)).r;
    vv=vv/vv2;

	v=.05*((v*abs(sin(time)))/vv2)*(abs(sin(time*.5)))+((v*(.5+.5*abs(sin(time*3.0))))+vv*0.5)/6.;
    vec3 col = vec3(0.0,0.0,0.0);
    col.r = pow(v,8.0);
    col.g = pow(v,.7)*0.3;
    col.b = col.g*0.2;

    // output
    fragColor = vec4(clamp(col,0.0,1.0),1.0);
}

