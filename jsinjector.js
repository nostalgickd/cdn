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
position: absolute;
left:20px; top:20px;
display:flex;
flex-direction:column;
pointer-events: none;
width: 60vw;
aspect-ratio: 1/1;
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
width:100%; height:100%;
padding:5px;
font: bold 10px Courier New;
white-space: nowrap;
}

.run{
padding: 2px;
height: 20px;
border:1px solid red;
background: white;
position: absolute;
top: -20px; right:0;
cursor: pointer;
display: flex;
align-items: center;
justify-content: center;
font: bold 10px "Courier New";
}

.run:hover{
color: white;
background: black;
}

</style>
<div id="container">
<svg class="close" viewbox="0 0 40 40"><path d="M 10,10 L 30,30 M 30,10 L 10,30"/></svg>
<textarea spellcheck="false" autocapitalize="none" autocomplete="off"></textarea>
<span class="run">RUN</span>
</div>`;

let name= "kd-js"
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
run= select(".run", a.shadowRoot);

ta.value= `
let create= (x)=> document.createElement(x),
select= (x,y=document)=> y.querySelector(x),
selectAll= (x,y=document)=> y.querySelectorAll(x);


`;


run.onclick=()=>{
eval(ta.value);
};


let hide= true;
close.onclick= function(){
all.forEach(i=> i.style.display= hide ? "none" : "block");
this.style.display= "block";
hide= !hide;
};

function drag(e){
e.preventDefault();
let touchLocation = e.targetTouches[0];
let x= touchLocation.pageX;
let y= touchLocation.pageY;

container.style.left= x + "px";
container.style.top= y + "px";
};

close.ontouchmove= drag;
close.ondblclick=()=> a.remove();

//
