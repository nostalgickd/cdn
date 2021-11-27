let create= (x)=> document.createElement(x),
select= (x,y=document)=> y.querySelector(x);

let template= create("template");
template.innerHTML=`<style>
#container>*{
box-sizing:border-box; 
margin:0; padding:0; 
outline:none;
pointer-events: auto;
}

#container{
width: 300px; height: 250px;
z-index:99999;
position: absolute;
top:25px; left: 0;
display:flex;
flex-direction:column;
pointer-events: none;
}
	
svg{
position:absolute;
width:20px; height:20px;
border:1px solid red;
cursor: pointer;
}

.close{
top: -20px;
left:0;
}

.lclose{
bottom: 15%;
right:0;
}

path{
stroke:red;
stroke-width:5;
}


textarea{
padding: 5px;
font: bold 12px "Courier New";
background: rgb(0,0,0,0.7);
border: 1px solid #39ff14;				
}


#global{
height: 85%;
color: #39ff14;
}

#local{
height: 15%;
color: white;
font: 10px "Courier New";
display:none;
}

</style>
<style class="style"></style>
<div id="container">
<textarea id="global" autocapitalize= "off" spellcheck="false" style="display: block"></textarea>
<textarea id="local" autocapitalize= "off" spellcheck="false"></textarea>
<svg class="close" viewbox="0 0 40 40">
<path d="M 10,10 L 30,30 M 30,10 L 10,30"/></svg>
<svg class="lclose" viewbox="0 0 40 40">
<path d="M 10,10 L 30,30 M 30,10 L 10,30"/></svg>
</div>`;

let name= "kd-css"
if (!customElements.get(name)){
window.customElements.define(name,
class extends HTMLElement{
constructor(){
super();
this.attachShadow({mode:"open"});				
}			
})
}

//-------------------------------------------- 
let a= create(name), b= select(name);
a.shadowRoot.append(template.content.cloneNode(true));

if(b){
b.remove();
document.body.append(a);
}
else document.body.append(a);


let preload=`/*#container{z-index:99999; top:20px; left:0px; 
height:300px; width:350px;*/}`;

let border=`{
outline:3px solid transparent;
animation: kdflash 1s linear infinite alternate;
}

@keyframes kdflash{
0%{outline:3px solid transparent}
50%{outline:3px solid rgb(255,0,0,0.5)}
100%{outline:3px solid rgb(255,0,0,1)}
}`;


let localstyle= select(".style", a.shadowRoot),
container= select("#container", a.shadowRoot),
close= select(".close", a.shadowRoot),
lclose= select(".lclose", a.shadowRoot),
local= select("#local", a.shadowRoot),
global= select("#global", a.shadowRoot),
rgx= /(?<!important\s?);/g,
imp= '!important\;';


local.value= preload;
global.value= localStorage.kdcss||"";

function localinject(){
localstyle.innerHTML= local.value.replace(rgx,imp);					
}
localinject();
local.oninput= localinject;


let globalstyle= create("style");
document.body.append(globalstyle);
function globalinject(){
globalstyle.innerHTML= global.value.replace(rgx,imp) + border;					
}
globalinject();
global.oninput= globalinject;



close.onclick= function(){
let block= (global.style.display=="block");
global.style.display= (block) ? "none":"block";
lclose.style.display= (block) ? "none":"block";
local.style.display= "none";
};


lclose.onclick= function(){
let block= (local.style.display=="block");
local.style.display= (block) ? "none" : "block";
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

close.ontouchmove= drag;
close.onmousemove= drag;
lclose.ondblclick=()=> a.remove();
