let _style= `*{
box-sizing: border-box;
margin:0; padding:0; 
outline: none;
border: none;
}


.flex{
display: inline-flex;
justify-content: center;
align-items: center;
}

#wrapper{
flex-direction: column;
justify-content: flex-end;
position: fixed;
bottom:0; right: 0;
user-select: none;
width: 70vw;
max-width: 50px; 
min-width: 200px; 
height: 80vw;
max-height: 500px;
min-height: 100px;
}

#wrapper.hidden{
border: none;
pointer-events: none;
}


#field{
width: 100%;
height: calc(100% - 30px);
padding: 5px;
background: white;
border: 1px solid black;
border-top: none;
white-space: normal;
font: bold 10px "Courier New";
}

#field.nowrap{
white-space: nowrap;
}

#field.hidden{
display: none;
pointer-events: none;
}



#topbar{
justify-content: flex-end;
position: relative;
width: 100%;
height: 30px;
background: white;
border: 1px solid black;
}

#topbar.hidden{
display: none;
pointer-events: none;
}

#close{
display: inline-flex;
position: absolute;
top: 0px; left: 0;
padding: 2px;
width: 30px;
width: calc((70vw / 8) + 2px);
height: 30px;
background: pink;
border: 1px solid black;
}


#topbar>*{
height: 100%;
width: calc(100% / 8);
font: 12px Arial;
background: lightgray;
border-left: 1px solid black;
}


#topbar>.clear:hover{
background: rgb(255,0,0,0.5);	
}

#topbar>.run:hover{
background: rgb(0,255,0,0.5);	
}

#topbar>.copy:hover{
background: rgb(0,0,255,0.5);	
}



.config,.shortcuts{
appearance: none;
text-align: center;
}`;


let create= (x)=> document.createElement(x),
select= (x,y=document)=> y.querySelector(x),
selectAll= (x,y=document)=> y.querySelectorAll(x);

let wrapper= create("div"),
style= create("style");
style.innerHTML= _style;
wrapper.id= "wrapper";
wrapper.className= "flex";
document.body.append(style,wrapper)

wrapper.innerHTML= `<div id="topbar" class="flex">
<div class="clear flex">CLR</div>
<div class="minify flex">MNFY</div>
<div class="wrap flex">WRAP</div>
<div class="save flex">SAVE</div>
<div class="copy flex">COPY</div>
<select class="shortcuts">
<option selected="" disabled="">SHC</option>
<option>New Tab</option>
<option>Async Fetch</option>
<option>Fetch options</option>
<option>DOM Parser</option>
<option>Selectors</option>
<option>Copy Text</option>
</select>
<div class="run flex">RUN</div>
</div>
<div id="close" class="flex" style="pointer-events: auto;">X</div>
<textarea id="field" class="nowrap">
</textarea>`;




let close= select("#close"),
topbar= select("#topbar"),
clear= select(".clear"),
minify= select(".minify"),
wrap= select(".wrap"),
save= select(".save"),
copy= select(".copy"),
shortcuts= select(".shortcuts"),
run= select(".run")
field= select("#field");


//CLOSE
close.onclick=()=>{
field.classList.toggle("hidden");
topbar.classList.toggle("hidden");
wrapper.classList.toggle("hidden");
close.style.pointerEvents= "auto";
};



//CLEAR
clear.onclick=()=> field.value= "";



//MINIFY
let regex= /(?<=javascript\:\(function\(\)\{)[\s\S]+(?=\}\)\(\)\;)/;

minify.onclick=()=>{
let a= decodeURIComponent(field.value);
if(a!=field.value){
field.value= a.match(regex)||a;				
}
else{
let b= encodeURIComponent(field.value);
field.value= b;
}
};






//WRAP
wrap.onclick= function(){
field.classList.toggle("nowrap");
if(field.classList.contains("nowrap")){
this.style.background= "lightgray";	
}
else{
this.style.background= "rgb(0,255,0,0.5)";
}
};

//SAVE
save.onclick=()=> saveToFile(field.value, `js-injector-${Date.now()}.js`);

//COPY
copy.onclick= function(){
let a='javascript:'+ encodeURIComponent(`(function(){${field.value}})();`); 
navigator.clipboard.writeText(a);
}


//SHORTCUTS
shortcuts.onchange= function(){
let i= this.selectedIndex;
switch(i){
case 1 : addText(field,_newtab_); break;
case 2 : addText(field,_fetch_); break;
case 3 : addText(field,_options_); break;
case 4 : addText(field,_dom_); break;
case 5 : addText(field,_selectors_); break;
case 6 : addText(field,_copy_); break;

}
};


//RUN
run.onclick=()=>{
eval(`try{
${field.value}
}
catch(x){
alert(x);
}`);
};


//Drag using close
close.ontouchmove= function(e){
drag(wrapper,"70vw","80vw",e);
};

close.onmousemove= function(e){
drag(wrapper,"70vw","80vw",e);
};


/*------------------------------------------------------------------*/
//Add text function
function addText(el,text){
let start= el.selectionStart;
let end= el.selectionEnd;
el.setRangeText(text, start, end, 'select');
}

//Save to local storage
let stored= "jsinjector"
let savedData= localStorage.getItem(stored);
if(savedData) savedData= JSON.parse(savedData);
field.value= (savedData) ? savedData["field"] : "";

let obu = false;
window.onunload = window.onbeforeunload= function(){
if(!obu){
obu= true;
let obj= {
field : field.value
};
localStorage.removeItem(stored);
localStorage.setItem(stored, JSON.stringify(obj));
}
};


/*

let style= create("style");
let head= document.head || document.body;
head.append(style);
style.innerHTML=`.nowtouching{
background:rgb(255,192,203,0.5)!important;
transition: none!important;
}`;


//----

ta.value= select("html").outerHTML
.split(regex).join("")
.split(``).join("")
.split(``).join("")
.split(``).join("")
.split("").join("")
.split(/> {0,3}</).join(">\n<");
//---

document.body.ontouchstart= (e)=>{
if(e.target!=a){
e.target.classList.add("nowtouching");
ta.value= e.target.outerHTML
.split(regex).join("")
.split(``).join("")
.split(``).join("")
.split(``).join("")
.split("").join("")
.split(/> {0,3}</).join(">\n<");
}
};

document.body.ontouchend=(e)=>{
e.target.classList.remove("nowtouching");
}
*/


//Save or dl code as file
function saveToFile(text,filename){
let a= text.replace(/\n/g, "\r\n"),
b= new Blob([a], { type: "text/plain"}),
c= create("a");
c.download= filename;
c.href= window.URL.createObjectURL(b);
c.target="_blank";
c.style.display = "none";
document.body.append(c);
c.click(); c.remove();
}



//Drag Function
let root= document.documentElement;
let docwidth= Math.max(root["clientWidth"], 
document.body["offsetWidth"],
root["offsetWidth"]);

let docheight= Math.max(root["clientHeight"],
document.body["offsetHeight"],
root["offsetHeight"]);

let _dummydiv= create("div");
_dummydiv.id= "dummydiv";
document.body.append(_dummydiv);
let dummydiv= select("#dummydiv");

function drag(element,width,height,e){
e.preventDefault();
let touchLocation = e.targetTouches[0];
let x= touchLocation.pageX || e.pageX;
let y= touchLocation.pageY || e.pageY;

dummydiv.style.cssText= `display: none;
width: calc(${docwidth}px - ${width});
height: calc(${docheight}px - ${height})`;

let maxwidth= +getComputedStyle(dummydiv).width.replace("px","");
let maxheight= +getComputedStyle(dummydiv).height.replace("px","");

if(x<=0){
element.style.left= 0;
}
else if(x>=maxwidth){
element.style.left= maxwidth+ "px";
}
else element.style.left= x+"px";

if(y<=0){
element.style.top= 0;
}
else if(y>=maxheight){
element.style.top= maxheight + "px";
}
else element.style.top= y+"px";

}



//Shortcuts-----------------------------------
let _fetch_= `
//ASYNC FETCH ------
let opt= {};
let resp= {};
async function ajax(url,opt){
let r= await fetch(url);
let x= "Error: " + r.status;
if(!r.ok) throw new Error(x);
resp= Object.fromEntries(r.headers.entries());

return r.clone().json().catch(()=>r.text());
}


let opt= {};
let url= "❤️";
let proxy= "https://cors.krishan.workers.dev/?";

ajax(url).then(d=>{
❤️
}).catch(x=> alert(x.x));`;


let _dom_= `
let doc= new DOMParser().parseFromString(❤️,"text/html");`;



let _options_= `
let _form= new FormData();
_form.append("❤️", ❤️);

opt= {
body : _form,
method : "POST",
credentials : "same-origin",
headers: {
//"Content-Type" : "application/json;charset=utf-8"
"Content-Type" : "application/x-www-form-urlencoded; charset=UTF-8"
}
};`;


let _newtab_= `
//OPEN IN NEW TAB ------
function newTab(txt,div){
let a= div ? create("div") : create("textarea");
a.innerHTML= txt;
a.style.cssText= \`width:98vw; height: 150vw;
border: 2px solid black; margin: 0;
padding: 10px; font: 14px Arial\`;
window.open().document.body.append(a);
}

newTab(❤️,"div");`;

let _selectors_= `let create= (x)=> document.createElement(x),
select= (x,y=document)=> y.querySelector(x),
selectAll= (x,y=document)=> y.querySelectorAll(x);

`;


let _copy_ = `
navigator.clipboard.writeText(❤️);`;
