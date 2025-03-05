
//קוד לכדור שזז לצדדים לא עולה למעלה

// let ball = document.createElement('div'); 
// ball.style.width = '20px'; 
// ball.style.height = '20px';
//  ball.style.background = 'red';
//   ball.style.position = 'absolute';
//    ball.style.bottom = '0px';
//     ball.style.left = '50%';
//      document.body.appendChild(ball);

// // פונקציה לתנועת הכדור 
// function moveBall(event) { const step = 10;
//  switch(event.key) { case 'ArrowLeft': ball.style.left = parseInt(ball.style.left) - step + 'px';
//   break;
//    case 'ArrowRight': ball.style.left = parseInt(ball.style.left) + step + 'px';
//     break;
//      case 'ArrowUp': if(ball.parentElement !== document.body) { ball.style.bottom = '0px';
//       ball.style.left = '50%';
//        document.body.appendChild(ball);
//      } break; } }

// // הוספת מאזין לתנועת המקשים 
// document.addEventListener('keydown', moveBall); 



//פונקציה לנסות לעצור תא הכדור
let bp=0;
function riseUp() {
    if (posY <400) {
        posY +=20;
        ball.style.bottom = posY + 'px';
    //      let div1 = document.getElementById('ball');
    //    let div2 = document.getElementById(b++);
        if(document.getElementById(b++).className!='white')
        checkCollision(document.getElementById('ball'),document.getElementById(b++));
    if(isRising == true)
         setTimeout(riseUp, 50);

        
    }
     else {
         isRising = false;
       
   
    }
}
   





 // isRising = true;
        // ball.el.style.bottom += 47 + 'px';
        // if (posY < 500) {
        //     posY += 47;
        //     ball.el.style.bottom = posY + 'px';
        //     console.log(posY);
        //     setTimeout(riseUp, 100);
        // }
        // else {
        //     isRising = false;
        // }
        // x++;
        // if (ball.index < 8) {
        //     balls[ball.index + 1][ball.jindex].classList.remove(dc)
        //     balls[ball.index + 1][ball.jindex].classList.add("white")
        // }
        // balls[ball.index][ball.jindex].classList.remove("white")
        // balls[ball.index][ball.jindex].classList.add(dc)
        // ball.index--
        //  if (posY <60) {
        //         posY += 20;
        //         ball.el.style.bottom = posY + 'px';
        //         setTimeout(riseUp, 50);
        //     }
        //     else {
        //         isRising = false;
        //     }