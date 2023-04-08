import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-play-cell',
  templateUrl: './play-cell.component.html',
  styleUrls: ['./play-cell.component.sass']
})
export class PlayCellComponent implements OnInit  {

  //def current symbol and get it from parent

  @Output() newItemEvent = new EventEmitter<String[]>() 

  cellText: String = "";
  backgroundColor: String = "white";

  @Input() posX: String = "a";
  @Input() posY: String = "b";

  @Input() tileMarkRef: string = '';
  tileMark : Function = function(){};

  @Input() playerMove: string = "true";


  constructor() { 
    this.tileMark = Function(this.tileMarkRef)
    
  }

  ngOnInit(): void {
    this.tileMark= Function(this.tileMarkRef)
    //console.log(console.log("cell", this.tileMark, this.tileMarkRef))
  }

  onClick(): void{
    console.log("pressed", this.playerMove)
    //this.tileMark(this.posY, this.posX, 2137); //debug 2137

    if(this.playerMove == "true" || true){
      if(this.cellText == ""){
        this.addNewItem([this.posY, this.posX, "X"]) //debug X
        this.cellText = "X"
      }

    }

  }

  addNewItem(value: String[]) {
    this.newItemEvent.emit(value);
  }

}
