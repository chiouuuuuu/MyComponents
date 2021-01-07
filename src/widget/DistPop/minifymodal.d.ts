import React, { CSSProperties, PropsWithChildren, ReactNode } from "react";
interface ModalProps {
    constnode: ReactNode;
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    closeFuncCallback?: Function;
    innerDomStyle?: CSSProperties;
    innerConstDomStyle?: CSSProperties;
    setState: Function;
    state: boolean;
    unmount: Function;
}
export declare const mount: HTMLElement;
export declare function Modal(props: PropsWithChildren<ModalProps>): JSX.Element;
export default Modal;
