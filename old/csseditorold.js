let template= document.createElement("template");
template.innerHTML=`
<style>
*{
box-sizing:border-box; 
margin:0; padding:0; 
outline:none;}

#container{
display:flex;
flex-direction:column;
position: fixed;
left:10px; top:10px;
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

@media (orientation:landscape) {
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

window.customElements.define("kd-edit",
class extends HTMLElement{
constructor(){
super();
this.attachShadow({mode:"open"});
this.shadowRoot.appendChild(template.content.cloneNode(true));				
}			
})

let preload=`#container{top:0px; left:0px; z-index:99999;
/*height:300px; width:400px;*/}`;

let border=`{
outline:3px solid transparent;
animation: kdflash 1s linear infinite alternate;
}

@keyframes kdflash{
0%{outline:3px solid transparent}
50%{outline:3px solid rgb(255,0,0,0.5)}
100%{outline:3px solid rgb(255,0,0,1)}
}`;

let
a= document.createElement("kd-edit"),
b= document.querySelector("kd-edit");
if(b){
b.parentNode.removeChild(b);
document.body.appendChild(a);
}
else{
document.body.appendChild(a);
}

let
rgx= /(?<!important\s?);/g,
imp= '!important\;';

let
local= a.shadowRoot.querySelector("#local"),
global= a.shadowRoot.querySelector("#global");

local.value= preload;
global.value= localStorage.getItem("kdcss");
   

let localstyle= document.createElement("style");
a.shadowRoot.appendChild(localstyle);
function localinject(){
localstyle.innerHTML= local.value.replace(rgx,imp);					
}
localinject();
local.onkeyup= localinject;


let globalstyle= document.createElement("style");
document.body.appendChild(globalstyle);
function globalinject(){
globalstyle.innerHTML= global.value.replace(rgx,imp) + border;					
}
globalinject();
global.onkeyup= globalinject;

let
lc= a.shadowRoot.querySelector(".local"),
gc= a.shadowRoot.querySelector(".global");

let lcopen= false;
let gcopen= true;

lc.onclick= function(){
if(lcopen){
local.style.display= "none";
local.style.pointerEvents= "none";
lcopen= false;				
}	
else{
local.style.display= "block";
local.style.pointerEvents= "auto";			
lcopen= true;				
}											
}

gc.onclick= function(){
if(gcopen){
lc.style.display= "none";
lc.style.pointerEvents= "none";	
global.style.display= "none";
global.style.pointerEvents= "none";	
local.style.display= "none";
local.style.pointerEvents= "none";
gcopen= false;				
}	
else{
lc.style.display= "inline";
lc.style.pointerEvents= "auto";	
global.style.display= "block";
global.style.pointerEvents= "auto";		
gcopen= true;				
}	
}

let obu= false;
window.onunload= window.onbeforeunload= function(){
if(!obu){
obu= true;
localStorage.removeItem("kdcss");
localStorage.setItem("kdcss",global.value);
}};

