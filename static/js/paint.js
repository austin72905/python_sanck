var canvas = document.getElementById("canvas"); //抓取元素 myCanvas dom
var ctx = canvas.getContext("2d");//設置為2D
var scoretext=document.getElementById("Score");//抓取分數dom
var snack={body:[{x:180,y:140},{x:170,y:140},{x:160,y:140},{x:150,y:140},{x:140,y:140}],bodysize:5,direct:"right"};//設置snack身體 長度 方向
var apple={};//設置蘋果位置
var score=0;//分數
move();//蛇移動
applecreate();//創造蘋果
var time=setInterval(move,100); //計時器

document.addEventListener("keydown",function(e) //監聽按下的鍵盤事件
{
 if(e.keyCode=="37")
 {
   snack.direct="left";
 }
 else if(e.keyCode=="39")
 {
   snack.direct="right";
 
 }
  else if(e.keyCode=="38")
 {
   snack.direct="top";
 
 }
  else if(e.keyCode=="40")
 {
   snack.direct="down";
 
 }
});
//snackmove
function move()
{
  updatescore(); //更新分數
  ctx.clearRect(0, 0, canvas.width, canvas.height); //清理畫布
  ctx.fillStyle = "#9fe8fa"; //填充顏色
  ctx.fillRect(0, 0, 300, 300);
  ctx.fillStyle = "#26baee"; //填充顏色
  ctx.fillRect(apple.x,apple.y, 10, 10); 
  ctx.fillStyle = "#FFE"; //填充顏色
  ctx.strokeStyle ="#26baee"; //填充邊框顏色
  ctx.lineWidth = 1; //邊框大小
  direction(); //判定方向
  //畫出蛇身體
  for(var i=0;i<snack.body.length;i++)
  {
  ctx.fillRect(snack.body[i].x,snack.body[i].y, 10, 10); 
  ctx.strokeRect(snack.body[i].x,snack.body[i].y, 10, 10);
  }
  //超過size陣列清掉
  for(var i=0;i<snack.body.length;i++)
  {
  if(i>=snack.bodysize)
  snack.body.pop();
  }
}
//蛇方向
function direction()
{
 if(snack.direct=="left")
 {
  snack.body.unshift({x:snack.body[0].x-10,y:snack.body[0].y});
 }
 else if(snack.direct=="top")
 {
   snack.body.unshift({x:snack.body[0].x,y:snack.body[0].y-10});
 }
 else if(snack.direct=="down")
 {
   snack.body.unshift({x:snack.body[0].x,y:snack.body[0].y+10});
 }
 else if(snack.direct=="right")
 {
   snack.body.unshift({x:snack.body[0].x+10,y:snack.body[0].y});
 
 }
 eatapple();
 gameover();
}
//判斷是否死掉
function gameover()
{
 for(var i=1;i<snack.body.length;i++)
 {
   if(snack.body[0].x==snack.body[i].x&&snack.body[0].y==snack.body[i].y)
   {
      reset();
     break;
   }
 }
  if(snack.body[0].x<0||snack.body[0].x>=300||snack.body[0].y>=300||snack.body[0].y<0)
  {
    reset();
  }
}
//創造蘋果
function applecreate()
{
 var x=Math.floor(Math.random()*30)*10; //0~29之間在乘10
 var y=Math.floor(Math.random()*30)*10; //0~29之間在乘10
 //檢查蘋果是否在蛇身上
 for(var i=0;i<snack.body.length;i++)
 {
   if(x==snack.body[i].x&&y==snack.body[i].y)
   {
      x=Math.floor(Math.random()*30)*10;
      y=Math.floor(Math.random()*30)*10;
      i=0;
   }
 }
 apple.x=x;
 apple.y=y;
}
//吃掉蘋果
function eatapple()
{
   if(snack.body[0].x==apple.x&&snack.body[0].y==apple.y)//蛇碰到蘋果吃掉
   {
      applecreate();
      snack.bodysize++;
        score+=10;          
   }
}
//更新分數
function updatescore()
{
  scoretext.innerText=score;
}
//初始化
function reset()
{
 snack.body=[{x:180,y:140},{x:170,y:140},{x:160,y:140}, {x:150,y:140},{x:140,y:140}];
 snack.bodysize=5;
 snack.direct="right";
 move();
 applecreate();
 score=0;
}