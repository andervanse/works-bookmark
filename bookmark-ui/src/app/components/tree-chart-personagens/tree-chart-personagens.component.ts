import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-tree-chart-personagens',
  
  templateUrl:'./tree-chart-personagens.component.html' ,
  styleUrls: ['./tree-chart-personagens.component.css']
})
export class TreeChartPersonagensComponent implements OnInit {

  dataset : {};

  constructor() { }

  ngOnInit() {
    this.dataset = {
      json: [
      ],
      config: {
        nodeWidth: 150,
        nodeHeight: 100
      }
    }
  }
}
