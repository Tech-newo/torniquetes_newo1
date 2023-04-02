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
  identificadorTorniquete: any = localStorage.getItem('sede')
  pin_input: any = localStorage.getItem('pin_out')
  pin_output: any = localStorage.getItem('pin_out')
  sedeTorniquete: any = []
  mensaje: any = "Escanea tu QR en el lector"
  img: any = ""
  lastId:any = undefined
  newId:any = undefined
  codeSend:any
  webHook:any = "https://hook.us1.make.com/rcykioyv34gtxyeeas4xf6jlcgs4q4tm"

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

    (document.getElementById('qrCodeInput'))
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
      this.codeSend.idUser = code[2] //id_usuario / id_invitado 2
      this.codeSend.sede = localStorage.getItem('sede') //sede
      this.codeSend.dateRegister = new Date().toISOString() //fecha registro
      this.codeSend.dateInvitation = code[5];
      (this.codeSend.typeRegister === '0' || this.codeSend.typeRegister === '1')
        ? this.processCode(this.codeSend)
        : this.resetDonut()
    }
  }

   processCode(code:any){
    this.mensaje = 'Validando tu código QR'
    this.loadDonut()
    this.valueDonut(25);
    if(code.typeUser != '' || code.typeUser != undefined){
      this.controller(code)
    }
  }

  async controller(code:any){
    if(code.typeUser === '1'){
      this.validateMember(code.idUser)
    }else{
      if(await this.validateTimeInvitation(code.idUser)){
        this.valueDonut(100)
        this.successDonut(Number(this.codeSend.typeRegister));
        this.sendWebHook()
      }else{
        this.loadDonutError(true)
        this.mensaje = "Código QR ha expirado, genera uno nuevo"
      }
    }
  }

    validateMember(id:any){
      this.mensaje = 'Validando miembro.'
      this.valueDonut(100)
      const fechaFin = new Date().toISOString();
      const fechaActual = this.codeSend.dateInvitation;
      const diferenciaEnMilisegundos = new Date(fechaActual).getTime() - new Date(fechaFin).getTime();

      const time = new Date(this.codeSend.dateInvitation)
      const now = new Date()
      const diffTime = (now.getTime() - time.getTime())
      const diffMins = Math.floor(((diffTime % 86400000) % 3600000) / 60000);


      console.log(`fechaActual: ${fechaActual}`)
      console.log(`fechaFin ${fechaFin}`)
      console.log(`time ${time}`)
      console.log(`now ${now}`)
      console.log(`diffTime ${diffTime}`)
      console.log(`diffMins ${diffMins}`)
      console.log(`diferenciaEnMilisegundos ${diferenciaEnMilisegundos}`)
      this.successDonut(Number(this.codeSend.typeRegister));
      this.sendWebHook()
    }

  async validateTimeInvitation(id: any): Promise<boolean> {
    let resultado = false;
    this.mensaje = 'Validando invitado.';
    this.valueDonut(50);
    try {
      const success = await this.invitacionService.findById(id).toPromise();
      const fechaFin = success.body[0].fechaFin;
      const fechaActual = new Date().toISOString();
      if (fechaFin > fechaActual) {
        this.valueDonut(75);
        const miembroSuccess = await this.miembrosService.query({
          'userId.equals':success.body[0].invitado.user.id
        }).toPromise();
        const ingresoSedes =  miembroSuccess.body[0].nivel.ingresoSedes
        const userActivated = miembroSuccess.body[0].user.activated;
        (ingresoSedes && userActivated)
          ? resultado = true
          : resultado = false
      } else {
        resultado = false;
      }
    } catch (error) {
      console.error("error_invitacionService", error);
    }
    return resultado;
  }

  sendWebHook(){
    this.http.post(this.webHook, this.codeSend, {responseType: 'text'}).subscribe(
      (response) => {
      },
      (error) => {
        console.error('Error en la petición:', error);
      }
    );
  }


































  resetAll(){
    localStorage.setItem('sede','')
    localStorage.setItem('pin_out','')
    localStorage.setItem('pin_out','')
    this.navController.navigateRoot('/')
  }





  autofocus(){
    setTimeout(() => {
      document.getElementById('code').focus();
    }, 500);

    setTimeout(() => {
      document.getElementById('qrCodeInput').focus()
    }, 1000);
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
    }, 3000);
  }

  loadDonut() {
    this.img = "assets/img/donut-step-1.png"
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
      rootElement.style.setProperty("--donut-value-medicion", donutVal);
    }, 200);
  }

  successDonut(estadoQR:number) {
    if(estadoQR == 0){
      this.mensaje = "Saliendo"
      this.activatePinE()
      this.img = "assets/img/donut-step-5.png"
      setTimeout(() => {
        this.resetDonut()
      }, 3000);
    }else{
      this.mensaje = "Entrando"
      this.activatePinS()
      this.img = "assets/img/donut-step-5.png"
      setTimeout(() => {
        this.resetDonut()
      }, 3000);
    }
    
  }


  resetDonut(){
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
    this.http.get(`http://localhost:8000/apagar/${this.pin_input}` ).subscribe(
      success=>{
      },error=>{
        console.error("error_OFF_pin",error)
      }
    )

    setTimeout(() => {
      this.http.get(`http://localhost:8000/encender/${this.pin_input}`).subscribe(
        success=>{
        },error=>{
          console.error("error_ON_pin",error)
        }
      )
    }, 3000);
  }

  activatePinS(){
    this.http.get(`http://localhost:8000/apagar/${this.pin_output}` ).subscribe(
      success=>{
      },error=>{
        console.error("error_OFF_pin",error)
      }
    )

    setTimeout(() => {
      this.http.get(`http://localhost:8000/encender/${this.pin_output}`).subscribe(
        success=>{
        },error=>{
          console.error("error_ON_pin",error)
        }
      )
    }, 3000);
  }

  

}
