"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const EventEmitter_1 = __importDefault(require("./EventEmitter"));
class Mouse extends EventEmitter_1.default {
    constructor() {
        super();
        // Setup
        this.x = 0;
        this.y = 0;
        this.inComputer = false;
        // this.application = new Application();
        // this.audio = this.application.world.audio;
        // Resize event
        this.on('mousemove', (event) => {
            if (event.clientX && event.clientY) {
                this.x = event.clientX;
                this.y = event.clientY;
            }
            this.inComputer = event.inComputer ? true : false;
        });
    }
}
exports.default = Mouse;
