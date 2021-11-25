let template= document.createElement("template");
template.innerHTML=`
<style>

div{
z-index: 400;
width:50vw;
aspect-ratio: 3/1;
position:absolute;
top:20px; 
}

textarea{
z-index:1;
width:100%; height:100%;
padding:5px;
font: bold 10px Courier New;
outline:none;
/*white-space: nowrap;*/
}

.close{
width:20px; height:20px;
color:red;
background:yellow;
position:absolute;
left:0; top:-20px;
z-index:2;
opacity: 1;
cursor: pointer;
}

.run{
position:absolute;
z-index:2;top:2px; right:2px;
}

.run:hover{
background: #39ff14;
}



</style>
<div>
<textarea autocorrect= "off" autocapitalize= "off">let create= (x)=> document.createElement(x),
select= (x,y=document)=> y.querySelector(x),
selectAll= (x,y=document)=> y.querySelectorAll(x);\n
</textarea>
<span class="close">❌</span>
<span class="run">RUN</span>
</div>
`;


if (!customElements.get("kd-js")){
customElements.define("kd-js",
class extends HTMLElement{
constructor(){
super();
this.attachShadow({mode:"open"});
}			
})
}


let a= document.createElement("kd-js");
let b= document.querySelector("kd-js");
a.shadowRoot.append(template.content.cloneNode(true));

if(b){
b.remove();
document.body.append(a);
}
else document.body.append(a);


//---Code
let div= select("div", a.shadowRoot);
let textarea= select("textarea", a.shadowRoot);
let close= select(".close", a.shadowRoot);
let run= select(".run", a.shadowRoot);

run.onclick=()=>{
eval(textarea.value);
};


function hide(hide){
run.style.display= (hide=="yes") ? "none" : "inline";
textarea.style.display= (hide=="yes") ? "none" : "block";
div.style.pointerEvents= (hide=="yes") ? "none" : "auto";
close.style.pointerEvents= "auto";
}


close.onclick= function(){
this.classList.toggle("hidden");
(this.classList.contains("hidden")) ? hide("yes") : hide("no");
};


function drag(e){
e.preventDefault();
let touchLocation = e.targetTouches[0];
let x= touchLocation.pageX || e.pageX;
let y= touchLocation.pageY || e.pageY;

div.style.left= x + "px";
div.style.top= y + "px";
};

close.ontouchmove= drag;
close.onmousemove= drag;
