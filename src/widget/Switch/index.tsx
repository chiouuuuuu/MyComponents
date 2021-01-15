import React, {useState} from "react";
import styles from './index.module.less';
import classNames from "classnames";

const Switch=(props:any)=>{
    const [isOpen,setIsOpen]=useState<boolean>(false);
    const changeSwitch=()=>{
        setIsOpen(!isOpen);
    }
    return (
        <span className={classNames(styles['switch'],isOpen?styles['switch-open']:styles['switch-close'])} onClick={changeSwitch}>
            <span className={classNames(styles['handle'],isOpen?styles['handle-open']:styles['handle-close'])}></span>
        </span>
    )
}

export default Switch;
