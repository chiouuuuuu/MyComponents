import { CSSProperties } from "react";
export declare type PopDirections = "TL" | "TOP" | "TR" | "LT" | "LEFT" | "LB" | "BL" | "BOTTOM" | "BR" | "RT" | "RIGHT" | "RB";
export declare function switchPosition(sign: PopDirections, modalrect: DOMRect, popconfirmrect: DOMRect, scroll: number): CSSProperties;
export declare function switchTrianglePosition(sign: PopDirections, modalrect: DOMRect, popconfirmrect: DOMRect, scroll: number): CSSProperties;
