song="";
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY = 0;
scorerightWrist=0;
scoreleftWrist=0;

function preload()
{
song=loadSound("music.mp3");
}


function setup()
{
    canvas=createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function draw()

{
    image(video, 0, 0, 600, 500);
    fill("#FF0000");
    stroke("#FF0000");

    if(scorerightWrist > 0.2)
    {
    circle(rightWristX,rightWristY,20);

    if(rightWristY >0 && rightWristY <=100)
    {
        document.getElementById("speed").innerHTML = "speed = 0.5x";
    song.rate(0.5);
    }

    if(rightWristY >100 && rightWristY <=200)
    {
        document.getElementById("speed").innerHTML = "speed = 1x";
    song.rate(1);
    }

    if(rightWristY >200 && rightWristY <=300)
    {
        document.getElementById("speed").innerHTML = "speed = 1.5x";
    song.rate(1.5);
    }

    if(rightWristY >300 && rightWristY <=400)
    {
        document.getElementById("speed").innerHTML = "speed = 2x";
    song.rate(2);
    }

    if(rightWristY >400 && rightWristY <=500)
    {
        document.getElementById("speed").innerHTML = "speed = 2.5x";
    song.rate(2.5);
    }
    }
    
    if(scoreleftWrist > 0.2)
    {
    circle(leftWristX, LeftWristY,20);
    InNumberleftWristY = Number(leftWristY);
    remove_decimals = floor(InNumberleftWristY);
    volume = remove_decimals/500;
    document.getElementById("volume").innerHTML = "Volume = " + volume;
    song.setVolume(volume);
    }
    
 }

function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
scoreleftWrist = results[0].pose.keypoints[9].score;
console.log("scoreleftWrist = " + scoreleftWrist);
scorerightWrist = results[0].pose.keypoints[10].score;
console.log("scorerightWrist = " + scorerightWrist);

        leftWristX = results[0].pose.leftWrist.X;
        leftWristY = results[0].pose.leftWrist.Y;
        console.log("lefWristX = " + leftWristX +"leftWristY =" + leftWristY);

        rightWristX = results[0].pose.rightWrist.X;
        rightWristY = results[0].pose.rightWrist.Y;
        console.log("rightWristX =" + rightWristX +"rightWristY =" + rightWristY);
    }
}

function modelLoaded()
{
    console.log("poseNet is initialized");
}

