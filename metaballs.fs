in vec2 texCoord;
out vec4 fragColor;
uniform sampler2D texture0;
//uniform sampler2D texture2;
uniform float time;// = 1.0;

#define MAX_STEPS 25
#define MAX_DIST 400.0
#define SURFACE_DIST 0.005
//varying vec2 fragCoord; 
float Sphere(vec3 point, vec3 pos, float scale)
{ 
return length(point - pos)-scale;
}

float smin(float a, float b, float k) {
    float h = clamp(0.5 + 0.5*(a-b)/k, 0.0, 1.0);
    return mix(a, b, h) - k*h*(1.0-h);
}

float GetDist(vec3 point)
{
    
    float sphere1 = Sphere(point, vec3(sin(time*1.)*sin(time*2.5),cos(time*2.),3.), .3);
    float sphere2 = Sphere(point, vec3(sin(time*2.)*cos(time*1.5),cos(time*1.),3.), .3);
    float sphere3 = Sphere(point, vec3(cos(time*1.),sin(time*2.),3.), .3);
    float sphere4 = Sphere(point, vec3(cos(time*2.),sin(time*1.),3.), .3);
    float distSphere = smin(sphere1, sphere2,0.75);
    distSphere = smin(distSphere, sphere3,0.75);
    distSphere = smin(distSphere, sphere4,0.75);
    float distPlane = -point.z+4.;
    float dist = min(distSphere, distPlane);
    dist=distSphere;
    return dist;
}

float RayMarch(vec3 rayOrigin, vec3 rayDir)
{
    float distOrigin = 0.;
    
    for(int i=0; i<MAX_STEPS;i++)
    {
        vec3 pointOnRay = rayOrigin+rayDir*distOrigin;
        float distScene = GetDist(pointOnRay);
        distOrigin += distScene;
        if(distScene<SURFACE_DIST || distOrigin>MAX_DIST) break;
    }
    
    return distOrigin;
}

vec3 GetNormal(vec3 point)
{
    float dist = GetDist(point);
    vec2 e = vec2(.01,0.);
    vec3 normal = dist - vec3(
        GetDist(point-e.xyy), //e.xyy = 0.1,0,0
        GetDist(point-e.yxy),
        GetDist(point-e.yyx)); 
        
    return normalize(normal);
}

float GetLight(vec3 point)
{
    vec3 lightPos = vec3 (0., 0., 1.);
    
    //lightPos.xz+=vec2(sin(time),cos(time))*11.;
    vec3 light = normalize(lightPos-point);
    vec3 normal = GetNormal(point);
    
    float diffuse = clamp(dot(normal, light),0.,1.);
    
    float dist = RayMarch(point+normal*SURFACE_DIST*50.,light);
    if(dist<length(lightPos-point))
    {
        diffuse *=.8;
    }
    return diffuse;
}



 
void main()
{
	vec2 uv = vec2(texCoord.x-.5,texCoord.y-.5);
    //vec2 uv = (fragCoord-0.5*iResolution.xy)/iResolution.y;
    vec3 col = vec3(0.);
    
    vec3 rayOrigin = vec3(0., 0., 0.);
    vec3 rayDirection = normalize(vec3(uv.x,uv.y,1.));
    
    float dist = RayMarch(rayOrigin, rayDirection); 

    vec3 point = rayOrigin + rayDirection * dist;
    float diffuse = GetLight(point);
    
 
   // col = point;

    col = vec3(diffuse);
    col = GetNormal(point)+diffuse;
    fragColor = vec4(col,1.0);
}