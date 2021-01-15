import React from "react";
import styles from './index.module.less';
import classNames from "classnames";
import Icon from '../Icon/index';

const Tag = (props:any)=>{
    const {children,edit,closable,onClick,...others}=props;
    return (
        <span className={classNames(styles['tag'], {[styles['tag-edit']]:edit,[styles['closable']]:closable||edit})} {...others}>
            <p>{children}</p>
            {closable && <Icon type={'close'} onClick={onClick}></Icon>}
        </span>
    );
}

export default Tag;
