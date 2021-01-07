import React, {useState} from "react";
import styles from './index.module.less';
import Button from '../Button';
import classNames from "classnames";

function Radio(props:any) {
    const {value,children,disabled,choseTarget,onChange}=props;
    console.log(props)
    return (
        <span className={classNames(styles['radio-warp'],{[styles['radio-display-warp']]:disabled})}>
            <input type="radio" name={value} disabled={disabled} value={value} id={value} checked={choseTarget === value} onChange={onChange}/>
            <label htmlFor={value}>{children}</label>
        </span>
    )
}

function button(props:any){
    const {value,children,disabled,choseTarget,onChange}=props;
    return(
        <div>
            <Button type={choseTarget===value?'primary':'default'} disabled={disabled} data-value={value} onClick={onChange}>{children}</Button>
        </div>
    )
}

function Group(props:any){
    const {children,defaultChoose,onChange}=props;
    //被选中的radio的value值 因为暂时无法将这个值传到父组件 所以form可能会麻烦
    const [choseTarget,setChoseTarget]=useState<string>(defaultChoose);

    const handleChange=(e:any)=>{
        // console.log(e)
        const val=e.target.value||e.target.dataset.value;
        console.log(val)
        setChoseTarget(val);
    }

    return (
        <div className={styles['radio-group']}>
            {React.Children.map(children, child => {
                return React.cloneElement(child, {
                    choseTarget,
                    onChange:onChange||handleChange
                });
            })}
        </div>
    )
}

Radio.Group=Group;
Radio.Button=button;

export default Radio;
