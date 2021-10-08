import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DonutComponent } from './donut/donut.component';



@NgModule({
  declarations: [
    DonutComponent
  ],
  exports: [
    DonutComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ComponentesModule { }
