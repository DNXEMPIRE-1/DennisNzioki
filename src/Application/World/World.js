"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Application_1 = __importDefault(require("../Application"));
const Computer_1 = __importDefault(require("./Computer"));
const MonitorScreen_1 = __importDefault(require("./MonitorScreen"));
const Environment_1 = __importDefault(require("./Environment"));
const Decor_1 = __importDefault(require("./Decor"));
const CoffeeSteam_1 = __importDefault(require("./CoffeeSteam"));
const AudioManager_1 = __importDefault(require("../Audio/AudioManager"));
class World {
    constructor() {
        this.application = new Application_1.default();
        this.scene = this.application.scene;
        this.resources = this.application.resources;
        // Wait for resources
        this.resources.on('ready', () => {
            // Setup
            this.environment = new Environment_1.default();
            this.decor = new Decor_1.default();
            this.computerSetup = new Computer_1.default();
            this.monitorScreen = new MonitorScreen_1.default();
            this.coffeeSteam = new CoffeeSteam_1.default();
            this.audioManager = new AudioManager_1.default();
            // const hb = new Hitboxes();
            // this.cursor = new Cursor();
        });
    }
    update() {
        if (this.monitorScreen)
            this.monitorScreen.update();
        if (this.environment)
            this.environment.update();
        if (this.coffeeSteam)
            this.coffeeSteam.update();
        if (this.audioManager)
            this.audioManager.update();
    }
}
exports.default = World;
