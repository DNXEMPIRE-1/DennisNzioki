"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const EventBus_1 = __importDefault(require("../UI/EventBus"));
const EventEmitter_1 = __importDefault(require("./EventEmitter"));
class Time extends EventEmitter_1.default {
    constructor() {
        super();
        // Setup
        this.start = Date.now();
        this.current = this.start;
        this.elapsed = 0;
        this.delta = 16;
        window.requestAnimationFrame(() => {
            this.tick();
        });
        EventBus_1.default.on('loadingScreenDone', () => {
            this.start = Date.now();
        });
    }
    tick() {
        const currentTime = Date.now();
        this.delta = currentTime - this.current;
        this.current = currentTime;
        this.elapsed = this.current - this.start;
        this.trigger('tick');
        window.requestAnimationFrame(() => {
            this.tick();
        });
    }
}
exports.default = Time;
