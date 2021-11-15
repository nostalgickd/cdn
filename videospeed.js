let
titles= ["Normal","1.5x","2.0x","Custom"],
urls= ["javascript:(function()%7Bdocument.querySelector(%22video%22).playbackRate%3D1%3B%7D)()%3B","javascript:(function()%7Bdocument.querySelector(%22video%22).playbackRate%3D1.5%3B%7D)()%3B","javascript:(function()%7Bdocument.querySelector(%22video%22).playbackRate%3D2%3B%7D)()%3B","javascript:(function()%7Blet%20a%3D%20prompt(%22Enter%20desired%20speed%20e.g%202.5%20or%204%22)%3B%0Adocument.querySelector(%22video%22).playbackRate%3D%20a%3B%7D)()%3B"];

let template= document.createElement("template");
template.innerHTML=`
<style>
*{box-sizing: border-box; z-index: 9999999;}

div{
position: fixed; left:1px; top:2px;
display:flex; flex-direction: column;
}

a{
text-align: left;
font: 15px "Arial";
height: 1.5em; padding: 2px 5px; 
background: white; color: black;
border: 1px solid black;
text-decoration: none;
transition: .3s linear;
margin-bottom: -1px;
}

a:hover{background: yellow;}
a.closed{opacity: 0; pointer-events: none;}
span{height: 20px; width: 20px;}
svg{stroke: red; stroke-width: 2.5; border: 1.5px solid red;}

</style>
<div>
<span><svg viewBox="0 0 24 24"><path d="M 2 2 L 22 22 M 2 22 L22 2"/></svg></span>
</div>`;


if (!customElements.get("kd-list")){
customElements.define("kd-list",
class extends HTMLElement{
constructor(){
super();
this.attachShadow({mode:"open"});
}			
})
}


let a= document.createElement("kd-list");
let b= document.querySelector("kd-list");
a.shadowRoot.append(template.content.cloneNode(true));

if(b){
b.remove();
document.body.append(a);
}
else document.body.append(a);

let regex= /^javascript.+/;
titles.forEach((i,x)=>{
let link= document.createElement("a"); link.text= i; 
a.shadowRoot.querySelector("div").append(link);
if(regex.test(urls[x])){
link.onclick=()=> location= urls[x];
}
else if(urls[x]) link.href= urls[x];
});

a.shadowRoot.querySelector("span").onclick=()=>{
a.shadowRoot.querySelectorAll("a").forEach(i=> i.classList.toggle("closed"));
};
