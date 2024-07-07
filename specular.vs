out vec2 texCoord;

out vec3 N;
out vec3 v;

void main()
{
   texCoord = uv;
   
   v = mat3(modelMatrix)*normal;
   N = mat3(modelMatrix)*normal;
   gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}

