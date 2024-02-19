"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_pages_entities_entities_module_ts"],{

/***/ 43:
/*!***************************************************!*\
  !*** ./src/app/pages/entities/entities.module.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EntitiesPageModule": () => (/* binding */ EntitiesPageModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 4666);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ 124);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ 5992);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ngx-translate/core */ 3935);
/* harmony import */ var src_app_services_auth_user_route_access_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/services/auth/user-route-access.service */ 1284);
/* harmony import */ var _entities_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./entities.page */ 7887);









const routes = [
    {
        path: '',
        component: _entities_page__WEBPACK_IMPORTED_MODULE_1__.EntitiesPage,
        data: {
            authorities: ['ROLE_USER']
        },
        canActivate: [src_app_services_auth_user_route_access_service__WEBPACK_IMPORTED_MODULE_0__.UserRouteAccessService]
    }
    /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
];
let EntitiesPageModule = class EntitiesPageModule {
};
EntitiesPageModule = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.NgModule)({
        imports: [_ionic_angular__WEBPACK_IMPORTED_MODULE_4__.IonicModule, _angular_common__WEBPACK_IMPORTED_MODULE_5__.CommonModule, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.FormsModule, _angular_router__WEBPACK_IMPORTED_MODULE_7__.RouterModule.forChild(routes), _ngx_translate_core__WEBPACK_IMPORTED_MODULE_8__.TranslateModule],
        declarations: [_entities_page__WEBPACK_IMPORTED_MODULE_1__.EntitiesPage]
    })
], EntitiesPageModule);



/***/ }),

/***/ 7887:
/*!*************************************************!*\
  !*** ./src/app/pages/entities/entities.page.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EntitiesPage": () => (/* binding */ EntitiesPage)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _entities_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./entities.page.html?ngResource */ 4668);
/* harmony import */ var _entities_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./entities.page.scss?ngResource */ 537);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ 2124);





let EntitiesPage = class EntitiesPage {
    constructor(navController) {
        this.navController = navController;
        this.entities = [
        /* jhipster-needle-add-entity-page - JHipster will add entity pages here */
        ];
    }
    openPage(page) {
        this.navController.navigateForward('/tabs/entities/' + page.route);
    }
};
EntitiesPage.ctorParameters = () => [
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__.NavController }
];
EntitiesPage = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.Component)({
        selector: 'app-entities',
        template: _entities_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
        styles: [_entities_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__]
    })
], EntitiesPage);



/***/ }),

/***/ 537:
/*!**************************************************************!*\
  !*** ./src/app/pages/entities/entities.page.scss?ngResource ***!
  \**************************************************************/
/***/ ((module) => {

module.exports = ".trash {\n  position: absolute;\n  margin-left: 205px;\n  margin-top: -125px;\n  color: red;\n  font-size: 16px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVudGl0aWVzLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGtCQUFBO0VBQ0Esa0JBQUE7RUFDQSxrQkFBQTtFQUNBLFVBQUE7RUFDQSxlQUFBO0FBQ0YiLCJmaWxlIjoiZW50aXRpZXMucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLnRyYXNoIHtcclxuICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgbWFyZ2luLWxlZnQ6IDIwNXB4O1xyXG4gIG1hcmdpbi10b3A6IC0xMjVweDtcclxuICBjb2xvcjogcmVkO1xyXG4gIGZvbnQtc2l6ZTogMTZweDtcclxufVxyXG4iXX0= */";

/***/ }),

/***/ 4668:
/*!**************************************************************!*\
  !*** ./src/app/pages/entities/entities.page.html?ngResource ***!
  \**************************************************************/
/***/ ((module) => {

module.exports = "<ion-header>\r\n  <ion-toolbar>\r\n    <ion-title>\r\n      {{ 'TAB2_TITLE' | translate }}\r\n    </ion-title>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<ion-content class=\"ion-padding\">\r\n  <ion-list>\r\n      <ion-item *ngFor=\"let entity of entities\" (click)=\"openPage(entity)\">\r\n        <h2>{{entity.name}}</h2>\r\n      </ion-item>\r\n  </ion-list>\r\n\r\n  <div *ngIf=\"entities.length === 0\">\r\n    {{ 'EMPTY_ENTITIES_MESSAGE' | translate }}\r\n  </div>\r\n</ion-content>\r\n";

/***/ })

}]);
//# sourceMappingURL=src_app_pages_entities_entities_module_ts.js.map