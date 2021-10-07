import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
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
  public static sede: string

  // Our translated text strings
  private loginErrorString: string;

  constructor(
    public translateService: TranslateService,
    public loginService: LoginService,
    public toastController: ToastController,
    public navController: NavController
  ) { }

  ngOnInit() {
    this.translateService.get('LOGIN_ERROR').subscribe(value => {
      this.loginErrorString = value;
    });
  }

  async doLogin() {
    const toast = await this.toastController.create({
      message: this.loginErrorString,
      duration: 3000,
      position: 'top'
    });
    LoginPage.sede = this.auxSede
    if (LoginPage.sede.length > 0) {
      this.loginService.login(this.account).then(
        () => {
          this.navController.navigateRoot('/tabs');
        },
        err => {
          // Unable to log in
          this.account.password = '';
          this.auxSede = '';
          toast.present();
        }
      );
    } else {
      this.account.password = '';
      this.auxSede = '';
      toast.present();
    }

  }
}
