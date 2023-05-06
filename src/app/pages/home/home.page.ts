import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
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
import { Storage } from '@ionic/storage-angular';
import { StorageIonicServer } from 'src/app/services/storage/storage.service';
import * as moment from 'moment';


// CONTINUAR CON LO SIGUIENTE
// // // // AGREGAR EN LOS ARREGLOS LA FECHA DE LA ENTRADA / SALIDA
// SI TIENE DATA DEL DIA GUARDAR DICHA DATA EN LAS PROPIEDADES
//     recordsStorageMiembros = [];
//     recordsStorageInvitados = [];
// AGREGAR STORAGE Y ACTUALIZAR LAS PROPIEDADES EN CADA NUEVO REGISTRO
// CREAR UN METODO DE VALIDACION

    
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  account: Account;
  codigoQR: any = ''
  identificadorTorniquete: any = localStorage.getItem('sede')
  pin_input: any = localStorage.getItem('pin_input')
  pin_output: any = localStorage.getItem('pin_out')
  sedeLogin: any = localStorage.getItem('sede')
  sedeTorniquete: any = []
  mensaje: any = "Escanea tu QR en el lector"
  img: any = ""
  lastId: any = undefined
  newId: any = undefined
  codeSend: any
  webHook: any = "https://hook.us1.make.com/hnsg8quugqfed73zgrxigild2afbocwj"
  loading:any
  recordsStorageMiembros = [];
  recordsStorageInvitados = [];

  constructor(
    public navController: NavController,
    public sedesService: SedesService,
    public miembrosService: MiembrosService,
    public invitadosService: InvitadosService,
    public entradaMiembrosService: EntradaMiembrosService,
    public entradaInvitadosService: EntradaInvitadosService,
    public invitacionService: InvitacionService,
    private http: HttpClient,
    private storage: Storage,
    private storageIonicServer: StorageIonicServer,
    private loadingController:LoadingController
  ) {

    this.loadHistoryStorage()
    // this.clearStorage()
  }
  async loadHistoryStorage(){
    const itemsStorage = await this.storageIonicServer.getAllItems()
    console.log("itemsStorage==>",itemsStorage)
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Cargando...',
    });
    await this.loading.present();
  }

  // async selfManageHistory(){
  //   const registrosTodayMiembros = await this.getRecordsOfDayMiembros()
  //   const getRecordsOfDayInvitados = await this.getRecordsOfDayInvitados()
  //   const date = new Date().toLocaleDateString("es-ES");
  //   if(registrosTodayMiembros){
  //     const valor = await this.storageIonicServer.getItem(`${date}-MIEMBROS`);
  //     this.recordsStorageMiembros = valor;
  //     console.log("this.recordsStorageMiembros",this.recordsStorageMiembros)
  //     this.getAllItemsStorage()
  //     // this.clearStorage()
  //   }else{
  //     this.presentLoading()
  //     const queryRecordsOfDayMiembros = await this.queryRecordsOfDayMiembros();
  //     const saveRecordsOfDayMiembros = await this.saveRecordsOfDayMiembros(queryRecordsOfDayMiembros);
  //     this.saveStorage(`${date}-MIEMBROS`,saveRecordsOfDayMiembros)
  //     console.log("this.recordsStorageMiembros",this.recordsStorageMiembros)
  //     this.loading.dismiss()
  //   }

  //   if(getRecordsOfDayInvitados){
  //     this.getAllItemsStorage()
  //     const valor = await this.storageIonicServer.getItem(`${date}-INVITADOS`);
  //     this.recordsStorageInvitados = valor;
  //     console.log("this.recordsStorageInvitados",this.recordsStorageInvitados)
  //   }else{
  //     this.presentLoading()
  //     const queryRecordsOfDayOnvitados = await this.queryRecordsOfDayOnvitados();
  //     const saveRecordsOfDayInvitados = await this.saveRecordsOfDayInvitados(queryRecordsOfDayOnvitados);
  //     const date = new Date().toLocaleDateString("es-ES");
  //     this.saveStorage(`${date}-INVITADOS`,saveRecordsOfDayInvitados)
  //     console.log("this.recordsStorageInvitados",this.recordsStorageInvitados)
  //     this.loading.dismiss()
  //   }
  // }

  // async getRecordsOfDayMiembros(){
  //   const date = new Date().toLocaleDateString("es-ES");
  //   const fechas  = await this.storageIonicServer.getAllKeys();
  //   const storageMiembros = fechas.filter(fecha => fecha.includes(`${date}-MIEMBROS`));
  //   let registerToday = false;
  //   if(storageMiembros.length > 0){
  //     registerToday = true;
  //   }else{
  //     registerToday = false;
  //   }
  //   return registerToday;
  // }

  // async getRecordsOfDayInvitados(){
  //   const date = new Date().toLocaleDateString("es-ES");
  //   const fechas  = await this.storageIonicServer.getAllKeys();
  //   const storageInvitados = fechas.filter(fecha => fecha.includes(`${date}-INVITADOS`));
  //   let registerToday = false;
  //   if(storageInvitados.length > 0){
  //     registerToday = true;
  //   }else{
  //     registerToday = false;
  //   }
  //   return registerToday;
  // }

  // async saveRecordsOfDayMiembros(records) {

  //   await Promise.all(records.map(async (element) => {
  //     let typeRecord 
  //     element.salida ? typeRecord = 0 : typeRecord = 1;
  //     const dateRegister = element.registroFecha
  //     const miembro = await this.getMiembro(element.user.id);
  //     const arr = `${typeRecord},1,${miembro[0].id},v2,${typeRecord},${element.registroFecha},${dateRegister}`;
  //     this.recordsStorageMiembros.push(arr);
  //   }));

  //   return this.recordsStorageMiembros;
  // }

  // async saveRecordsOfDayInvitados(records) {
  //   await Promise.all(records.map(async (element) => {
  //     let typeRecord 
  //     element.salida ? typeRecord = 0 : typeRecord = 1;
  //     const dateRegister = element.registroFecha
  //     if (element.invitado !== null) {
  //       const invitacion:any = await this.getInvitacion(element.invitado.id);
  //       invitacion.forEach(element => {
  //         const arr = `${typeRecord},2,${element.id},${element.fechaFin},${dateRegister}`;
  //         this.recordsStorageInvitados.push(arr);
  //       });
  //     } else {
  //       // handle the case where myObject is null
  //     }
      
   
  //   }));

  //   return this.recordsStorageInvitados;
  // }


  // async queryRecordsOfDayMiembros() {
  //   return new Promise((resolve, reject) => {
  //     const fechaHoy = moment().utcOffset(-5).startOf('day').toDate(); // Fecha de inicio del día en la hora local
  //     const fechaManana = moment(fechaHoy).add(1, 'day').toDate(); // Fecha de inicio del día siguiente en la hora local
  //     this.entradaMiembrosService.query({
  //       'registroFecha.greaterOrEqualThan': fechaHoy.toISOString(),
  //       'registroFecha.lessThan': fechaManana.toISOString(),
  //       'size': 999999,
  //       'sort': ['registroFecha,asc'],
  //       'sedeId.equals': localStorage.getItem('sede')
  //     }).subscribe(
  //       success => {
  //         resolve(success.body);
  //       }, error => {
  //         reject(error);
  //       }
  //     )
  //   });
  // }

  // async queryRecordsOfDayOnvitados() {
  //   return new Promise((resolve, reject) => {
  //     const fechaHoy = moment().utcOffset(-5).startOf('day').toDate(); // Fecha de inicio del día en la hora local
  //     const fechaManana = moment(fechaHoy).add(1, 'day').toDate(); // Fecha de inicio del día siguiente en la hora local
  //     this.entradaInvitadosService.query({
  //       'registroFecha.greaterOrEqualThan': fechaHoy.toISOString(),
  //       'registroFecha.lessThan': fechaManana.toISOString(),
  //       'size': 999999,
  //       'sort': ['registroFecha,asc'],
  //       'sedeId.equals': localStorage.getItem('sede')
  //     }).subscribe(
  //       success => {
  //         resolve(success.body);
  //       }, error => {
  //         reject(error);
  //       }
  //     )
  //   });
  // }

  async getMiembro(userId) {
    return new Promise((resolve, reject) => {
      this.miembrosService.query({'id.equals': userId}).subscribe(
        success => {
          resolve(success.body);
        },
        error => {
          reject(error);
        }
      );
    });
  }

  async getUltimaEntradaMiembro(userId) {
    const fechaHoy = moment().utcOffset(-5).add(5, 'hours').startOf('day').toDate(); // Fecha de inicio del día en la hora local
    console.log('fechaHoy.toISOString---->',fechaHoy.toISOString())
    return new Promise((resolve, reject) => {
      this.entradaMiembrosService.query({
        'userId.equals': userId,
        'size': 1,
        'registroFecha.greaterOrEqualThan': fechaHoy.toISOString(),
        'sort': ['registroFecha,desc']
      }).subscribe(
        success => {
          console.log("entradaMiembrosService",success.body[0])
          resolve(success.body[0]);
        },
        error => {
          reject(error);
        }
      );
    });
  }

  async getUltimaEntradaInvitado(invitadoId) {
    const fechaHoy = moment().utcOffset(-5).add(5, 'hours').startOf('day').toDate(); // Fecha de inicio del día en la hora local

    return new Promise((resolve, reject) => {
      this.entradaInvitadosService.query({
        'invitadoId.equals': invitadoId,
        'size': 1,
        'registroFecha.greaterOrEqualThan': fechaHoy.toISOString(),
        'sort': ['registroFecha,desc']
      }).subscribe(
        success => {
          resolve(success.body[0]);
        },
        error => {
          reject(error);
        }
      );
    });
  }

  async getInvitacion(userId) {
    const fechaHoy = moment().utcOffset(-5).add(-1, 'day').startOf('day').toDate(); // Fecha de inicio del día en la hora local
    return new Promise((resolve, reject) => {
      this.invitacionService.query({
        'invitadoId.equals': userId,
        'fechaFin.greaterOrEqualThan': fechaHoy.toISOString(),
        'sort': ['fechaFin,asc'],
      }).subscribe(
        success => {
          resolve(success.body);
        },
        error => {
          reject(error);
        }
      );
    });
  }



  async saveStorage(key,value) {
    await this.storageIonicServer.setItem(key,value);
  }

  async getKeyStorage(key) {
    const valor = await this.storageIonicServer.getItem(key);
    console.log("valor_getKeyStorage",valor);
  }

  async deleteKeyStorage(key) {
    await this.storageIonicServer.removeItem(key);
  }

  async clearStorage() {
    await this.storageIonicServer.clear();
  }

  async getAllItemsStorage() {
    const items = await this.storageIonicServer.getAllItems();
    console.log("items",items);
  }

  async getAllKeysStorage() {
    const keys = await this.storageIonicServer.getAllKeys();
    return keys
  }

  ionViewDidEnter() {
    (document.getElementById('qrCodeInput'))
      ? document.getElementById('qrCodeInput').focus()
      : null;
    this.loadSede()
    console.log("this.pin_input", this.pin_input)
    console.log("this.pin_output", this.pin_output)
    console.log("this.sedeLogin", this.sedeLogin)

  }

  loadSede() {
    this.sedesService.query({
      'id.equals': this.sedeLogin
    }).subscribe(
      succes => {
        this.sedeLogin = succes.body[0].nombreSede
        console.log(this.sedeLogin)
      }
    )
  }

  keypress(event) {
    if (event.key == "Enter") {
      const code = this.codigoQR.split(',')
      console.log("code---->",code)
      console.log("code---->",code.length)
      const codeReset = code[0] + code[1] + code[2]
      codeReset === '666' ? this.resetAll() : null;
      this.codeSend = {}
      this.codeSend.typeRegister = code[0] //entrada 0 salida 1
      this.codeSend.typeUser = code[1] //usuario 1 invitado 2
      this.codeSend.idUser = code[2] //id_usuario / id_invitado 2
      this.codeSend.sede = localStorage.getItem('sede') //sede
      this.codeSend.dateRegister = new Date().toISOString() //fecha registro
      this.codeSend.dateInvitation = code[5];
      ((this.codeSend.typeRegister === '0' || this.codeSend.typeRegister === '1') && (code.length === 6 || code.length === 5))
        ? this.processCode(this.codeSend)
        : this.resetDonut()
    }
  }

  processCode(code: any) {
    console.log("code---input-",code)
    console.log("code---input-",JSON.stringify(code))
    this.mensaje = 'Validando tu código QR'
    this.loadDonut()
    this.valueDonut(25);
    if (code.typeUser != '' || code.typeUser != undefined) {
      this.controller(code)
    }
  }

  async controller(code: any) {
    document.getElementById('code').focus();
    if (code.typeUser === '1') {
      this.validateMember(code)
    } else {
      const valTimeInv = await this.validateTimeInvitation(code.idUser,code);
      console.log('valTimeInv',valTimeInv)
      if (await this.validateTimeInvitation(code.idUser,code)) {
        this.valueDonut(50)
        this.sendWebHook()
      } else {
        this.loadDonutError(true)
      }
    }
  }

















  
  async validateMember(code) {
    let sinSalida = false;
    let sinEntrada = false;
    this.mensaje = 'Validando miembro.'
    this.valueDonut(50)
    const getMiembro = await this.getMiembro(code.idUser);
    const getUltimaEntradaMiembro:any = await this.getUltimaEntradaMiembro(getMiembro[0].user.id);
    //ENTRADA
    if(getUltimaEntradaMiembro != undefined){
      if(code.typeRegister == 0){
        if(!getUltimaEntradaMiembro.salida){
          sinSalida = true;
        }
      }
      //SALIDA
      else if(code.typeRegister == 1){
        if(getUltimaEntradaMiembro.salida){
          sinEntrada = true;
        }
      }
    }else{
      if(code.typeRegister == 1){
          sinEntrada = true;
      }
    }

    const time = new Date(Number(this.codeSend.dateInvitation))
    const now = new Date()
    const tiempoDiferencia = (now.getTime() - time.getTime())
    const diferenciaMinutos = Math.floor(((tiempoDiferencia % 86400000) % 3600000) / 60000);
    console.log(`diferenciaMinutos ${diferenciaMinutos}`)
    if (diferenciaMinutos > 10) {
      this.mensaje = 'Código QR ha expirado, genera uno nuevo.'
      this.loadDonutError(true)
    }else if(sinSalida){
      this.mensaje = 'Tienes un registro de entrada sin finalizar.'
      this.loadDonutError(true)
    }else if(sinEntrada){
      this.mensaje = 'No cuentas con registros de entrada.'
      this.loadDonutError(true)
    } else {
      this.sendWebHook()
    }
  }









  async validateTimeInvitation(id: any,code:any): Promise<boolean> {
    let resultado = false;
    this.mensaje = 'Validando invitado.';
    this.valueDonut(50);
    try {
      const success = await this.invitacionService.findById(id).toPromise();
      const invitadoId = success.body[0].invitado.id;
      const fechaFin = success.body[0].fechaFin;
      const fechaActual = new Date().toISOString();
      let sinSalida = false;
      let sinEntrada = false;
      if (fechaFin > fechaActual) {
        const miembroSuccess = await this.miembrosService.query({
          'userId.equals': success.body[0].invitado.user.id
        }).toPromise();
        const ingresoSedes = miembroSuccess.body[0].nivel.ingresoSedes
        const userActivated = miembroSuccess.body[0].user.activated;
        if(ingresoSedes && userActivated){


          const ultimoRegistroInvitado:any = await this.getUltimaEntradaInvitado(invitadoId);
          console.log("ultimoRegistroInvitado",ultimoRegistroInvitado)
          if(ultimoRegistroInvitado != undefined){
            //ENTRADA
            if(code.typeRegister == 0){
              if(!ultimoRegistroInvitado.salida){
                resultado = false
                sinSalida = true;
                this.mensaje = 'Tienes un registro de entrada sin finalizar.'
              }else{
                resultado = true
              }
            }
            //SALIDA
            else if(code.typeRegister == 1){
              if(ultimoRegistroInvitado.salida){
                sinEntrada = true;
                resultado = false
                this.mensaje = 'No cuentas con registros de entrada.'
              }else{
                resultado = true
              }
            }else{
              resultado = false
              this.mensaje = 'Vuelve a escanear el codigo, si el problema persiste genera uno nuevo.'
            }
          }else{
            if(code.typeRegister == 1){
              sinEntrada = true;
              resultado = false
              this.mensaje = 'No cuentas con registros de entrada.'
            }else{
              resultado = true
            }
          }
        }else{
        this.mensaje = "Quien te invito no cuenta con los permisos necesarios."
        resultado = false
        }
          
      } else {
        this.mensaje = "Código QR ha expirado, genera uno nuevo"
        resultado = false;
      }
    } catch (error) {
      console.error("error_invitacionService", error);
    }
    return resultado;
  }

  async sendWebHook() {
    // https://us1.make.com/30786/scenarios/868157/logs/6bacb8bfa8db4134990371df8ae2937e?showCheckRuns=true
    this.http.post(this.webHook, this.codeSend, { responseType: 'text' }).subscribe(
      async (response) => {
        if(response != 'Accepted'){
          const responseJson = JSON.parse(response)
          console.log('responseJson',responseJson)
          if(responseJson.status === 'ok'){
            
            this.successDonut(Number(this.codeSend.typeRegister),responseJson);

          }else{
            this.mensaje = 'Ocurrio un error de conexión, vuelve a intentar.'
            this.loadDonutError(true)
          }
        }else{
          this.mensaje = 'Ocurrio un error de conexión, vuelve a intentar.'
          this.loadDonutError(true)
        }
      },
      (error) => {
        console.error('Error en la petición:', error);
      }
    );
  }


































  resetAll() {
    localStorage.setItem('sede', '')
    localStorage.setItem('pin_out', '')
    localStorage.setItem('pin_out', '')
    this.navController.navigateRoot('/')
  }





  autofocus() {
    setTimeout(() => {
      document.getElementById('code').focus();
    }, 500);

    setTimeout(() => {
      document.getElementById('qrCodeInput').focus()
    }, 2000);
  }



























  /* Controladores de vista */

  loadDonutError(status: boolean) {
    let rootElement = document.documentElement;
    rootElement.style.setProperty("--donut-value-medicion", '0');
    setTimeout( ()=> {
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

  async successDonut(estadoQR: number,responseJson) {
    this.valueDonut(70)
    setTimeout(() => {
      this.valueDonut(100)
    }, 2000);
    const fechaActual = moment().toDate();
    if (estadoQR == 0) {
      this.mensaje = `¡Bienvenido a Newo ${this.sedeLogin}!`
      await this.storageIonicServer.setItem(`{"id":${this.codeSend.idUser},"type":"entrada","fecha": ${fechaActual}}`,JSON.stringify(responseJson))
      this.activatePinE()
      this.img = "assets/img/donut-step-5.png"
      setTimeout(() => {
      this.resetDonut()
      }, 3000);
    } else {
      this.mensaje = "¡Hasta pronto!"
      await this.storageIonicServer.setItem(`{"id":${this.codeSend.idUser},"type":"salida","fecha": ${fechaActual}}`,JSON.stringify(responseJson))
      this.activatePinS()
      this.img = "assets/img/donut-step-5.png"
      setTimeout(() => {
      this.resetDonut()
      }, 3000);
    }
  }


  resetDonut() {
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


  activatePinE() {
    this.http.get(`http://localhost:8000/apagar/${this.pin_input}`).subscribe(
      success => {
      }, error => {
        console.error("error_OFF_pin", error)
      }
    )

    setTimeout(() => {
      this.http.get(`http://localhost:8000/encender/${this.pin_input}`).subscribe(
        success => {
        }, error => {
          console.error("error_ON_pin", error)
        }
      )
    }, 3000);
  }

  activatePinS() {
    this.http.get(`http://localhost:8000/apagar/${this.pin_output}`).subscribe(
      success => {
      }, error => {
        console.error("error_OFF_pin", error)
      }
    )

    setTimeout(() => {
      this.http.get(`http://localhost:8000/encender/${this.pin_output}`).subscribe(
        success => {
        }, error => {
          console.error("error_ON_pin", error)
        }
      )
    }, 3000);
  }



}
