import * as React from 'react';
import {TooltipProps as RcTooltipProps} from "./lib/Tooltip";
import {LiteralUnion} from "../_util/type";
import {PresetColorType} from "../_util/colors";
import {placements as Placements} from "./lib/placements";
import {AdjustOverflow} from "../tooltip/placements";
import {TooltipPlacement} from "../tooltip";
// import { AbstractTooltipProps } from '../tooltip';
// import { RenderFunction } from '../_util/getRenderPropValue';

interface AbstractTooltipProps extends Partial<Omit<RcTooltipProps, 'children'>> {
    style?: React.CSSProperties;
    className?: string;
    color?: LiteralUnion<PresetColorType, string>;
    placement?: TooltipPlacement;
    builtinPlacements?: typeof Placements;
    openClassName?: string;
    arrowPointAtCenter?: boolean;
    autoAdjustOverflow?: boolean | AdjustOverflow;
    getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
    children?: React.ReactNode;
}

declare type RenderFunction = () => React.ReactNode;

export interface PopoverProps extends AbstractTooltipProps {
    title?: React.ReactNode | RenderFunction;
    content?: React.ReactNode | RenderFunction;
}
declare const Popover: React.ForwardRefExoticComponent<PopoverProps & React.RefAttributes<unknown>>;
export default Popover;
