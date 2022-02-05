const canvas = document.getElementById("tetris");
const ctx = canvas.getContext("2d");

const scoreElement = document.getElementById("score");
const levelElem = document.getElementById("level");
const startBtn = document.getElementById("start");
const pauseBtn = document.getElementById("pause");
const gameOver = document.getElementById("game-over");

const row = 20;  //строки
const col = 10; //колонки
const squareSize = 20; //размер квадрата
const probel = "black"; // цвет пустого квадрата

///***доп окно***\\\
const nextcanvas = document.getElementById("nextcanvas");
const nextСtx = nextcanvas.getContext("2d");
const squareSizeNext = 10; //размер квадрата
const rowN = 5;  //строки
const colN = 5; //колонки

/*
const probel=ctx.createLinearGradient(0,150,50,0);
probel.addColorStop(0,"black");
//probel.addColorStop(0.1,"grey");
probel.addColorStop(0, "black");
probel.addColorStop(0.5, "black");
probel.addColorStop(0, "black");
probel.addColorStop(1,"grey");
ctx.fillStyle=probel;
ctx.fillRect(20,20,150,100);
*/

/* квадраты надо ли
for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
        ctx.fillStyle = `rgb(
        ${Math.floor(255 - 42.5 * i)},
        ${Math.floor(255 - 42.5 * j)},
        0)`;
        ctx.fillRect(j * 25, i * 25, 25, 25);
    }
}
*/

// создание квадрата
function draw(x,y,color){
    ctx.fillStyle = color;
    ctx.fillRect(x*squareSize,y*squareSize,squareSize,squareSize);
    ctx.strokeRect(x*squareSize,y*squareSize,squareSize,squareSize);
}

// создание квадрата  **** доп окно ****
function drawNext(x,y,color){
    nextСtx.fillStyle = color;
    nextСtx.fillRect(x*squareSizeNext,y*squareSizeNext,squareSizeNext,squareSizeNext);
    nextСtx.strokeRect(x*squareSizeNext,y*squareSizeNext,squareSizeNext,squareSizeNext);
}

//создание поля
let board = [];
for( r = 0; r <row; r++){
    board[r] = [];
    for(c = 0; c < col; c++){
        board[r][c] = probel;
    }
}

//создание поля  **** доп окно ****
let boardNext = [];
for( r = 0; r <rowN; r++){
    boardNext[r] = [];
    for(c = 0; c < colN; c++){
        boardNext[r][c] = probel;
    }
}

// отрисовка поля через canvas
function drawBoard(){
    for( r = 0; r <row; r++){
        for(c = 0; c < col; c++){
            draw(c,r,board[r][c]); //рисуем квадрат
        }
    }
}
drawBoard();

// отрисовка поля через canvas  **** доп окно ****
function drawBoardNext(){
    for( r = 0; r <rowN; r++){
        for(c = 0; c < colN; c++){
            drawNext(c,r,boardNext[r][c]); //рисуем квадрат
        }
    }
}
drawBoardNext()

//

let possibleFigures = [
    [Z, "red" ],
    [S,"green"],
    [T,"yellow"],
    [O,"blue"],
    [L,"purple"],
    [I,"cyan"],
    [J,"orange"],
    [D,"#ff00f2"],
    [Q,"#e16e01"],
    [W,"#09b5f1"],
    [E,"#000bf9"],
    [R,"#00bbff"],
    [P,"#a603f3"],
    [U,"#71f901"],
    [A,"#ff009c"],
    [F,"#fbfbfb"],
    [G,"#e9fb72"],
    [H,"#787bf4"],
];
///***********переписать**********\\\\\\\
    function random() {
        const figures = "IOLJTSZHGFAUPREWQD";
        const rand = Math.floor(Math.random() * possibleFigures.length ); //0--16
        const nextСtx = possibleFigures[figures[rand]];



        //return new Piece Math.floor(( 10 - nextСtx [0].lengh) / 2);
       return new Piece(possibleFigures[rand][0], possibleFigures[rand][1]);
    }

let p = random();

  /*  return new Piece(possibleFigures[r][0],possibleFigures[r][1]);
}
*/

/*function rand(){
    let r = randomN = Math.floor(Math.random() * possibleFigures.length) //
    return new Piece( possibleFigures[r][0],possibleFigures[r][1]);
}

let p = rand();
*/

// фигуры
function Piece(tetromino,color){
    this.tetromino = tetromino;
    this.color = color;

    this.tetrominoN = 0; //  начинаем с первой
    this.activeTetromino = this.tetromino[this.tetrominoN];

    // расположение фигуры
    this.x =3;
    this.y = -2;
}

// заполнение
Piece.prototype.fill = function(color){
    for( r = 0; r < this.activeTetromino.length; r++){
        for(c = 0; c < this.activeTetromino.length; c++){
            //  рисуем только занятые (цветные) квадраты
            if( this.activeTetromino[r][c]){
                draw(this.x + c,this.y + r, color);
            }
        }
    }
}

// отрисовка фигуры на доске
Piece.prototype.draw = function(){
    this.fill(this.color);
}

// отрисовка фигуры на доске *************
Piece.prototype.drawNext = function(){
    this.fill(this.color);
}

//
Piece.prototype.unDraw = function(){
    this.fill(probel);
}

// падение вниз
Piece.prototype.moveDown = function moveTetroDown(){
    if(!this.collision(0,1,this.activeTetromino)){
        this.unDraw();
        this.y++;
        this.drawNext(); //новое положение фигуры отрисовка
    }else{
        // фиксация и генерация новой фигуры
        this.lock();
        p = random();

    }
}


/*
// ускоренное падение вниз на 32  **** ПЕРЕСМОТРЕТЬ ЗАКОНЧИТЬ****
Piece.prototype.dropTetro = function dropTetro(){
    if(!this.collision(0,1,this.activeTetromino)){
        this.activeTetromino. y +=1;
        if (-----)){
    activeTetromino. y -=1;
    break;
        }
        this.unDraw();
        //this.y++;
        //this.draw(); //новое положение фигуры отрисовка
    }
}
*/


// перемещение фигуры вправо
Piece.prototype.moveRight = function(){
    if(!this.collision(1,0,this.activeTetromino)){
        this.unDraw();
        this.x++;
        this.draw();
    }
}

//перемещение фигуры влево
Piece.prototype.moveLeft = function(){
    if(!this.collision(-1,0,this.activeTetromino)){
        this.unDraw();
        this.x--;
        this.draw();
    }
}

// поворот фигуры
Piece.prototype.rotate = function(){
    let nextPattern = this.tetromino[(this.tetrominoN + 1)%this.tetromino.length];
    let kick = 0;

    if(this.collision(0,0,nextPattern)){
        if(this.x > col/2){
            kick = -1;
        }else{
            kick = 1;
        }
    }

    if(!this.collision(kick,0,nextPattern)){
        this.unDraw();
        this.x += kick;
        this.tetrominoN = (this.tetrominoN + 1)%this.tetromino.length;
        this.activeTetromino = this.tetromino[this.tetrominoN];
        this.draw();
    }
}

Piece.prototype.lock = function() {
    for (r = 0; r < this.activeTetromino.length; r++) {
        for (c = 0; c < this.activeTetromino.length; c++) {
            // пропуск свободных квадратов
            if (!this.activeTetromino[r][c]) {
                continue;
            }
            // game over
            if (this.y + r < 0) {
                gameOver.style.display = "block";
                // остановка анимации
                gameOver = true;
                break;
            }
            // фиксация фигуры
            board[this.y + r][this.x + c] = this.color;
        }
    }
    // удаление заполненных строк
    for (r = 0; r < row; r++) {
        let isRowFull = true;
        filledLines = 0;
        for (c = 0; c < col; c++) { //перебор столбцов
            isRowFull = isRowFull && (board[r][c] != probel);
        }

        if (isRowFull) {
            // если строка заполнена
            // переносим все строки над ней вниз
            for (y = r; y > 1; y--) {
                for (c = 0; c < col; c++) {
                    board[y][c] = board[y - 1][c];
                }
            }
            score += 100;
        }
/*
       switch (row) {
                case 1:
                    score += possibleLevels[currentLevel].score;
                    break;
                case 2:
                    score += possibleLevels[currentLevel].score * 5;
                    break;
                case 3:
                    score += possibleLevels[currentLevel].score * 10;
                    break;
                case 4:
                    score += possibleLevels[currentLevel].score * 20;
                    break;
            }
*/
            scoreElement.innerHTML = score;
            if (score >= possibleLevels[currentLevel].nextLevelScore) {
                currentLevel++;
                levelElem.innerHTML = currentLevel;
            }
        }

    // обновление доски
    drawBoard();
}


let score=0;
let currentLevel = 1;
let possibleLevels = {
    1: {
        score: 5,
        speed: 700,
        nextLevelScore: 1000,
    },
    2: {
        score: 15,
        speed: 300,
        nextLevelScore: 1500,
    },
    3: {
        score: 20,
        speed: 200,
        nextLevelScore: 2500,
    },
    4: {
        score: 30,
        speed: 100,
        nextLevelScore: 5000,
    },
    5: {
        score: 50,
        speed: 50,
        nextLevelScore: Infinity,
    }
};


// столкновение c краями поля
Piece.prototype.collision = function(x,y,piece){
    for( r = 0; r < piece.length; r++){
        for(c = 0; c < piece.length; c++){
            // является ли квадрат свободным
            if(!piece[r][c]){
                continue;
            }
            // кординаты фигур после движения
            let newX = this.x + c + x;
            let newY = this.y + r + y;
            // условия
            if(newX < 0 || newX >= col || newY >= row){
                return true;
            }
            if(newY < 0){
                continue;
            }
            // если ли зафиксированная фигура на доске
            if( board[newY][newX] != probel){
                return true;
            }
        }
    }
    return false;
}

// кнопки передвижения
document.addEventListener("keydown",controlB);
function controlB(e) {
    if (!isPaused) {
        if (e.keyCode == 37) {//стрелка влево
            p.moveLeft();
            dropStart = Date.now();
        } else if (e.keyCode == 38) {//стрелка вверх
            p.rotate();
            dropStart = Date.now();
        } else if (e.keyCode == 39) { //стрелка вправо
            p.moveRight();
            dropStart = Date.now();
        } else if (e.keyCode == 40) {//стрелка вниз
            p.moveDown();
        }
        else if (e.keyCode === 32) { //падение фигуры  - пробел
             p.dropTetro();
        }
    }
}

// старт \ пауза
function drop() {
    pauseBtn.addEventListener("click", (e) => {
        if (e.target.innerHTML === "Pause") {
            e.target.innerHTML = "Play";
            clearTimeout(gameTimerID);
        } else {
            e.target.innerHTML = "Pause";
            gameTimerID = setTimeout(startGame, possibleLevels[currentLevel].speed);
        }
        isPaused = !isPaused;
    });

    startBtn.addEventListener("click", (e) => {
        e.target.innerHTML = "Start";
        isPaused = false;
        gameTimerID = setTimeout(startGame, possibleLevels[currentLevel].speed);
        gameOver.style.display = "none";
    });
}
drop();

function startGame() {
    if (!isPaused) {
        p.moveDown();
        gameTimerID = setTimeout(startGame, possibleLevels[currentLevel].speed);
    }
}

