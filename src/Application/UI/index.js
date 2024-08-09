"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const App_1 = require("./App");
class UI {
    constructor() {
        (0, App_1.createUI)();
        (0, App_1.createVolumeUI)();
    }
}
exports.default = UI;
