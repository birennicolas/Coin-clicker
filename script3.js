// general varabiales
let time = 0;

let score = 0;           		// score
let addScoreClick = 1;          // how many add?
let nbUpgradeOne = 0;           // number of upgrade one & how much add each second
let nbUpgradeTwo = 1;
let nbUpgradeThree = 5;
let autoClickerPrice = 25;
let bonusPrice = 200;
let multiplierPrice = 500;
let statusUpgradeTwo = 0;

// elements variables

const clickerImg = document.getElementById("clickercontainer");
const bitresponse = document.querySelector(".becoin");

const upgradeOne = document.getElementById("btn-autoclicker");
const upgradeTwo = document.getElementById("btn-bonus");
const upgradeThree = document.getElementById("btn-multiplicator");

const spanScore = document.getElementById("score");
const spanUpgradeOne = document.getElementById("autoClickerPrice");
const spanUpgradeTwo = document.getElementById("bonusPrice");
const spanUpgradeTwoTimer = document.getElementById("timer");
const spanUpgradeThird = document.getElementById("multiplierPrice");
const spanUpgradeThirdmulti = document.getElementById("upgrade-3");

// onclick event listener
clickerImg.addEventListener("click", addScore);
upgradeOne.addEventListener("click", upgradeOneFun);
upgradeTwo.addEventListener("click", upgradeTwoFun);
upgradeThree.addEventListener("click", upgradeThreeFunc);


// update dom
function updateDom() {
	spanScore.innerHTML = score;

	spanUpgradeOne.classList.remove("active");
	spanUpgradeTwo.classList.remove("active");
	spanUpgradeThird.classList.remove("active");
	if (score >= autoClickerPrice) {spanUpgradeOne.classList.add("active");}
	if (score >= bonusPrice) {spanUpgradeTwo.classList.add("active");}
	if (score >= multiplierPrice) {spanUpgradeThird.classList.add("active");}
}

// addscore onclick of the image
function addScore () {
	score += addScoreClick * nbUpgradeTwo;
	updateDom();
}

// Bitcoin falling to wallet 
clickerImg.addEventListener("click", () => {
	bitresponse.classList.add("fallingcoin");
    setTimeout(stopcoin, 300)
});

function stopcoin () {
    bitresponse.classList.remove("fallingcoin");
};

function reset () {
        score = 0;
        nbUpgradeOne = 0;         
        nbUpgradeTwo = 1;
        nbUpgradeThree = 5;
		time = 29;
		spanUpgradeThirdmulti.innerHTML = nbUpgradeThree;
		addScoreClick = 1;
		document.getElementById('autoClickerPrice').innerHTML = 25;
		autoClickerPrice = 25;
		document.getElementById('bonusPrice').innerHTML = 200;
		bonusPrice = 200;
		document.getElementById('multiplierPrice').innerHTML = 500;
		multiplierPrice = 500;
		updateDom();
}

// upgrade one function
function upgradeOneFun() {
	if (spanUpgradeOne.classList.contains("active")) {
		if (nbUpgradeOne == 0) {
			setInterval(addPointsEverySecond, 1000);
		}
		nbUpgradeOne++;
		document.getElementById('score').innerHTML = score;
		score -= autoClickerPrice;
		autoClickerPrice = Math.floor(autoClickerPrice * 1.5);
		document.getElementById('autoClickerPrice').innerHTML = autoClickerPrice;
		updateDom();
	}
}
function addPointsEverySecond() {
	score += nbUpgradeOne;
	updateDom();
}

//upgrade two functions
function upgradeTwoFun() {
	if (spanUpgradeTwo.classList.contains("active")) {
	        if (statusUpgradeTwo === 0) {
		        statusUpgradeTwo++;

			var timerbonus = setInterval(function () {
				time++;
				spanUpgradeTwoTimer.innerHTML = time;
				nbUpgradeTwo = 2;
				if (time === 30) {
					clearInterval(timerbonus);
					spanUpgradeTwoTimer.innerHTML = "0";
					nbUpgradeTwo = 1;
					time = 0;
					statusUpgradeTwo = 0;
				}
			}, 1000);
			document.getElementById('score').innerHTML = score;
			score -= bonusPrice;
			bonusPrice = Math.floor(bonusPrice * 1.5);
			document.getElementById('bonusPrice').innerHTML = bonusPrice;
			updateDom();
		}
	}
}

//upgrade three function
function upgradeThreeFunc() {
	if (spanUpgradeThird.classList.contains("active")) {
		addScoreClick = nbUpgradeThree;
		nbUpgradeThree++;
		spanUpgradeThirdmulti.innerHTML = nbUpgradeThree;
		score -= multiplierPrice;
		document.getElementById('score').innerHTML = score;
		multiplierPrice = Math.floor(multiplierPrice * 1.5);
		document.getElementById('multiplierPrice').innerHTML = multiplierPrice;
		updateDom();
	}
}
updateDom();

// Reset animation

function gimmick(el) {
    var exists = document.getElementById('gimmick')
    if (exists) {
        exists.parentNode.removeChild(exists);
        return false;
    }

    var element = document.querySelector(el);
    var canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        focused = false;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.id = 'gimmick'

    var coin = new Image();
    coin.src = 'http://i.imgur.com/5ZW2MT3.png'
    // 440 wide, 40 high, 10 states
    coin.onload = function () {
        element.appendChild(canvas)
        focused = true;
        drawloop();
    }
    var coins = []

    function drawloop() {
        if (focused) {
            requestAnimationFrame(drawloop);
        }
        
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        if (Math.random() < .3) {
            coins.push({
                x: Math.random() * canvas.width | 0,
                y: -50,
                dy: 3,
                s: 0.5 + Math.random(),
                state: Math.random() * 10 | 0
            })
        }
        var i = coins.length
        while (i--) {
            var x = coins[i].x
            var y = coins[i].y
            var s = coins[i].s
            var state = coins[i].state
            coins[i].state = (state > 9) ? 0 : state + 0.1
            coins[i].dy += 0.3
            coins[i].y += coins[i].dy

            ctx.drawImage(coin, 44 * Math.floor(state), 0, 44, 40, x, y, 44 * s, 40 * s)

            if (y > canvas.height) {
                coins.splice(i, 1);
            }
        }
    }
}

var button = document.querySelector('#reset')
button.onclick = function click () {
	gimmick('body')
	reset()
}
