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
const GLTFLoader_js_1 = require("three/examples/jsm/loaders/GLTFLoader.js");
const Application_1 = __importDefault(require("../Application"));
const EventEmitter_1 = __importDefault(require("./EventEmitter"));
class Resources extends EventEmitter_1.default {
    constructor(sources) {
        super();
        this.sources = sources;
        this.items = { texture: {}, cubeTexture: {}, gltfModel: {}, audio: {} };
        this.toLoad = this.sources.length;
        this.loaded = 0;
        this.application = new Application_1.default();
        this.loading = this.application.loading;
        this.setLoaders();
        this.startLoading();
    }
    setLoaders() {
        this.loaders = {
            gltfLoader: new GLTFLoader_js_1.GLTFLoader(),
            textureLoader: new THREE.TextureLoader(),
            cubeTextureLoader: new THREE.CubeTextureLoader(),
            audioLoader: new THREE.AudioLoader(),
        };
    }
    startLoading() {
        // Load each source
        for (const source of this.sources) {
            if (source.type === 'gltfModel') {
                this.loaders.gltfLoader.load(source.path, (file) => {
                    this.sourceLoaded(source, file);
                });
            }
            else if (source.type === 'texture') {
                this.loaders.textureLoader.load(source.path, (file) => {
                    file.encoding = THREE.sRGBEncoding;
                    this.sourceLoaded(source, file);
                });
            }
            else if (source.type === 'cubeTexture') {
                this.loaders.cubeTextureLoader.load(source.path, (file) => {
                    this.sourceLoaded(source, file);
                });
            }
            else if (source.type === 'audio') {
                this.loaders.audioLoader.load(source.path, (buffer) => {
                    this.sourceLoaded(source, buffer);
                });
            }
        }
    }
    sourceLoaded(source, file) {
        this.items[source.type][source.name] = file;
        this.loaded++;
        this.loading.trigger('loadedSource', [
            source.name,
            this.loaded,
            this.toLoad,
        ]);
        if (this.loaded === this.toLoad) {
            this.trigger('ready');
        }
    }
}
exports.default = Resources;
