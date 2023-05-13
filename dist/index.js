(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(global, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 416:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.scanner = void 0;
const crypto_1 = __webpack_require__(113);
const prologue_sh_1 = __importDefault(__webpack_require__(216));
const centos_sh_1 = __importDefault(__webpack_require__(223));
const debian_sh_1 = __importDefault(__webpack_require__(809));
const osx_sh_1 = __importDefault(__webpack_require__(767));
const redhat_sh_1 = __importDefault(__webpack_require__(818));
const suse_sh_1 = __importDefault(__webpack_require__(189));
const ubuntu_sh_1 = __importDefault(__webpack_require__(731));
const npm_sh_1 = __importDefault(__webpack_require__(419));
const epilogue_sh_1 = __importDefault(__webpack_require__(526));
function replaceVars(template, options) {
    // replace template variables in the format {{VAR_NAME}}
    return template.replace(/\{\{([a-z0-9]+)\}\}/gi, (_, varName) => {
        if (varName in options) {
            // @ts-expect-error
            return options[varName];
        }
        else {
            throw new Error(`Missing required option '${varName}'`);
        }
    });
}
function scanner(options) {
    const template = [
        prologue_sh_1.default,
        centos_sh_1.default,
        debian_sh_1.default,
        osx_sh_1.default,
        redhat_sh_1.default,
        suse_sh_1.default,
        ubuntu_sh_1.default,
        npm_sh_1.default,
        epilogue_sh_1.default,
    ].map((t) => replaceVars(t, options));
    const scanner = template.join("\n\n");
    const hash = (0, crypto_1.createHash)("sha512").update(scanner).digest("hex");
    return {
        scanner,
        hash,
    };
}
exports.scanner = scanner;


/***/ }),

/***/ 526:
/***/ ((module) => {

module.exports = "\nsend_to_server\nrm \"$temp_file\"";

/***/ }),

/***/ 223:
/***/ ((module) => {

module.exports = "get_centos () {\n  if [ -f \"/etc/os-release\" ]; then\n    . /etc/os-release\n    log \">@ $ID | $VERSION_ID | $PRETTY_NAME | $kernel | $kernelVersion\"\n  fi\n}\n\nis_centos () {\n  if [ -f \"/etc/os-release\" ]; then\n    . /etc/os-release\n    if [ \"$ID\" = \"centos\" ]; then\n      return 1\n    fi\n  fi\n\n  return 0\n}\n\nscan_centos () {\n  if is_centos; then\n    return 0\n  fi\n  get_centos\n  try_command \"rpm\" \"rpm -qa\"\n  try_command \"yum\" \"yum list installed\"\n}\n\nscan_centos\n\n";

/***/ }),

/***/ 809:
/***/ ((module) => {

module.exports = "get_debian () {\n  if [ -f \"/etc/os-release\" ]; then\n    . /etc/os-release\n    log \">@ $ID | $VERSION_ID | $PRETTY_NAME | $kernel | $kernelVersion\"\n  fi\n}\n\nis_debian () {\n  if [ -f \"/etc/os-release\" ]; then\n    . /etc/os-release\n    if [ \"$ID\" = \"debian\" ]; then\n      return 1\n    fi\n  fi\n\n  return 0\n}\n\nscan_debian () {\n  if is_debian; then\n    return 0\n  fi\n  get_debian\n  try_command \"apt\" \"apt list --installed\"\n  try_command \"dpkg\" \"dpkg --list\"\n}\n\nscan_debian\n";

/***/ }),

/***/ 767:
/***/ ((module) => {

module.exports = "get_osx () {\n  version=$(sw_vers | grep 'ProductVersion:' | awk '{print $2}')\n  pretty=\"macOS $version\"\n  log \">@ macOS | $version | $pretty | $kernel | $kernelVersion\"\n}\n\nis_osx () {\n  if command -v \"sw_vers\" > /dev/null; then\n    return 1\n  fi\n\n  return 0\n}\n\nscan_osx () {\n  if is_osx; then\n    return 0\n  fi\n  get_osx\n  try_command \"brew\" \"brew list --versions\"\n  try_command \"system_profiler\" \"system_profiler SPApplicationsDataType\"\n}\n\nscan_osx\n";

/***/ }),

/***/ 818:
/***/ ((module) => {

module.exports = "get_redhat () {\n  if [ -f \"/etc/os-release\" ]; then\n    . /etc/os-release\n    name=\"$ID\"\n    if [ \"$ID\" = \"rhel\" ]; then\n      name=\"redhat\"\n    fi\n    log \">@ $name | $VERSION_ID | $PRETTY_NAME | $kernel | $kernelVersion\"\n  fi\n}\n\nis_redhat () {\n  if [ -f \"/etc/os-release\" ]; then\n    . /etc/os-release\n    if [ \"$ID\" = \"rhel\" ]; then\n      return 1\n    fi\n  fi\n\n  return 0\n}\n\nscan_redhat () {\n  if is_redhat; then\n    return 0\n  fi\n  get_redhat\n  try_command \"rpm\" \"rpm -qa\"\n  try_command \"yum\" \"yum list installed\"\n}\n\nscan_redhat\n";

/***/ }),

/***/ 189:
/***/ ((module) => {

module.exports = "get_suse () {\n  if [ -f \"/etc/os-release\" ]; then\n    . /etc/os-release\n    part=$(echo $ID | cut -d'-' -f1)\n    log \">@ $part | $VERSION_ID | $PRETTY_NAME | $kernel | $kernelVersion\"\n  fi\n}\n\nis_suse () {\n  if [ -f \"/etc/os-release\" ]; then\n    . /etc/os-release\n    part=$(echo $ID | cut -d'-' -f1)\n    if [ \"$part\" = \"opensuse\" ]; then\n      return 1\n    fi\n  fi\n\n  return 0\n}\n\nscan_suse () {\n  if is_suse; then\n    return 0\n  fi\n  get_suse\n  try_command \"rpm\" \"rpm -qa\"\n}\n\nscan_suse\n";

/***/ }),

/***/ 731:
/***/ ((module) => {

module.exports = "get_ubuntu () {\n  if [ -f \"/etc/lsb-release\" ]; then\n    . /etc/lsb-release\n    log \">@ $DISTRIB_ID | $DISTRIB_RELEASE | $DISTRIB_DESCRIPTION | $kernel | $kernelVersion\"\n  fi\n}\n\nis_ubuntu () {\n  if [ -f \"/etc/lsb-release\" ]; then\n    . /etc/lsb-release\n    if [ \"$DISTRIB_ID\" = \"Ubuntu\" ]; then\n      return 1\n    fi\n  fi\n\n  return 0\n}\n\nscan_ubuntu () {\n  if is_ubuntu; then\n    return 0\n  fi\n  get_ubuntu\n  try_command \"apt\" \"apt list --installed\"\n  try_command \"dpkg\" \"dpkg --list\"\n}\n\nscan_ubuntu\n";

/***/ }),

/***/ 419:
/***/ ((module) => {

module.exports = "\nscan_npm () {\n  try_command \"npm\" \"npm list --depth=6\"\n}\n\nscan_npm\n";

/***/ }),

/***/ 216:
/***/ ((module) => {

module.exports = "#!/bin/sh\n\n# set -o errexit\n# set -o nounset\n# set -o pipefail\n\ntemp_file=$(mktemp)\n\nkernel=\"\"\nkernelVersion=\"\"\n\nif command -v \"uname\" > /dev/null; then\n  kernel=\"$(uname -s)\"\n  kernelVersion=\"$(uname -r)\"\nfi\n\ntry_command () {\n  if ! command -v \"$1\" > /dev/null; then\n    return 1\n  fi\n  echo \">\\$ $2\"  >> $temp_file 2>&1\n  printf \"\\n\" >> $temp_file 2>&1\n  eval $2 >> $temp_file 2>&1\n  printf \"\\n\\n\" >> $temp_file 2>&1\n}\n\nlog () {\n  echo \"$1\" >> $temp_file\n  printf \"\\n\\n\" >> $temp_file\n}\n\nsend_to_server () {\n  curl -s -X POST -d @$temp_file {{ingestUrl}}\n}\n\n# wmic product get name, version\n";

/***/ }),

/***/ 113:
/***/ ((module) => {

module.exports = require("crypto");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(416);
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=index.js.map