import React from "react";
import styles from './index.module.less';
import classNames from "classnames";

//点击到mask关闭窗体的功能
export default function WithMask(Component: any, props?: any) {
    // props 区分 组件的其他参数设置
    console.log('config props',props);
    return class extends React.Component<any, any> {
        constructor(props:any) {
            super(props);
            console.log('props',props);
            this.state={}
        }
        /***
         *  优先用visitable -> maskvisitable
         */
        render() {
           const {...otherState}=this.state;
           const {visitable,...otherProps}=this.props;
            const classname=visitable?'show':'hide';
            return <div className={styles[classname]}>
                <div className={classNames(styles['mask'],styles['mask-background'])} onClick={this.props.onClose} />
                <Component
                           {...otherState} {...otherProps}/>
            </div>
        }

    };
}
