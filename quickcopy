let create= (x)=> document.createElement(x),
select= (x,y=document)=> y.querySelector(x),
selectAll= (x,y=document)=> y.querySelectorAll(x);

let popup= create("div");
popup.style.cssText="display:flex; padding: 5px; height: 50px; width: 100px; background: white; border: 1px solid black; position: fixed; top:0; right:0; justify-content:space-between; display: none;";


let selection="";

let copy= create("button");
copy.innerHTML= "Copy";
let close= create("button");
close.innerHTML= "Close";

copy.onclick=()=>{
try{document.execCommand("copy")}
catch(x){navigator.clipboard.writeText(getSelection())}
};


close.onclick=()=>{
let a= getSelection();
popup.style.display= "none";
a.removeAllRanges();
};

popup.append(copy,close);

document.body.append(popup);


document.body.ondblclick=(e)=>{

let a= document.createRange();
a.selectNodeContents(e.target);
let b= getSelection();

b.removeAllRanges(); b.addRange(a);
popup.style.display= "flex";

};
