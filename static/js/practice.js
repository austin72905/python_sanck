

let canvas=document.getElementById("canvas");     //抓取html裡 id="canvas"的元素
let cxt=canvas.getContext("2d");       //設置要繪製2d圖像


//設置蛇身體起始座標、長度、方向
let snake={
    body:[{x:180,y:140},
          {x:170,y:140},
          {x:160,y:140},
          {x:150,y:140},
          {x:140,y:140},
         ],
    size:5,
    way:"right",
};

//設置蘋果
let apple={};



//---------  app.start config
CreateApple();  //召喚蘋果
Move(); //呼叫蛇移動參數

setInterval(Move,100); //不斷呼叫Move 涵式

CreateApple();
//Eat();   //放在這邊跑一次就結束了   要用setInterval ，所以放在Move裡面

//---------



//蛇移動
function Move()
{
    cxt.clearRect(0,0,canvas.width,canvas.height); //(座標x,y,大小w,h) 清理畫布

    cxt.fillStyle="#9fe8fa";
    cxt.fillRect(0,0,400,400);  //填滿方塊(map)

    cxt.fillStyle="#26baee";
    cxt.fillRect(apple.x,apple.y,10,10);

    DrawSnake();
    Direction();    //判斷前進方向
    Eat();          //判斷是否吃到食物
    Edge();         //判斷邊界
    GameOver();     //判斷遊戲是否結束
    //畫出蛇的身體
    // for(let i=0;i<snake.body.length;i++)
    // {
    //     //cxt.fillRect(snake.body[i].x,snake.body[i].y,10,10);
    //     cxt.strokeRect(snake.body[i].x,snake.body[i].y,10,10);   //(座標x,y,大小w,h)  只畫框
    //     if(i>=snake.size)
    //     {
    //         snake.body.pop();  //刪除陣列最後一個元素  ，也可設為一個變數，會返回被刪掉的原素
    //     }
    // }

}

//畫出蛇的身體
function DrawSnake()
{
    for(let i=0;i<snake.body.length;i++)
    {
        //cxt.fillRect(snake.body[i].x,snake.body[i].y,10,10);
        cxt.strokeRect(snake.body[i].x,snake.body[i].y,10,10);   //(座標x,y,大小w,h)  只畫框
        if(i>=snake.size)
        {
            snake.body.pop();  //刪除陣列最後一個元素  ，也可設為一個變數，會返回被刪掉的原素
        }
    }
}

// document.onkeydown=function(e)
// {
//     keydown(e);
// };

// function keydown(e)
// {
//     switch(e.keyCode)
//     {
//         case 38:
//             snake.way="up";
//             break;
//         case 40:
//             snake.way="down";
//             break;
//         case 37:
//             snake.way="left";
//             break;
//         case 39:
//             snake.way="right";
//             break;
//     }
// };

//監聽keyboard
document.addEventListener("keydown",function(e){

    switch(e.keyCode)
    {
        case 38:
            snake.way="up";            
            break;
        case 40:
            snake.way="down";
            break;
        case 37:
            snake.way="left";
            break;
        case 39:
            snake.way="right";
            break;
    }
});

//判斷方向
function Direction()
{
    
    switch(snake.way)    //unshift 在陣列頭新增元素   為什麼都是[0]?( 蛇body在陣列裡[index]右-->左)，所以都是頭到尾伊格一格渲染
    {
        case "up":
            
            snake.body.unshift({
                x:snake.body[0].x,
                y:snake.body[0].y-10
            });
            break;
        case "down":
            
            snake.body.unshift({
                x:snake.body[0].x,
                y:snake.body[0].y+10
            });
            break;
        case "left":
            
            snake.body.unshift({
                x:snake.body[0].x-10,
                y:snake.body[0].y
            });
            break;
        case "right":
            
            snake.body.unshift({
                x:snake.body[0].x+10,
                y:snake.body[0].y
            });
            break;
    }
    
}

//不給走回頭路
function NoBack()
{
    
    if(snake.way =="up")
    {
        snake.way ="down";
    }
    if(snake.way =="down")
    {
        snake.way ="up";
    }
    if(snake.way =="right")
    {
        snake.way ="left";
    }
    if(snake.way =="left")
    {
        snake.way ="right";
    }
        
}
//隨機生成蘋果
function CreateApple()
{
    let x=Math.floor(Math.random()*40)*10;
    let y=Math.floor(Math.random()*40)*10;
    
    apple.x=x;
    apple.y=y;
}

//蘋果是否被吃掉
function Eat ()
{
    if(apple.x ==snake.body[0].x && apple.y == snake.body[0].y)
    {
        CreateApple();
        snake.size++;
    }
            
        
}

//邊界可以從另一邊出來
function Edge()
{
    for(let i=0;i<snake.body.length;i++)
        {
            //超過右邊邊界
            if(snake.body[i].x>400 )
            {
                snake.body[i].x-=400;
            }

            //超過下邊邊界
            if(snake.body[i].y>400 )
            {
                snake.body[i].y-=400;
            }

            //超過上邊邊界
            if(snake.body[i].y<0 )
            {
                snake.body[i].y+=400;
            }

            //超過左邊邊界
            if(snake.body[i].x<0 )
            {
                snake.body[i].x+=400;
            }

        }
        
}


//gameover
function GameOver()
{
    for(let i=1;i<snake.body.length;i++)
    {
        //只要蛇頭的區塊跟蛇身有重複
        if(snake.body[0].x ==snake.body[i].x &&snake.body[0].y ==snake.body[i].y)
        {
            
            Reset();
                              
        }
        
        
    }
}

//重新開始
function Reset()
{
    snake={
        body:[{x:180,y:140},
              {x:170,y:140},
              {x:160,y:140},
              {x:150,y:140},
              {x:140,y:140},
             ],
        size:5,
        way:"right",
    };
}