let
titles= ["Normal","1.5x","2.0x","Custom"],
urls= ["javascript:(function()%7Bdocument.querySelector(%22video%22).playbackRate%3D1%3B%7D)()%3B","javascript:(function()%7Bdocument.querySelector(%22video%22).playbackRate%3D1.5%3B%7D)()%3B","javascript:(function()%7Bdocument.querySelector(%22video%22).playbackRate%3D2%3B%7D)()%3B","javascript:(function()%7Blet%20a%3D%20prompt(%22Enter%20desired%20speed%20e.g%202.5%20or%204%22)%3B%0Adocument.querySelector(%22video%22).playbackRate%3D%20a%3B%7D)()%3B"];

let create= (x)=> document.createElement(x),
select= (x,y=document)=> y.querySelector(x),
selectAll= (x,y=document)=> y.querySelectorAll(x);
  
let div= create("div"); div.id= "kdbmlistdiv";
let present= select("#kdbmlistdiv");
if(present){
present.remove();
document.body.append(div);	
}
else document.body.append(div);	

let regex= /^javascript.+/;
titles.forEach((i,x)=>{
let a= create("a"); div.append(a);
a.text= i; a.className= "kdbmlista";
if(regex.test(urls[x])){
a.onclick=()=> location= urls[x];
}
else if(urls[x]) a.href= urls[x];
});

let closeicon= create("span"); div.prepend(closeicon);
closeicon.className= "kdbmlistclose";
closeicon.innerHTML= `<svg viewBox="0 0 24 24">
<path d="M 2 2 L 22 22 M 2 22 L22 2" /></svg>`;

closeicon.onclick=()=>{
selectAll(".kdbmlista").forEach(i=> i.classList.toggle("closed"));
};

let style= create("style"); document.body.append(style);
style.innerHTML=`
#kdbmlistdiv{
z-index:99999;
position: fixed; left:1px; top:2px;
display:flex; flex-direction: column;
}

.kdbmlista{
box-sizing: border-box;
height:1.5em; display: flex;
align-items: center;
padding: 2px 5px 2px 5px; 
background: white; color: black;
text-decoration: none;
border: 1px solid black;
transition: .3s linear;
margin-bottom: -1px;
font: 15px "Arial";
opacity: 1;
pointer-events: auto;
}

.kdbmlista:hover{ background:yellow;}

.kdbmlistclose{
height: 2.5ch; width: 2.5ch;
display:block;
}

.kdbmlistclose svg{
width: 100%; height: 100%;
stroke: red; stroke-width: 2;
border: 1px solid red;
stroke-linecap: round;
}

.kdbmlista.closed{
opacity: 0;
pointer-events: none;
}`;
