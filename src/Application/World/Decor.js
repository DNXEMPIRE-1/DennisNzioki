"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Application_1 = __importDefault(require("../Application"));
const BakedModel_1 = __importDefault(require("../Utils/BakedModel"));
class Decor {
    constructor() {
        this.application = new Application_1.default();
        this.scene = this.application.scene;
        this.resources = this.application.resources;
        this.bakeModel();
        this.setModel();
    }
    bakeModel() {
        this.bakedModel = new BakedModel_1.default(this.resources.items.gltfModel.decorModel, this.resources.items.texture.decorTexture, 900);
    }
    setModel() {
        this.scene.add(this.bakedModel.getModel());
    }
}
exports.default = Decor;
