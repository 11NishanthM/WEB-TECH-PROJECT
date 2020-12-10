import './App.css';
import React from "react";
var styles = {
  color: "#ace0cf",
  padding: "5px 300px 0px",
  fontFamily: "emoji,cursive,sans-serif",
  fontStyle: "italic",
  textDecoration: "underline"
}
 var styles2 = {
   color : "blue",
   display : "inline",
   position : "absolute",
   margin :"150px 0px 0px 0px",
   padding : "0px 100px 0px 0px",
   backgroundImage : "linear-gradient(to right,#000046,#1CB5E0)"
 }
function PING () 
{
  this.render = ()=>{
          return  <div>
                <h1 style = {styles}>GAMING WEBSITE - PING PONG GAME</h1>
                <h4 style = {{color:"red",fontFamily:"cursive",padding:"0px 0px 0px 350px"}}>
                  *Refresh the page everytime you start the game . Press Right Arrow to start 
                </h4>
                <canvas></canvas>
                <div className = "PrevScore" style = {styles2}></div>
          </div>
        
        }
}
PING.prototype = Object.create(React.Component.prototype)
export default PING;
