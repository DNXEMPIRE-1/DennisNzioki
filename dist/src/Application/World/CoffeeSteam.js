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
const Application_1 = __importDefault(require("../Application"));
// @ts-ignore
const fragment_glsl_1 = __importDefault(require("../Shaders/coffee/fragment.glsl"));
// @ts-ignore
const vertex_glsl_1 = __importDefault(require("../Shaders/coffee/vertex.glsl"));
class CoffeeSteam {
    constructor() {
        this.application = new Application_1.default();
        this.resources = this.application.resources;
        this.scene = this.application.scene;
        this.time = this.application.time;
        this.setModel();
    }
    setModel() {
        this.model = {};
        this.model.color = '#c9c9c9';
        // Material
        this.model.material = new THREE.ShaderMaterial({
            transparent: true,
            depthWrite: false,
            vertexShader: vertex_glsl_1.default,
            fragmentShader: fragment_glsl_1.default,
            uniforms: {
                uTime: { value: 0 },
                uTimeFrequency: { value: 0.001 },
                uUvFrequency: { value: new THREE.Vector2(3, 5) },
                uColor: { value: new THREE.Color(this.model.color) },
            },
        });
        this.model.mesh = new THREE.Mesh(new THREE.PlaneGeometry(280, 700), this.model.material);
        this.model.mesh.position.copy(new THREE.Vector3(1670, 200, 900));
        this.scene.add(this.model.mesh);
    }
    update() {
        this.model.material.uniforms.uTime.value = this.time.elapsed;
    }
}
exports.default = CoffeeSteam;
