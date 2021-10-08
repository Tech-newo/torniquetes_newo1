import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { MiembrosService } from 'src/app/services/miembros/miembros-services.service';
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
    public miembrosService : MiembrosService
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
          this.validarMiembro(this.codigoQR[1], this.codigoQR[3])
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
  validarMiembro(idUsuario, estado) {
    this.MiembroQR.idUsuario = idUsuario
    this.MiembroQR.estado = estado
    this.miembrosService.findById(idUsuario).subscribe(
      success => {
        let auxMiembro = success.body['0']
        if (this.accesoPermitidoMiembro(auxMiembro['nivel']['ingresoSedes'], auxMiembro['user']['activated'])){

        } else {
          console.log('El nivel del miembro no cuenta conacceso a sedes o su usario esta desactivado')
        }
      }, error => {
        console.log(error)
      }
    )
  }

  accesoPermitidoMiembro(nivel, activo) {
    return (nivel && activo)
  }



  /* Validacion Invitados */
  validarInvitado(idInvitado) {
    this.InvitadoQR.idInvitado = idInvitado
    console.log(this.InvitadoQR)
  }

}
