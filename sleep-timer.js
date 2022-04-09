let mins= prompt("Close tab after how many minutes?");
let html= document.querySelector("html");
if(mins){
let tab= window.open(location.href);
let time= mins*60*1000;
let left= time;
writeIt(time,html,left);

setTimeout(()=>{
tab.close();
},time);
}


function formatTime(a){
let hms= new Date(a).toISOString().substr(11,8).split(":");
let h= Number(hms[0]), m= Number(hms[1]), s= Number(hms[2]);
let H,M,S;

switch(h){
case 0: H= ""; break;
case 1: H= "1 hour, "; break;
default:H= `${h} hours, `;
}

switch(m){
case 0: M= ""; break;
case 1: M= "1 min. & "; break;
default:M= `${m} min. & `;
}

S= `${s} sec.`;

return `${H}${M}${S}`;
}



function writeIt(x,y,z){
if(x>1000){
y.innerHTML= `>>New Tab Opened<br>
>>It will close in ${formatTime(x)}`;
x= x-1000;
setTimeout(()=>{
writeIt(x,y,z);
document.title= "Sleep Timer";
},1000);
}
else{
y.innerHTML= `>>New Tab Opened<br>
>>Closed after ${formatTime(z)}`;
document.title= "Sleep Timer";
}
}
