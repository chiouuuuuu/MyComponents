import { CSSProperties, PropsWithChildren, ReactNode, RefObject } from "react";
import { PopDirections } from "./position";
import "./index.css";
export interface PopoverProps {
    content: ReactNode;
    directions: PopDirections;
    callback?: (v: Function) => void;
    closeFuncCallback?: Function;
    constDomStyle?: CSSProperties;
    modalDomStyle?: CSSProperties;
    triangleDomStyle?: CSSProperties;
    innerDomStyle?: CSSProperties;
    innerConstDomStyle?: CSSProperties;
    modalRefCallback?: (v: RefObject<HTMLDivElement>) => void;
    needOutsideClose?: boolean;
}
declare function Popover(props: PropsWithChildren<PopoverProps>): JSX.Element;
declare namespace Popover {
    var defaultProps: {
        directions: string;
        needOutsideClose: boolean;
    };
}
export default Popover;
