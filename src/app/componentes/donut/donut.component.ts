import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-donut',
  templateUrl: './donut.component.html',
  styleUrls: ['./donut.component.scss'],
})
export class DonutComponent implements OnInit {
  
  @Input() mensaje:any="";
  
  constructor() { }

  ngOnInit() {}

}
