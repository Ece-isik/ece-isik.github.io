(()=>{const e=document.querySelector("canvas.webgl"),t=new THREE.Scene,n=document.querySelector(".canvas"),i={width:n.offsetWidth,height:n.offsetHeight};window.addEventListener("resize",(()=>{i.width=window.innerWidth,i.height=window.innerHeight,o.aspect=i.width/i.height,o.updateProjectionMatrix(),r.setSize(i.width,i.height),r.setPixelRatio(Math.min(window.devicePixelRatio,2))}));const o=new THREE.PerspectiveCamera(75,i.width/i.height,.1,100);o.position.z=15,t.add(o);const r=new THREE.WebGLRenderer({canvas:e,antialias:!0});r.setSize(i.width,i.height),r.setPixelRatio(Math.min(window.devicePixelRatio,2));const a=(new THREE.TextureLoader).load("./textures/earth_uv_map.jpg"),d=new THREE.Mesh(new THREE.SphereGeometry(5,50,50),new THREE.ShaderMaterial({vertexShader:"\n            varying vec2 vertexUV;\n            varying vec3 vertexNormal;\n\n            void main() \n            {\n                vertexUV = uv;\n                vertexNormal = normalize(normalMatrix * normal);\n                gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );  \n            }",fragmentShader:"\n            uniform sampler2D globeTexture;\n            varying vec2 vertexUV; //[0,0.24]\n            varying vec3 vertexNormal;\n            \n            void main() \n            {\n                float intensity = 1.05 - dot(vertexNormal, vec3(0,0,1));\n                vec3 atmosphere = vec3(0.3,0.6,1) * pow(intensity, 1.5);\n                gl_FragColor = vec4(atmosphere + texture2D(globeTexture, vertexUV).xyz, 1.0);\n            }",uniforms:{globeTexture:{value:a}}})),s=new THREE.Mesh(new THREE.SphereGeometry(5,50,50),new THREE.ShaderMaterial({vertexShader:"\n            varying vec3 vertexNormal;\n\n            void main() \n            {\n                vertexNormal = normalize(normalMatrix * normal);\n                gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );  \n            }",fragmentShader:"\n            varying vec3 vertexNormal; \n\n            void main() \n            {\n                float intensity = pow(0.6 - dot(vertexNormal, vec3(0,0,1.0)),2.0);\n                gl_FragColor = vec4(0.3,0.6,1.0,1.0) * intensity;\n            }",blending:THREE.AdditiveBlending,side:THREE.BackSide}));s.scale.set(1.2,1.2,1.2);const l=new THREE.Group;l.add(d,s),t.add(l);const v=new THREE.BufferGeometry,c=new THREE.PointsMaterial({color:"#ffffff"}),h=new Float32Array(7500);for(let e=0;e<2500;e+=3){const t=200*(Math.random()-.5),n=200*(Math.random()-.5),i=500*-Math.random();h[e]=t,h[e+1]=n,h[e+2]=i}v.setAttribute("position",new THREE.BufferAttribute(h,3));const m=new THREE.Points(v,c);t.add(m);const w={};window.addEventListener("mousemove",(e=>{w.x=e.clientX/i.width*2-1,w.y=-e.clientY/i.height*2+1}));const E=new THREE.Clock,x=()=>{const e=E.getElapsedTime();d.rotation.y=.1*e,(w.x||w.y)&&(gsap.to(l.rotation,{y:.4*w.x,duration:2}),gsap.to(l.rotation,{x:.2*w.y,duration:2}));const n=Math.cos(e);m.position.set(n,n,n),r.render(t,o),window.requestAnimationFrame(x)};x()})();
//# sourceMappingURL=bundle.c4c7ecbbdd05db69.js.map