import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {
  account: Account;
  codigoQR: any = ''
  identificadorTorniquete: any = '1502,1'
  sedeTorniquete : any = []
  mensaje:any = "Escanea tu QR en el lector"

  constructor(
    public navController: NavController,
    public sedesService : SedesService,
    public miembrosService : MiembrosService,
    public invitadosService : InvitadosService,
    public entradaMiembrosService : EntradaMiembrosService,
    public entradaInvitadosService : EntradaInvitadosService,
    public invitacionService : InvitacionService
    
  ) { }

  ngOnInit() {
    this.identificadorTorniquete = this.identificadorTorniquete.split(',')
    this.consultarSede(this.identificadorTorniquete['0'])
  }

  consultarSede(idSede){
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
    this.codigoQR = this.codigoQR.split(',')
    // 1. Validar que la sede del codigoQR corresponda al idSedeTorniquete
    if (this.sedeCorrespondiente(this.codigoQR[2])) {
      this.mensaje=`Paso 1`
      this.loadDonut()
      this.valueDonut("25")
      // 2. Validar el tipo de Qr y registrar sus datos
      if (this.codigoQR[0] == 1) {
        this.mensaje=`Paso 2`
        this.valueDonut("35")
        // 3. Validar vigencia Qr
        if (this.codigoQrVigente(this.codigoQR[4])) {
          this.mensaje=`Paso 3`
          this.valueDonut("65")
          // 4. codigoQr corresponde al torniquete 
          if ( this.codigoCorrespondiente(this.codigoQR[3])) {
            this.mensaje=`Paso 4 miembro`
            this.valueDonut("75")
            this.validarMiembro(this.codigoQR[1], this.codigoQR[3])
          } else {
            this.mensaje=`codigoQr de ${(this.codigoQR[3] == 0) ? 'entrada' : 'salida'} no corresponde con el torniquete de ${(this.identificadorTorniquete['1'] == 0)? 'entrada' : 'salida'} `
            this.loadDonutError()
            console.log(this.mensaje)
          }
        } else {
          this.mensaje='codigoQr de miembro no vigente'
          this.loadDonutError()
          console.log(this.mensaje)
        }
      } else if (this.codigoQR[0] == 2) {
        this.mensaje=`Paso 4 invitado`
        this.valueDonut("75")
        this.validarInvitado(this.codigoQR[1])
      } else {
        this.mensaje='codigoQr no valido'
        this.loadDonutError()
        console.log(this.mensaje)
      }
    } else {
      this.mensaje='la sede del codigoQR no corresponde al idSedeTorniquete'
      this.loadDonutError()
      console.log(this.mensaje)
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
    if (diffMins <= 10) {
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
        if (this.accesoPermitidoMiembro(auxMiembro['nivel']['ingresoSedes'], auxMiembro['user']['activated'])){
          this.validarRegistroEntradaMiembro(auxMiembro,estadoQR)
        } else {
          this.mensaje='El nivel del miembro no cuenta conacceso a sedes o su usario esta desactivado'
          this.loadDonutError()
          console.log(this.mensaje)
        }
      }, error => {
        console.error(error)
      }
    )
  }

  validarRegistroEntradaMiembro(auxMiembro,estadoQR) {
    this.entradaMiembrosService.findLastRegistryByUserId(auxMiembro['user']['id']).subscribe(
      success => {
        if (success.body['0'] !== undefined){
          let auxEntradaMiembros = success.body['0']
          // 1. Validar que el ultimo registro si sea del dia actual
          let auxDateUltimoRegistro = new Date(auxEntradaMiembros['registroFecha'])
          let auxCurrentDate = new Date(Date.now())
          if (auxDateUltimoRegistro.getDate() == auxCurrentDate.getDate() && auxDateUltimoRegistro.getMonth() == auxCurrentDate.getMonth()) {
            // 2.1 registros en el dia actual
            if(estadoQR  == (auxEntradaMiembros['salida'] ? '0' : '1')){
              // Qr i/o coherente con el ultimo registro => Registrar i/o
              this.registrarEntradaMiembro(estadoQR,auxMiembro['user'])
            } else {
              this.mensaje=`no es podible registrar la ${estadoQR ? 'entrada' : 'salida'}, debido a que el ultimo registro es una ${auxEntradaMiembros['salida'] ? 'salida' : 'entrada'}`
              console.log(this.mensaje)
              this.loadDonutError()
            }
          } else {
            // 2.2 primer registro del dia => Registrar Entrada
            this.registrarEntradaMiembro(0,auxMiembro['user'])
          }
        } else {
          // primer registro historico => Registrar Entrada
          this.registrarEntradaMiembro(0,auxMiembro['user'])
        }
      }, error => {
        console.error(error)
      }
    )
  }

  accesoPermitidoMiembro(nivel, activo) {
    return (nivel && activo)
  }

  registrarEntradaMiembro(estadoQR, user){
   const auxRegistroEntradaMiembro = this.registroEntradaMiembro(estadoQR, user)
   this.entradaMiembrosService.create(auxRegistroEntradaMiembro).subscribe(
     success => {
      this.valueDonut("100")
      this.mensaje=`registro Exitoso`
      this.reload()
    }, error => {
      this.mensaje='no se ha podido generar el registro de manera exitosa, intente otra vez'
      console.log(this.mensaje)
      this.loadDonutError()
     }
   )
  }

  private registroEntradaMiembro( estadoQR, user ): EntradaMiembros {
    let salida = (estadoQR == '1' ? true : false ) 
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
          if (success.body['0'] !== undefined){
            let auxInvitacion = success.body['0']
            if (this.invitacionVigente(auxInvitacion['fechaFin'])){
              // invitacion vigente
              if (this.sedeCorrespondiente(auxInvitacion['sede']['id'])) {
                this.miembrosService.findByUserId(auxInvitacion['invitado']['user']['id']).subscribe(
                  success => {
                    let auxMiembro = success.body['0']
                    if (this.accesoPermitidoMiembro(auxMiembro['nivel']['ingresoSedes'], auxMiembro['user']['activated'])){
                      // miembro con acceso permitido
                      this.validarEntradaInvitado(auxInvitacion)
                    } else {
                      this.mensaje='El nivel del miembro no cuenta con acceso a sedes o su usario esta desactivado'
                      this.loadDonutError()
                      console.log(this.mensaje)
                    }
                  }, error => {
                    console.error(error)
                  }
                )
              } else {
                this.mensaje='la invitacion no corresponde al idSedeTorniquete'
                this.loadDonutError()
                console.log(this.mensaje)
              }
            } else {
              this.mensaje='la invitacion no es vigente, intenta con otro codigo Qr'
              this.loadDonutError()
              console.log(this.mensaje)
            }
          } else {
            this.mensaje='la invitacion no es valida, intenta con otro codigo Qr'
            this.loadDonutError()
            console.log(this.mensaje)
          }
        }, error => {
          console.error(error)
        }
      )
  }

  validarEntradaInvitado(auxInvitacion){
    this.entradaInvitadosService.findLastRegistryByGuestId(auxInvitacion['invitado']['id']).subscribe(
      success => {
        if (success.body['0'] !== undefined){
          let auxEntradaInvitado = success.body['0']
          // 1. Validar que el ultimo registro si sea del dia actual
          let auxDateUltimoRegistro = new Date(auxEntradaInvitado['registroFecha'])
          let auxCurrentDate = new Date(Date.now())
          if (auxDateUltimoRegistro.getDate() == auxCurrentDate.getDate() && auxDateUltimoRegistro.getMonth() == auxCurrentDate.getMonth()) {
            // 2.1 registros en el dia actual
            console.log('registros en el dia actual')
            if(this.validarUltimoRegistroSalidaTorniquete(!auxEntradaInvitado['salida'])){
              this.registrarEntradaInvitado(!auxEntradaInvitado['salida'], auxEntradaInvitado['invitado'])
            } else {
              this.mensaje=`no es podible registrar la ${this.identificadorTorniquete['1'] == '0' ? 'entrada' : 'salida'}, debido a que el ultimo registro es una ${auxEntradaInvitado['salida'] ? 'salida' : 'entrada'}`
              console.log(this.mensaje)
              this.loadDonutError()
            }
          } else {
            // 2.2 primer registro del dia => Registrar Entrada
            console.log('primer registro del dia => Registrar Entrada')
            if(this.validarUltimoRegistroSalidaTorniquete(false)){
              this.registrarEntradaInvitado(false, auxEntradaInvitado['invitado'])
            } else {
              this.mensaje=`no es podible registrar la ${this.identificadorTorniquete['1'] == '0' ? 'entrada' : 'salida'},  debido a que el no cuenta con un registro de ingreso`
              console.log(this.mensaje)
              this.loadDonutError()
            }
          }
        } else {
          // primer registro historico => Registrar Entrada
          console.log('primer registro historico => Registrar Entrada')
          if(this.validarUltimoRegistroSalidaTorniquete(false)){
            this.registrarEntradaInvitado(false, auxInvitacion['invitado'])
          } else {
            this.mensaje=`no es podible registrar la ${this.identificadorTorniquete['1'] == '0' ? 'entrada' : 'salida'}, debido a que el no cuenta con un registro de ingreso`
            console.log(this.mensaje)
            this.loadDonutError()
          }

        }
      }, error => {
        console.error(error)
      }
    )
  }

  invitacionVigente(fechaFinInvitacion){
    let auxFechaFin = Number(new Date(fechaFinInvitacion))*1
    let now = Number(new Date()) * 1
    if (now <= auxFechaFin) {
      return true
    } else {
      return false
    }
  }

  validarUltimoRegistroSalidaTorniquete(ultimoRegistroInvitado){
    let salidaTorniquete = (this.identificadorTorniquete['1'] === '1' ? true : false )
    return salidaTorniquete === ultimoRegistroInvitado
  }
  

  registrarEntradaInvitado(salida, invitado){
    const registroEntradaInvitado = this.registroEntradaInvitado(salida, invitado)
    this.entradaInvitadosService.create(registroEntradaInvitado).subscribe(
      success => {
        this.valueDonut("100")
        this.mensaje=`registro Exitoso`
        console.log ( 'registro Exitoso')
        this.reload()

      }, error => {
         console.log ( 'no se ha podido generar el registro de manera exitosa, intente otra vez')
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
  onKeypressEvent(event: any){
    console.log("event.target.value",event.target.value);
  }

  loadDonutError(){
    let rootElement = document.documentElement;
    rootElement.style.setProperty("--donut-value-medicion", '0');
    setTimeout(function(){ 
      let donut = document.getElementById('donut');
      let qrimg = document.getElementById('qr-img');
      let error = document.getElementById('error');
      donut.classList.add('hidden');
      qrimg.classList.add('hidden');
      error.classList.remove('hidden');
    }, 500);
    this.reload()

  }

  loadDonut(){
      let donut = document.getElementById('donut');
      let qrimg = document.getElementById('qr-img');
      let msgerror = document.getElementById('error');
      donut.classList.remove('hidden');
      qrimg.classList.add('hidden');
      msgerror.classList.add('hidden');
  }

  reload(){
    setTimeout(function(){ 
      location.reload();
    }, 3000);
  }

  valueDonut(val){
    let rootElement = document.documentElement;
      setTimeout(function(){ 
      const donutVal = val;
      console.log("valueDonut",donutVal)
        rootElement.style.setProperty("--donut-value-medicion", donutVal);
      }, 200);
  }

}
