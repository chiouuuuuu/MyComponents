import React, {useEffect, useState} from "react";
import styles from './index.module.less';
import Button from '../Button';
import classNames from "classnames";

//methods

const addChildrenProps=(children:any,props:any)=>{
    const {choseTarget, onChange,handleChange}=props;
    return React.Children.map(children, child => {
        return React.cloneElement(child, {
            choseTarget,
            onChange:onChange||handleChange
        });
    })
}

//components
function Radio(props:any) {
    const {value,children,disabled,choseTarget,onChange}=props;
    // console.log(props)
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
            <Button type={choseTarget===value?'primary':'default'} disabled={disabled} data-value={value} onClick={onChange}>{children}</Button>
    )
}

function Group(props:any){
    const {children,defaultChoose,onChange}=props;
    //被选中的radio的value值 因为暂时无法将这个值传到父组件 所以form可能会麻烦
    const [choseTarget,setChoseTarget]=useState<string>(defaultChoose);
    const [type,setType]=useState<'button'|'radio'>('radio');

    useEffect(()=>{
        for(let i of children){
            if(i.type.name==='button'){
                setType('button');
                break;
            }
        }
    })

    const handleChange=(e:any)=>{
        // console.log(e)
        const val=e.target.value||e.target.dataset.value;
        // console.log(val)
        setChoseTarget(val);
    }

    // console.log('children',children);

    return (
        <div className={styles['radio-group']}>
            {type==='button'?
                <Button.ButtonGroup>
                    {addChildrenProps(children, {choseTarget, handleChange, onChange})}
                </Button.ButtonGroup>
                :addChildrenProps(children,{choseTarget,handleChange,onChange})}
        </div>
    )
}

Radio.Group=Group;
Radio.Button=button;

export default Radio;
