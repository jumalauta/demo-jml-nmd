uniform sampler2D texture0;
uniform float time;// = 1.0;
#define lightSource vec3(1.0,-1.0,-1.3)
#define lightSource2 vec3(0.0,-0.1,0.4)
#define frontLight vec4(1.0,1.0,1.0,1.0)
in vec3 N;
in vec3 v;
in vec2 texCoord;
out vec4 fragColor;
void main() 
{
   
	vec4 power = vec4(6.0);
	
	vec3 L = -normalize(lightSource-v);   
	vec4 Idiff = frontLight * max(dot(N,L), 0.61);  
	Idiff = clamp(Idiff, 0.0, 1.0); 
 
	
	vec3 L2 = -normalize(lightSource2-v);   
	vec4 Idiff2 = frontLight * max(dot(N,L2), 0.1);  
	Idiff2 = clamp(Idiff2, 0.0, 1.0); 

	
	Idiff=pow(Idiff,power)*3.5;
	Idiff2=pow(Idiff2,power*1.4)*12.0;
   	vec2 coord = texCoord.xy;
	Idiff = ((Idiff - 0.5) * max(1.7,0.0))+0.5;
	//Idiff2 = ((Idiff2 - 0.5) * max(1.5,0.0))+0.5;
	vec4 color=texture(texture0,coord);
	

	vec4 newColor=(color*(Idiff+Idiff2))*2.0;

	newColor.a=1.0;
	fragColor = newColor;
}

