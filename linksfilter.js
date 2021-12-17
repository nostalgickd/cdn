let create= (x)=> document.createElement(x),
select= (x,y=document)=> y.querySelector(x),
selectAll= (x,y=document)=> y.querySelectorAll(x);


let links= selectAll("a"),
input= prompt("Enter Search"),
style= create("style"),
div= create("div"),
table= create("table"),
tbody= create("tbody");
table.append(tbody);

let site= `<span class="red">${location.href}</span>`;
let query= `<span class="red">${input}</span>`;


style.innerHTML=`
:root{
counter-set: count 0;
}

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

div{
padding: 5px;		
width: 90vw;
margin: 10px 5vw;
background: pink;
}


td{
padding: 2px;
border:1px solid black;
width: calc((100% - 5ch) / 2);
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
width: 5ch;
}


`;





function findLinks(regex){
let tablecontent= [];
links.forEach(i=>{
if(regex.test(i.href)){
let a= `<tr>
<td>${i.innerHTML||'<span class="red">Empty name</span>'}</td>
<td><a href="${i.href}">${i.href}</a></td>
</tr>`;
tablecontent.push(a);
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
td.innerHTML= `[${x+1}]`;
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
else alert("cancelled");




