import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { SedesService } from 'src/app/services/sedes/sedes.service';
import { LoginService } from '../../services/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  // The account fields for the login form.
  account: { username: string; password: string; rememberMe: boolean } = {
    username: '',
    password: '',
    rememberMe: false
  };
  auxSede: string = ''
  sedeSelect: string = ''
  typeSelect: string = ''
  public static sede: string
  
  // Our translated text strings
  private loginErrorString: string;
  public static intervalLog: any;
  sedes:any = undefined
  handlerMessage = '';
  statusLogin: boolean = false;

  constructor(
    public translateService: TranslateService,
    public loginService: LoginService,
    public toastController: ToastController,
    public navController: NavController,
    public sedesService: SedesService,
    private alertController: AlertController
    ) { }

  ngOnInit() {
    this.translateService.get('LOGIN_ERROR').subscribe(value => {
      this.loginErrorString = value;
    });
  }
  
  ionViewDidEnter(){
    setTimeout(() => {
      document.getElementsByName('username')[0]['value'] = "admin";
      document.getElementsByName('password')[0]['value'] = "Gpsglobal2014";
      setTimeout(() => {
        this.doLogin()
      }, 500);
      // document.getElementsByName('auxSede')[0]['value'] = "1502,0";
    }, 1000);
  }

  searchSedes(){
    this.sedesService.query().subscribe(
      success=>{
        this.sedes = success.body;
        console.log(this.sedes)
      },error=>{
        console.error("error",error);
      }
    )
  }

  
  async doLogin() {
      this.loginService.login(this.account).then(
        () => {
          this.searchSedes()
        },
        err => {
          console.log("err_loginService",err)
        }
      );
  }

  changeSede(event){
    console.log("event",event)
  }

  async selectOptions(){
    if(this.sedeSelect === ''){
      this.alerts('Selecciona la sede.')
    }
    else if(this.typeSelect === ''){
      this.alerts('Selecciona el tipo de torniquete.')
    }else{
      LoginPage.sede = this.auxSede
      this.statusLogin = true
      // this.navController.navigateRoot('/tabs')
    }
  }

  clickCard(type){
    if(type == 'qr'){
      this.navController.navigateRoot('/tabs')
    }else{
      this.alerts('¡Modulo en desarrollo!')
    }
  }

  async alerts(message:any){
    const alert = await this.alertController.create({
      header: message,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            this.handlerMessage = 'Alert canceled';
          },
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            this.handlerMessage = 'Alert confirmed';
          },
        },
      ],
    });

    await alert.present();
  }
}
