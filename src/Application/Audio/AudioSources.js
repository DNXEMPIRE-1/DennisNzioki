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
exports.AmbienceAudio = exports.ComputerAudio = exports.AudioSource = void 0;
const THREE = __importStar(require("three"));
const EventBus_1 = __importDefault(require("../UI/EventBus"));
class AudioSource {
    constructor(manager) {
        this.manager = manager;
    }
    update() { }
}
exports.AudioSource = AudioSource;
class ComputerAudio extends AudioSource {
    constructor(manager) {
        super(manager);
        document.addEventListener('mousedown', (event) => {
            // @ts-ignore
            if (event.inComputer) {
                this.manager.playAudio('mouseDown', {
                    volume: 0.8,
                    position: new THREE.Vector3(800, -300, 1200),
                });
            }
        });
        document.addEventListener('mouseup', (event) => {
            // @ts-ignore
            if (event.inComputer) {
                this.manager.playAudio('mouseUp', {
                    volume: 0.8,
                    position: new THREE.Vector3(800, -300, 1200),
                });
            }
        });
        document.addEventListener('keyup', (event) => {
            // @ts-ignore
            if (event.inComputer) {
                this.lastKey = '';
            }
        });
        document.addEventListener('keydown', (event) => {
            if (event.key.includes('_AUTO_')) {
                this.manager.playAudio('ccType', {
                    volume: 0.1,
                    randDetuneScale: 0,
                    pitch: 20,
                });
                return;
            }
            if (this.lastKey === event.key)
                return;
            this.lastKey = event.key;
            // @ts-ignore
            if (event.inComputer) {
                this.manager.playAudio('keyboardKeydown', {
                    volume: 0.8,
                    position: new THREE.Vector3(-300, -400, 1200),
                });
            }
        });
    }
}
exports.ComputerAudio = ComputerAudio;
class AmbienceAudio extends AudioSource {
    constructor(manager) {
        super(manager);
        EventBus_1.default.on('loadingScreenDone', () => {
            this.poolKey = this.manager.playAudio('office', {
                volume: 1,
                loop: true,
                randDetuneScale: 0,
                filter: {
                    type: 'lowpass',
                    frequency: 1000,
                },
            });
            this.manager.playAudio('startup', {
                volume: 0.4,
                randDetuneScale: 0,
            });
        });
    }
    mapValues(input, input_start, input_end, output_start, output_end) {
        return (output_start +
            ((output_end - output_start) / (input_end - input_start)) *
                (input - input_start));
    }
    update() {
        const cameraPosition = this.manager.application.camera.instance.position;
        const y = cameraPosition.y;
        const x = cameraPosition.x;
        const z = cameraPosition.z;
        // calculate distance to origin
        const distance = Math.sqrt(x * x + y * y + z * z);
        const freq = this.mapValues(distance, 0, 10000, 100, 22000);
        const volume = this.mapValues(distance, 1200, 10000, 0, 0.2);
        const volumeClamped = Math.min(Math.max(volume, 0.05), 0.1);
        this.manager.setAudioFilterFrequency(this.poolKey, freq - 3000);
        this.manager.setAudioVolume(this.poolKey, volumeClamped);
    }
}
exports.AmbienceAudio = AmbienceAudio;
