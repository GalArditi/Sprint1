
const BUMB = '💣'
const FLAG = '🇮🇱'
const EMPTY = ' '

var gLevel = { 
    SIZE: 4,
    MINES: 2 
}
var gGame = {
    isOn: false,
    shownCount: 0, markedCount: 0, secsPassed: 0
 }


var gBoard
var gGameInterval
var gNums 




function onInit(){
    gBoard = createBoard()
    renderBoard(gBoard)
    getRandomMines()
}

function createBoard() {
   var board = []
    for (var i = 0; i < gLevel.SIZE; i++) {
       var newline = []
      for (var j = 0; j < gLevel.SIZE; j++) {
        var cell = { minesAroundCount: 4, isShown: false, isMine: false, isMarked: true }
        newline.push(cell)
      } board.push(newline)
    //   console.log(board);
    }
    // board[0][1] = {isShown: true, isMine: true };
    // board[3][3] = {isShown: true, isMine: true };

    return board
  }

  function renderBoard(board) {
    // console.log(board);
        const elBoard = document.querySelector('.board')
        var strHTML = ''
        for (var i = 0; i < board.length; i++) {
            strHTML += '<tr>\n'
            for (var j = 0; j < board[0].length; j++) {
                 var currCell = board[i][j]
                var cellClass = getClassName({ i: i, j: j })
                
    
                strHTML += `\t<td class="cell ${cellClass}"  onclick="moveTo(${i},${j})" >\n`
    
                if (board[i][j].isMine === false) {
                    strHTML += EMPTY
                } else if (board[i][j].isMine === true) {
                    strHTML += BUMB
                }
    
                strHTML += '\t</td>\n'
            }
            strHTML += '</tr>\n'
        }
    
        elBoard.innerHTML = strHTML
        console.log(gBoard);
    }
    function getClassName(location) {
        const cellClass = 'cell-' + location.i + '-' + location.j
        return cellClass
    }    
    getRandomMines()
    function getRandomMines(){
        var counterMines = 0
        while(counterMines < gLevel.MINES){
            var i = getRandomInt(0,gLevel.SIZE - 1)
            var j = getRandomInt(0,gLevel.SIZE - 1)
            if(gBoard[i][j].isShown === false && gBoard[i][j].isMine === false){
                 gBoard[i][j].isMine = true
                 gBoard[i][j].isShown = true
            }   
            counterMines++
        }
         renderBoard(gBoard)
     }


  function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1) + min)
}