import React from "react";
import withMask from '../withMask';
import Icon from '../Icon';
import styles from './index.module.less';
import Button from "../Button";

function Modal(props: any) {
    console.log(props);
    const {
        headerStyle,
        bodyStyle,
        footerStyle,
        btnGroup,
        children,
        handleShow,
        handleHide,
        onClose,
        onCancel,
        onConfirm
    } = props;
    return (
        <div className={styles['warp']}>
            <div className={styles['modal']}>
                <div className={styles['modal-header']} style={headerStyle}>
                    <h1 className={styles['title']}>{props.title}</h1>
                    <Icon className={styles['icon']} type={'close'} onClick={onClose || handleHide}/>
                </div>
                <div className={styles['modal-body']} style={bodyStyle}>
                    sssssodal-bodyodal-bodyodal-bodyodal-bodyodal-bodyodal-body
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

Modal.defaultProps = {
    title: 'ladadadadadada',
}

export default withMask(Modal);
