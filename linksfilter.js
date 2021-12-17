let create= (x)=> document.createElement(x),
select= (x,y=document)=> y.querySelector(x),
selectAll= (x,y=document)=> y.querySelectorAll(x);

let links= selectAll("a"),
input= prompt("Find links containing:"),
style= create("style"),
div= create("div"),
table= create("table"),
tbody= create("tbody");
table.append(tbody);

let meta= create("meta");
meta.name= "viewport";
meta.content= "width=device-width, initial-scale=1.0";

let site= `<span class="red">${location.href}</span>`;
let query= `<span class="red">${input}</span>`;
let empty= `<span class="red">No name</span>`;


style.innerHTML=`
*{
box-sizing: border-box;
margin: 0; padding: 0;
}

body{
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
}

div{
width: 95vw;
padding: 5px;
margin-bottom: 10px;
background: yellow;
border: 1px solid red;
font: bold 10px "Courier New";
}


.red{
color: red;
}


table{
width: 95vw;
border:1.5px solid black;		
border-collapse: collapse;
table-layout: fixed;
font: 12px Arial;
}


td{
padding: 2px;
border:1px solid black;
width: calc((100% - 3ch) / 2);
text-align: left;
vertical-align: center;
overflow: auto;
position: relative;
white-space: nowrap;
}




td, td *{
height: 2em;
max-height: 2em;
}

.number{
color: brown;
font-weight: bold;
text-align: right;
width: 3ch;
}`;


function findLinks(regex){
let tablecontent= [];
links.forEach(i=>{
let text= (/\w+/.test(i.innerHTML)) ? 
i.innerHTML : empty;
if(regex.test(i.href)){
let row= `<tr>
<td>${text}</td>
<td><a href="${i.href}">${i.href}</a></td>
</tr>`;
tablecontent.push(row);
}
});
tbody.innerHTML= tablecontent.join("\n");
}


function writeInDiv(allRows){
let message;
if(allRows.length>0){
allRows.forEach((i,x)=>{
let td= create("td");
td.className= "number";
td.innerHTML= `${x+1}`;
i.prepend(td);
});


message= (allRows.length==links.length) ?
`Showing all ${links.length} links found on ${site}`:
`Showing ${allRows.length} out of ${links.length} links, matching ${query}`;
}
else message= `No links found, matching ${query}`;

div.innerHTML= message;
}


if(input!=null){
let newtab= window.open();
newtab.document.head.append(meta);
newtab.document.body.append(style,div,table);

if(input!=""){
let match= input.match(/^\/(.*?)\/([gimuy]*)$/);
let regex= (match) ? 
new RegExp(match[1],match[2]) : new RegExp(input);
findLinks(regex);
}
else{
let regex= /.+/;
findLinks(regex);
}


if(links.length>0) writeInDiv(selectAll("tr",newtab.document));
else div.innerHTML= `No links found on ${site}`;



}
else alert("You canceled the task!");

