let $=x=>document.createElement(x);

let a= $("div"),
b= $("textarea"),
c= $("span");
d= $("span");
a.id="lawlz";

let A= document.querySelector("#lawlz");
if(A){
A.remove();
document.body.append(a);
}else{
document.body.append(a);
}
a.append(b,c,d);

d.innerHTML= "❌";

b.value=`let create= (x)=> document.createElement(x),
select= (x,y=document)=> y.querySelector(x),
selectAll= (x,y=document)=> y.querySelectorAll(x);

`;

function pe(x,y){
if(y=="0"){
x.forEach(i=> i.style.pointerEvents= "none");
}
else{
x.forEach(i=> i.style.pointerEvents= "auto");
}

}

d.style.cssText= `position:absolute;
color:red;background:yellow; left:0; width:20px; height:20px; top:-20px;`;

d.onclick=()=>{
d.classList.toggle("hidden");
if(d.classList.contains("hidden")){
pe([a,b,c],0);
pe([d],1);
[b,c].forEach(i=>{
i.style.display= "none";
});
}
else{
pe([a,b,c,d],1);
[b,c].forEach(i=>{
i.style.display= "block";
});
}
};





c.innerHTML= "RUN";
c.ontouchstart=()=> {c.style.background= "yellow";};
c.ontouchend=()=> {c.style.background= "white";};
c.onclick=()=> {eval(b.value);};
c.style.cssText= `position:absolute;
z-index:2;top:2px; right:2px;`;


a.style.cssText=`width:550px;
height:400px;z-index:100; top:20px; position:absolute;
`;

b.autocorrect= "off";
b.autocapitalize= "off";
b.style.cssText= `width:100%;height:100%;
outline:none; padding:5px;z-index:1; font: bold 10px Courier New; white-space: nowrap`;


d.addEventListener('touchmove', function(e) {
var touchLocation = e.targetTouches[0];
a.style.left= touchLocation.pageX + "px";
a.style.top= touchLocation.pageY + "px";
})

//---
let w= document.documentElement.clientWidth + 500;
let h= document.documentElement.scrollHeight + 500;

d.addEventListener('touchmove', function(e) {
e.preventDefault();
var touchLocation = e.targetTouches[0];
a.style.left= Math.min(touchLocation.pageX,w) + "px";
a.style.top= Math.min(touchLocation.pageY,h) + "px";
})
