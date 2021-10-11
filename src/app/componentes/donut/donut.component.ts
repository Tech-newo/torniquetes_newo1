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

    // setTimeout(function(){ 
    // const donutVal = "25";
    // console.log("valueDonut",donutVal)
    //   rootElement.style.setProperty("--donut-value-medicion", donutVal);
    // }, 1000);
    
    // setTimeout(function(){ 
    // const donutVal = "35";
    // console.log("valueDonut",donutVal)
    //   rootElement.style.setProperty("--donut-value-medicion", donutVal);
    // }, 2000);

    //  setTimeout(function(){ 
    //  const donutVal = "65";
    //  console.log("valueDonut",donutVal)
    //     rootElement.style.setProperty("--donut-value-medicion", donutVal);
    //  }, 3000);

    // setTimeout(function(){ 
    // const donutVal = "75";
    // console.log("valueDonut",donutVal)
    //   rootElement.style.setProperty("--donut-value-medicion", donutVal);
    // }, 4000);

    // setTimeout(function(){ 
    // const donutVal = "100";
    // console.log("valueDonut",donutVal)
    //   rootElement.style.setProperty("--donut-value-medicion", donutVal);
    // }, 5000);

    
  }

}
