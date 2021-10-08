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
  mensaje:any = "Escanea tu QR en el lector"
  identificadorTorniquete: any = '1502,0'
  sedeTorniquete : any = []
  MiembroQR: { idUsuario: any; estado: any; } = {
    idUsuario: '',
    estado: '',
  };

  InvitadoQR: { idInvitado: any } = {
    idInvitado: '',
  };


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
      // 2. Validar el tipo de Qr y registrar sus datos
      if (this.codigoQR[0] == 1) {
        // 3. Validar vigencia Qr
        if (this.codigoQrVigente(this.codigoQR[4])) {
          // 4. codigoQr corresponde al torniquete 
          if ( this.codigoCorrespondiente(this.codigoQR[3])) {
            this.validarMiembro(this.codigoQR[1], this.codigoQR[3])
          } else {
            this.mensaje=`codigoQr de ${(this.codigoQR[3] == 0) ? 'entrada' : 'salida'} no corresponde con el torniquete de ${(this.identificadorTorniquete['1'] == 0)? 'entrada' : 'salida'} `
            console.log(this.mensaje)
            this.reload()
          }
        } else {
          this.mensaje='codigoQr de miembro no vigente'
          console.log(this.mensaje)
          this.reload()
        }
      } else if (this.codigoQR[0] == 2) {
        this.validarInvitado(this.codigoQR[1])
      } else {
        this.mensaje='codigoQr no valido'
        console.log(this.mensaje)
        this.reload()
      }
    } else {
      this.mensaje='la sede del codigoQR no corresponde al idSedeTorniquete'
      console.log(this.mensaje)
      this.reload()
    }
  }

  reload(){
    setTimeout(function(){ 
      location.reload();
    }, 3000);
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
    this.mensaje='diferencia en minutos ' + diffMins
    console.log(this.mensaje)
    this.reload()
    if (diffMins <= 10) {
      return true
    } else {
      return false
    }
  }

  /* Validacion Miembros */
  validarMiembro(idUsuario, estadoQR) {
    this.MiembroQR.idUsuario = idUsuario
    this.MiembroQR.estado = estadoQR
    this.miembrosService.findById(idUsuario).subscribe(
      success => {
        let auxMiembro = success.body['0']
        if (this.accesoPermitidoMiembro(auxMiembro['nivel']['ingresoSedes'], auxMiembro['user']['activated'])){
          this.validarRegistroEntradaMiembro(auxMiembro,estadoQR)
        } else {
          this.mensaje='El nivel del miembro no cuenta conacceso a sedes o su usario esta desactivado'
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
              console.log(`no es podible registrar la ${estadoQR ? 'entrada' : 'salida'}, debido a que el ultimo registro es una ${auxEntradaMiembros['salida'] ? 'salida' : 'entrada'}`)
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
       console.log ( 'registro Exitoso')
     }, error => {
        console.log ( 'no se ha podido generar el registro de manera exitosa, intente otra vez')
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
    this.InvitadoQR.idInvitado = idInvitado
    console.log(this.InvitadoQR)
  }

  onKeypressEvent(event: any){
    console.log("event.target.value",event.target.value);
    let donut = document.getElementById('donut');
    let qrimg = document.getElementById('qr-img');
    donut.classList.remove('hidden');
    qrimg.classList.add('hidden');
  }

}
