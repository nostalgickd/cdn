let create= (x)=> document.createElement(x),
select= (x,y=document)=> y.querySelector(x);

let template= create("template");
template.innerHTML=`<style>
*{
box-sizing:border-box; 
margin:0; padding:0; 
outline:none;
}

#container{
display:flex;
flex-direction:column;
position: absolute;
left:20px; top:20px;
z-index:99999;
pointer-events:none;
}

textarea{
font-weight: bold;
font-family: "Courier New";
width: 100%;
background: rgb(0,0,0,0.7);
outline:none;
padding: 5px 5px 5px 20px;
border:1px solid gray;		
pointer-events:auto;					
}

#global{
font-size:12px;
height:85%;
color: #39ff14;
}

#local{
font-size:10px;
height:15%;
color: white;
display:none;
}

svg{
border:1px solid red;
stroke:red;
stroke-width:5px;
width:20px;
height:20px;
position:absolute;
left:0;
cursor: pointer;
pointer-events:auto;
}
	
.global{top:0;}
.local{bottom:15%;}

@media (orientation:portrait) {
#container{
width:50vw;
height:40vw;
}
}

@media (orientation:landscape){
#container{
width:30vw;
height:20vw;
}
}

</style>
<div id="container">
<textarea id="global" autocapitalize= "off" spellcheck="false"></textarea>
<textarea id="local" autocapitalize= "off" spellcheck="false"></textarea>
<svg class="global" viewbox="0 0 40 40">
<path d="M 10,10 L 30,30 M 30,10 L 10,30"/></svg>
<svg class="local" viewbox="0 0 40 40">
<path d="M 10,10 L 30,30 M 30,10 L 10,30"/></svg>
</div>`;

if (!customElements.get("kd-edit")){
window.customElements.define("kd-edit",
class extends HTMLElement{
constructor(){
super();
this.attachShadow({mode:"open"});				
}			
})
}

//----------
let preload=`/*#container{top:0px; left:0px; z-index:99999;
height:300px; width:400px;*/}`;

let border=`{
outline:3px solid transparent;
animation: kdflash 1s linear infinite alternate;
}

@keyframes kdflash{
0%{outline:3px solid transparent}
50%{outline:3px solid rgb(255,0,0,0.5)}
100%{outline:3px solid rgb(255,0,0,1)}
}`;

let a= create("kd-edit"), b= select("kd-edit");
a.shadowRoot.append(template.content.cloneNode(true));

if(b){
b.remove();
document.body.append(a);
}
else{
document.body.append(a);
}


let container= select("#container", a.shadowRoot),
local= select("#local", a.shadowRoot),
global= select("#global", a.shadowRoot),
lc= select(".local", a.shadowRoot),
gc= select(".global", a.shadowRoot),
rgx= /(?<!important\s?);/g, imp= '!important\;';


local.value= preload;
global.value= localStorage.kdcss||"";
   

let localstyle= create("style");
a.shadowRoot.append(localstyle);
function localinject(){
localstyle.innerHTML= local.value.replace(rgx,imp);					
}
localinject();
local.onkeyup= localinject;


let globalstyle= create("style");
document.body.append(globalstyle);
function globalinject(){
globalstyle.innerHTML= global.value.replace(rgx,imp) + border;					
}
globalinject();
global.onkeyup= globalinject;


function hideGlobal(hide){
lc.style.display= (hide=="yes") ? "none" : "inline";
local.style.display= (hide=="yes") ? "none" : "none";
global.style.display= (hide=="yes") ? "none" : "block";
container.style.pointerEvents= (hide=="yes") ? "none" : "auto";
gc.style.pointerEvents= "auto";
}

function hideLocal(hide){
local.style.display= (hide=="yes") ? "none" : "block";
local.style.pointerEvents= (hide=="yes") ? "none" : "auto";
}


gc.onclick= function(){
lc.classList.remove("hidden");
this.classList.toggle("hidden");
this.classList.contains("hidden") ? hideGlobal("yes") : hideGlobal("no");
};

lc.onclick= function(){
this.classList.toggle("hidden");
this.classList.contains("hidden") ? hideLocal("no") : hideLocal("yes");
};



let obu= false;
window.onunload= window.onbeforeunload= function(){
if(!obu){
obu= true;
localStorage.removeItem("kdcss");
localStorage.kdcss= global.value;
}};



function drag(e){
e.preventDefault();
let touchLocation = e.targetTouches[0];
let x= touchLocation.pageX || e.pageX;
let y= touchLocation.pageY || e.pageY;

container.style.left= x + "px";
container.style.top= y + "px";
};

gc.ontouchmove= drag;
gc.onmousemove= drag;

