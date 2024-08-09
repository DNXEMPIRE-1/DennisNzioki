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
exports.CameraKey = void 0;
const THREE = __importStar(require("three"));
const Application_1 = __importDefault(require("../Application"));
const EventEmitter_1 = __importDefault(require("../Utils/EventEmitter"));
const OrbitControls_1 = require("three/examples/jsm/controls/OrbitControls");
const tween_js_1 = __importDefault(require("@tweenjs/tween.js"));
const EventBus_1 = __importDefault(require("../UI/EventBus"));
const bezier_easing_1 = __importDefault(require("bezier-easing"));
const CameraKeyframes_1 = require("./CameraKeyframes");
var CameraKey;
(function (CameraKey) {
    CameraKey["IDLE"] = "idle";
    CameraKey["MONITOR"] = "monitor";
    CameraKey["LOADING"] = "loading";
    CameraKey["DESK"] = "desk";
    CameraKey["ORBIT_CONTROLS_START"] = "orbitControlsStart";
})(CameraKey || (exports.CameraKey = CameraKey = {}));
class Camera extends EventEmitter_1.default {
    constructor() {
        super();
        this.application = new Application_1.default();
        this.sizes = this.application.sizes;
        this.scene = this.application.scene;
        this.renderer = this.application.renderer;
        this.resources = this.application.resources;
        this.time = this.application.time;
        this.position = new THREE.Vector3(0, 0, 0);
        this.focalPoint = new THREE.Vector3(0, 0, 0);
        this.freeCam = false;
        this.keyframes = {
            idle: new CameraKeyframes_1.IdleKeyframe(),
            monitor: new CameraKeyframes_1.MonitorKeyframe(),
            loading: new CameraKeyframes_1.LoadingKeyframe(),
            desk: new CameraKeyframes_1.DeskKeyframe(),
            orbitControlsStart: new CameraKeyframes_1.OrbitControlsStart(),
        };
        document.addEventListener('mousedown', (event) => {
            event.preventDefault();
            // @ts-ignore
            if (event.target.id === 'prevent-click')
                return;
            // print target and current keyframe
            if (this.currentKeyframe === CameraKey.IDLE ||
                this.targetKeyframe === CameraKey.IDLE) {
                this.transition(CameraKey.DESK);
            }
            else if (this.currentKeyframe === CameraKey.DESK ||
                this.targetKeyframe === CameraKey.DESK) {
                this.transition(CameraKey.IDLE);
            }
        });
        this.setPostLoadTransition();
        this.setInstance();
        this.setMonitorListeners();
        this.setFreeCamListeners();
    }
    transition(key, duration = 1000, easing, callback) {
        if (this.currentKeyframe === key)
            return;
        if (this.targetKeyframe)
            tween_js_1.default.removeAll();
        this.currentKeyframe = undefined;
        this.targetKeyframe = key;
        const keyframe = this.keyframes[key];
        const posTween = new tween_js_1.default.Tween(this.position)
            .to(keyframe.position, duration)
            .easing(easing || tween_js_1.default.Easing.Quintic.InOut)
            .onComplete(() => {
            this.currentKeyframe = key;
            this.targetKeyframe = undefined;
            if (callback)
                callback();
        });
        const focTween = new tween_js_1.default.Tween(this.focalPoint)
            .to(keyframe.focalPoint, duration)
            .easing(easing || tween_js_1.default.Easing.Quintic.InOut);
        posTween.start();
        focTween.start();
    }
    setInstance() {
        this.instance = new THREE.PerspectiveCamera(35, this.sizes.width / this.sizes.height, 10, 900000);
        this.currentKeyframe = CameraKey.LOADING;
        this.scene.add(this.instance);
    }
    setMonitorListeners() {
        this.on('enterMonitor', () => {
            this.transition(CameraKey.MONITOR, 2000, (0, bezier_easing_1.default)(0.13, 0.99, 0, 1));
            EventBus_1.default.dispatch('enterMonitor', {});
        });
        this.on('leftMonitor', () => {
            this.transition(CameraKey.DESK);
            EventBus_1.default.dispatch('leftMonitor', {});
        });
    }
    setFreeCamListeners() {
        EventBus_1.default.on('freeCamToggle', (toggle) => {
            // if (toggle === this.freeCam) return;
            if (toggle) {
                this.transition(CameraKey.ORBIT_CONTROLS_START, 750, (0, bezier_easing_1.default)(0.13, 0.99, 0, 1), () => {
                    this.instance.position.copy(this.keyframes.orbitControlsStart.position);
                    this.orbitControls.update();
                    this.freeCam = true;
                });
                // @ts-ignore
                document.getElementById('webgl').style.pointerEvents = 'auto';
            }
            else {
                this.freeCam = false;
                this.transition(CameraKey.IDLE, 4000, tween_js_1.default.Easing.Exponential.Out);
                // @ts-ignore
                document.getElementById('webgl').style.pointerEvents = 'none';
            }
        });
    }
    setPostLoadTransition() {
        EventBus_1.default.on('loadingScreenDone', () => {
            this.transition(CameraKey.IDLE, 2500, tween_js_1.default.Easing.Exponential.Out);
        });
    }
    resize() {
        this.instance.aspect = this.sizes.width / this.sizes.height;
        this.instance.updateProjectionMatrix();
    }
    createControls() {
        this.renderer = this.application.renderer;
        this.orbitControls = new OrbitControls_1.OrbitControls(this.instance, this.renderer.instance.domElement);
        const { x, y, z } = this.keyframes.orbitControlsStart.focalPoint;
        this.orbitControls.target.set(x, y, z);
        this.orbitControls.enablePan = false;
        this.orbitControls.enableDamping = true;
        this.orbitControls.object.position.copy(this.keyframes.orbitControlsStart.position);
        this.orbitControls.dampingFactor = 0.05;
        this.orbitControls.maxPolarAngle = Math.PI / 2;
        this.orbitControls.minDistance = 4000;
        this.orbitControls.maxDistance = 29000;
        this.orbitControls.update();
    }
    update() {
        tween_js_1.default.update();
        if (this.freeCam && this.orbitControls) {
            this.position.copy(this.orbitControls.object.position);
            this.focalPoint.copy(this.orbitControls.target);
            this.orbitControls.update();
            return;
        }
        for (const key in this.keyframes) {
            const _key = key;
            this.keyframes[_key].update();
        }
        if (this.currentKeyframe) {
            const keyframe = this.keyframes[this.currentKeyframe];
            this.position.copy(keyframe.position);
            this.focalPoint.copy(keyframe.focalPoint);
        }
        this.instance.position.copy(this.position);
        this.instance.lookAt(this.focalPoint);
    }
}
exports.default = Camera;
