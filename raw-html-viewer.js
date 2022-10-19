let create= (x)=> document.createElement(x),
select= (x,y=document)=> y.querySelector(x),
selectAll= (x,y=document)=> y.querySelectorAll(x);

let template= create("template");
template.innerHTML=`<style>
*{
box-sizing:border-box; 
margin:0; padding:0; 
border: none;
outline: none;
pointer-events: auto;
}

#container{
z-index:99999;
position: fixed;
left:20px; top:20px;
display:flex;
flex-direction:column;
pointer-events: none;
border: 1.5px solid black;
}


	
.topbar{
width: 100%;
height: 30px;
display: flex;
background: pink;
justify-content: flex-end;
border-bottom: 1.5px solid black;
}


button{
font-variant: small-caps;
padding: 2px; 
height: 30px;
background: lightgray;
justify-self: flex-end;
border-bottom: 1.5px solid black;
}


svg{
height: 100%;
}


button:hover{
color: white;
background: black;	
}

.move{
width: 30px;
position: absolute;
border-right: 1.5px solid black;
}


.wrap{
width: auto;
margin: 0 -1px 0 0;
border-left: 1.5px solid black;
border-right: 1.5px solid black;
}

.parent{
width: auto;
border-left: 1.5px solid black;
}


textarea{
padding: 5px;
width: 300px;
height: 500px;
font: bold 10px "Courier New";
}

</style>
<div id="container">
<button class="move">move</button>

<div class="topbar">
<button class="wrap">no wrap</button>
<button class="parent">parent</button>
</div>
<textarea></textarea>
</div>`;

let name= "kd-quiksource";
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
move= select(".move", a.shadowRoot),
wrap= select(".wrap",a.shadowRoot),
parent= select(".parent",a.shadowRoot),
textarea= select("textarea",a.shadowRoot);

move.innerHTML= `<svg viewBox="0 0 24 24">
<path fill="currentColor" d="M18 11h-5V6h3l-4-4l-4 4h3v5H6V8l-4 4l4 4v-3h5v5H8l4 4l4-4h-3v-5h5v3l4-4l-4-4z"/></svg>`;

let hide= true;
move.onclick= function(){
all.forEach(i=> i.style.display= hide ? "none" : "flex");
this.style.display= "inline-block";
hide= !hide;
};

function drag(e){
e.preventDefault();
let touchLocation = e.targetTouches[0];
let x= touchLocation.pageX || e.pageX;
let y= touchLocation.pageY || e.pageY;

container.style.left= x + "px";
container.style.top= y + "px";
};

move.ontouchmove= drag;
move.onmousemove= drag;
move.ondblclick=()=> a.remove();

//Actual code

let thiselement= "";
let clone= "";
let selector= "kdactive";

let style= create("style");
style.id= selector;
document.body.append(style);
style.innerHTML= `.${selector}{
outline: 1.5px dashed red!important; 
background: rgb(0,255,0,0.3);
transition: none;
`;

textarea.value= `
Hover on an element to view its outerHTML
Use the top left button to drag this window anywhere 
Click on the button to mini/maximize the window
Double click on the button to remove this window
`;




document.body.ontouchstart= function(e){
let thiselement= e.target;
if(thiselement==a) return;
selectAll(`.${selector}`).forEach(i=> i.classList.remove(selector));
thiselement.classList.add(selector);
clone= thiselement.cloneNode(true);

removeTag(name,clone);
removeTag(`#${selector}`,clone);
};



//Parenting
parent.onclick=()=>{
thiselement= select(`.${selector}`);
if(!thiselement) return;
if(thiselement.tagName.toLowerCase()=="html") return;
selectAll(`.${selector}`).forEach(i=> i.classList.remove(selector));
thiselement.parentNode.classList.add(selector);
clone= thiselement.parentNode.cloneNode(true);

removeTag(name,clone);
removeTag(`#${selector}`,clone);

};
	

function removeTag(x,y){
let tag= select(x,y);
if(tag) tag.remove();
y.classList.remove(selector);
textarea.value= 
y.outerHTML.replace(/ class=""/g,"").replace(/>\s*</g,">\n<");
}


wrap.onclick= function(){
if(textarea.style.whiteSpace=="nowrap"){
this.innerHTML= "no wrap";
textarea.style.whiteSpace="normal";
}
else{
this.innerHTML= "wrap";
textarea.style.whiteSpace="nowrap";
}

};

