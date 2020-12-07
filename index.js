import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import PING from './App';
//import reportWebVitals from './reportWebVitals';
ReactDOM.render(
  <React.StrictMode>
    <PING />
  </React.StrictMode>,
  document.getElementById('root')
);
var canvas = document.querySelector("canvas")
var ctx 
var Key
var ball
var Player2
var maxScore
var Player1
var currentBallPosition
var ballSpeed
var fetch = require("node-fetch")     
ctx = canvas.getContext("2d")
canvas.width = "800";
canvas.height = "500";
Key = null;
Player1 = new Rectangle(5,210,20,80,30,0)
currentBallPosition =
  {
      x : 400,
      y : Player1.y + Player1.height/2
  }
ballSpeed = 
  {
      dx:3,
      dy:1
  }
ball =  new Ball(currentBallPosition.x,currentBallPosition.y,15,ballSpeed.dx,ballSpeed.dy)
Player2 = new AI(775,210,20,80,30,0,0.04)
maxScore = 1
Player1.draw()
Player2.draw()
ball.draw()
boardDraw()
scoreBoard(300,500,100,100,Player1.score,Player2.score)

fetch("http://localhost:5000/scores",
    {
        method : "GET",
        headers : {"Accept" : "application/json"} 
}).then(res=>res.json())
.then(res=>{
    var Player = res[res.length-1]
    var Prev = document.getElementsByClassName("PrevScore")[0]
    Prev.innerHTML = `<p id = "Title">PREVIOUS GAME SCORE</p>
                      <p id = "Name">PLAYER NAME : ${Player.PlayerName || "Player"}</p>
                      <p id = "PScore">PLAYER SCORE : ${Player.PlayerScore || 0}</p>
                      <p id = "AScore">AI SCORE : ${Player.AIScore || 0}</p>`

})


function Rectangle(x,y,width,height,dy,score)
  {
      this.x = x 
      this.y = y 
      this.width = width
      this.height = height 
      this.verticalVelocity = dy
      this.score = score
      this.draw = ()=>{
          const grad  = ctx.createLinearGradient(this.x,this.y,this.x+this.width,this.y+this.height)
          grad.addColorStop(0,"#000046")
          grad.addColorStop(1,"#1CB5E0")
          ctx.fillStyle = grad
          ctx.fillRect(this.x,this.y,this.width,this.height)
      }
      this.update = ()=>{
          if(Key === "ArrowDown")
          {
              if(!(this.y + this.height + 15 >= canvas.height))
              {
                  this.y += this.verticalVelocity
              }
              else
              {
                  this.y = canvas.height-this.height-15
              }
              this.draw()
              
          }
          if(Key === "ArrowUp")
          {
              if(!(this.y  <= 10))
              {
                  this.y -= this.verticalVelocity
              }
              else
              {
                  this.y = 10
              }
              this.draw()
          }    
      }
  }
  function bounce(music)
  {
      this.aud = document.createElement("audio")
      this.aud.src = music
      this.aud.style.display = "none"
      this.aud.setAttribute("controls","none");
      (document.getElementsByTagName("html"))[0].appendChild(this.aud)
      this.play=()=>{
          this.aud.play()
  
      }
      this.pause = ()=>{
          this.aud.pause()
      }
  }
  var hit = new bounce("Ping-pong-ball-bounce-sound-effect.mp3")
  
  
  function collisionDetct(player,ball)
  {
      var ballL = ball.x - ball.radius
      var ballR = ball.x + ball.radius
      var ballT = ball.y - ball.radius
      var ballB = ball.y + ball.radius
  
      var playerR = player.x + player.width
      var playerT = player.y 
      var playerB = player.y + player.height
      var playerL = player.x
      return ((ballL < playerR ) && (ballT < playerB) && (ballB > playerT) && (playerL < ballR))     
  }
  
  function Ball(x,y,radius,dx,dy)
  {
      this.x = x 
      this.y = y 
      this.radius = radius
      this.dx = dx
      this.dy = dy
      this.draw = ()=>{
          ctx.beginPath()
          const grad = ctx.createRadialGradient(this.x,this.y,0,this.x,this.y,this.radius)
          grad.addColorStop(0,"#f7b733")
          grad.addColorStop(1,"#fc4a1a")
          ctx.fillStyle = grad
          ctx.arc(this.x,this.y,this.radius,0,2*Math.PI,false)
          ctx.fill()
      }
      this.start = ()=>
      {
          this.x += dx
          this.draw()
      }
  
      this.update = ()=>{
          if(this.x <= 400)
              if(collisionDetct(Player1,ball) === true)
              {
                  this.dx = -this.dx
                  hit.play()
              }
          if(this.x >= 400)
              if(collisionDetct(Player2,ball) === true)
              {
                  this.dx = -this.dx
                  hit.play()
              }
          
          this.x += this.dx
          
          if(this.y - this.radius <= 0 || this.y + this.radius >=canvas.height)
          {
                  this.dy = -this.dy
                  hit.play()
          }
          this.y += this.dy
          this.draw()
          Player2.update()
          boardDraw()
          Player1.draw()
          Player2.draw()
      }
      
  
  }
  
  function AI(x,y,width,height,dy,score,difficulty)
  {
      this.x = x 
      this.y = y 
      this.width = width
      this.height = height 
      this.verticalVelocity = dy
      this.score = score
      this.difficulty = difficulty
      this.draw = ()=>{
          const grad  = ctx.createLinearGradient(this.x,this.y,this.x+this.width,this.y+this.height)
          grad.addColorStop(0,"#544a7d")
          grad.addColorStop(1,"#ffd452")
          ctx.fillStyle = grad
          ctx.fillRect(this.x,this.y,this.width,this.height)
      }
      this.update = ()=>{
          let getBallPosition = ball.y
          var check
          if(getBallPosition < 50 || getBallPosition > canvas.height - 50)
          {
              check = 0
          }
          else
          {
              
          check = (getBallPosition - (this.y+this.height/2))*this.difficulty
          if(this.y + this.height + check + 20 > canvas.height - 30 || this.y + check - 20 < 50)
              check = -check
          } 
          this.y += check
          this.draw()    
      }
  
  }
  AI.prototype = Object.create(Rectangle.prototype)
  
  function boardDraw()
  {
      ctx.beginPath()
      ctx.strokeStyle = "white"
      ctx.lineWidth = "3px"
      ctx.moveTo(400,0)
      ctx.lineTo(400,500)
      ctx.stroke()
  }
  
  function scoreBoard(player1X,player2X,player1Y,player2Y,player1Scrore,player2Score)
  {   
      ctx.font = "72px consolas"
      ctx.fillStyle = "#3c1874"
      ctx.fillText(player1Scrore,player1X,player1Y)
      ctx.fillText(player2Score,player2X,player2Y)
      
  }
  
  function updateScore()
  {
      if(ball.x<=0)
      {
          Player2.score+=1
          currentBallPosition.x = 400 
          currentBallPosition.y = Player2.y + Player2.height/2
          ballSpeed.dx = -ball.dx
          ballSpeed.dy = -ball.dy
          ball = new Ball(currentBallPosition.x,currentBallPosition.y,15,ballSpeed.dx,ballSpeed.dy)
          scoreBoard(300,500,100,100,Player1.score,Player2.score)
      }
      
      else if(ball.x >= canvas.width)
      {
          Player1.score+=1
          currentBallPosition.x = 400
          currentBallPosition.y = Player1.y  + Player1.height
          ballSpeed.dx = -ball.dx
          ballSpeed.dy = -ball.dy      
          ball = new Ball(currentBallPosition.x,currentBallPosition.y,15,ballSpeed.dx,ballSpeed.dy)
          scoreBoard(300,500,100,100,Player1.score,Player2.score)
      }
      else
      {
          scoreBoard(300,500,100,100,Player1.score,Player2.score)
      }
  }
  
  function animate()
  {
      if(!(Player1.score === maxScore || Player2.score === maxScore ))
      {
          if(ball.x>=0 && ball.x <= canvas.width)
          {
              ctx.clearRect(0,0,canvas.width,canvas.height)
              ball.update()
              scoreBoard(300,500,100,100,Player1.score,Player2.score)
              requestAnimationFrame(animate)
      
          }
          else{
              updateScore()
              ctx.clearRect(0,0,canvas.width,canvas.height)        
              ball.start()
              ball.update()
              requestAnimationFrame(animate)
          }
      
      }
      else
      {
          scoreBoard(300,500,100,100,Player1.score,Player2.score)
          ReactDOM.unmountComponentAtNode(document.getElementById("root"))
          ReactDOM.render(
              <div>
                  <img src = "GO.jpg" height = "500px" width = "800px" alt = "GAME OVER"/>
                  <label>PLEASE ENTER YOUR NAME</label>
                  <input type = "text" id = "Name" name = "playerName" />
                  <button value = "submit">OK</button>
                  
              </div>
              ,
              document.getElementById("root")
          )
          var text = document.getElementsByName("playerName")[0];
          (document.getElementsByTagName("button"))[0].onclick = function handleClick(ev)
           {
              
              var Name = text.value || "Player"
              var score = {
                  "PlayerName":`${Name}`,
                  "PlayerScore":`${Player1.score}`,
                  "AIScore":`${Player2.score}`
                      }
                  ReactDOM.unmountComponentAtNode(document.getElementById("root"));
                  ReactDOM.render(<React.StrictMode>
                                          <PING/>
                                      </React.StrictMode>,
                    document.getElementById('root')
                      )
                      
                  fetch("http://localhost:5000/",
                  {
                  method : "POST",
                  headers:{"Content-type":"application/json"},
                  body:JSON.stringify(score)
                  }).then(res=>res.text())
                .then((res)=>console.log(res)
                )
          }
      }       
        
  }
  
  document.addEventListener('keydown',(ev)=>
  {
      Key = ev.code
      if(Key === "ArrowUp" || Key ==="ArrowDown")
      {
      ctx.clearRect(0,0,canvas.width,canvas.height)
      boardDraw()
      scoreBoard(300,500,100,100,Player1.score,Player2.score)    
      Player1.update()
  
      }
      else if(Key === 'ArrowRight')
      {
          animate()
      }
      
  },false)