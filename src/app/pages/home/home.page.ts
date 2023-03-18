import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { EntradaInvitados } from 'src/app/services/entradaInvitados/entrada-invitados.model';
import { EntradaInvitadosService } from 'src/app/services/entradaInvitados/entrada-invitados.service';
import { EntradaMiembros } from 'src/app/services/entradaMiembros/entrada-miembors.model';
import { EntradaMiembrosService } from 'src/app/services/entradaMiembros/entrada-miembros.service';
import { InvitacionService } from 'src/app/services/invitacion/invitacion.service';
import { InvitadosService } from 'src/app/services/invitados/invitados.service';
import { MiembrosService } from 'src/app/services/miembros/miembros.service';
import { SedesService } from 'src/app/services/sedes/sedes.service';
import { Account } from 'src/model/account.model';
import { LoginPage } from '../login/login.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage  {
  account: Account;
  codigoQR: any = ''
  identificadorTorniquete: any = LoginPage.SEDE
  pin_input: any = LoginPage.PIN_INPUT
  pin_output: any = LoginPage.PIN_OUTPUT
  sedeTorniquete: any = []
  mensaje: any = "Escanea tu QR en el lector"
  img: any = ""
  lastId:any = undefined
  newId:any = undefined
  codeSend:any
  constructor(
    public navController: NavController,
    public sedesService: SedesService,
    public miembrosService: MiembrosService,
    public invitadosService: InvitadosService,
    public entradaMiembrosService: EntradaMiembrosService,
    public entradaInvitadosService: EntradaInvitadosService,
    public invitacionService: InvitacionService,
    private http: HttpClient,
  ) { }

  ionViewDidEnter() {
    console.log("sede",localStorage.getItem('sede'))
    console.log("pin_out",localStorage.getItem('pin_out'))
    console.log("pin_out",localStorage.getItem('pin_out'))

    document.getElementById('qrCodeInput')
      ? document.getElementById('qrCodeInput').focus()
      : null;
  
  }

  keypress(event){
    if(event.key=="Enter"){
      const code = this.codigoQR.split(',')
      const codeReset = code[0]+code[1]+code[2]
      codeReset === '666' ? this.resetAll() : null;

      this.codeSend = {}
      this.codeSend.typeRegister = code[0] //entrada 0 salida 1
      this.codeSend.typeUser = code[1] //usuario 1 invitado 2
      this.codeSend.iduser = code[2] //id_usuario / id_invitado 2
      this.codeSend.sede = localStorage.getItem('sede'); //sede
      this.codeSend.dateRegister = new Date(); //fecha registro
      (this.codeSend.typeRegister === '0' || this.codeSend.typeRegister === '1')
        ? this.processCode(this.codeSend)
        : this.resetDonut()
    }
  }

  autofocus(){
    setTimeout(() => {
      document.getElementById('code').focus();
    }, 500);

    setTimeout(() => {
      document.getElementById('qrCodeInput').focus()
    }, 1000);
  }

   processCode(code){
    console.log('processCode',code)
    this.loadDonut()
  }

  resetAll(){
    localStorage.setItem('sede','')
    localStorage.setItem('pin_out','')
    localStorage.setItem('pin_out','')
    this.navController.navigateRoot('/')
  }
















  /* Controladores de vista */

  loadDonutError(status: boolean) {
    let rootElement = document.documentElement;
    rootElement.style.setProperty("--donut-value-medicion", '0');
    setTimeout(function () {
      let donut = document.getElementById('donut');
      let qrimg = document.getElementById('qr-img');
      let error = document.getElementById('error');
      donut.classList.add('hidden');
      qrimg.classList.add('hidden');
      error.classList.remove('hidden');
    }, 500);
    setTimeout(() => {
      this.resetDonut()
    }, 1500);
  }

  loadDonut() {
    let donut = document.getElementById('donut');
    let qrimg = document.getElementById('qr-img');
    let msgerror = document.getElementById('error');
    donut.classList.remove('hidden');
    qrimg.classList.add('hidden');
    msgerror.classList.add('hidden');
  }

  valueDonut(val) {
    let rootElement = document.documentElement;
    setTimeout(function () {
      const donutVal = val;
      // console.log("valueDonut", donutVal)
      rootElement.style.setProperty("--donut-value-medicion", donutVal);
    }, 200);
  }

  successDonut(estadoQR) {
    if(Number(estadoQR) == 0){
      this.activatePinE()
      this.img = "assets/img/donut-step-5.png"
      setTimeout(() => {
        this.resetDonut()
      }, 2300);
    }else{
      this.activatePinS()
      this.img = "assets/img/donut-step-5.png"
      setTimeout(() => {
        this.resetDonut()
      }, 2300);
    }
    
  }


  resetDonut(){
    console.log("resetDonut")
    this.img = "assets/img/donut-step-1.png"
    let donut = document.getElementById('donut');
    let porcentaje = document.getElementById('porcentaje');
    let msgdonut = document.getElementById('msg-donut');
    let qrImg = document.getElementById('qr-img');
    let msgeError = document.getElementById('error');
    msgdonut.classList.remove('hidden')
    qrImg.classList.remove('hidden')
    donut.classList.add('hidden')
    // porcentaje.classList.add('hidden')
    msgeError.classList.add('hidden')
    this.valueDonut(0)
    this.mensaje = "Escanea tu QR en el lector"
    this.codigoQR = ''
    document.getElementById('qrCodeInput').focus()
  }

  
  activatePinE(){
    this.http.get(`http://localhost:8000/apagar/${this.identificadorTorniquete[1]}` ).subscribe(
      success=>{
        console.log("success_OFF_pin",success)
      },error=>{
        console.error("error_OFF_pin",error)
      }
    )

    setTimeout(() => {
      this.http.get(`http://localhost:8000/encender/${this.identificadorTorniquete[1]}`).subscribe(
        success=>{
          console.log("success_ON_pin",success)
        },error=>{
          console.error("error_ON_pin",error)
        }
      )
    }, 3000);
  }

  activatePinS(){
    this.http.get(`http://localhost:8000/apagar/${this.identificadorTorniquete[2]}` ).subscribe(
      success=>{
        console.log("success_OFF_pin",success)
      },error=>{
        console.error("error_OFF_pin",error)
      }
    )

    setTimeout(() => {
      this.http.get(`http://localhost:8000/encender/${this.identificadorTorniquete[2]}`).subscribe(
        success=>{
          console.log("success_ON_pin",success)
        },error=>{
          console.error("error_ON_pin",error)
        }
      )
    }, 3000);
  }

  

}
