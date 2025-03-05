"use strict"

let d = 1;
let colors = ["red", "blue", "yellow", "green", "pink"]
let mat = []
let balls = [9];
let balls2 = [16]
let color1
let stop1


makeBalls()

function saveName() {
    var firstName = document.getElementById("name1").value;
    if (!firstName) {
        alert("plase enter name");
    }
    else {
        localStorage.setItem("firstName", firstName);
        window.location.href = "./levels.html";
    }
}


//פונקציה ליצירת כדורים במטריצה
function makeBalls() {
    let c = localStorage.getItem("level");
    if (c == 2)
        stop1 = 40;
    if (c == 1)
        stop1 = 50;
    // let x = JSON.parse(c)
    for (let i = 0; i < 9; i++) {
        balls[i] = []
        let x = document.createElement("div")/*יוצר דיב של שורה ועושה לו קלאס מתאים ןמכניס לתוך הדיב הראשי */
        if (i % 2 == 0)
            x.classList.add("div5");
        else
            x.classList.add("div4");

        document.getElementById("div1").appendChild(x);


        for (let j = 0; j < 16; j++) {/*יוצר דיב של כדור ומכניס לתוך הדיב של השורה לפי מטריצה */
            balls[i][j] = document.createElement("div")
            x.appendChild(balls[i][j]);
            let c = colors[Math.floor(Math.random() * 5)];
            if (i > 4)
                balls[i][j].classList.add('white')
            else
                balls[i][j].classList.add(c)
            balls[i][j].id = d++;
        }
    }
}

//פונקציות לבחירת שלב
function level1() {
    localStorage.setItem("level", 1);
}
function level2() {
    localStorage.setItem("level", 2);
}
let restball
// כדור זז
let arrN = [100];
for (let index = 0; index < arrN.length; index++) {
    arrN[index] = -1;
}
let nP = 0
const b = document.getElementById('ball');
const ball = {
    el: b,
    index: 8,
    jindex: 9
}
// 
let isRising = false;
let dc = colors[Math.floor(Math.random() * 5)];
let posY = 0;
let posX = 50;
let sum = 0;
document.addEventListener('keydown', function (event) {
    console.log(event);
    if (event.key === 'ArrowLeft') {
        moveLeft()
    } else if (event.key === 'ArrowRight') {
        moveRight();
    }
    else if (event.key === 'Enter') {

        isRising = true;
        riseUp();
        move();
        restball = stop1;
        document.getElementById("ressss").innerText = restball;
        console.log(stop1);
        console.log("stop1");
        if (stop1 == 0)
            endGame()
        end();
        if (flag == 1)
            endGame();
    }
});
move()

function move() {
    dc = colors[Math.floor(Math.random() * 5)];
    posY = 0;
    posX = 50;
    ball.index = 8;
    ball.jindex = 9;
    ball.el.style.bottom = 0
    ball.el.classList.add(dc);
    ball.el.style.visibility = "visible"
}

function moveLeft() {
    if (ball.jindex > 0) {
        posX -= 4;
        ball.el.style.left = posX + 'vw';
        // לשנות את העמודה של הכדור באוביקט
        ball.jindex--;
    }
}

function moveRight() {
    if (ball.jindex < 15) {
        posX += 4;
        ball.el.style.left = posX + 'vw';
        // לשנות את העמודה של הכדור באוביקט
        ball.jindex++;
    }
}

function riseUp() {
    console.log("ise up");
    let i = 0;
    console.log(ball.index, ball.jindex)

    while (ball.index >= 0 && balls[ball.index][ball.jindex].classList?.contains("white")) {

        ball.index--;

        i++;
    }
    stop1--
    isRising = true;

    up(8);

    ball.el.style.visibility = "hidden";
    ball.el.style.bottom += 9 + 9 * i + 'vh';
    console.log(balls[ball.index + 1][ball.jindex].classList);
    balls[ball.index + 1][ball.jindex].classList.remove("white");
    balls[ball.index + 1][ball.jindex].classList.add(dc);

    //קריאה לפונקציה שכנים
    arrN = [];
    nP = 1;
    arrN[0] = balls[ball.index + 1][ball.jindex].id;
    neighbors(ball.index + 1, ball.jindex, dc, balls[ball.index + 1][ball.jindex].id);

    color1 = dc;
    delet(color1, i);
    ball.el.classList.remove(dc);
    ball.el.style.left = 50 + 'vw';
    if (flag == 1)
        endGame();
}

function clickBall() {
    isRising = true;
    riseUp();
    move();
}

//פונקצית בדיקת שכנים
function neighbors(ind, jind, color, lastBall) {
    if ((ind + 1) < 9 && balls[ind + 1][jind].classList?.contains(color) && arr(balls[ind + 1][jind].id)) {
        arrN[nP] = balls[ind + 1][jind].id;
        nP++;
        neighbors(ind + 1, jind, color, arrN[nP - 1]);

    }
    if ((ind - 1) >= 0 && balls[ind - 1][jind].classList?.contains(color) && arr(balls[ind - 1][jind].id)) {
        arrN[nP] = balls[ind - 1][jind].id;
        nP++;
        neighbors(ind - 1, jind, color, arrN[nP - 1]);
    }
    if ((jind - 1) >= 0 && balls[ind][jind - 1].classList?.contains(color) && arr(balls[ind][jind - 1].id)) {
        arrN[nP] = balls[ind][jind - 1].id;
        nP++;
        neighbors(ind, jind - 1, color, arrN[nP - 1]);
    }
    if ((jind + 1) < 16 && balls[ind][jind + 1].classList?.contains(color) && arr(balls[ind][jind + 1].id)) {
        arrN[nP] = balls[ind][jind + 1].id;
        nP++;
        neighbors(ind, jind + 1, color, arrN[nP - 1]);
    }
    //פונקציה לשורה זוגית
    if (ind % 2 == 0) {
        if ((ind - 1) >= 0 && (jind + 1) < 16 && balls[ind - 1][jind + 1].classList?.contains(color) && arr(balls[ind - 1][jind + 1].id)) {
            arrN[nP] = balls[ind - 1][jind + 1].id;
            nP++;
            neighbors(ind - 1, jind + 1, color, arrN[nP - 1]);
        }
        if ((ind + 1) < 9 && (jind + 1) < 16 && balls[ind + 1][jind + 1].classList?.contains(color) && arr(balls[ind + 1][jind + 1].id)) {
            arrN[nP] = balls[ind + 1][jind + 1].id;
            nP++;
            neighbors(ind + 1, jind + 1, color, arrN[nP - 1]);
        }
    }
    else {
        if ((ind - 1) >= 0 && (jind - 1) >= 0 && balls[ind - 1][jind - 1].classList?.contains(color) && arr(balls[ind - 1][jind - 1].id)) {
            arrN[nP] = balls[ind - 1][jind - 1].id;
            nP++;
            neighbors(ind - 1, jind - 1, color, arrN[nP - 1]);
        }
        if ((ind + 1) < 9 && (jind - 1) >= 0 && balls[ind + 1][jind - 1].classList?.contains(color) && arr(balls[ind + 1][jind - 1].id)) {
            arrN[nP] = balls[ind + 1][jind - 1].id;
            nP++;
            neighbors(ind + 1, jind - 1, color, arrN[nP - 1]);
        }
    }



}


//פונקציה שבודקת שאין איברים חוזרם במערך
function arr(idBall) {

    for (let i = 0; i < arrN.length; i++) {
        if (arrN[i] == idBall) {
            return false;
        }
    }
    return true;
}

//פונקציה למחיקת כדורים
function delet(color, far) {
    let p = 0;
    for (let index = 0; index < arrN.length; index++) {
        if (arrN[index] != -1)
            p++;
    }
    //מחיקת הכדורים במערך
    if (p >= 3) {
        sum += p * 10;
        console.log(sum);

        big()
        function big() {
            document.getElementById("points").innerText = sum;
            var currentSize = parseFloat(window.getComputedStyle(document.getElementById("points")).fontSize); // קביעת הגודל הנוכחי
            var newSize = currentSize + 500; // הוספת 5 לגודל הנוכחי
            document.getElementById("points").style.fontSize = newSize + '%'; // עדכון הגודל החדש של הטקסט


            setTimeout(function () {
                document.getElementById("points").style.fontSize = '250%'; // קביעת הגודל המקורי לאלמנט הטקסט
            }, 1000); // מחכים 2000 מילי-שניות (2 שניות) לפני החזרת הגודל למקורו
        }


        //     document.getElementById("points").innerText = sum;
        //     var currentSize = parseFloat(window.getComputedStyle(document.getElementById("points")).fontSize); // קביעת הגודל הנוכחי
        //    var newSize = currentSize - 600; // הוספת 5 לגודל הנוכחי
        //    document.getElementById("points").style.fontSize = newSize + '%'; // עדכון הגודל החדש של הטקסט
        i = 0;
        // setTimeout(function(){},10)
        setTimeout(removeBall, 100)

    }
}
let i = 0;

function removeBall() {
    if (i < arrN.length)
        var audio = document.getElementById("bubbleSound");
    audio.play();
    if (arrN[i] != -1) {
        console.log(arrN[i]);

        document.getElementById(arrN[i]).classList.remove(color1)
        document.getElementById(arrN[i]).classList.add("white")
        arrN[i] = -1;
    }
    i++;
    if (i < arrN.length)
        setTimeout(removeBall, 100)


}
//פונקציה שבודקת אם נגמרו הכדורים במטריצה
function check() {
    for (let k = 0; k < 9; k++) {
        for (let j = 0; j < 16; j++) {
            if (!balls[k][j].classList?.contains("white"))
                return false;
        }
    }
    return true;

}

//הנפשה כדורים עולים
// function up() {
//     let y=0
//     if ( y<500) {
//         y += 9;
//         ball.el.style.bottom = y + 'vh';
//          console.log(y);
//         setTimeout(up, 80);
//     }
// }


function up(distance) {

    document.getElementById('ball').style.bottom = "-" + distance + "vh"; // קבע את מרחק הנדרש באמצעות CSS

    setTimeout(function () {
        document.getElementById("ball").style.bottom = "0"; // תיקון של מיקום הכדור לקראת סיום התנודתו
    }, 2000); // זמן האנימציה במילישניות (כאן 2000 מילישניות)
}



let flag = 0;
//פונקציה בודקת אם הכדורים הגיעו למטה
function end() {
    flag = 0;
    for (let index = 0; index < 16; index++) {
        if (!balls[8][index].classList?.contains("white")) {
            flag = 1
            break;
        }

    }
}




let cnt = 0
//סוף משחק
//פונקציה המקפיצה הודעה לסיום המשחק
function endGame() {
    //מעלים את הכוס מהמסך
    document.getElementById("ball").style.visibility = "hidden"
    //clearInte;rval(timeClock);
    //מייצרת את ההודעה
    var text = document.getElementById("w");
    //השם שהכניס 
    document.getElementById("w").innerText = localStorage.getItem("firstName")
    var message = document.getElementById("message");
    message.style.display = 'block';
    //מציגה סיכוםם
    document.getElementById("score").innerHTML = sum;
    if (sum > localStorage.getItem("place1") || sum > localStorage.getItem("place2") || sum > localStorage.getItem("place3")
        || sum > localStorage.getItem("place4")) {
        document.getElementById("x").innerText = "new record!"
    }
    // var maxTime = document.getElementById("time");
    // maxTime.innerHTML = timerElement.textContent;
    // clearInterval(intervalId);
    //  gameover=1;
    score();
}

function score() {
    if (!isNaN(sum)) {
        if (sum > localStorage.getItem("place1")) {
            localStorage.setItem("place4", localStorage.getItem("place3"));
            localStorage.setItem("place3", localStorage.getItem("place2"));
            localStorage.setItem("place2", localStorage.getItem("place1"));
            localStorage.setItem("place1", sum);
            localStorage.setItem("firstName4", localStorage.getItem("firstName3"));
            localStorage.setItem("firstName3", localStorage.getItem("firstName2"));
            localStorage.setItem("firstName2", localStorage.getItem("firstName1"));
            localStorage.setItem("firstName1", localStorage.getItem("firstName"));
        }
        else if (sum > localStorage.getItem("place2")) {
            localStorage.setItem("place4", localStorage.getItem("place3"));
            localStorage.setItem("place3", localStorage.getItem("place2"));
            localStorage.setItem("place2", sum);
            localStorage.setItem("firstName4", localStorage.getItem("firstName3"));
            localStorage.setItem("firstName3", localStorage.getItem("firstName2"));
            localStorage.setItem("firstName2", localStorage.getItem("firstName"));
        }
        else if (sum > localStorage.getItem("place3")) {
            localStorage.setItem("place4", localStorage.getItem("place3"));
            localStorage.setItem("place3", sum);
            localStorage.setItem("firstName4", localStorage.getItem("firstName3"));
            localStorage.setItem("firstName3", localStorage.getItem("firstName"));
        }
        else if (sum > localStorage.getItem("place4")) {
            localStorage.setItem("place4", sum);
            localStorage.setItem("firstName4", localStorage.getItem("firstName"));
        }
    }
    console.log(localStorage.getItem("place4"));
    console.log(localStorage.getItem("place3"));
    console.log(localStorage.getItem("place2"));
    console.log(localStorage.getItem("place1"));
    console.log(localStorage.getItem("firstName4"));
    console.log(localStorage.getItem("firstName3"));
    console.log(localStorage.getItem("firstName2"));
    console.log(localStorage.getItem("firstName1"));
}
// document.getElementById("p1").innerText=localStorage.getItem("place1");
// document.getElementById("p2").innerText=localStorage.getItem("place2");
// document.getElementById("p3").innerText=localStorage.getItem("place3");
// document.getElementById("p4").innerText=localStorage.getItem("place4");