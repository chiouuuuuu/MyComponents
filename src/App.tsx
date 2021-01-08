import React, {useState} from 'react';
import './App.less';
// import IDCard from "../src/widget/IdCard";
// import {Popover} from 'antd';
// import MPopover from "antd/es/popover";
// import 'antd/es/style'
// import 'antd/dist/antd.css'
// import 'antd/dist/antd.compact.css'
// import MPopover from "@/widget/Pop";
// import MTooltip from '@/widget/tooltip';
// import DistPop from '@/widget/DistPop';
import MInput from '@/widget/Input';
import {Button, Input, Radio} from "antd";

import MButton from './widget/Button';
import MModal from '@/widget/Modal';
import Icon from "@/widget/Icon";
import MRadio from './widget/Radio';

function App() {
    const [radio, setRadio] = useState('a2');
    const type='text'
    const handleChange=(e:any)=>{
        console.log(e.target.value)
        setRadio(e.target.value);
    }
    return (
        <div className="App">
            <div className="display-box">
                <div>
                    <p>button group</p>
                    <MButton.ButtonGroup>
                        <MButton>1</MButton>
                        <MButton>1</MButton>
                        <MButton>1</MButton>
                    </MButton.ButtonGroup>
                </div>
                <div>
                    <p>radio</p>
                    <MRadio.Group>
                        <MRadio value={'22'}>2</MRadio>
                        <MRadio value={'222'}>23</MRadio>
                        <MRadio value={'232'}>323</MRadio>
                        <MRadio value={'disabled'} disabled>disabled</MRadio>
                    </MRadio.Group>
                </div>
                <div>
                    <p>radio 单选组合</p>
                    {/*<Radio>*/}
                    {/*    sss*/}
                    {/*</Radio>*/}
                    {/*<span>*/}
                    {/*    <input type="radio" disabled name={'a'} value='a2' id={'ida'} checked={radio==='a2'} onChange={handleChange}/>*/}
                    {/*    <label htmlFor="ida">aaa</label>*/}
                    {/*</span>*/}
                    {/*<span>*/}
                    {/*    <input type="radio" name={'b'} id={'idb'} value={'b2'} checked={radio==='b2'} onChange={handleChange}/>*/}
                    {/*    <label htmlFor="idb">bbb</label>*/}
                    {/*</span>*/}
                    <MRadio.Group>
                        <MRadio.Button value={'22'}>2</MRadio.Button>
                        <MRadio.Button value={'222'}>23</MRadio.Button>
                        <MRadio.Button value={'232'}>323</MRadio.Button>
                        <MRadio.Button value={'disabled'} disabled>disabled</MRadio.Button>
                    </MRadio.Group>
                </div>
                {/*==============*/}
                {/*input测试*/}
                {/*<MInput*/}
                {/*    type={type}*/}
                {/*    placeholder={'mysite'}*/}
                {/*    value={str}*/}
                {/*    addonBefore='http://'*/}
                {/*    addonAfter=".com"*/}
                {/*    onChange={(e: any) => {*/}
                {/*        console.log(e.target.value)*/}
                {/*        setStr(e.target.value)*/}
                {/*    }}/>*/}
                {/*<MInput*/}
                {/*    type={type}*/}
                {/*    placeholder={'placeholder'}*/}
                {/*    value={str}*/}
                {/*    addonAfter={<Icon type={'set'} />}*/}
                {/*    onChange={(e: any) => {*/}
                {/*        console.log(e.target.value)*/}
                {/*        setStr(e.target.value)*/}
                {/*    }}/>*/}
                {/*    <MInput*/}
                {/*placeholder={'placeholder'}*/}
                {/*value={'username'}*/}
                {/*addonBefore={<Icon type={'user'} />}*/}
                {/*onChange={(e: any) => {*/}
                {/*    console.log(e.target.value)*/}
                {/*    setStr(e.target.value)*/}
                {/*}}/>*/}
                {/*<MInput*/}
                {/*type={'password'}*/}

                {/*value={'password'}*/}
                {/*addonBefore={<Icon type={'password'} />}*/}
                {/*onChange={(e: any) => {*/}
                {/*    console.log(e.target.value)*/}
                {/*    setStr(e.target.value)*/}
                {/*}}/>*/}
                {/*  =============== */}
                {/* 模态框测试 */}
                {/*    <MModal visitable={visitable} onClose={()=>{*/}
                {/*        setVisitable(false);*/}
                {/*    }} onCancel={()=>{*/}
                {/*        setVisitable(false)*/}
                {/*    }}>*/}
                {/*        <p>do something</p>*/}
                {/*    </MModal>*/}
                {/*  <MButton className={'btn1'}  onClick={()=>{*/}
                {/*      setVisitable(!visitable);*/}
                {/*  }}>{visitable+''}</MButton>*/}
                {/*    ===============    */}
                {/*  对popover的秘制执着   */}
                {/*  <MTooltip title={'ssss'}>*/}
                {/*    <a> click  </a>*/}
                {/*</MTooltip>*/}
                {/*  <MPopover content={'ssss'}>*/}
                {/*      <a> click  </a>*/}
                {/*  </MPopover>*/}
                {/*    <DistPop content={'ssss'}>*/}
                {/*        <a> dist pop </a>*/}
                {/*    </DistPop>*/}
            </div>
        </div>
    );
}

export default App;
