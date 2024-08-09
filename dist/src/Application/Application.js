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
const Debug_1 = __importDefault(require("./Utils/Debug"));
const Sizes_1 = __importDefault(require("./Utils/Sizes"));
const Time_1 = __importDefault(require("./Utils/Time"));
const Camera_1 = __importDefault(require("./Camera/Camera"));
const Renderer_1 = __importDefault(require("./Renderer"));
const Mouse_1 = __importDefault(require("./Utils/Mouse"));
//@ts-ignore
const World_1 = __importDefault(require("./World/World"));
const Resources_1 = __importDefault(require("./Utils/Resources"));
const sources_1 = __importDefault(require("./sources"));
const stats_js_1 = __importDefault(require("stats.js"));
const Loading_1 = __importDefault(require("./Utils/Loading"));
const UI_1 = __importDefault(require("./UI"));
let instance = null;
class Application {
    constructor() {
        // Singleton
        if (instance) {
            return instance;
        }
        instance = this;
        // Global access
        //@ts-ignore
        // window.Application = this;
        // Setup
        this.debug = new Debug_1.default();
        this.sizes = new Sizes_1.default();
        this.mouse = new Mouse_1.default();
        this.loading = new Loading_1.default();
        this.time = new Time_1.default();
        this.scene = new THREE.Scene();
        this.cssScene = new THREE.Scene();
        this.overlayScene = new THREE.Scene();
        this.resources = new Resources_1.default(sources_1.default);
        this.camera = new Camera_1.default();
        this.renderer = new Renderer_1.default();
        this.camera.createControls();
        this.world = new World_1.default();
        this.ui = new UI_1.default();
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.has('debug')) {
            this.stats = new stats_js_1.default();
            this.stats.showPanel(0);
            document.body.appendChild(this.stats.dom);
        }
        // Resize event
        this.sizes.on('resize', () => {
            this.resize();
        });
        // Time tick event
        this.time.on('tick', () => {
            this.update();
        });
    }
    resize() {
        this.camera.resize();
        this.renderer.resize();
    }
    update() {
        if (this.stats)
            this.stats.begin();
        this.camera.update();
        this.world.update();
        this.renderer.update();
        if (this.stats)
            this.stats.end();
    }
    destroy() {
        this.sizes.off('resize');
        this.time.off('tick');
        // Traverse the whole scene
        this.scene.traverse((child) => {
            // Test if it's a mesh
            if (child instanceof THREE.Mesh) {
                child.geometry.dispose();
                // Loop through the material properties
                for (const key in child.material) {
                    const value = child.material[key];
                    // Test if there is a dispose function
                    if (value && typeof value.dispose === 'function') {
                        value.dispose();
                    }
                }
            }
        });
        this.renderer.instance.dispose();
        if (this.debug.active)
            this.debug.ui.destroy();
    }
}
exports.default = Application;
