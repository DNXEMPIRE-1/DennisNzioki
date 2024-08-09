"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Application_1 = __importDefault(require("../Application"));
const EventEmitter_1 = __importDefault(require("./EventEmitter"));
const EventBus_1 = __importDefault(require("../UI/EventBus"));
class Loading extends EventEmitter_1.default {
    constructor() {
        super();
        this.application = new Application_1.default();
        this.resources = this.application.resources;
        this.scene = this.application.scene;
        this.on('loadedSource', (sourceName, loaded, toLoad) => {
            this.progress = loaded / toLoad;
            EventBus_1.default.dispatch('loadedSource', {
                sourceName: sourceName,
                progress: loaded / toLoad,
                toLoad: toLoad,
                loaded: loaded,
            });
        });
    }
}
exports.default = Loading;
