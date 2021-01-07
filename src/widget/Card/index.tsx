import React, {useState} from "react";
import styles from './index.module.less';
import {CloseOutlined} from '@ant-design/icons';
import classnames from 'classnames';

interface CardProps {
    type?: 'inner' | 'wrapper'
    hasClsBtn?: boolean,
    title?: string | React.ReactNode,
    closeMethod?: React.EventHandler<any>,
    children?: string | React.ReactNode,
    bodyStyle?: Object,
    visible?: boolean,
    shadow?: boolean
}

const Card: React.FC<CardProps> = props => {
    const handleClose: React.EventHandler<any> = () => {
        setIsShowCard(!isShowCard);
    }
    const {
        type = 'wrapper',
        title = '',
        hasClsBtn,
        closeMethod = handleClose,
        children,
        bodyStyle = {},
        visible = true,
        shadow = false
    } = props;
    const [isShowCard, setIsShowCard] = useState(visible);

    const rootClassName = () => {
        let res;
        if (isShowCard && type === 'inner') {
            res = 'inner';
        } else if (isShowCard && type === 'wrapper') {
            res = 'wrapper';
        } else {
            res = 'hidden';
        }
        return res;
    }

    return (
        (<div className={classnames(styles[rootClassName()], {[styles['shadow']]: shadow})}>
            {!(title === '') &&
                (<div className={styles.header}>
                    <div>{(title==='').toString()}</div>
                    {hasClsBtn && closeMethod && (
                        <div onClick={closeMethod}>
                            <CloseOutlined className={styles['closeIcon']}/>
                        </div>
                    )}
                </div>) }
            <div style={bodyStyle} className={styles['body']}>{children}</div>
        </div>)
    );
};

export default Card;
