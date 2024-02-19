"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_pages_login_login_module_ts"],{

/***/ 1053:
/*!*********************************************!*\
  !*** ./src/app/pages/login/login.module.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LoginPageModule": () => (/* binding */ LoginPageModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 4666);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ 124);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ 5992);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ngx-translate/core */ 3935);
/* harmony import */ var _login_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./login.page */ 3058);








const routes = [
    {
        path: '',
        component: _login_page__WEBPACK_IMPORTED_MODULE_0__.LoginPage
    }
];
let LoginPageModule = class LoginPageModule {
};
LoginPageModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
        imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormsModule, _ionic_angular__WEBPACK_IMPORTED_MODULE_5__.IonicModule, _angular_router__WEBPACK_IMPORTED_MODULE_6__.RouterModule.forChild(routes), _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__.TranslateModule],
        declarations: [_login_page__WEBPACK_IMPORTED_MODULE_0__.LoginPage]
    })
], LoginPageModule);



/***/ }),

/***/ 3058:
/*!*******************************************!*\
  !*** ./src/app/pages/login/login.page.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LoginPage": () => (/* binding */ LoginPage)
/* harmony export */ });
/* harmony import */ var C_newodev_repositorios_torniquetes_newo1_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 1670);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _login_page_html_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./login.page.html?ngResource */ 6752);
/* harmony import */ var _login_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./login.page.scss?ngResource */ 8433);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ 5992);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ 2124);
/* harmony import */ var src_app_services_sedes_sedes_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/sedes/sedes.service */ 9726);
/* harmony import */ var _services_login_login_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../services/login/login.service */ 8762);








let LoginPage = class LoginPage {
  constructor(loginService, toastController, navController, sedesService, loadingController) {
    this.loginService = loginService;
    this.toastController = toastController;
    this.navController = navController;
    this.sedesService = sedesService;
    this.loadingController = loadingController;
    this.account = {
      username: '',
      password: '',
      rememberMe: false
    };
    this.isLogin = false;
    this.selected = 0;
  }
  login() {
    var _this = this;
    return (0,C_newodev_repositorios_torniquetes_newo1_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (_this.account.username && _this.account.password) {
        try {
          const response = yield _this.loginService.login(_this.account);
          if (response) {
            sessionStorage.setItem('account', JSON.stringify(response));
            _this.presentToast('Successful authentication');
            _this.isLogin = true;
            yield _this.searchSedes();
          }
        } catch (error) {
          _this.presentToast(error.error.detail);
        }
      } else {
        _this.presentToast('Username and password are required');
      }
    })();
  }
  searchSedes() {
    var _this2 = this;
    return (0,C_newodev_repositorios_torniquetes_newo1_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const loading = yield _this2.loadingController.create({
        duration: 2000
      });
      yield loading.present();
      _this2.sedesService.query().subscribe({
        next: response => {
          _this2.sedes = response.body;
          console.log(_this2.sedes);
        },
        error: error => {
          console.log(error);
        }
      });
    })();
  }
  sedeSelected(value) {
    this.selected = value.id;
    sessionStorage.setItem('sede', JSON.stringify(value));
  }
  goHome() {
    if (this.selected !== 0) {
      this.navController.navigateRoot('/tabs/home');
    } else {
      this.presentToast('Seleccione una sede para continuar');
    }
  }
  presentToast(message) {
    var _this3 = this;
    return (0,C_newodev_repositorios_torniquetes_newo1_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const toast = yield _this3.toastController.create({
        message,
        duration: 2000,
        color: 'dark',
        position: 'top'
      });
      toast.present();
    })();
  }
};
LoginPage.ctorParameters = () => [{
  type: _services_login_login_service__WEBPACK_IMPORTED_MODULE_4__.LoginService
}, {
  type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__.ToastController
}, {
  type: _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.NavController
}, {
  type: src_app_services_sedes_sedes_service__WEBPACK_IMPORTED_MODULE_3__.SedesService
}, {
  type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__.LoadingController
}];
LoginPage = (0,tslib__WEBPACK_IMPORTED_MODULE_7__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_8__.Component)({
  selector: 'app-login',
  template: _login_page_html_ngResource__WEBPACK_IMPORTED_MODULE_1__,
  styles: [_login_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_2__]
})], LoginPage);


/***/ }),

/***/ 8433:
/*!********************************************************!*\
  !*** ./src/app/pages/login/login.page.scss?ngResource ***!
  \********************************************************/
/***/ ((module) => {

module.exports = "* {\n  color: var(--ion-color-white);\n}\n\n.content-cards {\n  display: flex;\n  justify-content: space-around;\n}\n\n.content-cards ion-card {\n  width: 30vw;\n  cursor: pointer;\n}\n\n.sedes {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  gap: 16px;\n}\n\n.sedes .contentSede {\n  display: grid;\n  grid-template-rows: repeat(2, 1fr);\n  align-items: end;\n  width: 200px;\n}\n\n.sedes .contentSede .booking-imgBlur {\n  height: 25px;\n  grid-row: 2;\n  grid-column: 1/3;\n  background: rgba(5, 5, 9, 0.23);\n  -webkit-backdrop-filter: blur(6px);\n          backdrop-filter: blur(6px);\n  border-radius: 0 0 8px 8px;\n}\n\n.sedes .contentSede img {\n  width: 200px;\n  height: 100px;\n  border-radius: 8px;\n  grid-row: 1/3;\n  grid-column: 1/3;\n}\n\n.sedes .contentSede p {\n  margin: 3px;\n  grid-row: 2;\n  grid-column: 1;\n  background-color: transparent;\n  z-index: 2;\n}\n\n.sedes .Selected {\n  border: solid var(--ion-color-aqua);\n  border-radius: 8px;\n}\n\n.btn {\n  margin-top: 2.54vh;\n}\n\nsection {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  height: 100vh;\n  width: 100vw;\n}\n\nsection .backgroundImg {\n  position: absolute;\n  top: 60px;\n}\n\nsection .backgroundImg img {\n  height: 60vh;\n  opacity: 0.05;\n}\n\nion-input {\n  color: var(--ion-color-white);\n}\n\nion-input ion-label {\n  border-bottom: solid 0.5px var(--ion-color-lightgray3);\n  --color: var(--ion-color-white);\n}\n\nion-input ion-label div {\n  background-color: red;\n}\n\nion-button {\n  --background: var(--ion-color-white);\n  --background-activated: var(--ion-color-white-shade);\n  color: var(--ion-color-black);\n  text-transform: capitalize;\n}\n\nion-toolbar {\n  --background: transparent;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvZ2luLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUVJLDZCQUFBO0FBQUo7O0FBRUE7RUFDSSxhQUFBO0VBQ0EsNkJBQUE7QUFDSjs7QUFBSTtFQUNJLFdBQUE7RUFDQSxlQUFBO0FBRVI7O0FBRUE7RUFDSSxhQUFBO0VBQ0EscUNBQUE7RUFDQSxTQUFBO0FBQ0o7O0FBQ0k7RUFDSSxhQUFBO0VBQ0Esa0NBQUE7RUFDQSxnQkFBQTtFQUNBLFlBQUE7QUFDUjs7QUFDUTtFQUNJLFlBQUE7RUFDQSxXQUFBO0VBQ0EsZ0JBQUE7RUFDQSwrQkFBQTtFQUNBLGtDQUFBO1VBQUEsMEJBQUE7RUFDQSwwQkFBQTtBQUNaOztBQUVRO0VBQ0ksWUFBQTtFQUNBLGFBQUE7RUFDQSxrQkFBQTtFQUNBLGFBQUE7RUFDQSxnQkFBQTtBQUFaOztBQUdRO0VBQ0ksV0FBQTtFQUNBLFdBQUE7RUFDQSxjQUFBO0VBQ0EsNkJBQUE7RUFDQSxVQUFBO0FBRFo7O0FBS0k7RUFDSSxtQ0FBQTtFQUNBLGtCQUFBO0FBSFI7O0FBUUE7RUFDSSxrQkFBQTtBQUxKOztBQVFBO0VBQ0ksYUFBQTtFQUNBLHNCQUFBO0VBQ0EsbUJBQUE7RUFDQSx1QkFBQTtFQUNBLGFBQUE7RUFDQSxZQUFBO0FBTEo7O0FBT0k7RUFDSSxrQkFBQTtFQUNBLFNBQUE7QUFMUjs7QUFPUTtFQUNJLFlBQUE7RUFDQSxhQUFBO0FBTFo7O0FBWUE7RUFDSSw2QkFBQTtBQVRKOztBQVdJO0VBQ0ksc0RBQUE7RUFDQSwrQkFBQTtBQVRSOztBQVVRO0VBQ0kscUJBQUE7QUFSWjs7QUFhQTtFQUNJLG9DQUFBO0VBQ0Esb0RBQUE7RUFDQSw2QkFBQTtFQUNBLDBCQUFBO0FBVko7O0FBYUE7RUFDSSx5QkFBQTtBQVZKIiwiZmlsZSI6ImxvZ2luLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIioge1xyXG4gICAgLy8gYmFja2dyb3VuZC1jb2xvcjogdmFyKC0taW9uLWNvbG9yLWJsYWNrKTtcclxuICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3Itd2hpdGUpO1xyXG59XHJcbi5jb250ZW50LWNhcmRze1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xyXG4gICAgaW9uLWNhcmR7XHJcbiAgICAgICAgd2lkdGg6IDMwdnc7XHJcbiAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xyXG4gICAgfVxyXG59XHJcblxyXG4uc2VkZXMge1xyXG4gICAgZGlzcGxheTogZ3JpZDtcclxuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDIsIDFmcik7XHJcbiAgICBnYXA6IDE2cHg7XHJcblxyXG4gICAgLmNvbnRlbnRTZWRlIHtcclxuICAgICAgICBkaXNwbGF5OiBncmlkO1xyXG4gICAgICAgIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDIsIDFmcik7XHJcbiAgICAgICAgYWxpZ24taXRlbXM6IGVuZDtcclxuICAgICAgICB3aWR0aDogMjAwcHg7XHJcblxyXG4gICAgICAgIC5ib29raW5nLWltZ0JsdXIge1xyXG4gICAgICAgICAgICBoZWlnaHQ6IDI1cHg7XHJcbiAgICAgICAgICAgIGdyaWQtcm93OiAyO1xyXG4gICAgICAgICAgICBncmlkLWNvbHVtbjogMS8zO1xyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiByZ2JhKDUsIDUsIDksIDAuMjMpO1xyXG4gICAgICAgICAgICBiYWNrZHJvcC1maWx0ZXI6IGJsdXIoNnB4KTtcclxuICAgICAgICAgICAgYm9yZGVyLXJhZGl1czogMCAwIDhweCA4cHg7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgIGltZyB7XHJcbiAgICAgICAgICAgIHdpZHRoOiAyMDBweDtcclxuICAgICAgICAgICAgaGVpZ2h0OiAxMDBweDtcclxuICAgICAgICAgICAgYm9yZGVyLXJhZGl1czogOHB4O1xyXG4gICAgICAgICAgICBncmlkLXJvdzogMS8zO1xyXG4gICAgICAgICAgICBncmlkLWNvbHVtbjogMS8zO1xyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIHAge1xyXG4gICAgICAgICAgICBtYXJnaW46IDNweDtcclxuICAgICAgICAgICAgZ3JpZC1yb3c6IDI7XHJcbiAgICAgICAgICAgIGdyaWQtY29sdW1uOiAxO1xyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcclxuICAgICAgICAgICAgei1pbmRleDogMjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLlNlbGVjdGVkIHtcclxuICAgICAgICBib3JkZXI6IHNvbGlkIHZhcigtLWlvbi1jb2xvci1hcXVhKTtcclxuICAgICAgICBib3JkZXItcmFkaXVzOiA4cHg7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG4uYnRuIHtcclxuICAgIG1hcmdpbi10b3A6IDIuNTR2aDtcclxufVxyXG5cclxuc2VjdGlvbiB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICAgIGhlaWdodDogMTAwdmg7XHJcbiAgICB3aWR0aDogMTAwdnc7XHJcblxyXG4gICAgLmJhY2tncm91bmRJbWcge1xyXG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgICAgICB0b3A6IDYwcHg7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaW1nIHtcclxuICAgICAgICAgICAgaGVpZ2h0OiA2MHZoO1xyXG4gICAgICAgICAgICBvcGFjaXR5OiAwLjA1O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG59XHJcblxyXG5cclxuaW9uLWlucHV0IHtcclxuICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3Itd2hpdGUpO1xyXG4gICAgXHJcbiAgICBpb24tbGFiZWx7XHJcbiAgICAgICAgYm9yZGVyLWJvdHRvbTogc29saWQgMC41cHggdmFyKC0taW9uLWNvbG9yLWxpZ2h0Z3JheTMpO1xyXG4gICAgICAgIC0tY29sb3I6IHZhcigtLWlvbi1jb2xvci13aGl0ZSk7XHJcbiAgICAgICAgZGl2IHtcclxuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogcmVkO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuaW9uLWJ1dHRvbiB7XHJcbiAgICAtLWJhY2tncm91bmQ6IHZhcigtLWlvbi1jb2xvci13aGl0ZSk7XHJcbiAgICAtLWJhY2tncm91bmQtYWN0aXZhdGVkOiB2YXIoLS1pb24tY29sb3Itd2hpdGUtc2hhZGUpO1xyXG4gICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1ibGFjayk7XHJcbiAgICB0ZXh0LXRyYW5zZm9ybTogY2FwaXRhbGl6ZTtcclxufVxyXG5cclxuaW9uLXRvb2xiYXIge1xyXG4gICAgLS1iYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcclxufSJdfQ== */";

/***/ }),

/***/ 6752:
/*!********************************************************!*\
  !*** ./src/app/pages/login/login.page.html?ngResource ***!
  \********************************************************/
/***/ ((module) => {

module.exports = "<ion-content *ngIf=\"!isLogin\">\r\n  <section>\r\n    <div class=\"backgroundImg\"><img src=\"../../../assets/img/newo.png\" alt=\"\"></div>\r\n    <ion-toolbar>\r\n      <ion-buttons slot=\"start\">\r\n        <!-- <ion-back-button></ion-back-button> -->\r\n      </ion-buttons>\r\n      <ion-title *ngIf=\"!isLogin\">{{ 'LOGIN_TITLE' | translate }}</ion-title>\r\n      <ion-title *ngIf=\"isLogin\">Bienvenido</ion-title>\r\n    </ion-toolbar>\r\n\r\n    <form>\r\n      <ion-input [(ngModel)]=\"account.username\" name=\"username\" label=\"Usuario\" placeholder=\"user@newo.co\"></ion-input>\r\n      <ion-input [(ngModel)]=\"account.password\" name=\"password\" type=\"password\" label=\"Contraseña\" placeholder=\"********\"></ion-input>\r\n      <ion-row class=\"ion-padding\">\r\n        <ion-col>\r\n          <ion-button expand=\"block\" type=\"button\" (click)=\"login()\">Ingresar</ion-button>\r\n        </ion-col>\r\n      </ion-row>\r\n    </form>\r\n  </section>\r\n\r\n</ion-content>\r\n\r\n<ion-content class=\"ion-padding\" *ngIf=\"isLogin\">\r\n  <section>\r\n    <h4>Selecciona la sede</h4>\r\n\r\n    <div class=\"sedes\">\r\n      <div *ngFor=\"let sede of sedes\">\r\n        <div [ngClass]=\"selected == sede.id ? 'contentSede Selected' : 'contentSede'\" (click)=\"sedeSelected(sede)\">\r\n          <img src=\"../../../assets/img/{{sede.id}}.jpg\" alt=\"Del Este\">\r\n          <p>{{sede.nombreSede}}</p>\r\n          <div class=\"booking-imgBlur\"></div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n\r\n    <div class=\"btn\">\r\n      <ion-button expand=\"block\" type=\"button\" (click)=\"goHome()\">Continuar</ion-button>\r\n    </div>\r\n  </section>\r\n</ion-content>";

/***/ })

}]);
//# sourceMappingURL=src_app_pages_login_login_module_ts.js.map