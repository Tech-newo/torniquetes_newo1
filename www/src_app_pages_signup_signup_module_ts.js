"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_pages_signup_signup_module_ts"],{

/***/ 7110:
/*!***********************************************!*\
  !*** ./src/app/pages/signup/signup.module.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SignupPageModule": () => (/* binding */ SignupPageModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 4666);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ 124);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ 5992);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ngx-translate/core */ 3935);
/* harmony import */ var _signup_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./signup.page */ 4374);








const routes = [
    {
        path: '',
        component: _signup_page__WEBPACK_IMPORTED_MODULE_0__.SignupPage
    }
];
let SignupPageModule = class SignupPageModule {
};
SignupPageModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
        imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormsModule, _ionic_angular__WEBPACK_IMPORTED_MODULE_5__.IonicModule, _angular_router__WEBPACK_IMPORTED_MODULE_6__.RouterModule.forChild(routes), _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__.TranslateModule],
        declarations: [_signup_page__WEBPACK_IMPORTED_MODULE_0__.SignupPage]
    })
], SignupPageModule);



/***/ }),

/***/ 4374:
/*!*********************************************!*\
  !*** ./src/app/pages/signup/signup.page.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SignupPage": () => (/* binding */ SignupPage)
/* harmony export */ });
/* harmony import */ var C_newodev_repositorios_torniquetes_newo1_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 1670);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _signup_page_html_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./signup.page.html?ngResource */ 5722);
/* harmony import */ var _signup_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./signup.page.scss?ngResource */ 5710);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ 2124);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ 5992);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ngx-translate/core */ 3935);
/* harmony import */ var _services_user_user_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/user/user.service */ 9709);








let SignupPage = class SignupPage {
  constructor(navController, userService, toastController, translateService) {
    this.navController = navController;
    this.userService = userService;
    this.toastController = toastController;
    this.translateService = translateService;
    // The account fields for the signup form
    this.account = {
      login: '',
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      langKey: 'en'
    };
    this.translateService.get(['SIGNUP_ERROR', 'SIGNUP_SUCCESS', 'EXISTING_USER_ERROR', 'INVALID_PASSWORD_ERROR']).subscribe(values => {
      this.signupErrorString = values.SIGNUP_ERROR;
      this.signupSuccessString = values.SIGNUP_SUCCESS;
      this.existingUserError = values.EXISTING_USER_ERROR;
      this.invalidPasswordError = values.INVALID_PASSWORD_ERROR;
    });
  }
  ngOnInit() {}
  doSignup() {
    var _this = this;
    // set login to same as email
    this.account.login = this.account.email;
    // Attempt to login in through our User service
    this.userService.signup(this.account).subscribe( /*#__PURE__*/(0,C_newodev_repositorios_torniquetes_newo1_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const toast = yield _this.toastController.create({
        message: _this.signupSuccessString,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    }), /*#__PURE__*/function () {
      var _ref2 = (0,C_newodev_repositorios_torniquetes_newo1_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (response) {
        // Unable to sign up
        const error = JSON.parse(response.error);
        let displayError = _this.signupErrorString;
        if (response.status === 400 && error.type.includes('already-used')) {
          displayError = _this.existingUserError;
        } else if (response.status === 400 && error.message === 'error.validation' && error.fieldErrors[0].field === 'password' && error.fieldErrors[0].message === 'Size') {
          displayError = _this.invalidPasswordError;
        }
        const toast = yield _this.toastController.create({
          message: displayError,
          duration: 3000,
          position: 'middle'
        });
        toast.present();
      });
      return function (_x) {
        return _ref2.apply(this, arguments);
      };
    }());
  }
};
SignupPage.ctorParameters = () => [{
  type: _ionic_angular__WEBPACK_IMPORTED_MODULE_4__.NavController
}, {
  type: _services_user_user_service__WEBPACK_IMPORTED_MODULE_3__.UserService
}, {
  type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__.ToastController
}, {
  type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__.TranslateService
}];
SignupPage = (0,tslib__WEBPACK_IMPORTED_MODULE_7__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_8__.Component)({
  selector: 'app-signup',
  template: _signup_page_html_ngResource__WEBPACK_IMPORTED_MODULE_1__,
  styles: [_signup_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_2__]
})], SignupPage);


/***/ }),

/***/ 9709:
/*!***********************************************!*\
  !*** ./src/app/services/user/user.service.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UserService": () => (/* binding */ UserService)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 745);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 5474);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ 1203);
/* harmony import */ var _api_api_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../api/api.service */ 5146);
/* harmony import */ var _login_login_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../login/login.service */ 8762);






let UserService = class UserService {
    constructor(apiService, loginService) {
        this.apiService = apiService;
        this.loginService = loginService;
    }
    /**
     * Send a POST request to our login endpoint with the data
     * the user entered on the form.
     */
    login(accountInfo) {
        this.loginService
            .login(accountInfo)
            .then(res => {
            this.loggedIn(res);
            return (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.of)(res);
        })
            .catch(err => {
            console.error('ERROR', err);
            return (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.throwError)(err);
        });
    }
    findAll() {
        return this.apiService.get('users');
    }
    /**
     * Send a POST request to our signup endpoint with the data
     * the user entered on the form.
     */
    signup(accountInfo) {
        return this.apiService.post('register', accountInfo, { responseType: 'text' }).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.share)());
    }
    /**
     * Log the user out, which forgets the session
     */
    logout() {
        this.loginService.logout();
        this.user = null;
    }
    /**
     * Process a login/signup response to store user data
     */
    loggedIn(resp) {
        this.user = resp.user;
    }
};
UserService.ctorParameters = () => [
    { type: _api_api_service__WEBPACK_IMPORTED_MODULE_0__.ApiService },
    { type: _login_login_service__WEBPACK_IMPORTED_MODULE_1__.LoginService }
];
UserService = (0,tslib__WEBPACK_IMPORTED_MODULE_5__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_6__.Injectable)({
        providedIn: 'root'
    })
], UserService);



/***/ }),

/***/ 5710:
/*!**********************************************************!*\
  !*** ./src/app/pages/signup/signup.page.scss?ngResource ***!
  \**********************************************************/
/***/ ((module) => {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzaWdudXAucGFnZS5zY3NzIn0= */";

/***/ }),

/***/ 5722:
/*!**********************************************************!*\
  !*** ./src/app/pages/signup/signup.page.html?ngResource ***!
  \**********************************************************/
/***/ ((module) => {

module.exports = "<ion-header>\r\n  <ion-toolbar>\r\n    <ion-buttons slot=\"start\">\r\n      <ion-back-button></ion-back-button>\r\n    </ion-buttons>\r\n    <ion-title>{{ 'SIGNUP_TITLE' | translate }}</ion-title>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<ion-content class=\"ion-padding\">\r\n  <form (submit)=\"doSignup()\">\r\n    <ion-list>\r\n\r\n      <ion-item>\r\n        <ion-label position=\"floating\">{{ 'FIRST_NAME' | translate }}</ion-label>\r\n        <ion-input type=\"string\" [(ngModel)]=\"account.firstName\" name=\"firstName\"></ion-input>\r\n      </ion-item>\r\n\r\n      <ion-item>\r\n        <ion-label position=\"floating\">{{ 'LAST_NAME' | translate }}</ion-label>\r\n        <ion-input type=\"string\" [(ngModel)]=\"account.lastName\" name=\"lastName\"></ion-input>\r\n      </ion-item>\r\n\r\n      <ion-item>\r\n        <ion-label position=\"floating\">{{ 'EMAIL' | translate }}</ion-label>\r\n        <ion-input type=\"email\" [(ngModel)]=\"account.email\" name=\"email\"></ion-input>\r\n      </ion-item>\r\n\r\n      <ion-item>\r\n        <ion-label position=\"floating\">{{ 'PASSWORD' | translate }}</ion-label>\r\n        <ion-input type=\"password\" [(ngModel)]=\"account.password\" name=\"password\"></ion-input>\r\n      </ion-item>\r\n\r\n      <ion-row class=\"ion-padding\">\r\n        <ion-col>\r\n          <ion-button expand=\"block\" type=\"submit\" color=\"primary\">{{ 'SIGNUP_BUTTON' | translate }}</ion-button>\r\n        </ion-col>\r\n      </ion-row>\r\n\r\n    </ion-list>\r\n  </form>\r\n</ion-content>\r\n";

/***/ })

}]);
//# sourceMappingURL=src_app_pages_signup_signup_module_ts.js.map