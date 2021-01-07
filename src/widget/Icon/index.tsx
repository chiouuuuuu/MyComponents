import React from "react";
import styles from './index.module.less';
import classNames from "classnames";

// interface IconProps{
//     type:string
//     className?:React.ReactNode
// }

function Icon(props:any){
    const {type,className,...others}=props;

    const map:Map<string,React.ReactNode>=new Map([
        ['close',<svg className={styles['content']} viewBox="0 0 1045 1024" version="1.1"
                     xmlns="http://www.w3.org/2000/svg" p-id="6447" width="200" height="200">
            <path
                d="M282.517333 213.376l-45.354666 45.162667L489.472 512 237.162667 765.461333l45.354666 45.162667L534.613333 557.354667l252.096 253.269333 45.354667-45.162667-252.288-253.44 252.288-253.482666-45.354667-45.162667L534.613333 466.624l-252.096-253.226667z"
                p-id="6448"></path>
        </svg>]
    ])

    if(!map.has(type)){
        console.error('icon type error');
        return null;
    }
    return (
        <span className={classNames(styles['icon'],className)} {...others}>
            {map.get(type)}
        </span>
    )
}

export default Icon;
