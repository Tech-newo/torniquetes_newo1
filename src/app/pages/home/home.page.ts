import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { EntradaInvitadosService } from 'src/app/services/entradaInvitados/entrada-invitados.service';
import { EntradaMiembrosService } from 'src/app/services/entradaMiembros/entrada-miembros.service';
import { InvitacionService } from 'src/app/services/invitacion/invitacion.service';
import { InvitadosService } from 'src/app/services/invitados/invitados.service';
import { MiembrosService } from 'src/app/services/miembros/miembros.service';
import { SedesService } from 'src/app/services/sedes/sedes.service';
import { Account } from 'src/model/account.model';
import * as moment from 'moment';
import { AES } from 'crypto-js';
import { enc } from 'crypto-js';
import { EventoExpressService } from 'src/app/services/eventoExpress/evento-express.service';
import { EntradaExpressService } from 'src/app/services/entradaExpress/entrada-express.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  account: Account;
  currentDate = new Date(new Date().setHours(0,0,0,0)).toISOString()
  codigoQR: string = '';
  codeSend: any;
  webHook: string = 'https://hook.us1.make.com/hnsg8quugqfed73zgrxigild2afbocwj';
  keyEncrypt: string = 'Newo2023-';
  recordsStorageMiembros = [];
  recordsStorageInvitados = [];
  recordEntrances = []
  recordGuests = []
  recordExpress = []
  sede: any;
  typeTable: string = 'member';

  constructor(
    public navController: NavController,
    public sedesService: SedesService,
    public miembrosService: MiembrosService,
    public invitadosService: InvitadosService,
    public entradaMiembrosService: EntradaMiembrosService,
    public entradaInvitadosService: EntradaInvitadosService,
    public invitacionService: InvitacionService,
    private toastController: ToastController,
    private http: HttpClient,
    private loadingController: LoadingController,
    private eventoExpressService: EventoExpressService,
    private entradaExpressService: EntradaExpressService
    ) { }
    
    ionViewDidEnter() {
      document.getElementById('qrCodeInput') ? document.getElementById('qrCodeInput').focus() : null;
    }
    
    ngOnInit() {
      this.sede = JSON.parse(sessionStorage.getItem('sede'))
      this.getLastEntrnacesByLocation('miembros')
    }

    table(value: string) {
      this.typeTable = value
    }

    close() {
      sessionStorage.clear()
      this.navController.navigateForward('/');
    }

  async getLastEntrnacesByLocation(type){
    this.recordEntrances = []
    this.recordGuests= []
    this.recordExpress= []
    const loading = await this.loadingController.create({
      duration: 2000,
    });
    await loading.present();
   switch (type) {
    case 'miembros':
      this.recordEntrances = await this.getEntracesByMiembroAndSede()
      loading.dismiss()
      break;
    case 'invitados':
      this.recordGuests = await this.getEntracesByGuestsAndLocation()
      loading.dismiss()
      break;
    case 'expres':
      this.recordExpress = await this.getEntracesByInvitationsAndLocation()
      console.log(this.recordExpress)
      loading.dismiss()
      break;
   }
  }

  getEntracesByMiembroAndSede () {
    return new Promise<any>((resolve, reject) => {
       this.entradaMiembrosService.query(
        {
          'size' : 20,
          'sedeId.equals': this.sede['id'],
          'registroFecha.greaterThanOrEqual': this.currentDate,
          'sort' : ['id,desc']
        }
       ).subscribe({
        next: response => {
          const res : any = response.body
          const transform = res.map(item => ({
            user: item.user.email,
            date: item.registroFecha,
            out: item.salida,
          }));
          resolve(transform)
        },
        error: error => reject(error)
      });
    })
  }

  getEntracesByGuestsAndLocation () {
    return new Promise<any>((resolve, reject) => {
       this.entradaInvitadosService.query(
        {
          'size' : 20,
          'sedeId.equals': this.sede['id'],
          'registroFecha.greaterThanOrEqual': this.currentDate,
          'sort' : ['id,desc']
         }
       ).subscribe({
        next: response => {
          const res : any = response.body
          const transform = res.map(item => ({
            guest: item.invitado.correo,
            user: item.invitado.user.email,
            date: item.registroFecha,
            out: item.salida,
          }));
          resolve(transform)
        },
        error: error => reject(error)
      });
    })
  }

  getEntracesByInvitationsAndLocation () {
    return new Promise<any>(async (resolve, reject) => {
       this.entradaExpressService.query(
        {
          'size' : 20,
          'sedeId.equals': this.sede['id'],
          'registroFecha.greaterThanOrEqual': this.currentDate,
          'sort' : ['id,desc']
         }
       ).subscribe({
        next: response => resolve(response.body),
        // error: error =>  reject(error)
      });
    })
  }

  addPrefix(type) {
    document.getElementById('qrCodeInput').focus();
    setTimeout(() => {this.codigoQR = (type == 'in') ? '0,' : '1,'}, 5);
  }

  keypress(event) {
    if (event.key == 'Enter') {
      const code = this.codigoQR.split(',');
      if (code.length === 7) {
        const type = [code[0]];
        const decode = code.slice(1);
        if (decode.length === 6) {
          this.controllerEventosExpress(decode, type[0]);
        }
      } else {
        this.codeSend = {};
        this.codeSend.typeRegister = code[0]; //entrada 0 salida 1
        this.codeSend.typeUser = code[1]; //usuario 1 invitado 2
        this.codeSend.idUser = code[2]; //id_usuario / id_invitado 2
        this.codeSend.sede = this.sede['id']; //sede
        this.codeSend.dateRegister = new Date().toISOString(); //fecha registro
        this.codeSend.dateInvitation = code[5];
        (this.codeSend.typeRegister === '0' || this.codeSend.typeRegister === '1') && (code.length === 6 || code.length === 5)
          ? this.processCode(this.codeSend)
          : null;
      }
    }
  }

  processCode(code: any) {
    if (code.typeUser != '' || code.typeUser != undefined) {
      this.controller(code);
    }
  }

  async controller(code: any) {
    document.getElementById('code').focus();
    if (code.typeUser === '1') {
      this.validateMember(code);
    } else {
      const valTimeInv = await this.validateTimeInvitation(code.idUser, code);
      if (await this.validateTimeInvitation(code.idUser, code)) {
        this.sendWebHook();
      } else {
        this.handleFailedTransaction(true);
      }
    }
  }

  // ---------------
  // ---------------
  // ---------------
  // EVENTO EXPRESS
  // ---------------
  // ---------------
  // ---------------

  async controllerEventosExpress(code, type) {
    const codeEvent = await this.serializeData(code);
    // Cargar evento
    const event = await this.getEventExpress(codeEvent.idEvent);
    // Obtener tipo de registro ¿entrada / salida?
    let typeEvent: string;
    type == 0 ? (typeEvent = 'in') : (typeEvent = 'out');
    console.log(typeEvent)
    // Validar vigencia del evento
    const validity = await this.checkEventValidity(event.fechaInicioEvento, event.fechaFinEvento, event.sedes.id);
    !validity.status ? this.handleFailedTransaction( validity.message) : null;
    // Validar entrada
    let validityIn;
    let validityOut;
    let validityEmailExist;
    this.codeSend = {
      codeEvent: codeEvent,
      event: event
    };
    console.log(this.codeSend)
    this.codeSend.dateRegister = new Date().toISOString(); //fecha registro
    this.codeSend.typeRegister = type;
    this.codeSend.sede = this.sede['id']; //sede
    if (typeEvent === 'in') {
      validityIn = await this.validityInEvent(event, codeEvent);
      validityEmailExist = await this.validityEmailExist(event, codeEvent);
      !validityEmailExist ? this.handleFailedTransaction( "El evento esta lleno, no tiene capacidad para mas ingresos.") : null;
      !validityIn.status ? this.handleFailedTransaction( validityIn.message) : null;
      validityIn.status && validityEmailExist && validity.status ? this.sendWebHook() : null;
    }
    // Validar salida
    else {
      validityOut = await this.validityOutEvent(event, codeEvent);
      !validityOut.status ? this.handleFailedTransaction( validityOut.message) : null;
      validityOut.status ? this.sendWebHook() : null;
    }
 
  }

  async validityOutEvent(event, code) {
    try {
      const success = await this.entradaExpressService
        .query({
          'emailInvitado.equals': code.email,
          'eventoExpressId.equals': event.id,
          sort: ['registroFecha,desc'],
          'registroFecha.greaterOrEqualThan': this.currentDate,
          size: 1,
        })
        .toPromise();

      const numberRecords = success.body.length;
      if (numberRecords === 0 || success.body[0].salida) {
        return {
          status: false,
          message: 'No cuentas con registros de entrada',
        };
      } else {
        return {
          status: true,
          message: 'Tu ultimo registro es una entrada.',
        };
      }
    } catch (error) {
      console.error('error_entradaExpressService', error);
      throw {
        status: false,
        message: error,
      };
    }
  }

  async validityRecordsEvent(event, code) {
    try {
      const fechaHoy = moment().utcOffset(-5).startOf('day').toDate(); // Fecha de inicio del día en la hora local
      const success = await this.entradaExpressService
        .query({
          'salida.equals': false,
          'eventoExpressId.equals': event.id,
          sort: ['registroFecha,desc'],
          size:500
        })
        .toPromise();

      // Obtener el arreglo de correos electrónicos de los objetos
      const correosElectronicos = success.body.map(objeto => objeto.emailInvitado);
      
      // Obtener el número de correos electrónicos únicos utilizando un Set
      const correosElectronicosUnicos = new Set(correosElectronicos);
      const invitados = correosElectronicosUnicos.size;
      const capacidad = event.numeroInvitados;
      if(capacidad > invitados){
        return true;
      }else{
        return false;
      }
      
    } catch (error) {
      console.error('error_entradaExpressService', error);
      throw {
        status: false,
        message: error,
      };
    }
  }

  async validityEmailExist(event, code) {
    try {
      const success = await this.entradaExpressService
        .query({
          'emailInvitado.equals': code.email,
          'eventoExpressId.equals': event.id,
        })
        .toPromise();
      const numberRecords = success.body.length;
      if (numberRecords === 0) {
        const validityRecords = await this.validityRecordsEvent(event, code);
        return validityRecords;
      } else{
        return true
      }
    } catch (error) {
      console.error('error_entradaExpressService', error);
      throw {
        status: false,
        message: error,
      };
    }
  }

  async validityInEvent(event, code) {
    try {
      const success = await this.entradaExpressService
        .query({
          'emailInvitado.equals': code.email,
          'eventoExpressId.equals': event.id,
          sort: ['registroFecha,desc'],
          'registroFecha.greaterOrEqualThan': this.currentDate,
          size: 1,
        })
        .toPromise();
      const numberRecords = success.body.length;
      if (numberRecords === 0) {
        return {
          status: true,
          message: 'Primer registro',
        };
      } else if (success.body[0].salida) {
        return {
          status: true,
          message: 'Ultimo registro es salida',
        };
      } else {
        return {
          status: false,
          message: 'Tienes un registro de entrada sin finalizar.',
        };
      }
    } catch (error) {
      console.error('error_entradaExpressService', error);
      throw {
        status: false,
        message: error,
      };
    }
  }

  serializeData(code: string[]): Promise<any> {
    return new Promise((resolve, reject) => {
      let codeEvent = {
        type: '',
        idEvent: '',
        name: '',
        email: '',
        date: '',
        time: '',
      };

      [codeEvent.type, codeEvent.idEvent, codeEvent.name, codeEvent.email, codeEvent.date, codeEvent.time] = code;

      resolve(codeEvent);
    });
  }

  async getEventExpress(id): Promise<any> {
    try {
      const success = await this.eventoExpressService
        .query({
          'id.equals': id,
        })
        .toPromise();

      if (success.body.length > 0) {
        return success.body[0];
      } else {
        return {
          status: 'No existen registros',
          message: 'No se encontraron eventos para el ID proporcionado.',
        };
      }
    } catch (error) {
      console.error('error_eventoExpressService', error);
      throw error;
    }
  }

  checkEventValidity(start, end, sedeId) {
    const startEvent = new Date(Number(start));
    const endEvent = new Date(Number(end));
    const now = new Date();
    // Quitamos las horas, minutos, segundos y milisegundos de las fechas
    const endEventDateOnly = new Date(endEvent.getFullYear(), endEvent.getMonth(), endEvent.getDate());
    const nowDateOnly = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    if(String(sedeId) !== String(this.sede['id'])){
      return Promise.resolve({
        status: false,
        message: 'El evento no pertenece a esta sede.',
      });
    }
    else if (startEvent <= now && nowDateOnly <= endEventDateOnly) {
      return Promise.resolve({
        status: true,
        message: 'El evento está vigente.',
      });
    } else if (now < startEvent) {
      return Promise.resolve({
        status: false,
        message: 'El evento aún no ha comenzado.',
      });
    } else {
      return Promise.resolve({
        status: false,
        message: 'El evento ha finalizado.',
      });
    }
  }

  encriptarTexto(texto: string, clave: string): string {
    const textoEncriptado = AES.encrypt(texto, clave).toString();
    return textoEncriptado;
  }

  desencriptarTexto(textoEncriptado: string, clave: string): string {
    const bytes = AES.decrypt(textoEncriptado, clave);
    const textoDesencriptado = bytes.toString(enc.Utf8);
    return textoDesencriptado;
  }

  // ---------------
  // ---------------
  // ---------------
  // EVENTO EXPRESS
  // ---------------
  // ---------------
  // ---------------
  

  async getMiembro(userId) {
    return new Promise((resolve, reject) => {
      this.miembrosService.query({ 'id.equals': userId }).subscribe(
        (success) => resolve(success.body),
        (error) => reject(error)
      );
    });
  }

  async getUltimaEntradaMiembro(userId) {
    return new Promise((resolve, reject) => {
      this.entradaMiembrosService
        .query({
          'userId.equals': userId,
          size: 1,
          'registroFecha.greaterOrEqualThan': this.currentDate,
          sort: ['registroFecha,desc'],
        })
        .subscribe(
          (success) => {
            resolve(success.body[0]);
          },
          (error) => {
            reject(error);
          }
        );
    });
  }

  async getUltimaEntradaInvitado(invitadoId) {
    return new Promise((resolve, reject) => {
      this.entradaInvitadosService
        .query({
          'invitadoId.equals': invitadoId,
          size: 1,
          'registroFecha.greaterOrEqualThan': this.currentDate,
          sort: ['registroFecha,desc'],
        })
        .subscribe(
          (success) => {
            resolve(success.body[0]);
          },
          (error) => {
            reject(error);
          }
        );
    });
  }

  async getInvitacion(userId) {
    return new Promise((resolve, reject) => {
      this.invitacionService
        .query({
          'invitadoId.equals': userId,
          'fechaFin.greaterOrEqualThan': this.currentDate,
          sort: ['fechaFin,asc'],
        })
        .subscribe(
          (success) => {
            resolve(success.body);
          },
          (error) => {
            reject(error);
          }
        );
    });
  }



  async validateMember(code) {
    const getMiembro = await this.getMiembro(code.idUser);
    const getUltimaEntradaMiembro: any = await this.getUltimaEntradaMiembro(getMiembro[0].user.id);
    //ENTRADA
    if (getUltimaEntradaMiembro != undefined) {
      if (code.typeRegister == 0) {
        if (!getUltimaEntradaMiembro.salida) {
          this.handleFailedTransaction( 'No cuentas con registros de entrada.');
          return
        }
      }
      //SALIDA
      else if (code.typeRegister == 1) {
        if (getUltimaEntradaMiembro.salida) {
          this.handleFailedTransaction( 'Tienes un registro de entrada sin finalizar.');
          return 
        }
        if (getUltimaEntradaMiembro.sede.id != this.sede['id']) {
          this.handleFailedTransaction( 'Tienes un registro de entrada en una sede diferente a la actual.');
          return 
        }
      }
    } 

    const time = new Date(Number(this.codeSend.dateInvitation));
    const now = new Date();
    const tiempoDiferencia = now.getTime() - time.getTime();
    const diferenciaMinutos = Math.floor(((tiempoDiferencia % 86400000) % 3600000) / 60000);
    if (diferenciaMinutos > 10) {
      this.handleFailedTransaction( 'Código QR ha expirado, genera uno nuevo.');
    } else {
      this.sendWebHook();
    }
  }

  async validateTimeInvitation(id: any, code: any): Promise<boolean> {
    let resultado = false;
    try {
      const success = await this.invitacionService.findById(id).toPromise();
      const invitadoId = success.body[0].invitado.id;
      const fechaFin = success.body[0].fechaFin;
      const fechaActual = new Date().toISOString();
      let sinSalida = false;
      let sinEntrada = false;
      if (fechaFin > fechaActual) {
        const miembroSuccess = await this.miembrosService
          .query({
            'userId.equals': success.body[0].invitado.user.id,
          })
          .toPromise();
        const ingresoSedes = miembroSuccess.body[0].nivel.ingresoSedes;
        const userActivated = miembroSuccess.body[0].user.activated;
        if (ingresoSedes && userActivated) {
          const ultimoRegistroInvitado: any = await this.getUltimaEntradaInvitado(invitadoId);
          if (ultimoRegistroInvitado != undefined) {
            //ENTRADA
            if (code.typeRegister == 0) {
              if (!ultimoRegistroInvitado.salida) {
                resultado = false;
                sinSalida = true;
                 this.handleFailedTransaction( 'Tienes un registro de entrada sin finalizar.');
              } else {
                resultado = true;
              }
            }
            //SALIDA
            else if (code.typeRegister == 1) {
              if (ultimoRegistroInvitado.salida) {
                sinEntrada = true;
                resultado = false;
                 this.handleFailedTransaction( 'No cuentas con registros de entrada.');
              } else {
                resultado = true;
              }
            } else {
              resultado = false;
               this.handleFailedTransaction( 'Vuelve a escanear el codigo, si el problema persiste genera uno nuevo.');
            }
          } else {
            if (code.typeRegister == 1) {
              sinEntrada = true;
              resultado = false;
               this.handleFailedTransaction( 'Ya cuentas con registros de entrada.');
            } else {
              resultado = true;
            }
          }
        } else {
           this.handleFailedTransaction( 'Quien te invito no cuenta con los permisos necesarios.');
          resultado = false;
        }
      } else {
         this.handleFailedTransaction( 'Código QR ha expirado, genera uno nuevo');
        resultado = false;
      }
    } catch (error) {
      console.error('error_invitacionService', error);
    }
    return resultado;
  }

  async sendWebHook() {
    const loading = await this.loadingController.create({
      duration: 10000,
    });
    await loading.present();
    // https://us1.make.com/30786/scenarios/868157/logs/6bacb8bfa8db4134990371df8ae2937e?showCheckRuns=true
    this.http.post(this.webHook, this.codeSend, { responseType: 'text' }).subscribe(
      async (response) => {
        if (response != 'Accepted') {
          const responseJson = JSON.parse(response);
          if (responseJson.status === 'ok') {
            loading.dismiss()
            this.successfulTransaction();
          } else {
            loading.dismiss()
            this.handleFailedTransaction( 'Ocurrio un error de conexión, vuelve a intentar.');
          }
        } else {
          loading.dismiss()
          this.handleFailedTransaction( 'Ocurrio un error de conexión, vuelve a intentar.');
        }
      },
      (error) => {
        loading.dismiss()
        this.handleFailedTransaction( "Error de conexión vuelva a intentar.")
        console.error('Error en la petición:', error);
      }
    );
  }

  handleFailedTransaction(message){
    this.codigoQR = ''
    this.presentToast(message)
  }

  successfulTransaction(){
    this.codigoQR = ''
    this.presentToast('Registro exitoso')
    this.ngOnInit()
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position:'top',
      color:'dark'
    });
    toast.present();
  }
  
}
