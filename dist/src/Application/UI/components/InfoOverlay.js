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
const FreeCamToggle_1 = __importDefault(require("./FreeCamToggle"));
const MuteToggle_1 = __importDefault(require("./MuteToggle"));
const NAME_TEXT = 'Dennis Nzioki';
const TITLE_TEXT = 'Software Engineer & UI/UX Designer';
const MULTIPLIER = 1;
const InfoOverlay = ({ visible }) => {
    const visRef = (0, react_1.useRef)(visible);
    const [nameText, setNameText] = (0, react_1.useState)('');
    const [titleText, setTitleText] = (0, react_1.useState)('');
    const [time, setTime] = (0, react_1.useState)(new Date().toLocaleTimeString());
    const timeRef = (0, react_1.useRef)(time);
    const [timeText, setTimeText] = (0, react_1.useState)('');
    const [textDone, setTextDone] = (0, react_1.useState)(false);
    const [volumeVisible, setVolumeVisible] = (0, react_1.useState)(false);
    const [freeCamVisible, setFreeCamVisible] = (0, react_1.useState)(false);
    const typeText = (i, curText, text, setText, callback, refOverride) => {
        if (refOverride) {
            text = refOverride.current;
        }
        if (i < text.length) {
            setTimeout(() => {
                if (visRef.current === true)
                    window.postMessage({ type: 'keydown', key: `_AUTO_${text[i]}` }, '*');
                setText(curText + text[i]);
                typeText(i + 1, curText + text[i], text, setText, callback, refOverride);
            }, Math.random() * 50 + 50 * MULTIPLIER);
        }
        else {
            callback();
        }
    };
    (0, react_1.useEffect)(() => {
        if (visible && nameText == '') {
            setTimeout(() => {
                typeText(0, '', NAME_TEXT, setNameText, () => {
                    typeText(0, '', TITLE_TEXT, setTitleText, () => {
                        typeText(0, '', time, setTimeText, () => {
                            setTextDone(true);
                        }, timeRef);
                    });
                });
            }, 400);
        }
        visRef.current = visible;
    }, [visible]);
    (0, react_1.useEffect)(() => {
        if (textDone) {
            setTimeout(() => {
                setVolumeVisible(true);
                setTimeout(() => {
                    setFreeCamVisible(true);
                }, 250);
            }, 250);
        }
    }, [textDone]);
    (0, react_1.useEffect)(() => {
        window.postMessage({ type: 'keydown', key: `_AUTO_` }, '*');
    }, [freeCamVisible, volumeVisible]);
    (0, react_1.useEffect)(() => {
        const interval = setInterval(() => {
            setTime(new Date().toLocaleTimeString());
        }, 1000);
        return () => clearInterval(interval);
    }, []);
    (0, react_1.useEffect)(() => {
        timeRef.current = time;
        textDone && setTimeText(time);
    }, [time]);
    return (<div style={styles.wrapper}>
            {nameText !== '' && (<div style={styles.container}>
                    <p>{nameText}</p>
                </div>)}
            {titleText !== '' && (<div style={styles.container}>
                    <p>{titleText}</p>
                </div>)}
            {timeText !== '' && (<div style={styles.lastRow}>
                    <div style={Object.assign({}, styles.container, styles.lastRowChild)}>
                        <p>{timeText}</p>
                    </div>
                    {volumeVisible && (<div style={styles.lastRowChild}>
                            <MuteToggle_1.default />
                        </div>)}
                    {freeCamVisible && (<div style={styles.lastRowChild}>
                            <FreeCamToggle_1.default />
                        </div>)}
                </div>)}
        </div>);
};
const styles = {
    container: {
        background: 'black',
        padding: 4,
        paddingLeft: 16,
        paddingRight: 16,
        textAlign: 'center',
        display: 'flex',
        marginBottom: 4,
        boxSizing: 'border-box',
    },
    wrapper: {
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    blinkingContainer: {
        // width: 100,
        // height: 100,
        marginLeft: 8,
        paddingBottom: 2,
        paddingRight: 4,
    },
    lastRow: {
        display: 'flex',
        flexDirection: 'row',
    },
    lastRowChild: {
        marginRight: 4,
    },
};
exports.default = InfoOverlay;
