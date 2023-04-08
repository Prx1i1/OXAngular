import { Component, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { PlayCellComponent } from './play-cell/play-cell.component';
import { PlayFieldComponent } from './play-field/play-field.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'firstApp';

  playerMove: string = "true";

  @ViewChild(PlayFieldComponent) field!: PlayFieldComponent;
  @ViewChildren(PlayCellComponent) cellsQuery!: QueryList<PlayCellComponent>

  args : String[] = []

  addItem(newItem: String[]) {
    this.args = newItem
    console.log("args", this.args)
    if(this.playerMove == "true" || true){
      this.markTile(Number(this.args[0]), Number(this.args[1]), Number(this.args[2]))
      this.playerMove = "false";
    }
  }

  sendChildren(){

  }

  playerSymbol: String = "X"; //base X

  tilesArray: number[][] = []

  constructor(){
    this.tilesArray = Array(15).fill(0).map(e => Array(15).fill(0))
    //console.log(this.tilesArray) // return full array
  }

  public markTile = (x: number, y: number, usedSymbolNumber: number): void => {
    this.tilesArray[y][x] = /* usedSymbolNumber */  1
    console.log("Tile Marked")
    console.log("Full array: ", this.tilesArray)

    //trigger win check

    //trigger bot action
    this.botMove()

    //trigger bot win check

  }
  
  public checkWin = () => {

  }

  public botMove = () => {
    let contestedMoves = 4
    while(true){
    let possibleMovesArray: number[][] = this.getMovesBot(contestedMoves); //base 4
    if (possibleMovesArray.length > 0){
      this.makeMove(possibleMovesArray[Math.floor(Math.random() * (possibleMovesArray.length - 1))])
      possibleMovesArray = []
      console.log("Chosen move of simplicity:", contestedMoves)
      return
    }else{
      contestedMoves -= 1
    }
    
    }

  }

  public getRandomMove = () : number[]=> {
    let moveProposal : number[] = [Math.floor(Math.random() * (14)), Math.floor(Math.random() * (14))]
    if (this.tilesArray[moveProposal[0]][moveProposal[1]] != 0){
      this.getRandomMove();
    }else{
      return moveProposal;
    }
    return [0, 2137]
  }

  //bot is moving
  public makeMove = (args: number[]) => {
    this.tilesArray[args[0]][args[1]] = /* usedSymbolNumber */  2 //bot number

    this.field.setBotSymbols(args[0], args[1])

    console.log("Tile Marked")
    console.log("Full array: ", this.tilesArray)

    this.playerMove = "true";

  }

  public getMovesBot = (tileLimiter: number) : number[][] => {
    let tileCounter: number = 0;
    let tileCounterMirror: number = 0;
    let tileCoords: number[][] = [];


    //checking rows
    this.tilesArray.map((row, m) => {
      row.map((cell, n) => {
        if(cell == 1){
          tileCounter += 1
        }else{
          if(tileCounter >= tileLimiter){
            try{
            if(this.tilesArray[m][n] == 0){
              tileCoords.push([m, n])
            }
            if(this.tilesArray[m][n - (tileCounter +1)] == 0){
              tileCoords.push([m, n - (tileCounter +1)])
            }
            }catch{}
          }
          tileCounter = 0
        }
        //counter at 3

      })
    })

    tileCounter = 0
    //checking columns
    this.tilesArray[0].map((row, m) => {
      this.tilesArray.map((cell, n) => {
        if(cell[m] == 1){
          tileCounter += 1
        }else{
          if(tileCounter >= tileLimiter){
            try{
            if(this.tilesArray[n][m] == 0){
              tileCoords.push([n, m])
            }
            if(this.tilesArray[(n - (tileCounter +1))][m] == 0){
              tileCoords.push([n - (tileCounter +1), m])
            }
            // tileCoords.push([n, m], [n, m - (tileCounter + 1)]) // tiles: _xxx_
            }catch{}
          }
          tileCounter = 0
        }
        //counter at 3

      })
    })

    //skos
    //x__
    //_x_
    //__x

    tileCounter = 0
    tileCounterMirror = 0

    this.tilesArray.map((row, m) => {
      row.map((temp, n) => {
        try{
        let cell = this.tilesArray[m + n][n]
        
        //base
        if(cell == 1){
          tileCounter += 1
        }else{
          if(tileCounter >= tileLimiter){
            try{
            if(this.tilesArray[m + n][n] == 0){
              tileCoords.push([m + n, n])
            }
            if(this.tilesArray[m + n - (tileCounter + 1)][n - (tileCounter + 1)] == 0){
              tileCoords.push([n - (tileCounter + 1) + m, n - (tileCounter + 1)])
            }
            //console.log("normal")
            // tileCoords.push([n, m], [n, m - (tileCounter + 1)]) // tiles: _xxx_
            }catch{}
          }
          tileCounter = 0
        }
        //counter at 3
      }catch{
        //console.log("oob base")
      }
      try{
        //mirror
        let cellMirror = this.tilesArray[n][m + n]

        if(cellMirror == 1){
          tileCounterMirror += 1
        }else{
          if(tileCounterMirror >= tileLimiter){
            try{
            if(this.tilesArray[n][m + n] == 0){
              tileCoords.push([n, m + n])
            }
            if(this.tilesArray[n - (tileCounterMirror + 1)][m + n - (tileCounterMirror + 1)] == 0){
              tileCoords.push([n - (tileCounterMirror + 1), n - (tileCounterMirror + 1) + m])
            }
            // tileCoords.push([n, m], [n, m - (tileCounter + 1)]) // tiles: _xxx_
            }catch{}
          }
          tileCounterMirror = 0
        }
        //counter at 3
      }catch{
       // console.log("out of bounds")
      }

      })
    })

    //skos
    //__x
    //_x_
    //x__

    tileCounter = 0
    tileCounterMirror = 0

    this.tilesArray.map((row, m) => {
      row.map((temp, n) => {
        try{
        let cell = this.tilesArray[14 - (m + n)][n]
        
        //base
        if(cell == 1){
          tileCounter += 1
        }else{
          if(tileCounter >= tileLimiter){
            try{
            if(this.tilesArray[14 - (m + n)][n] == 0){
              tileCoords.push([14 - (m + n), n])
            }
            if(this.tilesArray[14 - (m + n) - (tileCounter + 1)][n - (tileCounter + 1)] == 0){
              tileCoords.push([14 - (m + n) - (tileCounter + 1), n - (tileCounter + 1)])
            }
            // tileCoords.push([n, m], [n, m - (tileCounter + 1)]) // tiles: _xxx_
            }catch{}
          }
          tileCounter = 0
        }
        //counter at 3
      }catch{
        //console.log("oob base")
      }
      try{
        //mirror
        let cellMirror = this.tilesArray[n][14 - (m + n)]

        if(cellMirror == 1){
          tileCounterMirror += 1
        }else{
          if(tileCounterMirror >= tileLimiter){
            try{
            if(this.tilesArray[n][14 - (m + n)] == 0){
              tileCoords.push([n, 14 - (m + n)])
            }
            if(this.tilesArray[n - (tileCounterMirror + 1)][14 - (m + n) - (tileCounterMirror + 1)] == 0){
              tileCoords.push([n - (tileCounterMirror + 1), 14 - (m + n) - (tileCounterMirror + 1)])
            }
            // tileCoords.push([n, m], [n, m - (tileCounter + 1)]) // tiles: _xxx_
            }catch{}
          }
          tileCounterMirror = 0
        }
        //counter at 3
      }catch{
       // console.log("out of bounds")
      }

      })
    })
    
    //todo

    console.log("countering tiles",tileCoords)

    return tileCoords;
  }

  tileMarkRef = this.markTile;

}  
