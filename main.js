
Webcam.set({
width: 350,
height: 300,
image_format:'png',
png_quality:90
});

camera=document.getElementById("camera");
Webcam.attach(camera);


function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML="<img id='captured_image' src="+data_uri+">";
    });
}

console.log("ml5 version:",ml5.version);

var classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/l8eNhfOAd/model.json',modelLoaded);

function modelLoaded(){
    console.log("Model Loaded!!!");
}

function speak(){
    var synth=window.speechSynthesis;
    speak_data="The prediction is "+prediction;
    var utter_this=new SpeechSynthesisUtterance(speak_data);
    synth.speak(utter_this);
}
function check(){
    img=document.getElementById("captured_image");
    classifier.classify(img,gotResult);
}
function gotResult(error,result){
    if(error){
        console.error(error);
    }
    else{
        console.log(result);
        document.getElementById("result_emotion_name_1").innerHTML=result[0].label;
        prediction_1=result[0].label;
        speak();
        if(result[0].label=="Happy"){
           document.getElementById("update_emoji_1").innerHTML="&#128512;";
        }
        if(result[0].label=="Confused"){
            document.getElementById("update_emoji_1").innerHTML="&#128533;";
        }
        if(result[0].label=="Angry"){
            document.getElementById("update_emoji_1").innerHTML="&#128544;";
        }
    }
}