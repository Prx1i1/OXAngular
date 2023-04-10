import { Component, Inject, Input, OnInit, Output, EventEmitter, ViewChildren, QueryList } from '@angular/core';
import {PlayCellComponent} from "../play-cell/play-cell.component"

@Component({
  selector: 'app-play-field',
  templateUrl: './play-field.component.html',
  styleUrls: ['./play-field.component.sass']
})

export class PlayFieldComponent extends HTMLElement implements OnInit {

  @Input() generateX: string = "0";
  @Input() generateY: string = "0";
  cellsX: number[] = [];
  cellsY: number[] = [];

  @Input() playerMove: string = "true";
  
  @Input() tileMarkRef: string = "";

  @Output() newItemEvent = new EventEmitter<String[]>() 

  @Output() childrenSender = new EventEmitter<PlayCellComponent[]>()   

  @ViewChildren(PlayCellComponent) cellsQuery!: QueryList<PlayCellComponent>

  args: String[] = []

  constructor() {
    super()
   }

  public setHighlights = (moves: number[][]) => {

    moves.map(element => {
      this.cellsQuery.map(cell => {
      if(cell.posX == String(element[0]) && cell.posY == String(element[1])){
        //cell.backgroundColor = "red";
        //cell.cellText = String(element[2]);
      }
    })
    })


  }

  public setBotSymbols = (y:number, x:number) => {
    console.log("bot is setting tile")
    this.cellsQuery.map(cell => {
      if(cell.posY == String(x) && cell.posX == String(y)){
        cell.cellText = "O"
      }
    })
  }
  

  ngOnInit(): void {
    this.cellsX = Array(15).fill(0).map((x, i) => {i}) as unknown as number[]
    this.cellsY = Array(15).fill(0).map((x, i) => {i}) as unknown as number[]

  }

  addItem(newItem: String[]) {
    this.args = newItem
    this.addNewItem(this.args)
  }

  sendChildren(data: QueryList<PlayCellComponent>){
    this.childrenSender.emit(this.cellsQuery.toArray())
  }

  addNewItem(value: String[]) {
    this.newItemEvent.emit(value);
  }

}
window.customElements.define('app-play-field', PlayFieldComponent);
