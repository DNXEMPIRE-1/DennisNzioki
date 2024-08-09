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
const react_1 = __importStar(require("react"));
const framer_motion_1 = require("framer-motion");
const EventBus_1 = __importDefault(require("../EventBus"));
const InfoOverlay_1 = __importDefault(require("./InfoOverlay"));
const InterfaceUI = ({}) => {
    const [initLoad, setInitLoad] = (0, react_1.useState)(true);
    const [visible, setVisible] = (0, react_1.useState)(false);
    const [loading, setLoading] = (0, react_1.useState)(true);
    const interfaceRef = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(() => {
        EventBus_1.default.on('loadingScreenDone', () => {
            setLoading(false);
        });
        // find element by id and set ref
        const element = document.getElementById('ui-interactive');
        if (element) {
            // @ts-ignore
            interfaceRef.current = element;
        }
    }, []);
    const initMouseDownHandler = () => {
        setVisible(true);
        setInitLoad(false);
    };
    (0, react_1.useEffect)(() => {
        if (!loading && initLoad) {
            document.addEventListener('mousedown', initMouseDownHandler);
            return () => {
                document.removeEventListener('mousedown', initMouseDownHandler);
            };
        }
    }, [loading, initLoad]);
    (0, react_1.useEffect)(() => {
        EventBus_1.default.on('enterMonitor', () => {
            setVisible(false);
            setInitLoad(false);
            if (interfaceRef.current) {
                interfaceRef.current.style.pointerEvents = 'none';
            }
        });
        EventBus_1.default.on('leftMonitor', () => {
            setVisible(true);
            if (interfaceRef.current) {
                interfaceRef.current.style.pointerEvents = 'auto';
            }
        });
    }, []);
    return !loading ? (<framer_motion_1.motion.div initial="hide" variants={vars} animate={visible ? 'visible' : 'hide'} style={styles.wrapper} className="interface-wrapper" id="prevent-click">
            <InfoOverlay_1.default visible={visible}/>
        </framer_motion_1.motion.div>) : (<></>);
};
const vars = {
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.5,
            delay: 0.3,
            ease: 'easeOut',
        },
    },
    hide: {
        x: -32,
        opacity: 0,
        transition: {
            duration: 0.3,
            ease: 'easeOut',
        },
    },
};
const styles = {
    wrapper: {
        width: '100%',
        display: 'flex',
        position: 'absolute',
        boxSizing: 'border-box',
    },
};
exports.default = InterfaceUI;
