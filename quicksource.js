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
z-index:99999;
width: 500px; height: 400px;
position: absolute;
left:20px; top:20px;
display:flex;
flex-direction:column;
pointer-events: none;
}

path{
stroke:red;
stroke-width:5px;
}
	
.close{
position:absolute;
top:-20px; left: 0;
width:20px; height:20px;
border:1px solid red;
cursor: pointer;
}

textarea{
padding: 5px;
width:100%; height:100%;
font: bold 10px "Courier New";
white-space: nowrap;
}

</style>
<div id="container">
<svg class="close" viewbox="0 0 40 40"><path d="M 10,10 L 30,30 M 30,10 L 10,30"/></svg>
<textarea></textarea>
</div>`;

let name= "kd-source"
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

let container= select("#container", a.shadowRoot),
all= selectAll("#container>*", a.shadowRoot),
close= select(".close", a.shadowRoot),
ta= select("textarea", a.shadowRoot),
regex= /\n?<style>\.qc-cmp-showing.+<\/style>/;

let style= create("style");
let head= document.head || document.body;
head.append(style);
style.innerHTML=`.nowtouching{
background:rgb(255,192,203,0.5)!important;
transition: none!important;
}`;


document.body.ontouchstart= (e)=>{
if(e.target!=a){
e.target.classList.add("nowtouching");
ta.value= e.target.outerHTML
.split(regex).join("")
.split(` nowtouching`).join("")
.split(` class="nowtouching"`).join("")
.split(` class=""`).join("")
.split(/> {0,3}</).join(">\n<")
.split("<kd-source></kd-source>").join("");
}
};

document.body.ontouchend=(e)=>{
e.target.classList.remove("nowtouching");
};


close.onclick= function(){
this.classList.toggle("hidden");
let hide= this.classList.contains("hidden");
all.forEach(i=> i.style.display= hide ? "none" : "block");
this.style.display= "block";
};

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
close.ondblclick=()=> a.remove();
