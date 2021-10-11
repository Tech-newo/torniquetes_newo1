import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { EntradaMiembros } from 'src/app/services/entradaMiembros/entrada-miembors.model';
import { EntradaMiembrosService } from 'src/app/services/entradaMiembros/entrada-miembros.service';
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
    public entradaMiembrosService : EntradaMiembrosService,
    
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

      let circle = document.getElementById('circle2');
      setTimeout(function(){ 
        circle.classList.remove('circle2');
        circle.classList.add('circle3');
      }, 500);
      
        // 2. Validar el tipo de Qr y registrar sus datos
      if (this.codigoQR[0] == 1) {
        setTimeout(function(){ 
          circle.classList.remove('circle3');
          circle.classList.add('circle4');
        }, 500);
        this.mensaje=`Paso 2`
        // 3. Validar vigencia Qr
        if (this.codigoQrVigente(this.codigoQR[4])) {
          setTimeout(function(){ 
            circle.classList.remove('circle4');
            circle.classList.add('circle5');
          }, 500);
          this.mensaje=`Paso 3`
          // 4. codigoQr corresponde al torniquete 
          if ( this.codigoCorrespondiente(this.codigoQR[3])) {
            this.mensaje=`Paso 4 miembro`
            
            this.validarMiembro(this.codigoQR[1], this.codigoQR[3])
          } else {
            this.mensaje=`codigoQr de ${(this.codigoQR[3] == 0) ? 'entrada' : 'salida'} no corresponde con el torniquete de ${(this.identificadorTorniquete['1'] == 0)? 'entrada' : 'salida'} `
            this.loadDonutError()
            console.log(this.mensaje)
            this.reload()
          }
        } else {
          this.mensaje='codigoQr de miembro no vigente'
          this.loadDonutError()
          console.log(this.mensaje)
          this.reload()
        }
      } else if (this.codigoQR[0] == 2) {
        this.mensaje=`Paso 4 invitado`
        this.loadDonut()
        this.validarInvitado(this.codigoQR[1])
      } else {
        this.mensaje='codigoQr no valido'
        this.loadDonutError()
        console.log(this.mensaje)
        this.reload()
      }
    } else {
      this.mensaje='la sede del codigoQR no corresponde al idSedeTorniquete'
      this.loadDonutError()
      console.log(this.mensaje)
      this.reload()
    }
  }



  sedeCorrespondiente(sedeCogdigo) {
    return (this.identificadorTorniquete[0] === sedeCogdigo)
  }

  codigoCorrespondiente(estadoCogdigo) {
    return (this.identificadorTorniquete[1] === estadoCogdigo)
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
          this.reload()
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
              this.reload()
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
   console.log(estadoQR, user)
   const auxRegistroEntradaMiembro = this.registroEntradaMiembro(estadoQR, user)
   this.entradaMiembrosService.create(auxRegistroEntradaMiembro).subscribe(
     success => {
      this.mensaje=`registro Exitoso`
      this.loadDonut()
      this.reload()
    }, error => {
      this.mensaje='no se ha podido generar el registro de manera exitosa, intente otra vez'
      console.log(this.mensaje)
      this.loadDonutError()
      this.reload()
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
  validarInvitado(idInvitado) {
    
    console.log(idInvitado)
  }


  onKeypressEvent(event: any){
    console.log("event.target.value",event.target.value);
  }

  loadDonutError(){
    let donut = document.getElementById('donut');
    let qrimg = document.getElementById('qr-img');
    let error = document.getElementById('error');
    donut.classList.add('hidden');
    qrimg.classList.add('hidden');
    error.classList.remove('hidden');
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

}
