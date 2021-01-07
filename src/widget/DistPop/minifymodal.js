import React, { useEffect, useMemo, } from "react";
import { createPortal } from "react-dom";
export const mount = document.body;
export function Modal(props) {
    const { constnode, visible, closeFuncCallback, innerDomStyle, innerConstDomStyle, state, setState, unmount, } = props;
    const render = useMemo(() => {
        if (visible) {
            return createPortal(React.createElement("div", { className: `${state === true ? "yhmodalopen" : "yhmodalclose"}`, style: Object.assign({}, innerDomStyle) }, props.children), mount);
        }
        else {
            unmount();
            return null;
        }
    }, [innerDomStyle, props.children, state, unmount, visible]);
    useEffect(() => {
        if (closeFuncCallback) {
            closeFuncCallback(setState);
        }
    }, [closeFuncCallback, setState]);
    return (React.createElement(React.Fragment, null,
        render,
        React.createElement("div", { style: Object.assign({ display: "inline-block" }, innerConstDomStyle), onClick: () => setState(!visible) }, constnode)));
}
export default Modal;
