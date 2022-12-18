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
  identificadorTorniquete: any = LoginPage.sede
  sedeTorniquete: any = []
  mensaje: any = "Escanea tu QR en el lector"
  img: any = ""
  mensajeProcedimiento: any = ""
  lastId:any = undefined
  newId:any = undefined
  constructor(
    public navController: NavController,
    public sedesService: SedesService,
    public miembrosService: MiembrosService,
    public invitadosService: InvitadosService,
    public entradaMiembrosService: EntradaMiembrosService,
    public entradaInvitadosService: EntradaInvitadosService,
    public invitacionService: InvitacionService,
  ) { }

  ionViewDidEnter() {
    clearInterval(LoginPage.intervalLog);
    document.getElementById('qrCodeInput').focus()
    if (this.identificadorTorniquete == undefined) {
      this.identificadorTorniquete = localStorage.getItem('sede')
    } else {
      localStorage.setItem('sede', LoginPage.sede)
    }
    if (navigator.onLine) {
      this.img = "assets/img/donut-step-1.png"
      this.identificadorTorniquete = this.identificadorTorniquete.split(',')
      this.consultarSede(this.identificadorTorniquete['0'])
    } else {
      this.mensaje = 'sin conexión a internet'
      this.loadDonutError(false)
      // console.log(this.mensaje)
    }

  }

  consultarSede(idSede) {
    this.sedesService.findBySedeId(idSede).subscribe(
      success => {
        if (success.body !== undefined) {
          this.sedeTorniquete = success.body['0']
        } else {
          console.log('Error_int : no se ha encontrado una sede para realizar el registro ')
        }
      }, error => {
        console.error(error)
      }
    )
  }


  /* Validacion Inicial */
  obtenerCodigoQR() {
    // console.log("navigator.onLine",navigator.onLine)
    if (navigator.onLine) {
      // this.reconeccion();
      this.codigoQR = this.codigoQR.split(',')
      this.mensajeProcedimiento = "processing"
      // 1. Validar que la sede del codigoQR corresponda al idSedeTorniquete
      if (this.sedeCorrespondiente(this.codigoQR[2])) {
        this.mensaje = `Validando la Sede NEWO`
        this.loadDonut()
        this.valueDonut("15")
        // 2. Validar el tipo de Qr y registrar sus datos
        if (this.codigoQR[0] == 1) {
          this.mensaje = `Validando tu código QR`
          this.valueDonut("25")
          // 3. Validar vigencia Qr
          if (this.codigoQrVigente(this.codigoQR[4])) {
            this.mensaje = `Validando tu código QR`
            this.valueDonut("35")
            // 4. codigoQr corresponde al torniquete 
            if (this.codigoCorrespondiente(this.codigoQR[3])) {
              this.mensaje = 'Validando tu identidad'
              this.valueDonut("50")
              this.validarMiembro(this.codigoQR[1], this.codigoQR[3])
            } else {
              this.mensaje = `Código QR es inválido, genera un código QR nuevo y vuelve a intentarlo`
              this.loadDonutError(true)
              console.log(this.mensaje)
            }
          } else {
            this.mensaje = 'Código QR ha expirado, genera uno nuevo'
            this.loadDonutError(true)
            console.log(this.mensaje)
          }
        } else if (this.codigoQR[0] == 2) {
          this.mensaje = 'Validando tu identidad'
          this.valueDonut("50")
          this.validarInvitado(this.codigoQR[1])
        } else {
          
          this.mensaje = 'Código QR no es válido'
          this.loadDonutError(true)
          console.log(this.mensaje)
        }
      } else {
        
        this.mensaje = 'Código QR no es válido'
        this.loadDonutError(true)
        console.log(this.mensaje)
      }
    } else {
      this.mensajeProcedimiento = "lost connection"
      this.mensaje = 'sin conexion a internet'
      this.loadDonutError(false)
      // this.reconeccion()
    }

  }

  sedeCorrespondiente(sedeCogdigo) {
    return (Number(this.identificadorTorniquete[0]) === Number(sedeCogdigo))
  }

  codigoCorrespondiente(estadoCogdigo) {
    return (Number(this.identificadorTorniquete[1]) === Number(estadoCogdigo))
  }

  codigoQrVigente(validesQR) {
    var time = new Date(Number(validesQR))
    let now = new Date()
    let diffTime = (now.getTime() - time.getTime())
    var diffMins = Math.floor(((diffTime % 86400000) % 3600000) / 60000);
    console.log('diferencia en minutos ' + diffMins)
    if (diffMins <= 100) {
      return true
    } else {
      return false
    }
  }


  /* Validacion Miembros */
  validarMiembro(idUsuario, estadoQR) {
    this.miembrosService.findById(idUsuario).subscribe(
      success => {
        let auxMiembro = success.body['0']
        if (this.accesoPermitidoMiembro(auxMiembro['nivel']['ingresoSedes'], auxMiembro['user']['activated'])) {
          this.validarRegistroEntradaMiembro(auxMiembro, estadoQR)
        } else {
          this.mensaje = ' Membresía sin acceso a sedes NEWO '
          this.loadDonutError(true)
          console.log(this.mensaje)
        }
      }, error => {
        console.error(error)
      }
    )
  }

  validarRegistroEntradaMiembro(auxMiembro, estadoQR) {
    this.entradaMiembrosService.findLastRegistryByUserId(auxMiembro['user']['id']).subscribe(
      success => {
        if (success.body['0'] !== undefined) {
          let auxEntradaMiembros = success.body['0']
          // 1. Validar que el ultimo registro si sea del dia actual
          let auxDateUltimoRegistro = new Date(auxEntradaMiembros['registroFecha'])
          let auxCurrentDate = new Date(Date.now())
          if (auxDateUltimoRegistro.getDate() == auxCurrentDate.getDate() && auxDateUltimoRegistro.getMonth() == auxCurrentDate.getMonth()) {
            // 2.1 registros en el dia actual
            if (estadoQR == (auxEntradaMiembros['salida'] ? '0' : '1') || true) {
              // Qr i/o coherente con el ultimo registro => Registrar i/o
              this.registrarEntradaMiembro(estadoQR, auxMiembro['user'])
            } else {
              this.mensaje = `Código QR es inválido, genera un código QR nuevo y vuelve a intentarlo ` 
              console.log(this.mensaje)
              this.loadDonutError(true)
            }
          } else {
            // 2.2 primer registro del dia => Registrar Entrada
            this.registrarEntradaMiembro(0, auxMiembro['user'])
          }
        } else {
          // primer registro historico => Registrar Entrada
          this.registrarEntradaMiembro(0, auxMiembro['user'])
        }
      }, error => {
        console.error(error)
      }
    )
  }

  accesoPermitidoMiembro(nivel, activo) {
    return (nivel && activo)
  }

  registrarEntradaMiembro(estadoQR, user) {
    this.verificarUltimoRegistroMiembro(user)
    const auxRegistroEntradaMiembro = this.registroEntradaMiembro(estadoQR, user)
    this.entradaMiembrosService.create(auxRegistroEntradaMiembro).subscribe(
      success => {
        // console.log('registroSatisfecho',success)
        this.valueDonut("100");
        this.mensaje = `${estadoQR == '0' ? 'Hola' : 'Esperamos verte pronto'} ${user.firstName} !`
        this.mensajeProcedimiento = "success"
        this.successDonut()
      }, error => {
        this.mensaje = `${user.firstname} no fue posible realizar el registro, intenta nuevamente `
        console.log(this.mensaje)
        this.loadDonutError(true)
      }
    )
  }

  verificarUltimoRegistroMiembro(user){
    if(this.lastId === undefined){
      this.entradaMiembrosService.query({
        'userId.equals':user.id,
        sort:["registroFecha,desc"],
      }).subscribe(
        success=>{
          this.lastId = success.body[0].id;
          this.confirmarNuevoRegistroMiembro(user)
        },error=>{
          console.error("error",error);
        }
      )
    }else{
      this.confirmarNuevoRegistroMiembro(user)
    }
  }

  confirmarNuevoRegistroMiembro(user){
    this.entradaMiembrosService.query({
      'userId.equals':user.id,
      sort:["registroFecha,desc"],
    }).subscribe(
      success=>{
        this.newId = success.body[0].id;
        if(this.lastId === this.newId){
          console.log("no se ha creado nuevo registro")
          this.verificarUltimoRegistroMiembro(user)
        }else{
          this.successDonut()
        }
      },error=>{
        console.error("error",error);
      }
    )
  }

  private registroEntradaMiembro(estadoQR, user): EntradaMiembros {
    let salida = (estadoQR == '1' ? true : false)
    return {
      ...new EntradaMiembros(),
      registroFecha: new Date(Date.now()).toISOString(),
      salida: salida,
      tiempoMaximo: false,
      user: user,
      sede: this.sedeTorniquete,
    };
  }


  /* Validacion Invitados */
  validarInvitado(idInvitacion) {
    // 1.Validar validez invitacion
    this.invitacionService.findById(idInvitacion).subscribe(
      success => {
        if (success.body['0'] !== undefined) {
          let auxInvitacion = success.body['0']
          if (this.invitacionVigente(auxInvitacion['fechaFin'])) {
            // invitacion vigente
            if (this.sedeCorrespondiente(auxInvitacion['sede']['id'])) {
              this.miembrosService.findByUserId(auxInvitacion['invitado']['user']['id']).subscribe(
                success => {
                  let auxMiembro = success.body['0']
                  if (this.accesoPermitidoMiembro(auxMiembro['nivel']['ingresoSedes'], auxMiembro['user']['activated'])) {
                    // miembro con acceso permitido
                    this.validarEntradaInvitado(auxInvitacion)
                  } else {
                    this.mensaje = ' La persona que te ha invitado no cuenta con acceso a nuestras sedes NEWO'
                    this.loadDonutError(true)
                    console.log(this.mensaje)
                  }
                }, error => {
                  console.error(error)
                }
              )
            } else {
              this.mensaje = 'Código QR no es válido, la invitación se generó para otra sede NEWO'
              this.loadDonutError(true)
              console.log(this.mensaje)
            }
          } else {
            this.mensaje = 'Código QR no es válido, la invitación no es vigente'
            this.loadDonutError(true)
            console.log(this.mensaje)
          }
        } else {
          this.mensaje = 'Código QR no es válido'
          this.loadDonutError(true)
          console.log(this.mensaje)
        }
      }, error => {
        console.error(error)
      }
    )
  }

  validarEntradaInvitado(auxInvitacion) {
    this.entradaInvitadosService.findLastRegistryByGuestId(auxInvitacion['invitado']['id']).subscribe(
      success => {
        if (success.body['0'] !== undefined) {
          let auxEntradaInvitado = success.body['0']
          // 1. Validar que el ultimo registro si sea del dia actual
          let auxDateUltimoRegistro = new Date(auxEntradaInvitado['registroFecha'])
          let auxCurrentDate = new Date(Date.now())
          if (auxDateUltimoRegistro.getDate() == auxCurrentDate.getDate() && auxDateUltimoRegistro.getMonth() == auxCurrentDate.getMonth()) {
            // 2.1 registros en el dia actual
            console.log('registros en el dia actual')
            if (this.validarUltimoRegistroSalidaTorniquete(!auxEntradaInvitado['salida'])) {
              this.registrarEntradaInvitado(!auxEntradaInvitado['salida'], auxEntradaInvitado['invitado'])
            } else {
              this.mensaje = `Código QR no es válido, no corresponde a registro de ${auxEntradaInvitado['salida'] ? 'salida' : 'entrada'}`
              console.log(this.mensaje)
              this.loadDonutError(true)
            }
          } else {
            // 2.2 primer registro del dia => Registrar Entrada
            console.log('primer registro del dia => Registrar Entrada')
            if (this.validarUltimoRegistroSalidaTorniquete(false)) {
              this.registrarEntradaInvitado(false, auxEntradaInvitado['invitado'])
            } else {
              this.mensaje = `Al parecer no cuentas con un registro de ingreso, comunícate con uno de nuestros host.`
              console.log(this.mensaje)
              this.loadDonutError(true)
            }
          }
        } else {
          // primer registro historico => Registrar Entrada
          if (this.validarUltimoRegistroSalidaTorniquete(false)) {
            this.registrarEntradaInvitado(false, auxInvitacion['invitado'])
          } else {
            this.mensaje = `Al parecer no cuentas con un registro de ingreso, comunícate con uno de nuestros host.`
            console.log(this.mensaje)
            this.loadDonutError(true)
          }

        }
      }, error => {
        console.error(error)
      }
    )
  }

  invitacionVigente(fechaFinInvitacion) {
    let auxFechaFin = Number(new Date(fechaFinInvitacion)) * 1
    let now = Number(new Date()) * 1
    if (now <= auxFechaFin) {
      return true
    } else {
      return false
    }
  }

  validarUltimoRegistroSalidaTorniquete(ultimoRegistroInvitado) {
    let salidaTorniquete = (this.identificadorTorniquete['1'] === '1' ? true : false)
    return salidaTorniquete === ultimoRegistroInvitado
  }


  registrarEntradaInvitado(salida, invitado) {
    const registroEntradaInvitado = this.registroEntradaInvitado(salida, invitado)
    this.entradaInvitadosService.create(registroEntradaInvitado).subscribe(
      success => {
        this.valueDonut("100")
        this.mensaje = `${!salida ? 'Hola' : 'Esperamos verte pronto'} ${invitado.nombre}! `
        this.mensajeProcedimiento = "success"
        setTimeout(() => {}, 1000);
        this.successDonut()
      }, error => {
        this.mensaje = `${invitado.nombre} no fue posible realizar el registro, intenta nuevamente `
      }
    )
  }

  protected registroEntradaInvitado(salida, invitado): EntradaInvitados {
    return {
      ...new EntradaInvitados(),
      registroFecha: new Date(Date.now()).toISOString(),
      salida,
      tiempoMaximo: false,
      sede: this.sedeTorniquete,
      invitado,
    };
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

  successDonut() {
    this.img = "assets/img/donut-step-5.png"
    setTimeout(() => {
      this.resetDonut()
    }, 2300);
  }

  resetDonut(){
    this.img = "assets/img/donut-step-1.png"
    let donut = document.getElementById('donut');
    let porcentaje = document.getElementById('porcentaje');
    let msgdonut = document.getElementById('msg-donut');
    let msgeError = document.getElementById('error');
    msgdonut.classList.remove('hidden')
    donut.classList.remove('hidden')
    porcentaje.classList.remove('hidden')
    msgeError.classList.add('hidden')
    this.valueDonut(0)
    this.mensaje = "Escanea tu QR en el lector"
    this.codigoQR = ''
    document.getElementById('qrCodeInput').focus()
  }

  reload(status: boolean) {
    if (navigator.onLine) {
      if (status) {
        setTimeout(function () {
          location.reload();
        }, 3000);
      }
    } else {
        let i = 0;
        setInterval(()=>{
          console.log('interval_reload')
          if(navigator.onLine){
            location.reload()
          } 
          else if(i==10){
            this.mensajeProcedimiento = "reset"
          }
          else if(!navigator.onLine){
            i++
          }
        }, 6000);
    }
  }


  keypress(event){
    if(event.key=="Enter"){
      setTimeout(() => {
        document.getElementById('code').focus();
      }, 500);
      setTimeout(() => {
        this.obtenerCodigoQR()
      }, 1000);
    }
  }
}
