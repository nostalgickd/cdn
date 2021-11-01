let icon=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
<path stroke="red" stroke-width="2.5"d="M6.44,6.58L17.76,17.15"/>
<path fill="none" stroke="red" stroke-width="2"
d="M1.71,1.61L22.50,1.61L22.50,22.12L1.71,22.12z"/>
<path stroke="red" stroke-width="2.5"d="M6.14,17.48L18.07,6.25"/>
</svg>`;

let def=`#cssdiv{z-index:99999; top:0px; left:0px;
height:300px; width:400px;}`;

//border
let border=`{
animation:kd 1s infinite alternate;
}
@keyframes kd{
100%{box-shadow: 0 0 10px 2px red}
}`;

//Styling
let styling=`
#cssdiv#cssdiv{
z-index: 99999;
pointer-events: none;
width: 400px;
height: 300px;
position: fixed;
top: 0; left: 0;
}

#cssclose#cssclose,
#cssclose2#cssclose2{
display:inline;
pointer-events: auto;
width: 18px; height: 18px;
position: absolute; left: 0;
background:none;
font:12px Arial;
margin:0; border: none;
}

#cssta#cssta,
#cssta2#cssta2{
width: 100%;
background: rgb(0,0,0,0.7);
outline:none;
box-sizing: border-box;
position: absolute;
padding-left: 20px;
border:1px solid gray;
}

#cssta#cssta{
display: block;
pointer-events: auto;
height: 90%; top:0;
color: #39FF14;
font: bold 13px 'Courier New';
}

#cssta2#cssta2{
display: none;
pointer-events: none;
height: 10%; bottom: 0;
color: #fff;
font: bold 10px 'Courier New';
}`;

//Container
let cssdiv= document.createElement('div');
cssdiv.id='cssdiv';
let x= document.querySelector('#cssdiv');
if(x){
x.parentNode.removeChild(x);
document.body.appendChild(cssdiv);
}
else document.body.appendChild(cssdiv);

//TA1
let a1= document.createElement('textarea');
a1.id='cssta';
a1.spellcheck= false;
a1.value= localStorage.getItem('css');
cssdiv.appendChild(a1);

let a2= document.createElement('style');
document.body.appendChild(a2);
let rgx= /(?<!important\s?);/g;
let imp= '!important\;';
a2.innerHTML= a1.value.replace(rgx,imp)+border;
a1.onkeyup=function(){
a2.innerHTML= a1.value.replace(rgx,imp)+border;
};

let a3= document.createElement('span');
a3.id='cssclose';
a3.innerHTML= icon;
a3.style.top= '0';
cssdiv.appendChild(a3);

let a3click=true;
a3.onclick=function(){
if(a3click){
a1.style.display='none';
b1.style.display='none';
b3.style.display='none';
cssdiv.style.pointerEvents='none';
a3click=false;
}
else{
cssdiv.style.pointerEvents='auto';
a1.style.display='block';
b3.style.display='block';
a3click=true;
}};


//TA2
let b1= document.createElement('textarea');
b1.id='cssta2';
b1.spellcheck= false;
b1.value= def;
cssdiv.appendChild(b1);

let b2= document.createElement('style');
document.body.appendChild(b2);
b2.innerHTML= styling + b1.value.replace(rgx,imp);
b1.onkeyup=function(){
b2.innerHTML= styling + b1.value.replace(rgx,imp);
};

let b3= document.createElement('span');
b3.id='cssclose2';
b3.innerHTML= icon;
b3.style.bottom= '10%';
cssdiv.appendChild(b3);

let b3click=true;
b3.onclick=function(){
if(b3click){
b1.style.display='block';
b1.style.pointerEvents='auto';
b3click=false;
}
else{
b1.style.display='none';
b1.style.pointerEvents= 'none';
cssdiv.style.pointerEvents='none';
a1.style.pointerEvents='auto';
b3click=true;
}};

//Store CSS
let obu= false;
window.onunload= window.onbeforeunload= function(){
if(!obu){
obu= true;
localStorage.removeItem('css');
localStorage.setItem('css',a1.value);
}};
