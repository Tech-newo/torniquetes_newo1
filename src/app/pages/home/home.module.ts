import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentesModule } from 'src/app/componentes/componentes.module';
import { UserRouteAccessService } from 'src/app/services/auth/user-route-access.service';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    data: {
      authorities: ['ROLE_USER']
    },
    canActivate: [UserRouteAccessService]
  }
];

@NgModule({
  imports: [
    IonicModule, 
    CommonModule, 
    FormsModule, 
    TranslateModule, 
    ComponentesModule,
    RouterModule.forChild(routes)],
  declarations: [HomePage]
})
export class HomePageModule {}
