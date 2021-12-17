let create= (x)=> document.createElement(x),
select= (x,y=document)=> y.querySelector(x),
selectAll= (x,y=document)=> y.querySelectorAll(x);


let a= selectAll("a");
let b= create("table");
let c= create("style");
let d= create("div");
d.id= "title";
let f= prompt("Find links containing this keyword. RegEx allowed!. Leave blank to list all links");
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

if(a && a.length){
//-----
if(f){
select("#title",g.document).innerHTML= 
(e && e.length) ?
`Showing ${rows.length} out of ${a.length} links,
matching <span class="red">${f}</span>`
:
`No links found matching <span class="red">${f}</span>`;
}
else{
select("#title",g.document).innerHTML= 
(e && e.length) ?
`Showing all links found on <span class="red">${location.href}</span>`
:
`No links found matching <span class="red">${f}</span>`;
}
//-----
}
else{
select("#title",g.document).innerHTML= 
`No links found on <span class="red">${location.href}</span>`;

}
