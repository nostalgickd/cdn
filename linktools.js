let create= (x)=> document.createElement(x),
select= (x,y=document)=> y.querySelector(x),
selectAll= (x,y=document)=> y.querySelectorAll(x);



//----------------------------
function linkify(){
let a= selectAll("a");
let regex= /(https?\:\/\/|javascript\:).+/;
let b= [...a].map(i=>i.innerHTML);

if(!sessionStorage.urltext) sessionStorage.urltext= JSON.stringify(b);

a.forEach((i,x)=>{
if(!regex.test(i.text)){
i.text= i.href;
}
else{
let c= JSON.parse(sessionStorage.urltext);
i.innerHTML= c[x];
}
});


let obu = false;
window.onunload = window.onbeforeunload= function(){
if(!obu){
obu= true;
sessionStorage.removeItem("urltext");
}};

}

//----------------------------♥️♥️♥️
let selected= "lol";
document.onselectionchange= function() {
let a= window.getSelection();
selected= (a.toString().length > 0) ? a.getRangeAt(0) : "lol";
};


function selectedLinks(){
//window.getSelection().removeAllRanges();
let a= selectAll("a");
let c= [];

if(a.length<=0){
alert("No links found on page");
}
else{
if(selected!=="lol"){
let b= window.getSelection();
b.removeAllRanges(); b.addRange(selected);
a.forEach(i=> {if(b.containsNode(i, true)) c.push(i)});

if(c.length>0){
let d= confirm(`${c.length} links selected. Open all in new tabs?`);
       if(d) c.forEach(i=> window.open(i.href,"_blank"));
}
else alert("No links found in selection range!");

}//Selected is lol
else{
let e= confirm(`No selection was made. Open ${a.length} links found on this page in new tabs?`);
       if(e) a.forEach(i=> window.open(i.href,"_blank"));
}
}


window.getSelection().removeAllRanges();
selected= "lol";
}

//----------------------------♥️♥️♥️♥️
function listLinks(){
let a= selectAll("a");
let b= create("table");
let c= create("style");
let d= create("div");
d.id= "title";
let f= prompt("Find links containing this keyword (RegEx allowed). Leave blank to list all links");
let g= window.open();
g.document.body.append(c,d,b);


c.innerHTML=`
.red{
color: red;
}

table{
border:1.5px solid black;		
border-collapse: collapse;
width: 90vw;
margin-left: 5vw;
table-layout: fixed;
}

#title{
padding: 5px;		
width: 90vw;
margin: 10px 5vw;
background: pink;
}


td{
padding: 2px;
border:1px solid black;
height: calc(1em + 5px);
width: calc((100% - 3ch) / 2);
text-align: left;
vertical-align: center;
overflow: auto;
}

td *{
max-height: calc(1em + 5px);
}

tr>td:nth-child(1){
color: brown;
font-weight: bold;
text-align: right;
width: 3ch;
}`;


let e=[];

function findLinks(regex){
a.forEach(i=>{
if(regex.test(i.href)){
let a= `<tr>
<td>${i.innerHTML||'<span class="red">Empty name</span>'}</td>
<td><a href="${i.href}">${i.href}</a></td>
</tr>`;
e.push(a);
}
});
}


if(f){
let regexp= /^\/(.*?)\/([gimuy]*)$/;
let match= f.match(regexp);
let regex= (match) ? new RegExp(match[1],match[2]) : new RegExp(f);
findLinks(regex);
}
else{
let regex= /.+/;
findLinks(regex);
}

b.innerHTML= e.join("\n");

let rows= selectAll("tr",g.document);
rows.forEach((i,x)=>{
let a= create("td");
a.innerHTML= x+1;
i.prepend(a);
});

let title= select("#title",g.document);

if(a.length>0){
//-----
if(f){
title.innerHTML= (e.length>0) ?
`Showing ${rows.length} out of ${a.length} links, matching <span class="red">${f}</span>`:
`No links found matching <span class="red">${f}</span>`;
}
else{
title.innerHTML= (e.length>0) ?
`Showing all links found on <span class="red">${location.href}</span>`:
`No links found matching <span class="red">${f}</span>`;
}

}
else title.innerHTML= `No links found on <span class="red">${location.href}</span>`;



}

//___________________________________________________________________
let titles= ["Unveil Links","Open selected links","List all links"],
functions= [linkify,selectedLinks,listLinks];
  
let div= create("div");
div.id= "kdbmlistdiv"; 

titles.forEach((i,x)=>{
let a= create("span");
a.onclick= functions[x];
a.textContent= i;
div.append(a);
a.className= "kdbmlista";
});

let list= select("#kdbmlistdiv");
if(list){
list.remove();
document.body.append(div);	
}
else{
document.body.append(div);	
}

let close= create("span");
close.className= "kdbmlistclose";
close.innerHTML= `<svg viewBox="0 0 24 24">
<path d="M 2 2 L 22 22 M 2 22 L22 2" /></svg>`;
div.prepend(close);

function minmax(b,c){
selectAll(".kdbmlista").forEach(i=>{
i.style.opacity= b;
i.style.pointerEvents= c;
});			
}

let closed= false;
close.onclick=()=>{
if(closed){
minmax("1","auto");
closed=false;
}
else{
minmax("0","none");
closed= true;
}				
};


let style= create("style");
document.body.append(style);
style.innerHTML=`
#kdbmlistdiv{ z-index:99999;
position: fixed; left:1px; top:2px;
display:flex; flex-direction: column;
}

.kdbmlista{
box-sizing: border-box;
height:1.5em;
padding: 2px 5px 2px 5px; 
background: white; color: black;
display: flex;
align-items: center;
text-decoration: none;
border: 1px solid black;
transition: .3s linear;
margin-bottom: -1px;
font: 15px "Arial";
}

.kdbmlista:hover{
background:yellow;
}.kdbmlistclose{
height: 2.5ch; width: 2.5ch;
display:block;
}

.kdbmlistclose svg{
width: 100%; height: 100%;
stroke: red; stroke-width: 2;
border: 1px solid red;
stroke-linecap: round;
}`;
