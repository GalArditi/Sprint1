'use stirct'




var flag = false
var gBoard
var gTimerInterval 
var gLevel = { 
    SIZE: 4,
    MINES: 2 
}
var gGame = {
    isOn: false,
    shownCount: 0,
     markedCount: 0,
      secsPassed: 0,
      lives:3,
      gameOver: false
 }

function onInit(level, mines){
    if(gGame.gameOver === true) return
    gLevel.SIZE = level
    gLevel.MINES = mines
    gBoard = createBoard()
    renderBoard(gBoard)
    gGame.isOn = false
    document.getElementById("minesCount").innerText = mines
    document.getElementById("flagBtl").addEventListener("click",setFlag);
}

function createBoard() {
   var board = []
    for (var i = 0; i < gLevel.SIZE; i++) {
       var newline = []
        for (var j = 0; j < gLevel.SIZE; j++) {
        var cell = { minesAroundCount: 4, isShown: false, isMine: false, isMarked: true }
        newline.push(cell)
        } board.push(newline)
    
    }
    gBoard=board
renderBoard(board)
return board
    
}

function renderBoard() {
    console.log(gBoard);
        var elBoard = document.querySelector('.board')
        var strHTML = ''
        for (var i = 0; i < gBoard.length; i++) {
            strHTML += '<tr>'
            for (var j = 0; j < gBoard[0].length; j++) {
                 var currCell = getCellImg(i,j)
                 console.log('currCell',currCell);
                
                strHTML += `<td class="cell" oncontextmenu="setFlag(${i},${j},event)" onclick="cellClicked(this,${i},${j})">${currCell}`
    
            
    
                strHTML += '</td>'
            }
            strHTML += '</tr>'
        }
    
        elBoard.innerHTML = strHTML
        console.log(gBoard);
}
function getClassName(location) {
        var cellClass = 'cell-' + location.i + '-' + location.j
        return cellClass
}    


function getRandomMines(){
        var counterMines = 0
        while(counterMines < gLevel.MINES){
            var i = getRandomInt(0,gLevel.SIZE - 1)
            var j = getRandomInt(0,gLevel.SIZE - 1)
            if(gBoard[i][j].isShown === false && gBoard[i][j].isMine === false){
                 gBoard[i][j].isMine = true
                 counterMines++
            }   
            
        }
        
}


function setMinesNegsCount(mat, cellI, cellJ) {
    for (var i = 0; i < mat.length; i++) {
        for (var j = 0; j < mat[0].length; j++) {
            var cellI = i
            var cellJ = j
            var bombCount = 0
            for (var x = cellI - 1; x <= cellI + 1; x++) {
                if (x < 0 || x >= gBoard.length) continue
                for (var y = cellJ - 1; y <= cellJ + 1; y++) {
                    if (x === cellI && y === cellJ) continue
                    if (y < 0 || y >= gBoard[0].length) continue
                    if (gBoard[x][y].isMine === true) bombCount++
                }
            }
            gBoard[i][j].minesAroundCount = bombCount
        }
    }
    return bombCount
}

function checkMinesNegs(){
    for(var i =0;i<gBoard.length;i++){
        for(var j = 0;j<gBoard[i].length;j++){
            setMinesNegsCount(gBoard,i,j)
        }
    }
}

function cellClicked(elCell, i, j) {
    if(gGame.gameOver = true) return
    gGame.lives = 3
    console.log(elCell);
    console.log(i);
 
    gBoard[i][j].isShown=true
    if(!gGame.isOn){
        gGame.isOn = true
        getRandomMines()
        checkMinesNegs()
        console.log(gBoard);
    }
    gGame.isOn = true
    if(!gBoard[i][j].isMine){
        getCellImg(i,j)
        gameOver()
    }else if(gLevel.MINES){
        gGame.isOn = false
        gameOver()
        
    }renderBoard(gBoard)
}


function getCellImg(i,j){
    var cell = gBoard[i][j]
    if(!cell.isShown) return `<img class="cellImg" src="./imegs/cell.jpeg"/>`
    if(cell.isShown&&cell.isMine)return `<img class="cellImg" src="./imegs/mine.jpeg"/>`
    if(cell.isShown&&cell.minesAroundCount===0)return `<img class="cellImg" src="./imegs/empty.jpeg"/>`
    if(cell.isShown&&cell.minesAroundCount===1)return `<img class="cellImg" src="./imegs/one.jpeg"/>`
    if(cell.isShown&&cell.minesAroundCount===2)return `<img class="cellImg" src="./imegs/two.jpeg"/>`
    if(cell.isShown&&cell.minesAroundCount===3)return `<img class="cellImg" src="./imegs/three.jpeg"/>`
    if(cell.isShown&&cell.minesAroundCount===4)return `<img class="cellImg" src="./imegs/four.jpeg"/>`
    

}
function setFlag(i,j,eve){
    if(gGame.gameOver = true) return
        console.log(elCell);
        console.log(i);
     
     gBoard[i][j].isShown=false
        if(!gGame.isOn){
            gGame.isOn = true
            getRandomMines()
            checkMinesNegs()
            console.log(gBoard);
        }
        gGame.isOn = false
        if(!gBoard[i][j].isMine){
            getCellImg(i,j)
            gameOver()
        }else if(gLevel.MINES){
            gGame.isOn = true
            gameOver()
            
        }renderBoard(gBoard)
    
}


// function gameOver(){
//     if(gGame.shownCount === gLevel.SIZE * gLevel.SIZE){
//         gGame.gameOver = true
//         alert('Game Over');
//       }

// }

function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1) + min)
}

