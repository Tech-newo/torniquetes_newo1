import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { EntradaMiembrosService } from 'src/app/services/entradaMiembros/entrada-miembros.service';
import { MiembrosService } from 'src/app/services/miembros/miembros.service';
import { Account } from 'src/model/account.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {
  account: Account;
  codigoQR: any = ''
  identificadorTorniquete: any = '1502,0'

  MiembroQR: { idUsuario: any; estado: any; } = {
    idUsuario: '',
    estado: '',
  };

  InvitadoQR: { idInvitado: any } = {
    idInvitado: '',
  };


  constructor(
    public navController: NavController,
    public miembrosService : MiembrosService,
    public entradaMiembrosService : EntradaMiembrosService,
  ) { }

  ngOnInit() {
    this.identificadorTorniquete = this.identificadorTorniquete.split(',')
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
            console.log(`codigoQr de ${this.codigoQR[3] ? 'salida' : 'entrada'} no corresponde con el torniquete de ${this.identificadorTorniquete['1'] ? 'entrada' : 'salida'} `)
          }
        } else {
          console.log('codigoQr de miembro no vigente')
        }
      } else if (this.codigoQR[0] == 2) {
        this.validarInvitado(this.codigoQR[1])
      } else {
        console.log('codigoQr no valido')
      }
    } else {
      console.log('la sede del codigoQR no corresponde al idSedeTorniquete')
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
    this.MiembroQR.idUsuario = idUsuario
    this.MiembroQR.estado = estadoQR
    this.miembrosService.findById(idUsuario).subscribe(
      success => {
        let auxMiembro = success.body['0']
        if (this.accesoPermitidoMiembro(auxMiembro['nivel']['ingresoSedes'], auxMiembro['user']['activated'])){
          // Consultar ultimo registro de entrada
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
                    this.registrarEntradaMiembro(auxEntradaMiembros)

                  } else {
                    console.log(`no es podible registrar la ${estadoQR ? 'entrada' : 'salida'}, debido a que el ultimo registro es una ${auxEntradaMiembros['salida'] ? 'salida' : 'entrada'}`)
                  }
                } else {
                  // 2.2 primer registro del dia => Registrar Entrada
                  this.registrarEntradaMiembro()
                }
              } else {
                // primer registro historico => Registrar Entrada
                this.registrarEntradaMiembro()
              }
            }, error => {
              console.error(error)
            }
          )
        } else {
          console.log('El nivel del miembro no cuenta conacceso a sedes o su usario esta desactivado')
        }
      }, error => {
        console.error(error)
      }
    )
  }

  accesoPermitidoMiembro(nivel, activo) {
    return (nivel && activo)
  }

  registrarEntradaMiembro(auxDateUltimoRegistro?){
    console.log('this.registrarEntradaMiembro',auxDateUltimoRegistro)
  }



  /* Validacion Invitados */
  validarInvitado(idInvitado) {
    this.InvitadoQR.idInvitado = idInvitado
    console.log(this.InvitadoQR)
  }

}
