import React,{useState} from "react";
import {Popover as AntdPopover} from 'antd';
import Card from "@/widget/Card";

const Popover:React.FC<any>=props=>{
    return (
        <AntdPopover content={<Card>content test</Card>}>
            <a> click </a>
        </AntdPopover>
    )
}

export default Popover;
