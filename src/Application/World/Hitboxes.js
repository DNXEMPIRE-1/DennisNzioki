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
const Application_1 = __importDefault(require("../Application"));
const RENDER_WIREFRAME = true;
class Decor {
    constructor() {
        this.application = new Application_1.default();
        this.scene = this.application.scene;
        this.camera = this.application.camera;
        this.mouse = this.application.mouse;
        this.raycaster = new THREE.Raycaster();
        this.createRaycaster();
        this.createComputerHitbox();
    }
    createRaycaster() {
        window.addEventListener('mousedown', (event) => {
            event.preventDefault();
            console.log(this.camera.instance.position);
            console.log(this.mouse);
            const ray = new THREE.Raycaster();
            ray.setFromCamera({ x: this.mouse.x, y: this.mouse.y }, this.camera.instance);
            console.log(ray);
            const intersects = ray.intersectObjects(this.scene.children);
            console.log(intersects);
            // this.raycaster.setFromCamera(this.mouse, this.camera.instance);
            // const intersects = this.raycaster.intersectObjects(
            //     this.scene.children
            // );
            // if (intersects.length > 0) {
            //     const hb = this.hitboxes[intersects[0].object.name];
            //     if (hb) {
            //         hb.action();
            //     }
            // }
        });
    }
    createComputerHitbox() {
        this.createHitbox('computerHitbox', () => {
            // this.camera.focusOnMonitor();
        }, new THREE.Vector3(0, 650, 0), new THREE.Vector3(2000, 2000, 2000));
    }
    createHitbox(name, action, position, size) {
        const wireframeOptions = RENDER_WIREFRAME
            ? {
                //   wireframe: true,
                //   wireframeLinewidth: 50,
                opacity: 1,
            }
            : {};
        // create hitbox material
        const hitboxMaterial = new THREE.MeshBasicMaterial(Object.assign({ color: 0xff0000, side: THREE.DoubleSide, transparent: true, opacity: 0, depthWrite: false }, wireframeOptions));
        // create hitbox
        const hitbox = new THREE.Mesh(new THREE.BoxBufferGeometry(size.x, size.y, size.z), hitboxMaterial);
        // set name of the hitbox object
        hitbox.name = name;
        // set hitbox position
        hitbox.position.copy(position);
        // add hitbox to scene
        this.scene.add(hitbox);
        // add hitbox to hitboxes
        this.hitboxes = Object.assign(Object.assign({}, this.hitboxes), { [name]: {
                action,
            } });
    }
}
exports.default = Decor;
