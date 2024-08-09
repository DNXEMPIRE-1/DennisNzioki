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
exports.createVolumeUI = exports.createUI = void 0;
const react_1 = __importStar(require("react"));
const react_dom_1 = __importDefault(require("react-dom"));
const LoadingScreen_1 = __importDefault(require("./components/LoadingScreen"));
const HelpPrompt_1 = __importDefault(require("./components/HelpPrompt"));
const InterfaceUI_1 = __importDefault(require("./components/InterfaceUI"));
const EventBus_1 = __importDefault(require("./EventBus"));
require("./style.css");
const App = () => {
    const [loading, setLoading] = (0, react_1.useState)(true);
    (0, react_1.useEffect)(() => {
        EventBus_1.default.on('loadingScreenDone', () => {
            setLoading(false);
        });
    }, []);
    return (<div id="ui-app">
            {!loading && <HelpPrompt_1.default />}
            <LoadingScreen_1.default />
        </div>);
};
const createUI = () => {
    react_dom_1.default.render(<App />, document.getElementById('ui'));
};
exports.createUI = createUI;
const createVolumeUI = () => {
    react_dom_1.default.render(<InterfaceUI_1.default />, document.getElementById('ui-interactive'));
};
exports.createVolumeUI = createVolumeUI;
