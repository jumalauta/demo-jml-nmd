
in vec2 texCoord;
out vec4 fragColor;

uniform sampler2D texture0;
uniform float time;// = 21.0;
#define speedX -0.1
#define speedY 0.3
#define video 0.0
#define value1 1.0
#define value2 0.5
#define value3 2.0
#define value4 2.0
#define contrast 0.025
#define alpha 1.0
uniform vec4 color;// = vec4(1);
void main()
{
vec4 colors;
 
    vec2 xy = texCoord.xy;
	xy*=5.0;
	xy.x+=sin(2.0*time);
	xy.y+=cos(2.0*time);
     vec4 color2=texture(texture0,xy);

	
	 vec4 color3=vec4(abs(sin(time))*.75+.25,abs(cos(time*.77))*.75+.25,abs(sin(cos(time)))*.75+.25, 1.0);
	  fragColor=color3*color2;
	  
 
}