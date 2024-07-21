const logo = document.querySelectorAll(".logo")[0]
const main = document.querySelectorAll(".main")[0]
const play = document.querySelectorAll("button")[0]
const achivbtn = document.querySelectorAll("button")[1]
const achiv = document.querySelectorAll(".achivs")[0]
const back = document.querySelectorAll(".achivs button")[0]
const overlay = document.querySelectorAll(".overlay")[0]
const counting = document.querySelectorAll(".counting")[0]
const game = document.querySelectorAll(".game")[0]
const winstreaks = document.querySelectorAll(".winstreaks span")[0]
let winstreak = 0
let mistake = 0
const firstAchiv = document.querySelectorAll(".firstachiv")[0]
const secondAchiv = document.querySelectorAll(".secondachiv")[0]
const thirdAchiv = document.querySelectorAll(".thirdachiv")[0]
const timer = document.querySelectorAll(".timer")[0]
const mistakes = document.querySelectorAll(".mistakes span")[0]
const finalMistakeslose = document.querySelectorAll(".finalmistakes")[0]
const finalMistakeswin = document.querySelectorAll(".finalmistakes")[1]
const finalwinstreaks = document.querySelectorAll(".finalwinstreaks")[0]
const box = document.querySelectorAll(".box")
const holder = document.querySelectorAll(".boxes .holder")
const holderArray = [...Array.from(holder).keys()]
const lose = document.querySelectorAll(".lose")[0]
const win = document.querySelectorAll(".win")[0]
const playagain = document.querySelectorAll(".playagain")
const mainbtn = document.querySelectorAll(".mainbtn")
let status = false
const countDownSound = new Audio('/audio/countsound.mp3')
const winSound = new Audio('/audio/win.mp3')
loadLocalStorage()
achivbtn.onclick = function(){
    main.style.visibility = "hidden"
    main.style.opacity = "0"
    logo.style.opacity = "0"
    logo.style.visibility = "hidden"
    setTimeout(() => {
        main.style.display = "none"
        logo.style.display = "none"
    }, 800);
    achiv.style.display = "block"
    setTimeout(() => {
        achiv.style.visibility = "visible"
        achiv.style.opacity = "1"
    }, 800);
}
back.onclick = function(){
    achiv.style.visibility = "hidden"
    achiv.style.opacity = "0"
    setTimeout(() => {
        achiv.style.display = "none"
    }, 800);
    main.style.display = "block"
    logo.style.display = "block"
    setTimeout(() => {
        main.style.visibility = "visible"
        logo.style.visibility = "visible"
        main.style.opacity = "1"
        logo.style.opacity = "1"
    }, 800);
}

mainbtn.forEach((element) => {
    element.onclick = function(){
        mistake = 0
        winstreaks.textContent = winstreak
        mistakes.textContent = "0"
        lose.style.opacity = "0"
        win.style.opacity = "0"
        overlay.style.opacity = "0"
        game.style.opacity = "0"
        setTimeout(() => {
            lose.style.display = "none"
            win.style.display = "none"
            overlay.style.display = "none"
            game.style.display = "none"
            timer.textContent = "20"
            box.forEach((element) => {
                element.classList.remove("fliped")
            })
        }, 800);
        main.style.display = "block"
        logo.style.display = "block"
        setTimeout(() => {
            main.style.visibility = "visible"
            logo.style.visibility = "visible"
            main.style.opacity = "1"
            logo.style.opacity = "1"
        }, 800);
    }
})

play.onclick = function(){
    main.style.visibility = "hidden"
    main.style.opacity = "0"
    logo.style.opacity = "0"
    logo.style.visibility = "hidden"
    setTimeout(() => {
        main.style.display = "none"
        logo.style.display = "none"
    }, 800);
    counting.style.display = "block"
    overlay.style.display = "block"
    game.style.display = "block"
    setTimeout(() => {
        overlay.style.opacity = "0.4"
        counting.style.opacity = "1"
        game.style.opacity = "1"
    }, 800);
}

playagain.forEach((element) => {
    element.onclick = function() {
        mistake = 0
        lose.style.opacity = "0"
        win.style.opacity = "0"
        setTimeout(() => {
            lose.style.display = "none"
            win.style.display = "none"
            timer.textContent = "25"
            mistakes.textContent = 0
            winstreaks.textContent = winstreak
            box.forEach((element) => {
                element.classList.remove("fliped")
            })
        }, 800);
        counting.style.display = "block"
        overlay.style.display = "block"
        game.style.display = "block"
        setTimeout(() => {
            overlay.style.opacity = "0.4"
            counting.style.opacity = "1"
            game.style.opacity = "1"
        }, 800);
        countdown()
    }
})

function countdown() {
    let count = 3;
    const starting = document.querySelector(".counting h1");
    starting.textContent = "3"
    setTimeout(() => {
        countDownSound.play()
    }, 800);
    const interval = setInterval(() => {
        starting.style.opacity = "0";
        setTimeout(() => {
            count--;
            starting.textContent = count;
            starting.style.opacity = "1";
            if (count <= 1) {
                clearInterval(interval);
                setTimeout(() => {
                    counting.style.opacity = "0"
                    overlay.style.opacity = "0"
                    setTimeout(() => {
                        counting.style.display = "none"
                        overlay.style.display = "none"
                        gameStarted()
                    }, 300);
                }, 500);
            }
        }, 800);
    }, 1100);
}
play.addEventListener("click" , countdown)

function gameStarted() {
    shuffleholders(holderArray)
    status = false
    let timeleft = 25
    const interval = setInterval(() => {
            timeleft--
            timer.textContent = timeleft
            if(timeleft === 0){
                clearInterval(interval)
                timeOver()
            }
            if(status){
                clearInterval(interval)
            }
        }, 1000);
        gamePlay()
}

function gamePlay() {
    mistake = 0
    let flippedArray = [];
    let isChecking = false;
    box.forEach((element) => {
        element.onclick = function() {
            if (isChecking || element.classList.contains("fliped")) {
                return;
            }
            element.classList.add("fliped");
            if(Array.from(box).every((element) => element.classList.contains("fliped"))){
                winGame()
            }
            flippedArray.push(element);
            if (flippedArray.length > 1) {
                isChecking = true;
                setTimeout(() => {
                    if (flippedArray[0].getAttribute("data") !== flippedArray[1].getAttribute("data")) {
                        flippedArray[0].classList.remove("fliped");
                        flippedArray[1].classList.remove("fliped");
                        mistake++
                        mistakes.textContent = mistake
                    }
                    flippedArray = [];
                    isChecking = false;
                }, 700);
            }
        }
    });
}

function timeOver(){
    overlay.style.display = "block"
    winstreak = 0
    window.localStorage.setItem("winstreaks" , winstreak)
    finalMistakeslose.textContent = mistake
    lose.style.display = "block"
    setTimeout(() => {
        overlay.style.opacity = "0.4"
        lose.style.opacity = "1"
    }, 0);
}

function shuffleArray(array){
    let current = array.length-1
    let temp
    let random
    while(current > 0){
        random = Math.floor(Math.random() * array.length)
        temp = array[current]
        array[current] = array[random]
        array[random] = temp
        current--
    }
    return array
}

function shuffleholders(holderArray){
    const shuffledArray = shuffleArray(holderArray)
    holder.forEach((element , index) => {
        element.style.order = shuffledArray[index]
    })
}
function winGame(){
    status = true
    setTimeout(() => {
        winSound.play()
    }, 300);
    if(mistake <= 4){
        window.localStorage.setItem("third" , true)
        thirdAchiv.setAttribute("src" , "imgs/achivements.png")
    }
    if(+timer.textContent >= 10){
        window.localStorage.setItem("second" , true)
        secondAchiv.setAttribute("src" , "imgs/achivements.png")
    }
    winstreak++
    window.localStorage.setItem("winstreaks" , winstreak)
    checkFirstAchiv()
    finalwinstreaks.textContent = winstreak
    finalMistakeswin.textContent = mistake
    win.style.display = "block"
    overlay.style.display = "block"
    setTimeout(() => {
        win.style.opacity = "1"
        overlay.style.opacity = "0.4"
    }, 300);
}

function checkFirstAchiv(){
    if(winstreak>=10){
        firstAchiv.setAttribute("src" , "imgs/achivements.png")
        window.localStorage.setItem("first" , true)
    }
}

function loadLocalStorage() {
    if(window.localStorage.getItem("winstreaks")){
        winstreak = window.localStorage.getItem("winstreaks")
        winstreaks.textContent = winstreak
    }
    if(window.localStorage.getItem("first")){
        firstAchiv.setAttribute("src" , "imgs/achivements.png")
    }
    if(window.localStorage.getItem("second")){
        secondAchiv.setAttribute("src" , "imgs/achivements.png")
    }
    if(window.localStorage.getItem("third")){
        thirdAchiv.setAttribute("src" , "imgs/achivements.png")
    }
}



