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
    let circle3 = document.getElementById('circle3');
    let circle4 = document.getElementById('circle4');

    setTimeout(function(){ 
      circle3.classList.add('hidden');
      circle4.classList.remove('hidden');
    }, 3000);

    setTimeout(function(){ 
      console.log("valueDonut",donutVal)
      rootElement.style.setProperty("--donut-value-medicion", donutVal);
    }, 1000);
  }

}
