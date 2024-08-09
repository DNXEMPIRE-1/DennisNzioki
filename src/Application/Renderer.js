"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const THREE = __importStar(require("three"));
const CSS3DRenderer_js_1 = require("three/examples/jsm/renderers/CSS3DRenderer.js");
const Application_1 = __importDefault(require("./Application"));
// @ts-ignore
const vertex_glsl_1 = __importDefault(require("./Shaders/screen/vertex.glsl"));
// @ts-ignore
const fragment_glsl_1 = __importDefault(require("./Shaders/screen/fragment.glsl"));
class Renderer {
    constructor() {
        this.application = new Application_1.default();
        this.time = this.application.time;
        this.sizes = this.application.sizes;
        this.scene = this.application.scene;
        this.cssScene = this.application.cssScene;
        this.overlayScene = this.application.overlayScene;
        this.camera = this.application.camera;
        this.setInstance();
    }
    setInstance() {
        var _a, _b, _c;
        this.instance = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
        });
        // Settings
        // this.instance.physicallyCorrectLights = true;
        this.instance.outputEncoding = THREE.sRGBEncoding;
        // this.instance.toneMapping = THREE.ACESFilmicToneMapping;
        // this.instance.toneMappingExposure = 0.9;
        this.instance.setSize(this.sizes.width, this.sizes.height);
        this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio, 2));
        this.instance.setClearColor(0x000000, 0.0);
        // Style
        this.instance.domElement.style.position = 'absolute';
        this.instance.domElement.style.zIndex = '1px';
        this.instance.domElement.style.top = '0px';
        (_a = document.querySelector('#webgl')) === null || _a === void 0 ? void 0 : _a.appendChild(this.instance.domElement);
        this.overlayInstance = new THREE.WebGLRenderer();
        this.overlayInstance.setSize(this.sizes.width, this.sizes.height);
        this.overlayInstance.domElement.style.position = 'absolute';
        this.overlayInstance.domElement.style.top = '0px';
        this.overlayInstance.domElement.style.mixBlendMode = 'soft-light';
        this.overlayInstance.domElement.style.opacity = '0.12';
        // this.overlayInstance.domElement.style.mixBlendMode = 'luminosity';
        // this.overlayInstance.domElement.style.opacity = '1';
        this.overlayInstance.domElement.style.pointerEvents = 'none';
        (_b = document
            .querySelector('#overlay')) === null || _b === void 0 ? void 0 : _b.appendChild(this.overlayInstance.domElement);
        this.cssInstance = new CSS3DRenderer_js_1.CSS3DRenderer();
        this.cssInstance.setSize(this.sizes.width, this.sizes.height);
        this.cssInstance.domElement.style.position = 'absolute';
        this.cssInstance.domElement.style.top = '0px';
        (_c = document
            .querySelector('#css')) === null || _c === void 0 ? void 0 : _c.appendChild(this.cssInstance.domElement);
        this.uniforms = {
            u_time: { value: 1 },
        };
        this.overlay = new THREE.Mesh(new THREE.PlaneGeometry(10000, 10000), new THREE.ShaderMaterial({
            vertexShader: vertex_glsl_1.default,
            fragmentShader: fragment_glsl_1.default,
            uniforms: this.uniforms,
            depthTest: false,
            depthWrite: false,
        }));
        this.overlayScene.add(this.overlay);
    }
    resize() {
        this.instance.setSize(this.sizes.width, this.sizes.height);
        this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio, 2));
        this.cssInstance.setSize(this.sizes.width, this.sizes.height);
        this.overlayInstance.setSize(this.sizes.width, this.sizes.height);
        this.overlayInstance.setPixelRatio(Math.min(this.sizes.pixelRatio, 2));
    }
    update() {
        this.application.camera.instance.updateProjectionMatrix();
        if (this.uniforms) {
            this.uniforms.u_time.value = Math.sin(this.time.current * 0.01);
        }
        this.instance.render(this.scene, this.camera.instance);
        this.cssInstance.render(this.cssScene, this.camera.instance);
        this.overlayInstance.render(this.overlayScene, this.camera.instance);
        this.overlay.position.copy(this.camera.instance.position);
    }
}
exports.default = Renderer;
