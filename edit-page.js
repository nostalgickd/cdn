let create= (x)=> document.createElement(x),
select= (x, y= document)=> y.querySelector(x),
selectAll= (x, y= document)=> y.querySelectorAll(x);

let editOn= true;
const preventClick= (e)=> e.preventDefault();

let oldAlert= select("kd-alert");
if (oldAlert) oldAlert.remove();

let kdalertkd= create("kd-alert");
document.body.append(kdalertkd);

kdalertkd.innerHTML= `
<style>
kd-alert{
all: initial;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
width: 300px;
height: 150px;
background: rgba(0, 0, 0, 0.85);
color: white;
padding: 10px;
border: 1.5px solid white;
border-radius: 8px;
overflow: hidden;
z-index: 9999999;
position: fixed;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
cursor: default !important;
font-family: system-ui, -apple-system, sans-serif;
user-select: none;
-webkit-user-select: none;
box-sizing: border-box;
}

kd-status, kd-button, kd-close{
all: unset;
display: inline-flex;
justify-content: center;
align-items: center;
color: white;
font-family: system-ui, -apple-system, sans-serif;
box-sizing: border-box;
}

kd-button{
cursor: pointer;
padding: 6px 12px;
border: 1.5px solid white;
border-radius: 5px;
margin-top: 15px;
font-weight: bold;
font-size: 13px;
}

kd-button:hover, kd-close:hover{
filter: invert(100%);
}

kd-close{
cursor: pointer;
position: absolute;
top: 8px;
right: 8px;
border: 1px solid #ff4d4d;
background: rgba(255, 0, 0, 0.5);
border-radius: 3px;
height: 20px;
width: 20px;
}

kd-close svg{
display: block;
}
</style>

<kd-status></kd-status>
<kd-button>TURN OFF EDITING</kd-button>
<kd-close>
<svg width="10" height="10" viewBox="0 0 10 10" stroke="white" stroke-width="2">
<line x1="0" y1="0" x2="10" y2="10" />
<line x1="10" y1="0" x2="0" y2="10" />
</svg>
</kd-close>`;

function editStatus(){
document.designMode= editOn ? "on" : "off";
document.body.contentEditable= editOn ? "true" : "false";
document.body.style.webkitUserSelect= editOn ? "text" : "none";
document.body.style.userSelect= editOn ? "text" : "none";

select("kd-status").innerHTML= editOn 
? "This page is now <b>&nbsp;EDITABLE</b>" 
: "This page is now <b>&nbsp;LOCKED</b>";

selectAll("a, button").forEach(i=>{
if (editOn) i.addEventListener("click", preventClick);
else i.removeEventListener("click", preventClick);
});

kdalertkd.contentEditable= "false";
}

select("kd-button").onclick= function(){
editOn= !editOn;
editStatus();
this.innerHTML= editOn ? "TURN OFF EDITING" : "TURN ON EDITING";
};

select("kd-close").onclick= ()=>{
kdalertkd.style.display= "none";
};

editStatus();
