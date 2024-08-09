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
// import eventBus from '../EventBus';
const framer_motion_1 = require("framer-motion");
const EventBus_1 = __importDefault(require("../EventBus"));
const HELP_TEXT = 'Click anywhere to begin';
const HelpPrompt = () => {
    const [helpText, setHelpText] = (0, react_1.useState)('');
    const [visible, setVisible] = (0, react_1.useState)(true);
    const visRef = (0, react_1.useRef)(visible);
    const typeHelpText = (i, curText) => {
        if (i < HELP_TEXT.length && visRef.current) {
            setTimeout(() => {
                window.postMessage({ type: 'keydown', key: `_AUTO_${HELP_TEXT[i]}` }, '*');
                setHelpText(curText + HELP_TEXT[i]);
                typeHelpText(i + 1, curText + HELP_TEXT[i]);
            }, Math.random() * 120 + 50);
        }
    };
    // make a document listener to listen to clicks
    (0, react_1.useEffect)(() => {
        setTimeout(() => {
            typeHelpText(0, '');
        }, 500);
        document.addEventListener('mousedown', () => {
            setVisible(false);
        });
        EventBus_1.default.on('enterMonitor', () => {
            setVisible(false);
        });
    }, []);
    (0, react_1.useEffect)(() => {
        if (visible == false) {
            window.postMessage({ type: 'keydown', key: `_AUTO_` }, '*');
        }
        visRef.current = visible;
    }, [visible]);
    return helpText.length > 0 ? (<framer_motion_1.motion.div variants={vars} animate={visible ? 'visible' : 'hide'} style={styles.container}>
            <p>{helpText}</p>
            <div style={styles.blinkingContainer}>
                <div className="blinking-cursor"/>
            </div>
        </framer_motion_1.motion.div>) : (<></>);
};
const vars = {
    visible: {
        opacity: 1,
    },
    hide: {
        y: 12,
        opacity: 0,
        transition: {
            duration: 0.5,
            ease: 'easeOut',
        },
    },
};
const styles = {
    container: {
        position: 'absolute',
        bottom: 64,
        background: 'black',
        padding: 4,
        paddingLeft: 16,
        paddingRight: 16,
        textAlign: 'center',
        display: 'flex',
        alignItems: 'flex-end',
    },
    blinkingContainer: {
        // width: 100,
        // height: 100,
        marginLeft: 8,
        paddingBottom: 2,
        paddingRight: 4,
    },
};
exports.default = HelpPrompt;
