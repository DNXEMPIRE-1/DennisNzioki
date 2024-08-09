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
Object.defineProperty(exports, "__esModule", { value: true });
const THREE = __importStar(require("three"));
class BakedModel {
    constructor(model, texture, scale) {
        this.model = model;
        this.texture = texture;
        this.texture.flipY = false;
        this.texture.encoding = THREE.sRGBEncoding;
        this.material = new THREE.MeshBasicMaterial({
            map: this.texture,
        });
        this.model.scene.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                if (scale)
                    child.scale.set(scale, scale, scale);
                child.material.map = this.texture;
                child.material = this.material;
            }
        });
        return this;
    }
    getModel() {
        return this.model.scene;
    }
}
exports.default = BakedModel;
