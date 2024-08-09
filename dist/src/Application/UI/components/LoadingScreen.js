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
const EventBus_1 = __importDefault(require("../EventBus"));
const LoadingScreen = () => {
    const [progress, setProgress] = (0, react_1.useState)(0);
    const [toLoad, setToLoad] = (0, react_1.useState)(0);
    const [loaded, setLoaded] = (0, react_1.useState)(0);
    const [overlayOpacity, setLoadingOverlayOpacity] = (0, react_1.useState)(1);
    const [loadingTextOpacity, setLoadingTextOpacity] = (0, react_1.useState)(1);
    const [startPopupOpacity, setStartPopupOpacity] = (0, react_1.useState)(0);
    const [firefoxPopupOpacity, setFirefoxPopupOpacity] = (0, react_1.useState)(0);
    const [webGLErrorOpacity, setWebGLErrorOpacity] = (0, react_1.useState)(0);
    const [showBiosInfo, setShowBiosInfo] = (0, react_1.useState)(false);
    const [showLoadingResources, setShowLoadingResources] = (0, react_1.useState)(false);
    const [doneLoading, setDoneLoading] = (0, react_1.useState)(false);
    const [firefoxError, setFirefoxError] = (0, react_1.useState)(false);
    const [webGLError, setWebGLError] = (0, react_1.useState)(false);
    const [counter, setCounter] = (0, react_1.useState)(0);
    const [resources] = (0, react_1.useState)([]);
    const [mobileWarning, setMobileWarning] = (0, react_1.useState)(window.innerWidth < 768);
    const onResize = () => {
        if (window.innerWidth < 768) {
            setMobileWarning(true);
        }
        else {
            setMobileWarning(false);
        }
    };
    window.addEventListener('resize', onResize);
    (0, react_1.useEffect)(() => {
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.has('debug')) {
            start();
        }
        if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
            setFirefoxError(true);
        }
        else if (!detectWebGLContext()) {
            setWebGLError(true);
        }
        else {
            setShowBiosInfo(true);
        }
    }, []);
    (0, react_1.useEffect)(() => {
        EventBus_1.default.on('loadedSource', (data) => {
            setProgress(data.progress);
            setToLoad(data.toLoad);
            setLoaded(data.loaded);
            resources.push(`Loaded ${data.sourceName}${getSpace(data.sourceName)} ... ${Math.round(data.progress * 100)}%`);
            if (resources.length > 8) {
                resources.shift();
            }
        });
    }, []);
    (0, react_1.useEffect)(() => {
        setShowLoadingResources(true);
        setCounter(counter + 1);
    }, [loaded]);
    (0, react_1.useEffect)(() => {
        if (progress >= 1 && !firefoxError && !webGLError) {
            setDoneLoading(true);
            setTimeout(() => {
                setLoadingTextOpacity(0);
                setTimeout(() => {
                    setStartPopupOpacity(1);
                }, 500);
            }, 1000);
        }
    }, [progress]);
    (0, react_1.useEffect)(() => {
        if (firefoxError) {
            setTimeout(() => {
                setFirefoxPopupOpacity(1);
            }, 500);
        }
    }, [firefoxError]);
    (0, react_1.useEffect)(() => {
        if (webGLError) {
            setTimeout(() => {
                setWebGLErrorOpacity(1);
            }, 500);
        }
    }, [webGLError]);
    const start = (0, react_1.useCallback)(() => {
        setLoadingOverlayOpacity(0);
        EventBus_1.default.dispatch('loadingScreenDone', {});
        const ui = document.getElementById('ui');
        if (ui) {
            ui.style.pointerEvents = 'none';
        }
    }, []);
    const getSpace = (sourceName) => {
        let spaces = '';
        for (let i = 0; i < 24 - sourceName.length; i++)
            spaces += '\xa0';
        return spaces;
    };
    const getCurrentDate = () => {
        const date = new Date();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const year = date.getFullYear();
        // add leading zero
        const monthFormatted = month < 10 ? `0${month}` : month;
        const dayFormatted = day < 10 ? `0${day}` : day;
        return `${monthFormatted}/${dayFormatted}/${year}`;
    };
    const detectWebGLContext = () => {
        var canvas = document.createElement('canvas');
        // Get WebGLRenderingContext from canvas element.
        var gl = canvas.getContext('webgl') ||
            canvas.getContext('experimental-webgl');
        // Report the result.
        if (gl && gl instanceof WebGLRenderingContext) {
            return true;
        }
        return false;
    };
    return (<div style={Object.assign({}, styles.overlay, {
            opacity: overlayOpacity,
            transform: `scale(${overlayOpacity === 0 ? 1.1 : 1})`,
        })}>
            {startPopupOpacity === 0 && loadingTextOpacity === 0 && (<div style={styles.blinkingContainer}>
                    <span className="blinking-cursor"/>
                </div>)}
            {!firefoxError && !webGLError && (<div style={Object.assign({}, styles.overlayText, {
                opacity: loadingTextOpacity,
            })}>
                    <div style={styles.header} className="loading-screen-header">
                        <div style={styles.logoContainer}>
                            <div>
                                <p style={styles.green}>
                                    <b>DNX,</b>{' '}
                                </p>
                                <p style={styles.green}>
                                    <b>EMPIRE Inc.</b>
                                </p>
                            </div>
                        </div>
                        <div style={styles.headerInfo}>
                            <p>Released: 12/07/2000</p>
                            <p>HHBIOS (C)2000 DNX EMPIRE Inc.,</p>
                        </div>
                    </div>
                    <div style={styles.body} className="loading-screen-body">
                        <p>HSP S13 2000-2024 Special UC131S</p>
                        <div style={styles.spacer}/>
                        {showBiosInfo && (<>
                                <p>HSP Showcase(tm) XX 113</p>
                                <p>Checking RAM : {14000} OK</p>
                                <div style={styles.spacer}/>
                                <div style={styles.spacer}/>
                                {showLoadingResources ? (progress == 1 ? (<p>FINISHED LOADING RESOURCES</p>) : (<p className="loading">
                                            LOADING RESOURCES ({loaded}/
                                            {toLoad === 0 ? '-' : toLoad})
                                        </p>)) : (<p className="loading">WAIT</p>)}
                            </>)}
                        <div style={styles.spacer}/>
                        <div style={styles.resourcesLoadingList}>
                            {resources.map((sourceName) => (<p key={sourceName}>{sourceName}</p>))}
                        </div>
                        <div style={styles.spacer}/>
                        {showLoadingResources && doneLoading && (<p>
                                All Content Loaded, launching{' '}
                                <b style={styles.green}>
                                    'Dennis Nzioki Portfolio Showcase'
                                </b>{' '}
                                V1.0
                            </p>)}
                        <div style={styles.spacer}/>
                        <span className="blinking-cursor"/>
                    </div>
                    <div style={styles.footer} className="loading-screen-footer">
                        <p>
                            Press <b>DEL</b> to enter SETUP , <b>ESC</b> to skip
                            memory test
                        </p>
                        <p>{getCurrentDate()}</p>
                    </div>
                </div>)}
            <div style={Object.assign({}, styles.popupContainer, {
            opacity: startPopupOpacity,
        })}>
                <div style={styles.startPopup}>
                    {/* <p style={styles.red}>
            <b>THIS SITE IS CURRENTLY A W.I.P.</b>
        </p>
        <p>But do enjoy what I have done so far :)</p>
        <div style={styles.spacer} />
        <div style={styles.spacer} /> */}
                    <p>Dennis Nzioki Portfolio Showcase 2024</p>
                    {mobileWarning && (<>
                            <br />
                            <b>
                                <p style={styles.warning}>
                                    WARNING: This experience is best viewed on
                                </p>
                                <p style={styles.warning}>
                                    a desktop or laptop computer.
                                </p>
                            </b>
                            <br />
                        </>)}
                    <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                        <p>Click start to begin{'\xa0'}</p>
                        <span className="blinking-cursor"/>
                    </div>
                    <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '16px',
        }}>
                        <div className="bios-start-button" onClick={start}>
                            <p>START</p>
                        </div>
                    </div>
                </div>
            </div>
            {firefoxError && (<div style={Object.assign({}, styles.popupContainer, {
                opacity: firefoxPopupOpacity,
            })}>
                    <div style={styles.startPopup}>
                        <p>
                            <b style={{ color: 'red' }}>FATAL ERROR:</b> Firefox
                            Detected
                        </p>
                        <div style={styles.spacer}/>
                        <div style={styles.spacer}/>
                        <p>
                            Due to a{' '}
                            <a style={styles.link} href={'https://github.com/henryjeff/portfolio-website/issues/6'}>
                                bug in firefox
                            </a>
                            , this website is temporarily inaccessible for
                            anyone using the browser.
                        </p>
                        <div style={styles.spacer}/>
                        <p>
                            I apologize for the inaccessibility. As this site is
                            now public I will be revisiting this bug to try and
                            find a work around. If I fail, I believe there is a
                            PR currently in review for FireFox that attempts to
                            fix the regression. Whether or not that will fix the
                            bug is unknown. Updates will be posted here.
                        </p>

                        <div style={styles.spacer}/>
                        <p>
                            In the mean time if you want to access this site you
                            will need to use a different browser.
                        </p>
                        <div style={styles.spacer}/>
                        <p>Thank you - Dennis</p>
                    </div>
                </div>)}
            {webGLError && (<div style={Object.assign({}, styles.popupContainer, {
                opacity: webGLErrorOpacity,
            })}>
                    <div style={styles.startPopup}>
                        <p>
                            <b style={{ color: 'red' }}>CRITICAL ERROR:</b> No
                            WebGL Detected
                        </p>
                        <div style={styles.spacer}/>
                        <div style={styles.spacer}/>

                        <p>WebGL is required to run this site.</p>
                        <p>
                            Please enable it or switch to a browser which
                            supports WebGL
                        </p>
                    </div>
                </div>)}
        </div>);
};
const styles = {
    overlay: {
        backgroundColor: 'black',
        width: '100%',
        height: '100%',
        display: 'flex',
        transition: 'opacity 0.2s, transform 0.2s',
        MozTransition: 'opacity 0.2s, transform 0.2s',
        WebkitTransition: 'opacity 0.2s, transform 0.2s',
        OTransition: 'opacity 0.2s, transform 0.2s',
        msTransition: 'opacity 0.2s, transform 0.2s',
        transitionTimingFunction: 'ease-in-out',
        MozTransitionTimingFunction: 'ease-in-out',
        WebkitTransitionTimingFunction: 'ease-in-out',
        OTransitionTimingFunction: 'ease-in-out',
        msTransitionTimingFunction: 'ease-in-out',
        boxSizing: 'border-box',
        fontSize: 16,
        letterSpacing: 0.8,
    },
    spacer: {
        height: 16,
    },
    header: {
        width: '100%',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'row',
    },
    popupContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    warning: {
        color: 'yellow',
    },
    blinkingContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        boxSizing: 'border-box',
        padding: 48,
    },
    startPopup: {
        backgroundColor: '#000',
        padding: 24,
        border: '7px solid #fff',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        maxWidth: 500,
        // alignItems: 'center',
    },
    headerInfo: {
        marginLeft: 64,
    },
    red: {
        color: '#00ff00',
    },
    link: {
        // textDecoration: 'none',
        color: '#4598ff',
        cursor: 'pointer',
    },
    overlayText: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    body: {
        flex: 1,
        display: 'flex',
        width: '100%',
        boxSizing: 'border-box',
        flexDirection: 'column',
    },
    logoContainer: {
        display: 'flex',
        flexDirection: 'row',
    },
    resourcesLoadingList: {
        display: 'flex',
        paddingLeft: 32,
        paddingBottom: 32,
        flexDirection: 'column',
    },
    logoImage: {
        width: 64,
        height: 42,
        imageRendering: 'pixelated',
        marginRight: 16,
    },
    footer: {
        boxSizing: 'border-box',
        width: '100%',
    },
};
exports.default = LoadingScreen;