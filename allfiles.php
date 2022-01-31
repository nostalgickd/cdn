<?php
$final= [];
$root= $_SERVER["DOCUMENT_ROOT"];


$rdi= new RecursiveDirectoryIterator($root);
$rii= new RecursiveIteratorIterator($rdi);
$files= [];

foreach ($rii as $file){
if($file->isDir()){
continue;
}
$files[]= $file-> getPathname(); 
}

$hide= "/^\.htaccess|\.htpasswd|\.php|\.jpg/";
$show= "/\.html|\.js|\.txt/";
$showall= "/.*/";

foreach($files as $file){
$file= str_replace($root,"", $file);
$ext= pathinfo(parse_url($file, PHP_URL_PATH), PATHINFO_EXTENSION);
$name= pathinfo(parse_url($file, PHP_URL_PATH), PATHINFO_FILENAME);
$filename= "{$name}.{$ext}";

if(preg_match($show, $file)){
array_push($final, "<a href=\"{$file}\">{$filename}</a>"); //ECHO
}

}

$final= implode("\n", $final);
?>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="theme-color" content="black"/>
<meta name="msapplication-TileColor" content="#da532c"/>
<meta name="msapplication-navbutton-color" content="black"/>
<meta name="apple-mobile-web-app-capable" content="yes"/>
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>

<title>All links on this site</title>

<style>				
*{
box-sizing: border-box;
margin:0; padding:0; 
outline: none;
}	

body{
background: rgb(251,244,234) url("");
min-width: 100vw; 
max-width: 100vw; 
min-height: 100vh;
position: relative;
display: flex;
flex-direction: column;
justify-content: flex-start;
align-items: center;
}

#container{
height: auto;
border: 0px solid red;
margin-top: 20px;
position: relative;
display: flex;
flex-direction: column;
justify-content: flex-start;
align-items: center;
}

a{
font: 18px "Arial";
text-transform: lowercase;
font-variant: small-caps;
height: 40px; width: 80%;
display:flex;
justify-content: center;
align-items: center;
color: black;
background: rgb(255,255,0,0.5);
padding:10px;
margin-bottom:10px;
border: 1.5px solid red;
border-radius: 10px;
text-decoration:none;
}



@media (orientation:portrait){
#container{width: 95%;}
body{background-size: 35%;}		
}	

@media (orientation:landscape){
#container{width: 75%;}
body{background-size: 50%;}			
}	

</style>
</head>
<body data-nosnippet>
<div id="container">
<?= $final ?>
</div>
<script>				
let create= (x)=> document.createElement(x),
select= (x,y=document)=> y.querySelector(x),
selectAll= (x,y=document)=> y.querySelectorAll(x);


</script>	
</body>
</html>
