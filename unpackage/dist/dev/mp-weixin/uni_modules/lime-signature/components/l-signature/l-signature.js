(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["uni_modules/lime-signature/components/l-signature/l-signature"],{

/***/ 1092:
/*!*******************************************************************************************!*\
  !*** D:/work/jinliyuan/uni_modules/lime-signature/components/l-signature/l-signature.vue ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _l_signature_vue_vue_type_template_id_2bad5a20_filter_modules_eyJzaWduIjp7InR5cGUiOiJyZW5kZXJqcyIsImNvbnRlbnQiOiIiLCJzdGFydCI6MTc2OTEsImF0dHJzIjp7Im1vZHVsZSI6InNpZ24iLCJsYW5nIjoianMifSwiZW5kIjoxNzc0NX19___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./l-signature.vue?vue&type=template&id=2bad5a20&filter-modules=eyJzaWduIjp7InR5cGUiOiJyZW5kZXJqcyIsImNvbnRlbnQiOiIiLCJzdGFydCI6MTc2OTEsImF0dHJzIjp7Im1vZHVsZSI6InNpZ24iLCJsYW5nIjoianMifSwiZW5kIjoxNzc0NX19& */ 1093);
/* harmony import */ var _l_signature_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./l-signature.vue?vue&type=script&lang=js& */ 1095);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _l_signature_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _l_signature_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _l_signature_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./l-signature.vue?vue&type=style&index=0&lang=scss& */ 1101);
/* harmony import */ var _soft_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../soft/HBuilderX.3.7.11.20230427/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 32);

var renderjs





/* normalize component */

var component = Object(_soft_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _l_signature_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _l_signature_vue_vue_type_template_id_2bad5a20_filter_modules_eyJzaWduIjp7InR5cGUiOiJyZW5kZXJqcyIsImNvbnRlbnQiOiIiLCJzdGFydCI6MTc2OTEsImF0dHJzIjp7Im1vZHVsZSI6InNpZ24iLCJsYW5nIjoianMifSwiZW5kIjoxNzc0NX19___WEBPACK_IMPORTED_MODULE_0__["render"],
  _l_signature_vue_vue_type_template_id_2bad5a20_filter_modules_eyJzaWduIjp7InR5cGUiOiJyZW5kZXJqcyIsImNvbnRlbnQiOiIiLCJzdGFydCI6MTc2OTEsImF0dHJzIjp7Im1vZHVsZSI6InNpZ24iLCJsYW5nIjoianMifSwiZW5kIjoxNzc0NX19___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null,
  false,
  _l_signature_vue_vue_type_template_id_2bad5a20_filter_modules_eyJzaWduIjp7InR5cGUiOiJyZW5kZXJqcyIsImNvbnRlbnQiOiIiLCJzdGFydCI6MTc2OTEsImF0dHJzIjp7Im1vZHVsZSI6InNpZ24iLCJsYW5nIjoianMifSwiZW5kIjoxNzc0NX19___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "uni_modules/lime-signature/components/l-signature/l-signature.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 1093:
/*!**************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** D:/work/jinliyuan/uni_modules/lime-signature/components/l-signature/l-signature.vue?vue&type=template&id=2bad5a20&filter-modules=eyJzaWduIjp7InR5cGUiOiJyZW5kZXJqcyIsImNvbnRlbnQiOiIiLCJzdGFydCI6MTc2OTEsImF0dHJzIjp7Im1vZHVsZSI6InNpZ24iLCJsYW5nIjoianMifSwiZW5kIjoxNzc0NX19& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _soft_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_soft_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_soft_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_soft_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_soft_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_soft_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_l_signature_vue_vue_type_template_id_2bad5a20_filter_modules_eyJzaWduIjp7InR5cGUiOiJyZW5kZXJqcyIsImNvbnRlbnQiOiIiLCJzdGFydCI6MTc2OTEsImF0dHJzIjp7Im1vZHVsZSI6InNpZ24iLCJsYW5nIjoianMifSwiZW5kIjoxNzc0NX19___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../soft/HBuilderX.3.7.11.20230427/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../soft/HBuilderX.3.7.11.20230427/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!../../../../../../soft/HBuilderX.3.7.11.20230427/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../../../../soft/HBuilderX.3.7.11.20230427/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!../../../../../../soft/HBuilderX.3.7.11.20230427/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../../soft/HBuilderX.3.7.11.20230427/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./l-signature.vue?vue&type=template&id=2bad5a20&filter-modules=eyJzaWduIjp7InR5cGUiOiJyZW5kZXJqcyIsImNvbnRlbnQiOiIiLCJzdGFydCI6MTc2OTEsImF0dHJzIjp7Im1vZHVsZSI6InNpZ24iLCJsYW5nIjoianMifSwiZW5kIjoxNzc0NX19& */ 1094);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _soft_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_soft_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_soft_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_soft_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_soft_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_soft_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_l_signature_vue_vue_type_template_id_2bad5a20_filter_modules_eyJzaWduIjp7InR5cGUiOiJyZW5kZXJqcyIsImNvbnRlbnQiOiIiLCJzdGFydCI6MTc2OTEsImF0dHJzIjp7Im1vZHVsZSI6InNpZ24iLCJsYW5nIjoianMifSwiZW5kIjoxNzc0NX19___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _soft_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_soft_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_soft_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_soft_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_soft_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_soft_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_l_signature_vue_vue_type_template_id_2bad5a20_filter_modules_eyJzaWduIjp7InR5cGUiOiJyZW5kZXJqcyIsImNvbnRlbnQiOiIiLCJzdGFydCI6MTc2OTEsImF0dHJzIjp7Im1vZHVsZSI6InNpZ24iLCJsYW5nIjoianMifSwiZW5kIjoxNzc0NX19___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _soft_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_soft_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_soft_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_soft_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_soft_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_soft_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_l_signature_vue_vue_type_template_id_2bad5a20_filter_modules_eyJzaWduIjp7InR5cGUiOiJyZW5kZXJqcyIsImNvbnRlbnQiOiIiLCJzdGFydCI6MTc2OTEsImF0dHJzIjp7Im1vZHVsZSI6InNpZ24iLCJsYW5nIjoianMifSwiZW5kIjoxNzc0NX19___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _soft_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_soft_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_soft_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_soft_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_soft_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_soft_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_l_signature_vue_vue_type_template_id_2bad5a20_filter_modules_eyJzaWduIjp7InR5cGUiOiJyZW5kZXJqcyIsImNvbnRlbnQiOiIiLCJzdGFydCI6MTc2OTEsImF0dHJzIjp7Im1vZHVsZSI6InNpZ24iLCJsYW5nIjoianMifSwiZW5kIjoxNzc0NX19___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 1094:
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/work/jinliyuan/uni_modules/lime-signature/components/l-signature/l-signature.vue?vue&type=template&id=2bad5a20&filter-modules=eyJzaWduIjp7InR5cGUiOiJyZW5kZXJqcyIsImNvbnRlbnQiOiIiLCJzdGFydCI6MTc2OTEsImF0dHJzIjp7Im1vZHVsZSI6InNpZ24iLCJsYW5nIjoianMifSwiZW5kIjoxNzc0NX19& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  var s0 = _vm.show ? _vm.__get_style([_vm.canvasStyle, _vm.styles]) : null
  _vm.$mp.data = Object.assign(
    {},
    {
      $root: {
        s0: s0,
      },
    }
  )
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 1095:
/*!********************************************************************************************************************!*\
  !*** D:/work/jinliyuan/uni_modules/lime-signature/components/l-signature/l-signature.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _soft_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_soft_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_soft_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_soft_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_soft_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_l_signature_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../soft/HBuilderX.3.7.11.20230427/HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../../../soft/HBuilderX.3.7.11.20230427/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!../../../../../../soft/HBuilderX.3.7.11.20230427/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../../../../soft/HBuilderX.3.7.11.20230427/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../../soft/HBuilderX.3.7.11.20230427/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./l-signature.vue?vue&type=script&lang=js& */ 1096);
/* harmony import */ var _soft_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_soft_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_soft_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_soft_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_soft_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_l_signature_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_soft_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_soft_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_soft_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_soft_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_soft_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_l_signature_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _soft_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_soft_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_soft_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_soft_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_soft_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_l_signature_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _soft_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_soft_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_soft_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_soft_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_soft_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_l_signature_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_soft_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_soft_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_soft_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_soft_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_soft_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_l_signature_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 1096:
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/work/jinliyuan/uni_modules/lime-signature/components/l-signature/l-signature.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _regenerator = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/regenerator */ 56));
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 11));
var _slicedToArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ 5));
var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ 58));
var _utils = __webpack_require__(/*! ./utils */ 1097);
var _signature = __webpack_require__(/*! ./signature.js */ 1098);
var _context6 = __webpack_require__(/*! ./context */ 1099);
var _props = _interopRequireDefault(__webpack_require__(/*! ./props */ 1100));
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
/**
 * LimeSignature 手写板签名
 * @description 手写板签名插件：一款能跑在uniapp各端中的签名插件，支持横屏、背景色、笔画颜色、笔画大小等功能,可生成有内容的区域，减小图片尺寸，节省空间。
 * @tutorial https://ext.dcloud.net.cn/plugin?id=4354
 * @property {Number} penSize 画笔大小
 * @property {Number} minLineWidth 线条最小宽
 * @property {Number} maxLineWidth 线条最大宽 
 * @property {String} penColor 画笔颜色 
 * @property {String} backgroundColor 背景颜色,不填则为透明
 * @property {type} 指定 canvas 类型
 * @value 2d canvas 2d 
 * @value '' 非 canvas 2d 旧接口，微信不再维护
 * @property {Boolean} openSmooth 模拟笔锋 
 * @property {Number} beforeDelay 延时初始化，在放在弹窗里可以使用 （毫秒）  
 * @property {Number} maxHistoryLength 限制历史记录数，即最大可撤销数，传入0则关闭历史记录功能 
 * @property {Boolean} landscape 横屏，使用后在最后生成图片时会图片旋转90度
 * @property {Boolean} disableScroll 当在写字时，禁止屏幕滚动以及下拉刷新，nvue无效
 * @property {Boolean} boundingBox 只生成内容区域，即未画部分不生成，有性能的损耗
 */
var _default = {
  props: _props.default,
  data: function data() {
    return {
      canvasWidth: null,
      canvasHeight: null,
      offscreenWidth: null,
      offscreenHeight: null,
      useCanvas2d: true,
      show: true,
      offscreenStyles: '',
      showMask: false,
      isPC: false
    };
  },
  computed: {
    canvasId: function canvasId() {
      return "lime-signature".concat(this._uid);
    },
    offscreenId: function offscreenId() {
      return this.canvasId + 'offscreen';
    },
    offscreenSize: function offscreenSize() {
      var offscreenWidth = this.offscreenWidth,
        offscreenHeight = this.offscreenHeight;
      return this.landscape ? [offscreenHeight, offscreenWidth] : [offscreenWidth, offscreenHeight];
    },
    canvasStyle: function canvasStyle() {
      var canvasWidth = this.canvasWidth,
        canvasHeight = this.canvasHeight,
        backgroundColor = this.backgroundColor;
      return {
        width: canvasWidth && canvasWidth + 'px',
        height: canvasHeight && canvasHeight + 'px',
        background: backgroundColor
      };
    },
    param: function param() {
      var penColor = this.penColor,
        penSize = this.penSize,
        backgroundColor = this.backgroundColor,
        backgroundImage = this.backgroundImage,
        landscape = this.landscape,
        boundingBox = this.boundingBox,
        openSmooth = this.openSmooth,
        minLineWidth = this.minLineWidth,
        maxLineWidth = this.maxLineWidth,
        minSpeed = this.minSpeed,
        maxWidthDiffRate = this.maxWidthDiffRate,
        maxHistoryLength = this.maxHistoryLength,
        disableScroll = this.disableScroll,
        disabled = this.disabled;
      return JSON.parse(JSON.stringify({
        penColor: penColor,
        penSize: penSize,
        backgroundColor: backgroundColor,
        backgroundImage: backgroundImage,
        landscape: landscape,
        boundingBox: boundingBox,
        openSmooth: openSmooth,
        minLineWidth: minLineWidth,
        maxLineWidth: maxLineWidth,
        minSpeed: minSpeed,
        maxWidthDiffRate: maxWidthDiffRate,
        maxHistoryLength: maxHistoryLength,
        disableScroll: disableScroll,
        disabled: disabled
      }));
    }
  },
  created: function created() {
    var _uni$getSystemInfoSyn = uni.getSystemInfoSync(),
      platform = _uni$getSystemInfoSyn.platform;
    this.isPC = /windows|mac/.test(platform);
    this.useCanvas2d = this.type == '2d' && (0, _utils.canIUseCanvas2d)() && !this.isPC;
    this.showMask = this.isPC;
  },
  mounted: function mounted() {
    var _this = this;
    return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
      var config;
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!_this.beforeDelay) {
                _context.next = 3;
                break;
              }
              _context.next = 3;
              return (0, _utils.sleep)(_this.beforeDelay);
            case 3:
              _context.next = 5;
              return _this.getContext();
            case 5:
              config = _context.sent;
              _this.signature = new _signature.Signature(config);
              _this.canvasEl = _this.signature.canvas.get('el');
              _this.offscreenWidth = _this.canvasWidth = _this.signature.canvas.get('width');
              _this.offscreenHeight = _this.canvasHeight = _this.signature.canvas.get('height');
              _this.stopWatch = _this.$watch('param', function (v) {
                _this.signature.pen.setOption(v);
              }, {
                immediate: true
              });
            case 11:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  },
  beforeDestroy: function beforeDestroy() {
    this.stopWatch && this.stopWatch();
    this.signature.destroy();
    this.show = false;
    this.signature = null;
  },
  methods: {
    redo: function redo() {
      if (this.signature) this.signature.redo();
    },
    restore: function restore() {
      this.redo();
    },
    undo: function undo() {
      if (this.signature) this.signature.undo();
    },
    clear: function clear() {
      if (this.signature) this.signature.clear();
    },
    isEmpty: function isEmpty() {
      return this.signature.isEmpty();
    },
    canvasToMaskPath: function canvasToMaskPath() {
      var _this2 = this;
      var param = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var isEmpty = this.isEmpty();
      var width = this.signature.canvas.get('width');
      var height = this.signature.canvas.get('height');
      var _uni$getSystemInfoSyn2 = uni.getSystemInfoSync(),
        pixelRatio = _uni$getSystemInfoSyn2.pixelRatio;
      if (this.useCanvas2d) {
        this.offscreenWidth = width * pixelRatio;
        this.offscreenHeight = height * pixelRatio;
      }
      var context = uni.createCanvasContext('offscreen', this);
      var _success2 = function success(_success) {
        return param.success && param.success(_success);
      };
      var _fail2 = function fail(_fail) {
        return param.fail && param.fail(_fail);
      };
      this.signature.pen.getMaskedImageData(function (imageData) {
        uni.canvasPutImageData({
          canvasId: 'offscreen',
          x: 0,
          y: 0,
          width: Math.floor(_this2.offscreenWidth),
          height: Math.floor(_this2.offscreenHeight),
          data: imageData,
          fail: function fail(err) {
            _fail2(err);
          },
          success: function success(res) {
            (0, _context6.toDataURL)('offscreen', _this2, param).then(function (res) {
              var size = Math.max(_this2.offscreenWidth, _this2.offscreenHeight);
              context.restore();
              context.clearRect(0, 0, size, size);
              _this2.offscreenWidth = width;
              _this2.offscreenHeight = height;
              _success2({
                tempFilePath: res,
                isEmpty: isEmpty
              });
            });
          }
        }, _this2);
      });
    },
    canvasToTempFilePath: function canvasToTempFilePath() {
      var _this3 = this;
      var param = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var isEmpty = this.isEmpty();
      var useCanvas2d = this.useCanvas2d;
      var success = function success(_success3) {
        return param.success && param.success(_success3);
      };
      var fail = function fail(err) {
        return param.fail && param.fail(err);
      };
      var _this$signature$canva = this.signature.canvas.get('el'),
        canvas = _this$signature$canva.canvas;
      var backgroundColor = this.backgroundColor,
        landscape = this.landscape,
        boundingBox = this.boundingBox;
      var width = this.signature.canvas.get('width');
      var height = this.signature.canvas.get('height');
      var x = 0;
      var y = 0;
      var devtools = uni.getSystemInfoSync().platform == 'devtools';
      var preferToDataURL = this.preferToDataURL;
      var scale = 1;
      var canvasToTempFilePath = function canvasToTempFilePath(image) {
        var createCanvasContext = function createCanvasContext() {
          var useOffscreen = useCanvas2d && !!uni.createOffscreenCanvas && preferToDataURL;
          if (useOffscreen && !devtools) {
            var _offCanvas = uni.createOffscreenCanvas({
              type: '2d'
            });
            _offCanvas.width = _this3.offscreenSize[0] * scale;
            _offCanvas.height = _this3.offscreenSize[1] * scale;
            var _context2 = _offCanvas.getContext("2d");
            return [_context2, _offCanvas];
          } else {
            var _context3 = uni.createCanvasContext('offscreen', _this3);
            return [_context3];
          }
        };
        var _createCanvasContext = createCanvasContext(),
          _createCanvasContext2 = (0, _slicedToArray2.default)(_createCanvasContext, 2),
          context = _createCanvasContext2[0],
          offCanvas = _createCanvasContext2[1];
        context.save();
        context.setTransform(1, 0, 0, 1, 0, 0);
        if (landscape) {
          context.translate(0, width * scale);
          context.rotate(-Math.PI / 2);
        }
        if (backgroundColor && !(0, _utils.isTransparent)(backgroundColor)) {
          context.fillStyle = backgroundColor;
          context.fillRect(0, 0, width, height);
        }
        if (offCanvas) {
          var img = canvas.createImage();
          img.src = image;
          img.onload = function () {
            context.drawImage(img, 0, 0, width * scale, height * scale);
            var tempFilePath = offCanvas.toDataURL();
            success({
              tempFilePath: tempFilePath,
              isEmpty: isEmpty
            });
          };
        } else {
          context.drawImage(image, 0, 0, width * scale, height * scale);
          context.draw(false, function () {
            (0, _context6.toDataURL)('offscreen', _this3, param).then(function (res) {
              var size = Math.max(width, height);
              context.restore();
              context.clearRect(0, 0, size, size);
              success({
                tempFilePath: res,
                isEmpty: isEmpty
              });
            });
          });
        }
      };
      var next = /*#__PURE__*/function () {
        var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
          var param;
          return _regenerator.default.wrap(function _callee2$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  if (!(_this3.offscreenWidth != width || _this3.offscreenHeight != height)) {
                    _context4.next = 5;
                    break;
                  }
                  _this3.offscreenWidth = width;
                  _this3.offscreenHeight = height;
                  _context4.next = 5;
                  return (0, _utils.sleep)(100);
                case 5:
                  param = {
                    x: x,
                    y: y,
                    width: width,
                    height: height,
                    canvas: useCanvas2d ? canvas : null,
                    preferToDataURL: preferToDataURL
                  };
                  (0, _context6.toDataURL)(_this3.canvasId, _this3, param).then(canvasToTempFilePath).catch(fail);
                case 7:
                case "end":
                  return _context4.stop();
              }
            }
          }, _callee2);
        }));
        return function next() {
          return _ref.apply(this, arguments);
        };
      }();
      // PC端小程序获取不到 ImageData 数据，长度为0
      if (boundingBox && !this.isPC) {
        this.signature.getContentBoundingBox( /*#__PURE__*/function () {
          var _ref2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3(res) {
            return _regenerator.default.wrap(function _callee3$(_context5) {
              while (1) {
                switch (_context5.prev = _context5.next) {
                  case 0:
                    _this3.offscreenWidth = width = res.width;
                    _this3.offscreenHeight = height = res.height;
                    x = res.startX;
                    y = res.startY;
                    next();
                  case 5:
                  case "end":
                    return _context5.stop();
                }
              }
            }, _callee3);
          }));
          return function (_x) {
            return _ref2.apply(this, arguments);
          };
        }());
      } else {
        next();
      }
    },
    getContext: function getContext() {
      var _this4 = this;
      return (0, _utils.getRect)("#".concat(this.canvasId), {
        context: this,
        type: this.useCanvas2d ? 'fields' : 'boundingClientRect'
      }).then(function (res) {
        if (res) {
          var width = res.width,
            height = res.height,
            canvas = res.node,
            left = res.left,
            top = res.top,
            right = res.right;
          var _uni$getSystemInfoSyn3 = uni.getSystemInfoSync(),
            pixelRatio = _uni$getSystemInfoSyn3.pixelRatio;
          var context;
          if (canvas) {
            context = canvas.getContext('2d');
            canvas.width = width * pixelRatio;
            canvas.height = height * pixelRatio;
          } else {
            pixelRatio = 1;
            context = (0, _context6.uniContext)(_this4.canvasId, _this4);
            canvas = {
              getContext: function getContext(type) {
                return type == '2d' ? context : null;
              },
              createImage: _context6.createImage,
              toDataURL: function toDataURL() {
                return (0, _context6.toDataURL)(_this4.canvasId, _this4);
              },
              requestAnimationFrame: _utils.requestAnimationFrame
            };
          }
          // 支付宝小程序 使用stroke有个默认背景色
          context.clearRect(0, 0, width, height);
          return {
            left: left,
            top: top,
            right: right,
            width: width,
            height: height,
            context: context,
            canvas: canvas,
            pixelRatio: pixelRatio
          };
        }
      });
    },
    getTouch: function getTouch(e) {
      var _this5 = this;
      if (this.isPC && this.canvasRect) {
        e.touches = e.touches.map(function (item) {
          return _objectSpread(_objectSpread({}, item), {}, {
            x: item.clientX - _this5.canvasRect.left,
            y: item.clientY - _this5.canvasRect.top
          });
        });
      }
      return e;
    },
    touchStart: function touchStart(e) {
      var _this6 = this;
      if (!this.canvasEl) return;
      this.isStart = true;
      // 微信小程序PC端不支持事件，使用这方法模拟一下
      if (this.isPC) {
        (0, _utils.getRect)("#".concat(this.canvasId), {
          context: this
        }).then(function (res) {
          _this6.canvasRect = res;
          _this6.canvasEl.dispatchEvent('touchstart', (0, _utils.wrapEvent)(_this6.getTouch(e)));
        });
        return;
      }
      this.canvasEl.dispatchEvent('touchstart', (0, _utils.wrapEvent)(e));
    },
    touchMove: function touchMove(e) {
      if (!this.canvasEl || !this.isStart && this.canvasEl) return;
      this.canvasEl.dispatchEvent('touchmove', (0, _utils.wrapEvent)(this.getTouch(e)));
    },
    touchEnd: function touchEnd(e) {
      if (!this.canvasEl) return;
      this.isStart = false;
      this.canvasEl.dispatchEvent('touchend', (0, _utils.wrapEvent)(e));
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),

/***/ 1101:
/*!*****************************************************************************************************************************!*\
  !*** D:/work/jinliyuan/uni_modules/lime-signature/components/l-signature/l-signature.vue?vue&type=style&index=0&lang=scss& ***!
  \*****************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _soft_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_soft_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_soft_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_soft_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_soft_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_soft_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_soft_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_soft_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_soft_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_l_signature_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../soft/HBuilderX.3.7.11.20230427/HBuilderX/plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!../../../../../../soft/HBuilderX.3.7.11.20230427/HBuilderX/plugins/uniapp-cli/node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!../../../../../../soft/HBuilderX.3.7.11.20230427/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../soft/HBuilderX.3.7.11.20230427/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!../../../../../../soft/HBuilderX.3.7.11.20230427/HBuilderX/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--8-oneOf-1-3!../../../../../../soft/HBuilderX.3.7.11.20230427/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!../../../../../../soft/HBuilderX.3.7.11.20230427/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!../../../../../../soft/HBuilderX.3.7.11.20230427/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../../soft/HBuilderX.3.7.11.20230427/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./l-signature.vue?vue&type=style&index=0&lang=scss& */ 1102);
/* harmony import */ var _soft_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_soft_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_soft_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_soft_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_soft_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_soft_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_soft_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_soft_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_soft_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_l_signature_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_soft_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_soft_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_soft_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_soft_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_soft_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_soft_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_soft_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_soft_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_soft_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_l_signature_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _soft_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_soft_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_soft_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_soft_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_soft_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_soft_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_soft_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_soft_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_soft_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_l_signature_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _soft_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_soft_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_soft_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_soft_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_soft_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_soft_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_soft_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_soft_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_soft_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_l_signature_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_soft_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_soft_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_soft_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_soft_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_soft_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_soft_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_soft_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_soft_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_soft_HBuilderX_3_7_11_20230427_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_l_signature_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 1102:
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/work/jinliyuan/uni_modules/lime-signature/components/l-signature/l-signature.vue?vue&type=style&index=0&lang=scss& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

}]);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/lime-signature/components/l-signature/l-signature.js.map
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'uni_modules/lime-signature/components/l-signature/l-signature-create-component',
    {
        'uni_modules/lime-signature/components/l-signature/l-signature-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('2')['createComponent'](__webpack_require__(1092))
        })
    },
    [['uni_modules/lime-signature/components/l-signature/l-signature-create-component']]
]);
