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
const Animation_1 = require("../Animation");
// @ts-ignore
const volume_on_svg_1 = __importDefault(require("../../../../static/textures/UI/volume_on.svg"));
// @ts-ignore
const volume_off_svg_1 = __importDefault(require("../../../../static/textures/UI/volume_off.svg"));
const MuteToggle = ({}) => {
    const [isHovering, setIsHovering] = (0, react_1.useState)(false);
    const [isActive, setIsActive] = (0, react_1.useState)(false);
    const [muted, setMuted] = (0, react_1.useState)(false);
    const onMouseDownHandler = (0, react_1.useCallback)((event) => {
        setIsActive(true);
        event.preventDefault();
        setMuted(!muted);
    }, [muted]);
    const onMouseUpHandler = (0, react_1.useCallback)(() => {
        setIsActive(false);
    }, []);
    (0, react_1.useEffect)(() => {
        EventBus_1.default.dispatch('muteToggle', muted);
    }, [muted]);
    return (<div onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)} style={styles.container} onMouseDown={onMouseDownHandler} onMouseUp={onMouseUpHandler} className="icon-control-container" id="prevent-click">
            <framer_motion_1.motion.img id="prevent-click" src={muted ? volume_off_svg_1.default : volume_on_svg_1.default} style={{ opacity: isActive ? 0.2 : isHovering ? 0.8 : 1 }} width={window.innerWidth < 768 ? 8 : 10} animate={isActive ? 'active' : isHovering ? 'hovering' : 'default'} variants={iconVars}/>
        </div>);
};
const iconVars = {
    hovering: {
        // scale: 1.2,
        opacity: 0.8,
        transition: {
            duration: 0.1,
            ease: 'easeOut',
        },
    },
    active: {
        scale: 0.8,
        opacity: 0.5,
        transition: {
            duration: 0.1,
            ease: Animation_1.Easing.expOut,
        },
    },
    default: {
        scale: 1,
        opacity: 1,
        transition: {
            duration: 0.2,
            ease: 'easeOut',
        },
    },
};
const styles = {
    container: {
        background: 'black',
        // padding: 4,
        // paddingLeft: 8,
        // paddingRight: 8,
        textAlign: 'center',
        display: 'flex',
        // position: 'absolute',
        boxSizing: 'border-box',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
    },
};
exports.default = MuteToggle;
