import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, NavController, ToastController } from '@ionic/angular';
import { SedesService } from 'src/app/services/sedes/sedes.service';
import { LoginService } from '../../services/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage  {
  account: { username: string; password: string; rememberMe: boolean } = {
    username: 'sarango@newo.co',
    password: 'Santiago3101.',
    rememberMe: false
  };
  isLogin: boolean = false;
  sedes: any ;
  handlerMessage: string;
  selected: any = 0;


  constructor(
    public loginService: LoginService,
    public toastController: ToastController,
    public navController: NavController,
    public sedesService: SedesService, 
    private loadingController: LoadingController 
    ) { }

  async login() {
    if (this.account.username && this.account.password){
      try {
        const response = await this.loginService.login(this.account)
        if (response){
          sessionStorage.setItem('account', JSON.stringify(response))
          this.presentToast('Successful authentication') 
          this.isLogin = true
          await this.searchSedes()
        }
      } catch (error) {
        this.presentToast(error.error.detail) 
      }
    } else {
      this.presentToast('Username and password are required')
    }
  }

  async searchSedes(){
    const loading = await this.loadingController.create({
      duration: 2000,
    });
    await loading.present();
     this.sedesService.query().subscribe({
      next: response => {
        this.sedes = response.body;
        console.log(this.sedes)
      },
      error: error => {
        console.log(error)
      },
    });
  }

  sedeSelected(value) {
    this.selected = value.id
    sessionStorage.setItem('sede',JSON.stringify(value))
  }

  goHome(){
    if (this.selected !== 0) {
      this.navController.navigateRoot('/tabs/home')
    } else {
      this.presentToast('Seleccione una sede para continuar')
    }
  }


  async presentToast(message) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color: 'dark',
      position: 'top'
    });
    toast.present();
  }

}
