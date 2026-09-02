let create= (x)=> document.createElement(x),
select= (x,y=document)=> y.querySelector(x),
selectAll= (x,y=document)=> y.querySelectorAll(x);

let template= create("template");
template.innerHTML=`<style>
*{
box-sizing:border-box; 
margin:0; padding:0; 
outline:none;
pointer-events: auto;
}

#container{
width: 300px; height: 250px;
z-index:99999;
position: fixed;
top:100px; left: 50px;
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
touch-action: none;
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
}

</style>
<style class="style"></style>
<div id="container">
<textarea id="global" autocapitalize= "off" spellcheck="false"></textarea>
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


let preload=`/*#container{z-index:99999;  
height:300px; width:350px;*/}`;

//top:20px; left:0px;



let border=`{
background: rgb(255,255,0,0.5);
outline:2px solid rgb(255,0,0,1);
animation: kdflash 1s linear infinite alternate;
}

@keyframes kdflash{
to{
background: rgb(255,255,0,0);
outline:2px solid rgb(255,0,0,0)
}
}`;


let localstyle= select(".style", a.shadowRoot),
all= selectAll("#container>*", a.shadowRoot),
container= select("#container", a.shadowRoot),
close= select(".close", a.shadowRoot),
lclose= select(".lclose", a.shadowRoot),
local= select("#local", a.shadowRoot),
global= select("#global", a.shadowRoot);
//rgx= /(?<!important\s?);/g,
//imp= '!important\;';

//important clashes with keyframes. need to make it optional


local.value= preload;
global.value= localStorage.kdcss||"";

function localinject(){
//localstyle.innerHTML= local.value.replace(rgx,imp);
localstyle.innerHTML= local.value;					
}
localinject();
local.oninput= localinject;

let _filter=`kd-css{
filter: none!important;
}

`;
let globalstyle= create("style");
document.body.append(globalstyle);
function globalinject(){
//globalstyle.innerHTML= _filter + global.value.replace(rgx,imp) + border;					
globalstyle.innerHTML= _filter + global.value + border;
}
globalinject();
global.oninput= globalinject;


let hide= true;
close.onclick= function(){
if (hasDragged) return;
all.forEach(i=> i.style.display= hide ? "none" : "block");
local.style.display= "none";
this.style.display= "block";
hide= !hide;
};
 

local.style.display= "none";
lclose.onclick= function(){
let hide= (local.style.display!="none");
local.style.display= hide ? "none" : "block";
};


let obu= false;
window.onunload= window.onbeforeunload= function(){
if(!obu){
obu= true;
localStorage.removeItem("kdcss");
localStorage.kdcss= global.value;
}};



lclose.ondblclick=()=>{
a.remove();
global.value= "";
};


const draggable= container;

let isDragging= false;
let hasDragged= false;
let startX, startY;
let initialLeft, initialTop;

close.addEventListener('mousedown', startDrag);
document.addEventListener('mousemove', drag);
document.addEventListener('mouseup', endDrag);

close.addEventListener('touchstart', startDrag, { passive: false });
document.addEventListener('touchmove', drag, { passive: false });
document.addEventListener('touchend', endDrag);


function startDrag(e) {
isDragging= true;
hasDragged= false;
const clientX= e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
const clientY= e.type === 'touchstart' ? e.touches[0].clientY : e.clientY;
startX= clientX;
startY= clientY;
initialLeft= draggable.offsetLeft;
initialTop= draggable.offsetTop;
}

function drag(e) {
if (!isDragging) return;
if (e.cancelable) e.preventDefault(); 

const clientX= e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
const clientY= e.type === 'touchmove' ? e.touches[0].clientY : e.clientY;

const deltaX= clientX - startX;
const deltaY= clientY - startY;

if (Math.abs(deltaX) > 3 || Math.abs(deltaY) > 3) {
  hasDragged= true;
}

requestAnimationFrame(() => {
draggable.style.left= `${initialLeft + deltaX}px`;
draggable.style.top= `${initialTop + deltaY}px`;
});
}

function endDrag() {
isDragging= false;
}
