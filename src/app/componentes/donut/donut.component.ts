import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-donut',
  templateUrl: './donut.component.html',
  styleUrls: ['./donut.component.scss'],
})
export class DonutComponent implements OnInit {
  
  @Input() mensaje:any="";
  
  constructor() { }

  ngOnInit() {
    let rootElement = document.documentElement;
    rootElement.style.setProperty("--donut-value-medicion", '0');

    const donutVal = "100";
    setTimeout(function(){ 
      console.log("valueDonut",donutVal)
      rootElement.style.setProperty("--donut-value-medicion", donutVal);
    }, 1000);
  }

}
