const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");

const resetBtn = document.getElementById("resetBtn");
const newMatchBtn = document.getElementById("newMatch");

const modeSelect = document.getElementById("mode");

const xScoreEl = document.getElementById("xScore");
const oScoreEl = document.getElementById("oScore");
const drawScoreEl = document.getElementById("drawScore");

let board = ["","","","","","","","",""];

let currentPlayer = "X";

let running = true;

let xScore = 0;
let oScore = 0;
let drawScore = 0;

const winPatterns = [
[0,1,2],
[3,4,5],
[6,7,8],
[0,3,6],
[1,4,7],
[2,5,8],
[0,4,8],
[2,4,6]
];

cells.forEach(cell=>{
cell.addEventListener("click",cellClick);
});

resetBtn.addEventListener("click",resetGame);
newMatchBtn.addEventListener("click",newMatch);

function cellClick(){

const index=this.dataset.index;

if(board[index]!=="" || !running){
return;
}

updateCell(this,index);

checkWinner();

if(modeSelect.value==="ai" &&
running &&
currentPlayer==="O")
{
setTimeout(aiMove,500);
}

}

function updateCell(cell,index){

board[index]=currentPlayer;

cell.textContent=currentPlayer;

}

function changePlayer(){

currentPlayer=currentPlayer==="X"?"O":"X";

statusText.textContent=
`Player ${currentPlayer} Turn`;

}

function checkWinner(){

let roundWon=false;

for(let i=0;i<winPatterns.length;i++){

const condition=winPatterns[i];

const a=board[condition[0]];
const b=board[condition[1]];
const c=board[condition[2]];

if(a===""||b===""||c===""){
continue;
}

if(a===b && b===c){

roundWon=true;

condition.forEach(index=>{
cells[index].classList.add("winner");
});

break;
}
}

if(roundWon){

statusText.textContent=
`${currentPlayer} Wins!`;

running=false;

if(currentPlayer==="X"){
xScore++;
xScoreEl.textContent=xScore;
}else{
oScore++;
oScoreEl.textContent=oScore;
}

return;
}

if(!board.includes("")){

statusText.textContent="Draw!";

drawScore++;

drawScoreEl.textContent=drawScore;

running=false;

return;
}

changePlayer();

}

function resetGame(){

currentPlayer="X";

board=["","","","","","","","",""];

running=true;

statusText.textContent=
"Player X Turn";

cells.forEach(cell=>{

cell.textContent="";

cell.classList.remove("winner");

});

}

function newMatch(){

resetGame();

xScore=0;
oScore=0;
drawScore=0;

xScoreEl.textContent=0;
oScoreEl.textContent=0;
drawScoreEl.textContent=0;

}

function aiMove(){

let empty=[];

board.forEach((cell,index)=>{
if(cell===""){
empty.push(index);
}
});

if(empty.length===0) return;

let randomIndex=
empty[Math.floor(Math.random()*empty.length)];

board[randomIndex]="O";

cells[randomIndex].textContent="O";

checkWinner();

}