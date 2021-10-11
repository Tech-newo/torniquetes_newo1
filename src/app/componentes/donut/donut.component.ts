import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-donut',
  templateUrl: './donut.component.html',
  styleUrls: ['./donut.component.scss'],
})
export class DonutComponent implements OnInit {
  
  @Input() mensaje:any="";
  @Input() img:any="";
  
  constructor() { }

  ngOnInit() {
    let rootElement = document.documentElement;
    rootElement.style.setProperty("--donut-value-medicion", '0');  
  }

}
