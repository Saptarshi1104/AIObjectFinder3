status = "";
objects = [];

function preload(){

}

function setup(){
canvas = createCanvas(480, 380);
canvas.center();

video = createCapture(VIDEO);
video.size(480, 380)
video.hide();
}

function start(){
objectDetector = ml5.objectDetector('cocossd', modelLoaded);
document.getElementById("status").innerHTML = "Status: Detecting Objects";
search_object = document.getElementById("object").value;
}

function modelLoaded(){
console.log("Model Loaded!");
status = true;
}

function draw(){
image(video, 0, 0, 480, 380);

if(status != ""){
objectDetector.detect(video, gotResult);
for(i = 0; i < objects.length; i++){
document.getElementById("status").innerHTML = "Status: Objects Detected";

fill('hotpink');

percent = floor(objects[i].confidence * 100);

text(objects[i].label + " " + percent + "%", objects[i].x+15, objects[i].y+15);
noFill();
stroke('hotpink');
rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

if(objects[i].label == search_object){
    video.stop();
    objectDetector.detect(gotResult);
    document.getElementById("found").innerHTML = search_object + " has been found";

    var synth = window.speechSynthesis;
    var utterThis = new SpeechSynthesisUtterance(search_object + " found");
    synth.speak(utterThis);
    }else{
    document.getElementById("found").innerHTML = search_object + " has not been found";
    }
}
}
}

function gotResult(error, results){
if(error){
console.log(error);
}
console.log(results);
objects = results;
}