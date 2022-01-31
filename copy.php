<?php
$root= $_SERVER["DOCUMENT_ROOT"];
$green= "<span class='green'>Copied</span>";
$red= "<span class='red'>Couldn't copy</span>";

function copyAll($src,$folder,$names){
global $root, $green, $red;

$ext= pathinfo(parse_url($src, PHP_URL_PATH), PATHINFO_EXTENSION);
$name= pathinfo(parse_url($src, PHP_URL_PATH), PATHINFO_FILENAME);
$filename= $names ? $names : "{$name}.{$ext}";
if(!file_exists("{$root}{$folder}")) {
mkdir("{$root}{$folder}", 0777, true);
}
$dest= "{$root}{$folder}/{$filename}";
if(copy($src,$dest)){
echo "{$green} to {$folder}/{$filename}<br>";
}
else{
echo "{$red} {$filename}<br>";
}
}


function getTextarea($val){
$x= trim($_POST[$val]);
$x= preg_split("/\r|\n/", $x);
$x= array_filter($x, "trim");
return $x;
}


$list= getTextarea("list");
$name= getTextarea("name");
$folder= $_POST["folder"];

for ($i= 0 ; $i<count($list); $i++){
copyAll($list[$i], $folder, $name[$i]);
}


?>