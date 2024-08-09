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
const camera_svg_1 = __importDefault(require("../../../../static/textures/UI/camera.svg"));
// @ts-ignore
const mouse_svg_1 = __importDefault(require("../../../../static/textures/UI/mouse.svg"));
const MuteToggle = ({}) => {
    const [isHovering, setIsHovering] = (0, react_1.useState)(false);
    const [isActive, setIsActive] = (0, react_1.useState)(false);
    const [freeCamActive, setFreeCamActive] = (0, react_1.useState)(false);
    const [blockEvents, setBlockEvents] = (0, react_1.useState)(true);
    const onMouseDownHandler = (0, react_1.useCallback)((event) => {
        setIsActive(true);
        event.preventDefault();
        setFreeCamActive(!freeCamActive);
    }, [freeCamActive]);
    const iconSize = freeCamActive
        ? window.innerWidth < 768
            ? 8
            : 10
        : window.innerWidth < 768
            ? 4
            : 6;
    const onMouseUpHandler = (0, react_1.useCallback)(() => {
        setIsActive(false);
    }, []);
    (0, react_1.useEffect)(() => {
        setTimeout(() => {
            setBlockEvents(false);
        }, 100);
    }, []);
    (0, react_1.useEffect)(() => {
        if (!blockEvents) {
            window.postMessage({ type: 'keydown', key: `_AUTO_` }, '*');
            EventBus_1.default.dispatch('freeCamToggle', freeCamActive);
        }
    }, [freeCamActive]);
    return (<div style={styles.wrapper}>
            <div onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)} style={styles.container} onMouseDown={onMouseDownHandler} onMouseUp={onMouseUpHandler} className="icon-control-container" id="prevent-click">
                <framer_motion_1.motion.img id="prevent-click" src={freeCamActive ? mouse_svg_1.default : camera_svg_1.default} style={{ opacity: isActive ? 0.2 : isHovering ? 0.8 : 1 }} height={iconSize} animate={isActive
            ? 'active'
            : isHovering
                ? 'hovering'
                : 'default'} variants={iconVars}/>
            </div>
            {/* <motion.div
            initial="hidden"
            animate={freeCamActive ? 'active' : 'hidden'}
            variants={indicatorVars}
            style={Object.assign({}, styles.container, { marginLeft: 4 })}
            id="prevent-click"
        >
            <p
                style={
                    window.innerWidth < 768
                        ? { fontSize: 8 }
                        : { fontSize: 10 }
                }
            >
                Free Cam Enabled
            </p>
        </motion.div> */}
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
const indicatorVars = {
    active: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.2,
            ease: Animation_1.Easing.expOut,
        },
    },
    hidden: {
        x: -4,
        opacity: 0,
        transition: {
            duration: 0.2,
            ease: Animation_1.Easing.expOut,
        },
    },
};
const styles = {
    container: {
        background: 'black',
        // padding: 4,
        paddingLeft: 8,
        paddingRight: 8,
        textAlign: 'center',
        display: 'flex',
        // position: 'absolute',
        boxSizing: 'border-box',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
    },
    wrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },
};
exports.default = MuteToggle;
