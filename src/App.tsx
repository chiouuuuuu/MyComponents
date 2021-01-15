import React, {useState} from 'react';
import './App.less';
import IDCard from "../src/widget/IdCard";
// import {Popover} from 'antd';
// import MPopover from "antd/es/popover";
// import 'antd/es/style'
// import 'antd/dist/antd.css'
// import 'antd/dist/antd.compact.css'
// import MPopover from "@/widget/Pop";
// import MTooltip from '@/widget/tooltip';
// import DistPop from '@/widget/DistPop';
import MInput from '@/widget/Input';
import {Button, Dropdown, Input, Radio, Switch} from "antd";

import MButton from './widget/Button';
import MRadio from './widget/Radio';
import MCheckbox from './widget/Checkbox';
import MSwitch from './widget/Switch';
import MTag from './widget/Tag';
import InputMaskThird from './widget/InputMaskThird';
import MDropdown from './widget/Dropdown';
import MInputRef from './widget/InputMaskRef'
import InputMask from "@/widget/InputMask";

function App() {
    const [str, setStr] = useState<string>('asdfghjk');
    const [radio, setRadio] = useState('a2');
    const type = 'text'
    const handleChange = (e: any) => {
        console.log(e.target.value)
        setRadio(e.target.value);
    }

    const f = () => {
        return function (e: any) {
            // console.log(e);
            // console.log(e.target)
            // console.log(e.target.value)
            setStr(e.target.value)
        }
    }


    const l = () => {
        console.log('hello')
    }
    const productList = [{id: 1, name: 'foo', children: [{id: 2, name: 'bar'}]}, {
        id: 3,
        name: 'foobar',
        callback: l,
        children: [
            {
                id: 4,
                name: 'qux',
                callback: l
            }
        ],
    },
        {
            id: 5,
            name: 'bar',
        }]

    return (
        <div className="App">
            <div className="display-box">
                <div style={{paddingBottom: 200}}>
                    <p>dropdown</p>
                    <MDropdown dataList={productList}
                                trigger={'hover'}
                                column={2}
                    >
                        <a>
                            dropdown
                        </a>
                    </MDropdown>
                </div>
                <div>
                    <p>third</p>
                    <InputMask>
                    </InputMask>
                </div>
                <div>
                    <p>ref</p>
                    <MInputRef></MInputRef>
                </div>
                <div>
                    <p>third</p>
                    <InputMaskThird>
                    </InputMaskThird>
                </div>
                <div>
                    <IDCard></IDCard>
                </div>
                <div>
                    <p>tag</p>
                    <MTag>
                        foo
                    </MTag>
                    <MTag>
                        bar
                    </MTag>
                    <MTag>
                        foobar
                    </MTag>
                    <MTag closable>
                        baz
                    </MTag>
                </div>
                <div>
                    <p>switch</p>
                    <MSwitch></MSwitch>
                </div>
                <div>
                    <p>check box</p>
                    <MCheckbox value={'foo'}>foo</MCheckbox>
                    <MCheckbox value={'bar'}>bar</MCheckbox>
                    <MCheckbox value={'foobar'}>foobar</MCheckbox>
                </div>
                <div>
                    <p>checkbox group</p>
                    <MCheckbox.Group>
                        <MCheckbox value={'foo_value'}>foo</MCheckbox>
                        <MCheckbox value={'bar_value'}>bar</MCheckbox>
                        <MCheckbox value={'foobar_value'}>foobar</MCheckbox>
                    </MCheckbox.Group>
                </div>
                <div>
                    <p>checkbox button group</p>
                    <MCheckbox.Group>
                        <MCheckbox.Button value={'foo_value'}>foo</MCheckbox.Button>
                        <MCheckbox.Button value={'bar_value'}>bar</MCheckbox.Button>
                        <MCheckbox.Button value={'foobar_value'}>foobar</MCheckbox.Button>
                    </MCheckbox.Group>
                </div>
                <p>{str}</p>
                <Input value={str} onChange={f()}/>
                <div>
                    <p>buttons</p>
                    <MButton onClick={f()}>foobar</MButton>
                    <MButton>foo</MButton>y
                    <MButton>bar</MButton>
                </div>
                <div>
                    <p>button group</p>
                    <MButton.ButtonGroup>
                        <MButton>foobar</MButton>
                        <MButton type={'primary'}>foo</MButton>
                        <MButton>bar</MButton>
                    </MButton.ButtonGroup>
                </div>
                <div>
                    <p>radio</p>
                    <MRadio.Group>
                        <MRadio value={'22'}>foo</MRadio>
                        <MRadio value={'222'}>bar</MRadio>
                        <MRadio value={'232'}>foobar</MRadio>
                        <MRadio value={'disabled'} disabled>disabled</MRadio>
                    </MRadio.Group>
                </div>
                <div>
                    <p>radio 单选组合</p>
                    <MRadio.Group>
                        <MRadio.Button value={'foo'}>foo</MRadio.Button>
                        <MRadio.Button value={'bar'}>bar</MRadio.Button>
                        <MRadio.Button value={'foobar'}>foobar</MRadio.Button>
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
