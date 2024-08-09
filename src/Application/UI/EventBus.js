"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UIEventBus = {
    on(event, callback) {
        // @ts-ignore
        document.addEventListener(event, (e) => callback(e.detail));
    },
    dispatch(event, data) {
        document.dispatchEvent(new CustomEvent(event, { detail: data }));
    },
    remove(event, callback) {
        document.removeEventListener(event, callback);
    },
};
exports.default = UIEventBus;
