"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/video/refine/route";
exports.ids = ["app/api/video/refine/route"];
exports.modules = {

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "assert":
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("assert");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("events");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("http");

/***/ }),

/***/ "http2":
/*!************************!*\
  !*** external "http2" ***!
  \************************/
/***/ ((module) => {

module.exports = require("http2");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

module.exports = require("https");

/***/ }),

/***/ "os":
/*!*********************!*\
  !*** external "os" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("os");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("stream");

/***/ }),

/***/ "tty":
/*!**********************!*\
  !*** external "tty" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("tty");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("util");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("zlib");

/***/ }),

/***/ "(rsc)/./node_modules/.pnpm/next@14.2.33_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fvideo%2Frefine%2Froute&page=%2Fapi%2Fvideo%2Frefine%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fvideo%2Frefine%2Froute.ts&appDir=%2FUsers%2Fkshitijvarma%2FDesktop%2Fsjdnskfjdvnbdjkbvn%2FAI-VideoGen%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fkshitijvarma%2FDesktop%2Fsjdnskfjdvnbdjkbvn%2FAI-VideoGen&isDev=true&tsconfigPath=tsconfig.json&basePath=%2Faivideo&assetPrefix=%2Faivideo&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/next@14.2.33_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fvideo%2Frefine%2Froute&page=%2Fapi%2Fvideo%2Frefine%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fvideo%2Frefine%2Froute.ts&appDir=%2FUsers%2Fkshitijvarma%2FDesktop%2Fsjdnskfjdvnbdjkbvn%2FAI-VideoGen%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fkshitijvarma%2FDesktop%2Fsjdnskfjdvnbdjkbvn%2FAI-VideoGen&isDev=true&tsconfigPath=tsconfig.json&basePath=%2Faivideo&assetPrefix=%2Faivideo&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/.pnpm/next@14.2.33_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/.pnpm/next@14.2.33_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/.pnpm/next@14.2.33_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Users_kshitijvarma_Desktop_sjdnskfjdvnbdjkbvn_AI_VideoGen_app_api_video_refine_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/video/refine/route.ts */ \"(rsc)/./app/api/video/refine/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/video/refine/route\",\n        pathname: \"/api/video/refine\",\n        filename: \"route\",\n        bundlePath: \"app/api/video/refine/route\"\n    },\n    resolvedPagePath: \"/Users/kshitijvarma/Desktop/sjdnskfjdvnbdjkbvn/AI-VideoGen/app/api/video/refine/route.ts\",\n    nextConfigOutput,\n    userland: _Users_kshitijvarma_Desktop_sjdnskfjdvnbdjkbvn_AI_VideoGen_app_api_video_refine_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks } = routeModule;\nconst originalPathname = \"/api/video/refine/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvLnBucG0vbmV4dEAxNC4yLjMzX3JlYWN0LWRvbUAxOC4zLjFfcmVhY3RAMTguMy4xX19yZWFjdEAxOC4zLjEvbm9kZV9tb2R1bGVzL25leHQvZGlzdC9idWlsZC93ZWJwYWNrL2xvYWRlcnMvbmV4dC1hcHAtbG9hZGVyLmpzP25hbWU9YXBwJTJGYXBpJTJGdmlkZW8lMkZyZWZpbmUlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRnZpZGVvJTJGcmVmaW5lJTJGcm91dGUmYXBwUGF0aHM9JnBhZ2VQYXRoPXByaXZhdGUtbmV4dC1hcHAtZGlyJTJGYXBpJTJGdmlkZW8lMkZyZWZpbmUlMkZyb3V0ZS50cyZhcHBEaXI9JTJGVXNlcnMlMkZrc2hpdGlqdmFybWElMkZEZXNrdG9wJTJGc2pkbnNrZmpkdm5iZGprYnZuJTJGQUktVmlkZW9HZW4lMkZhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPSUyRlVzZXJzJTJGa3NoaXRpanZhcm1hJTJGRGVza3RvcCUyRnNqZG5za2ZqZHZuYmRqa2J2biUyRkFJLVZpZGVvR2VuJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JTJGYWl2aWRlbyZhc3NldFByZWZpeD0lMkZhaXZpZGVvJm5leHRDb25maWdPdXRwdXQ9JnByZWZlcnJlZFJlZ2lvbj0mbWlkZGxld2FyZUNvbmZpZz1lMzAlM0QhIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFzRztBQUN2QztBQUNjO0FBQ3dDO0FBQ3JIO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixnSEFBbUI7QUFDM0M7QUFDQSxjQUFjLHlFQUFTO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxZQUFZO0FBQ1osQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLFFBQVEsaUVBQWlFO0FBQ3pFO0FBQ0E7QUFDQSxXQUFXLDRFQUFXO0FBQ3RCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDdUg7O0FBRXZIIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYWktdmlkZW9nZW4tbmV4dC8/MDg2YSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvZnV0dXJlL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvZnV0dXJlL3JvdXRlLWtpbmRcIjtcbmltcG9ydCB7IHBhdGNoRmV0Y2ggYXMgX3BhdGNoRmV0Y2ggfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9saWIvcGF0Y2gtZmV0Y2hcIjtcbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCIvVXNlcnMva3NoaXRpanZhcm1hL0Rlc2t0b3Avc2pkbnNrZmpkdm5iZGprYnZuL0FJLVZpZGVvR2VuL2FwcC9hcGkvdmlkZW8vcmVmaW5lL3JvdXRlLnRzXCI7XG4vLyBXZSBpbmplY3QgdGhlIG5leHRDb25maWdPdXRwdXQgaGVyZSBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlbSBpbiB0aGUgcm91dGVcbi8vIG1vZHVsZS5cbmNvbnN0IG5leHRDb25maWdPdXRwdXQgPSBcIlwiXG5jb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBBcHBSb3V0ZVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5BUFBfUk9VVEUsXG4gICAgICAgIHBhZ2U6IFwiL2FwaS92aWRlby9yZWZpbmUvcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS92aWRlby9yZWZpbmVcIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL3ZpZGVvL3JlZmluZS9yb3V0ZVwiXG4gICAgfSxcbiAgICByZXNvbHZlZFBhZ2VQYXRoOiBcIi9Vc2Vycy9rc2hpdGlqdmFybWEvRGVza3RvcC9zamRuc2tmamR2bmJkamtidm4vQUktVmlkZW9HZW4vYXBwL2FwaS92aWRlby9yZWZpbmUvcm91dGUudHNcIixcbiAgICBuZXh0Q29uZmlnT3V0cHV0LFxuICAgIHVzZXJsYW5kXG59KTtcbi8vIFB1bGwgb3V0IHRoZSBleHBvcnRzIHRoYXQgd2UgbmVlZCB0byBleHBvc2UgZnJvbSB0aGUgbW9kdWxlLiBUaGlzIHNob3VsZFxuLy8gYmUgZWxpbWluYXRlZCB3aGVuIHdlJ3ZlIG1vdmVkIHRoZSBvdGhlciByb3V0ZXMgdG8gdGhlIG5ldyBmb3JtYXQuIFRoZXNlXG4vLyBhcmUgdXNlZCB0byBob29rIGludG8gdGhlIHJvdXRlLlxuY29uc3QgeyByZXF1ZXN0QXN5bmNTdG9yYWdlLCBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcyB9ID0gcm91dGVNb2R1bGU7XG5jb25zdCBvcmlnaW5hbFBhdGhuYW1lID0gXCIvYXBpL3ZpZGVvL3JlZmluZS9yb3V0ZVwiO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICBzZXJ2ZXJIb29rcyxcbiAgICAgICAgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHJlcXVlc3RBc3luY1N0b3JhZ2UsIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBvcmlnaW5hbFBhdGhuYW1lLCBwYXRjaEZldGNoLCAgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLXJvdXRlLmpzLm1hcCJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/.pnpm/next@14.2.33_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fvideo%2Frefine%2Froute&page=%2Fapi%2Fvideo%2Frefine%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fvideo%2Frefine%2Froute.ts&appDir=%2FUsers%2Fkshitijvarma%2FDesktop%2Fsjdnskfjdvnbdjkbvn%2FAI-VideoGen%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fkshitijvarma%2FDesktop%2Fsjdnskfjdvnbdjkbvn%2FAI-VideoGen&isDev=true&tsconfigPath=tsconfig.json&basePath=%2Faivideo&assetPrefix=%2Faivideo&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./app/api/video/refine/route.ts":
/*!***************************************!*\
  !*** ./app/api/video/refine/route.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! axios */ \"(rsc)/./node_modules/.pnpm/axios@1.13.0/node_modules/axios/lib/axios.js\");\n/* harmony import */ var _lib_db__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../lib/db */ \"(rsc)/./lib/db.ts\");\n/* harmony import */ var _models_Chat__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../models/Chat */ \"(rsc)/./models/Chat.ts\");\n\n\n\nasync function POST(request) {\n    try {\n        await (0,_lib_db__WEBPACK_IMPORTED_MODULE_0__.connectToDatabase)();\n        const body = await request.json();\n        const threadId = body?.threadId || \"\";\n        const refinement = body?.refinement || \"\";\n        const duration = parseInt(body?.duration) || 5;\n        const aspectRatio = typeof body?.aspectRatio === \"string\" ? body.aspectRatio : \"16:9\";\n        const model = typeof body?.model === \"string\" ? body.model : \"gen4_turbo\";\n        if (!threadId) {\n            return new Response(JSON.stringify({\n                error: \"threadId is required\"\n            }), {\n                status: 400\n            });\n        }\n        if (!refinement || !refinement.trim()) {\n            return new Response(JSON.stringify({\n                error: \"refinement text is required\"\n            }), {\n                status: 400\n            });\n        }\n        const chat = await _models_Chat__WEBPACK_IMPORTED_MODULE_1__[\"default\"].findOne({\n            threadId\n        });\n        if (!chat) {\n            return new Response(JSON.stringify({\n                error: \"Thread not found\"\n            }), {\n                status: 404\n            });\n        }\n        // Find the latest user prompt to refine\n        const lastUserMsg = [\n            ...chat.messages\n        ].reverse().find((m)=>m.role === \"user\");\n        const basePrompt = lastUserMsg?.content || \"\";\n        const refinedPrompt = basePrompt ? `${basePrompt}\\n\\nRefine with: ${refinement}` : refinement;\n        const apiKey = process.env.RUNWAY_API_KEY;\n        if (!apiKey) {\n            return new Response(JSON.stringify({\n                error: \"Server missing RUNWAY_API_KEY\"\n            }), {\n                status: 500\n            });\n        }\n        const ratioMap = {\n            \"16:9\": \"1280:720\",\n            \"9:16\": \"720:1280\",\n            \"1:1\": \"960:960\",\n            \"4:3\": \"1280:960\",\n            \"3:4\": \"960:1280\"\n        };\n        const ratio = ratioMap[aspectRatio] || \"1280:720\";\n        const client = axios__WEBPACK_IMPORTED_MODULE_2__[\"default\"].create({\n            baseURL: \"https://api.dev.runwayml.com\",\n            headers: {\n                Authorization: `Bearer ${apiKey}`,\n                \"Content-Type\": \"application/json\",\n                \"X-Runway-Version\": \"2024-11-06\"\n            },\n            timeout: 30000\n        });\n        const response = await client.post(\"/v1/image_to_video\", {\n            promptImage: \"https://picsum.photos/512/512\",\n            promptText: refinedPrompt.trim(),\n            duration,\n            ratio,\n            model\n        });\n        return new Response(JSON.stringify({\n            success: true,\n            data: response.data,\n            refinedPrompt\n        }), {\n            status: 200\n        });\n    } catch (err) {\n        const status = err?.response?.status || 500;\n        const message = err?.response?.data?.error || err?.message || \"Unknown error\";\n        return new Response(JSON.stringify({\n            error: message\n        }), {\n            status\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O1FBQVEsSUFBSTtZQUFFaEM7UUFBTztJQUNuRTtBQUNGIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYWktdmlkZW9nZW4tbmV4dC8uL2FwcC9hcGkvdmlkZW8vcmVmaW5lL3JvdXRlLnRzP2Q2ODEiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGF4aW9zIGZyb20gJ2F4aW9zJ1xuaW1wb3J0IHsgY29ubmVjdFRvRGF0YWJhc2UgfSBmcm9tICcuLi8uLi8uLi8uLi9saWIvZGInXG5pbXBvcnQgQ2hhdCBmcm9tICcuLi8uLi8uLi8uLi9tb2RlbHMvQ2hhdCdcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIFBPU1QocmVxdWVzdDogUmVxdWVzdCkge1xuICB0cnkge1xuICAgIGF3YWl0IGNvbm5lY3RUb0RhdGFiYXNlKClcbiAgICBjb25zdCBib2R5ID0gYXdhaXQgcmVxdWVzdC5qc29uKClcbiAgICBjb25zdCB0aHJlYWRJZDogc3RyaW5nID0gYm9keT8udGhyZWFkSWQgfHwgJydcbiAgICBjb25zdCByZWZpbmVtZW50OiBzdHJpbmcgPSBib2R5Py5yZWZpbmVtZW50IHx8ICcnXG4gICAgY29uc3QgZHVyYXRpb246IG51bWJlciA9IHBhcnNlSW50KGJvZHk/LmR1cmF0aW9uKSB8fCA1XG4gICAgY29uc3QgYXNwZWN0UmF0aW86IHN0cmluZyA9IHR5cGVvZiBib2R5Py5hc3BlY3RSYXRpbyA9PT0gJ3N0cmluZycgPyBib2R5LmFzcGVjdFJhdGlvIDogJzE2OjknXG4gICAgY29uc3QgbW9kZWw6IHN0cmluZyA9IHR5cGVvZiBib2R5Py5tb2RlbCA9PT0gJ3N0cmluZycgPyBib2R5Lm1vZGVsIDogJ2dlbjRfdHVyYm8nXG5cbiAgICBpZiAoIXRocmVhZElkKSB7XG4gICAgICByZXR1cm4gbmV3IFJlc3BvbnNlKEpTT04uc3RyaW5naWZ5KHsgZXJyb3I6ICd0aHJlYWRJZCBpcyByZXF1aXJlZCcgfSksIHsgc3RhdHVzOiA0MDAgfSlcbiAgICB9XG4gICAgaWYgKCFyZWZpbmVtZW50IHx8ICFyZWZpbmVtZW50LnRyaW0oKSkge1xuICAgICAgcmV0dXJuIG5ldyBSZXNwb25zZShKU09OLnN0cmluZ2lmeSh7IGVycm9yOiAncmVmaW5lbWVudCB0ZXh0IGlzIHJlcXVpcmVkJyB9KSwgeyBzdGF0dXM6IDQwMCB9KVxuICAgIH1cblxuICAgIGNvbnN0IGNoYXQgPSBhd2FpdCBDaGF0LmZpbmRPbmUoeyB0aHJlYWRJZCB9KVxuICAgIGlmICghY2hhdCkge1xuICAgICAgcmV0dXJuIG5ldyBSZXNwb25zZShKU09OLnN0cmluZ2lmeSh7IGVycm9yOiAnVGhyZWFkIG5vdCBmb3VuZCcgfSksIHsgc3RhdHVzOiA0MDQgfSlcbiAgICB9XG5cbiAgICAvLyBGaW5kIHRoZSBsYXRlc3QgdXNlciBwcm9tcHQgdG8gcmVmaW5lXG4gICAgY29uc3QgbGFzdFVzZXJNc2cgPSBbLi4uY2hhdC5tZXNzYWdlc10ucmV2ZXJzZSgpLmZpbmQoKG06IGFueSkgPT4gbS5yb2xlID09PSAndXNlcicpXG4gICAgY29uc3QgYmFzZVByb21wdDogc3RyaW5nID0gbGFzdFVzZXJNc2c/LmNvbnRlbnQgfHwgJydcbiAgICBjb25zdCByZWZpbmVkUHJvbXB0OiBzdHJpbmcgPSBiYXNlUHJvbXB0XG4gICAgICA/IGAke2Jhc2VQcm9tcHR9XFxuXFxuUmVmaW5lIHdpdGg6ICR7cmVmaW5lbWVudH1gXG4gICAgICA6IHJlZmluZW1lbnRcblxuICAgIGNvbnN0IGFwaUtleSA9IHByb2Nlc3MuZW52LlJVTldBWV9BUElfS0VZXG4gICAgaWYgKCFhcGlLZXkpIHtcbiAgICAgIHJldHVybiBuZXcgUmVzcG9uc2UoSlNPTi5zdHJpbmdpZnkoeyBlcnJvcjogJ1NlcnZlciBtaXNzaW5nIFJVTldBWV9BUElfS0VZJyB9KSwgeyBzdGF0dXM6IDUwMCB9KVxuICAgIH1cblxuICAgIGNvbnN0IHJhdGlvTWFwOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0ge1xuICAgICAgJzE2OjknOiAnMTI4MDo3MjAnLFxuICAgICAgJzk6MTYnOiAnNzIwOjEyODAnLFxuICAgICAgJzE6MSc6ICc5NjA6OTYwJyxcbiAgICAgICc0OjMnOiAnMTI4MDo5NjAnLFxuICAgICAgJzM6NCc6ICc5NjA6MTI4MCcsXG4gICAgfVxuICAgIGNvbnN0IHJhdGlvID0gcmF0aW9NYXBbYXNwZWN0UmF0aW9dIHx8ICcxMjgwOjcyMCdcblxuICAgIGNvbnN0IGNsaWVudCA9IGF4aW9zLmNyZWF0ZSh7XG4gICAgICBiYXNlVVJMOiAnaHR0cHM6Ly9hcGkuZGV2LnJ1bndheW1sLmNvbScsXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgIEF1dGhvcml6YXRpb246IGBCZWFyZXIgJHthcGlLZXl9YCxcbiAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgJ1gtUnVud2F5LVZlcnNpb24nOiAnMjAyNC0xMS0wNicsXG4gICAgICB9LFxuICAgICAgdGltZW91dDogMzAwMDAsXG4gICAgfSlcblxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgY2xpZW50LnBvc3QoJy92MS9pbWFnZV90b192aWRlbycsIHtcbiAgICAgIHByb21wdEltYWdlOiAnaHR0cHM6Ly9waWNzdW0ucGhvdG9zLzUxMi81MTInLFxuICAgICAgcHJvbXB0VGV4dDogcmVmaW5lZFByb21wdC50cmltKCksXG4gICAgICBkdXJhdGlvbixcbiAgICAgIHJhdGlvLFxuICAgICAgbW9kZWwsXG4gICAgfSlcblxuICAgIHJldHVybiBuZXcgUmVzcG9uc2UoSlNPTi5zdHJpbmdpZnkoeyBzdWNjZXNzOiB0cnVlLCBkYXRhOiByZXNwb25zZS5kYXRhLCByZWZpbmVkUHJvbXB0IH0pLCB7IHN0YXR1czogMjAwIH0pXG4gIH0gY2F0Y2ggKGVycjogYW55KSB7XG4gICAgY29uc3Qgc3RhdHVzID0gZXJyPy5yZXNwb25zZT8uc3RhdHVzIHx8IDUwMFxuICAgIGNvbnN0IG1lc3NhZ2UgPSBlcnI/LnJlc3BvbnNlPy5kYXRhPy5lcnJvciB8fCBlcnI/Lm1lc3NhZ2UgfHwgJ1Vua25vd24gZXJyb3InXG4gICAgcmV0dXJuIG5ldyBSZXNwb25zZShKU09OLnN0cmluZ2lmeSh7IGVycm9yOiBtZXNzYWdlIH0pLCB7IHN0YXR1cyB9KVxuICB9XG59XG5cblxuIl0sIm5hbWVzIjpbImF4aW9zIiwiY29ubmVjdFRvRGF0YWJhc2UiLCJDaGF0IiwiUE9TVCIsInJlcXVlc3QiLCJib2R5IiwianNvbiIsInRocmVhZElkIiwicmVmaW5lbWVudCIsImR1cmF0aW9uIiwicGFyc2VJbnQiLCJhc3BlY3RSYXRpbyIsIm1vZGVsIiwiUmVzcG9uc2UiLCJKU09OIiwic3RyaW5naWZ5IiwiZXJyb3IiLCJzdGF0dXMiLCJ0cmltIiwiY2hhdCIsImZpbmRPbmUiLCJsYXN0VXNlck1zZyIsIm1lc3NhZ2VzIiwicmV2ZXJzZSIsImZpbmQiLCJtIiwicm9sZSIsImJhc2VQcm9tcHQiLCJjb250ZW50IiwicmVmaW5lZFByb21wdCIsImFwaUtleSIsInByb2Nlc3MiLCJlbnYiLCJSVU5XQVlfQVBJX0tFWSIsInJhdGlvTWFwIiwicmF0aW8iLCJjbGllbnQiLCJjcmVhdGUiLCJiYXNlVVJMIiwiaGVhZGVycyIsIkF1dGhvcml6YXRpb24iLCJ0aW1lb3V0IiwicmVzcG9uc2UiLCJwb3N0IiwicHJvbXB0SW1hZ2UiLCJwcm9tcHRUZXh0Iiwic3VjY2VzcyIsImRhdGEiLCJlcnIiLCJtZXNzYWdlIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./app/api/video/refine/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/db.ts":
/*!*******************!*\
  !*** ./lib/db.ts ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   connectToDatabase: () => (/* binding */ connectToDatabase)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n\nlet isConnected = 0;\nasync function connectToDatabase() {\n    if (isConnected) return;\n    const uri = process.env.MONGODB_URI;\n    if (!uri) throw new Error(\"MONGODB_URI is not set\");\n    const conn = await mongoose__WEBPACK_IMPORTED_MODULE_0___default().connect(uri, {\n        dbName: process.env.MONGODB_DATABASE || undefined\n    });\n    isConnected = conn.connections[0].readyState;\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvZGIudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQStCO0FBRS9CLElBQUlDLGNBQWM7QUFFWCxlQUFlQztJQUNwQixJQUFJRCxhQUFhO0lBQ2pCLE1BQU1FLE1BQU1DLFFBQVFDLEdBQUcsQ0FBQ0MsV0FBVztJQUNuQyxJQUFJLENBQUNILEtBQUssTUFBTSxJQUFJSSxNQUFNO0lBQzFCLE1BQU1DLE9BQU8sTUFBTVIsdURBQWdCLENBQUNHLEtBQUs7UUFBRU8sUUFBUU4sUUFBUUMsR0FBRyxDQUFDTSxnQkFBZ0IsSUFBSUM7SUFBVTtJQUM3RlgsY0FBY08sS0FBS0ssV0FBVyxDQUFDLEVBQUUsQ0FBQ0MsVUFBVTtBQUM5QyIsInNvdXJjZXMiOlsid2VicGFjazovL2FpLXZpZGVvZ2VuLW5leHQvLi9saWIvZGIudHM/MWRmMCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbW9uZ29vc2UgZnJvbSAnbW9uZ29vc2UnXG5cbmxldCBpc0Nvbm5lY3RlZCA9IDBcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNvbm5lY3RUb0RhdGFiYXNlKCkge1xuICBpZiAoaXNDb25uZWN0ZWQpIHJldHVyblxuICBjb25zdCB1cmkgPSBwcm9jZXNzLmVudi5NT05HT0RCX1VSSVxuICBpZiAoIXVyaSkgdGhyb3cgbmV3IEVycm9yKCdNT05HT0RCX1VSSSBpcyBub3Qgc2V0JylcbiAgY29uc3QgY29ubiA9IGF3YWl0IG1vbmdvb3NlLmNvbm5lY3QodXJpLCB7IGRiTmFtZTogcHJvY2Vzcy5lbnYuTU9OR09EQl9EQVRBQkFTRSB8fCB1bmRlZmluZWQgfSlcbiAgaXNDb25uZWN0ZWQgPSBjb25uLmNvbm5lY3Rpb25zWzBdLnJlYWR5U3RhdGVcbn1cblxuXG4iXSwibmFtZXMiOlsibW9uZ29vc2UiLCJpc0Nvbm5lY3RlZCIsImNvbm5lY3RUb0RhdGFiYXNlIiwidXJpIiwicHJvY2VzcyIsImVudiIsIk1PTkdPREJfVVJJIiwiRXJyb3IiLCJjb25uIiwiY29ubmVjdCIsImRiTmFtZSIsIk1PTkdPREJfREFUQUJBU0UiLCJ1bmRlZmluZWQiLCJjb25uZWN0aW9ucyIsInJlYWR5U3RhdGUiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./lib/db.ts\n");

/***/ }),

/***/ "(rsc)/./models/Chat.ts":
/*!************************!*\
  !*** ./models/Chat.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n\nconst MessageSchema = new mongoose__WEBPACK_IMPORTED_MODULE_0__.Schema({\n    id: {\n        type: String,\n        required: true\n    },\n    role: {\n        type: String,\n        enum: [\n            \"user\",\n            \"assistant\"\n        ],\n        required: true\n    },\n    content: {\n        type: String,\n        required: true\n    },\n    videoUrl: {\n        type: String\n    },\n    createdAt: {\n        type: Date,\n        default: Date.now\n    }\n});\nconst ChatSchema = new mongoose__WEBPACK_IMPORTED_MODULE_0__.Schema({\n    id: {\n        type: String\n    },\n    title: {\n        type: String,\n        required: true\n    },\n    user: {\n        id: {\n            type: String,\n            required: true\n        },\n        email: {\n            type: String,\n            required: true\n        }\n    },\n    companyId: {\n        type: String,\n        required: true\n    },\n    threadId: {\n        type: String,\n        required: true,\n        unique: true\n    },\n    messages: {\n        type: [\n            MessageSchema\n        ],\n        default: []\n    }\n}, {\n    timestamps: {\n        createdAt: true,\n        updatedAt: true\n    }\n});\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (mongoose__WEBPACK_IMPORTED_MODULE_0__.models.Chat || (0,mongoose__WEBPACK_IMPORTED_MODULE_0__.model)(\"Chat\", ChatSchema));\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9tb2RlbHMvQ2hhdC50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBMEQ7QUFFMUQsTUFBTUcsZ0JBQWdCLElBQUlILDRDQUFNQSxDQUFDO0lBQy9CSSxJQUFJO1FBQUVDLE1BQU1DO1FBQVFDLFVBQVU7SUFBSztJQUNuQ0MsTUFBTTtRQUFFSCxNQUFNQztRQUFRRyxNQUFNO1lBQUM7WUFBUTtTQUFZO1FBQUVGLFVBQVU7SUFBSztJQUNsRUcsU0FBUztRQUFFTCxNQUFNQztRQUFRQyxVQUFVO0lBQUs7SUFDeENJLFVBQVU7UUFBRU4sTUFBTUM7SUFBTztJQUN6Qk0sV0FBVztRQUFFUCxNQUFNUTtRQUFNQyxTQUFTRCxLQUFLRSxHQUFHO0lBQUM7QUFDN0M7QUFFQSxNQUFNQyxhQUFhLElBQUloQiw0Q0FBTUEsQ0FBQztJQUM1QkksSUFBSTtRQUFFQyxNQUFNQztJQUFPO0lBQ25CVyxPQUFPO1FBQUVaLE1BQU1DO1FBQVFDLFVBQVU7SUFBSztJQUN0Q1csTUFBTTtRQUNKZCxJQUFJO1lBQUVDLE1BQU1DO1lBQVFDLFVBQVU7UUFBSztRQUNuQ1ksT0FBTztZQUFFZCxNQUFNQztZQUFRQyxVQUFVO1FBQUs7SUFDeEM7SUFDQWEsV0FBVztRQUFFZixNQUFNQztRQUFRQyxVQUFVO0lBQUs7SUFDMUNjLFVBQVU7UUFBRWhCLE1BQU1DO1FBQVFDLFVBQVU7UUFBTWUsUUFBUTtJQUFLO0lBQ3ZEQyxVQUFVO1FBQUVsQixNQUFNO1lBQUNGO1NBQWM7UUFBRVcsU0FBUyxFQUFFO0lBQUM7QUFFakQsR0FBRztJQUFFVSxZQUFZO1FBQUVaLFdBQVc7UUFBTWEsV0FBVztJQUFLO0FBQUU7QUFLdEQsaUVBQWV4Qiw0Q0FBTUEsQ0FBQ3lCLElBQUksSUFBSXhCLCtDQUFLQSxDQUFDLFFBQVFjLFdBQVdBLEVBQUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9haS12aWRlb2dlbi1uZXh0Ly4vbW9kZWxzL0NoYXQudHM/ZGYxZiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbW9uZ29vc2UsIHsgU2NoZW1hLCBtb2RlbHMsIG1vZGVsIH0gZnJvbSAnbW9uZ29vc2UnXG5cbmNvbnN0IE1lc3NhZ2VTY2hlbWEgPSBuZXcgU2NoZW1hKHtcbiAgaWQ6IHsgdHlwZTogU3RyaW5nLCByZXF1aXJlZDogdHJ1ZSB9LFxuICByb2xlOiB7IHR5cGU6IFN0cmluZywgZW51bTogWyd1c2VyJywgJ2Fzc2lzdGFudCddLCByZXF1aXJlZDogdHJ1ZSB9LFxuICBjb250ZW50OiB7IHR5cGU6IFN0cmluZywgcmVxdWlyZWQ6IHRydWUgfSxcbiAgdmlkZW9Vcmw6IHsgdHlwZTogU3RyaW5nIH0sXG4gIGNyZWF0ZWRBdDogeyB0eXBlOiBEYXRlLCBkZWZhdWx0OiBEYXRlLm5vdyB9LFxufSlcblxuY29uc3QgQ2hhdFNjaGVtYSA9IG5ldyBTY2hlbWEoe1xuICBpZDogeyB0eXBlOiBTdHJpbmcgfSwgLy8gT3B0aW9uYWwsIHdpbGwgbWlycm9yIF9pZCBvciBjYW4gYmUgbGVmdCBmb3IgYXBwIHRvIGZpbGxcbiAgdGl0bGU6IHsgdHlwZTogU3RyaW5nLCByZXF1aXJlZDogdHJ1ZSB9LFxuICB1c2VyOiB7XG4gICAgaWQ6IHsgdHlwZTogU3RyaW5nLCByZXF1aXJlZDogdHJ1ZSB9LFxuICAgIGVtYWlsOiB7IHR5cGU6IFN0cmluZywgcmVxdWlyZWQ6IHRydWUgfSxcbiAgfSxcbiAgY29tcGFueUlkOiB7IHR5cGU6IFN0cmluZywgcmVxdWlyZWQ6IHRydWUgfSxcbiAgdGhyZWFkSWQ6IHsgdHlwZTogU3RyaW5nLCByZXF1aXJlZDogdHJ1ZSwgdW5pcXVlOiB0cnVlIH0sXG4gIG1lc3NhZ2VzOiB7IHR5cGU6IFtNZXNzYWdlU2NoZW1hXSwgZGVmYXVsdDogW10gfSxcbiAgLy8gQW55IG90aGVyIGZpZWxkcy4uLlxufSwgeyB0aW1lc3RhbXBzOiB7IGNyZWF0ZWRBdDogdHJ1ZSwgdXBkYXRlZEF0OiB0cnVlIH0gfSlcblxuZXhwb3J0IHR5cGUgTWVzc2FnZURvYyA9IG1vbmdvb3NlLkluZmVyU2NoZW1hVHlwZTx0eXBlb2YgTWVzc2FnZVNjaGVtYT5cbmV4cG9ydCB0eXBlIENoYXREb2MgPSBtb25nb29zZS5JbmZlclNjaGVtYVR5cGU8dHlwZW9mIENoYXRTY2hlbWE+XG5cbmV4cG9ydCBkZWZhdWx0IG1vZGVscy5DaGF0IHx8IG1vZGVsKCdDaGF0JywgQ2hhdFNjaGVtYSlcblxuXG4iXSwibmFtZXMiOlsiU2NoZW1hIiwibW9kZWxzIiwibW9kZWwiLCJNZXNzYWdlU2NoZW1hIiwiaWQiLCJ0eXBlIiwiU3RyaW5nIiwicmVxdWlyZWQiLCJyb2xlIiwiZW51bSIsImNvbnRlbnQiLCJ2aWRlb1VybCIsImNyZWF0ZWRBdCIsIkRhdGUiLCJkZWZhdWx0Iiwibm93IiwiQ2hhdFNjaGVtYSIsInRpdGxlIiwidXNlciIsImVtYWlsIiwiY29tcGFueUlkIiwidGhyZWFkSWQiLCJ1bmlxdWUiLCJtZXNzYWdlcyIsInRpbWVzdGFtcHMiLCJ1cGRhdGVkQXQiLCJDaGF0Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./models/Chat.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next@14.2.33_react-dom@18.3.1_react@18.3.1__react@18.3.1","vendor-chunks/axios@1.13.0","vendor-chunks/mime-db@1.52.0","vendor-chunks/follow-redirects@1.15.11","vendor-chunks/debug@4.4.3","vendor-chunks/form-data@4.0.4","vendor-chunks/get-intrinsic@1.3.0","vendor-chunks/asynckit@0.4.0","vendor-chunks/combined-stream@1.0.8","vendor-chunks/mime-types@2.1.35","vendor-chunks/proxy-from-env@1.1.0","vendor-chunks/ms@2.1.3","vendor-chunks/supports-color@7.2.0","vendor-chunks/has-symbols@1.1.0","vendor-chunks/delayed-stream@1.0.0","vendor-chunks/function-bind@1.1.2","vendor-chunks/es-set-tostringtag@2.1.0","vendor-chunks/get-proto@1.0.1","vendor-chunks/call-bind-apply-helpers@1.0.2","vendor-chunks/dunder-proto@1.0.1","vendor-chunks/math-intrinsics@1.1.0","vendor-chunks/es-errors@1.3.0","vendor-chunks/has-flag@4.0.0","vendor-chunks/gopd@1.2.0","vendor-chunks/es-define-property@1.0.1","vendor-chunks/hasown@2.0.2","vendor-chunks/has-tostringtag@1.0.2","vendor-chunks/es-object-atoms@1.1.1"], () => (__webpack_exec__("(rsc)/./node_modules/.pnpm/next@14.2.33_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fvideo%2Frefine%2Froute&page=%2Fapi%2Fvideo%2Frefine%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fvideo%2Frefine%2Froute.ts&appDir=%2FUsers%2Fkshitijvarma%2FDesktop%2Fsjdnskfjdvnbdjkbvn%2FAI-VideoGen%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fkshitijvarma%2FDesktop%2Fsjdnskfjdvnbdjkbvn%2FAI-VideoGen&isDev=true&tsconfigPath=tsconfig.json&basePath=%2Faivideo&assetPrefix=%2Faivideo&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();