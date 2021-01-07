import React from "react";
import withMask from '../withMask';
import Icon from '../Icon';
import styles from './index.module.less';
import Button from "../Button";

function Modal(props: any) {
    console.log(props);
    const {
        title,
        children,
        headerStyle,
        bodyStyle,
        footerStyle,
        btnGroup,
        onClose,
        onCancel,
        onConfirm
    } = props;
    return (
        <div className={styles['warp']}>
            <div className={styles['modal']}>
                <div className={styles['modal-header']} style={headerStyle}>
                    <h1 className={styles['title']}>{props.title}</h1>
                    <Icon className={styles['icon']} type={'close'} onClick={onClose}/>
                </div>
                <div className={styles['modal-body']} style={bodyStyle}>
                    {children}
                </div>
                <div className={styles['modal-footer']} style={footerStyle}>
                    <div className={styles['btn-group']}>{btnGroup ? btnGroup : <>
                        <Button type={'primary'} onClick={onConfirm}>确认</Button>
                        <Button onClick={onCancel}>取消</Button></>}</div>
                </div>
            </div>
        </div>
    )
}

export default withMask(Modal);
