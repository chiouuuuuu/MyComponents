import React from 'react';
import styles from './index.module.less';
import classNames from "classnames";


/***
 * todo 接口不会写 ⬇无法传入大量的事件 如果全部列出来耗时费劲 这部分之后有更好的方法再做
 * todo 传入的className无法覆盖btn中相同的属性
 */

// interface ButtonProps{
//     children?:React.ReactNode
//     disabled?:boolean,
//     type?:'default'|'primary'|'danger'|'success'
// }


// function defaultEvent(){
//     console.log('event')
// }

Button.defaultProps = {
    disabled: false,
    type: 'default'
    // onClick:defaultEvent,
}

function Button(props: any) {
    const {disabled, className, children, type, ...others} = props;
    // console.log(others)
    return (<button className={classNames(styles['btn'], className, {
        [styles[`btn-${type}`]]: !disabled,
        [styles['btn-disabled']]: disabled
    },)} disabled={disabled} {...others} >{children}</button>)
}

export default Button;
