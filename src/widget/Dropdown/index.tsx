import React, {useEffect, useState} from "react";
import styles from './index.module.less'
// import Icon from "@/widget/Icon";
import classNames from "classnames";
import Icon from "@/widget/Icon";

const DropdownWithCascader: React.FC<any> = props => {
    const {
        dataList,
        handleTurnTo = () => {
        },
        trigger,
        column
    } = props;
    // console.log('props',props)
    // const [item,setItem]=useState<any>(null);
    const [curItem, setCurItem] = useState<any>(null);
    const [curSubItem, setCurSubItem] = useState<any>(null);
    const [isShowDropdown, setIsShowDropdown] = useState<boolean>(false);
    const handleDropdownMouseOver = () => {
        setIsShowDropdown(true);
        // console.log('on mouse over');
    };

    const handleDropdownMouseOut = () => {
        setIsShowDropdown(false);
        // console.log('on mouse out');
    };
    // useEffect(() => {
    //     // let curP=null;
    //     for (let i = 0; i < dataList.length; i++) {
    //         if (dataList[i].id === dataSource.ItemId) {
    //             // console.log(dataList[i]);
    //             setCurItem(dataList[i]);
    //             if (dataSource.version) {
    //                 let item = dataList[i];
    //                 for (let j = 0; j < item.subMenuList.length; j++) {
    //                     if (dataSource.version === item.subMenuList[j].id) {
    //                         // console.log(item.subMenuList[j]);
    //                         // setCurItem(null);
    //                         setCurSubItem(item.subMenuList[j]);
    //                     }
    //                 }
    //             }
    //             break;
    //         }
    //     }
    // }, [dataList]);

    const clickMainMenu = (item: any) => {
        setCurItem(item);
        if (item.callback) {
            item.callback();
        }
        setCurSubItem(null);
    };

    const clickSubMenu = (subItem: any) => {
        setCurSubItem(subItem);
        if (subItem.callback) {
            subItem.callback();
        }
        handleTurnTo(subItem);
    };

    const switchMenu = () => {
        setIsShowDropdown(!isShowDropdown);
        // console.log('on mouse click');
    };

    const triggerResult = () => {
        if (trigger === 'click') {
            // console.log('click')
            return React.cloneElement(props.children, {
                onClick: switchMenu,
            })
        } else if (trigger === 'hover') {
            // console.log('hover')
            return React.cloneElement(props.children, {
                onMouseOver: handleDropdownMouseOver,
                onMouseOut: handleDropdownMouseOut
            })
        }
    }

    const otherProps = () => {
        if (trigger === 'click') {
            return {}
        } else if (trigger === 'hover') {
            return {
                onMouseOver: handleDropdownMouseOver,
                onMouseOut: handleDropdownMouseOut
            }
        }
    }

    return (
        <div className={styles['dropdown']}>
            {triggerResult()}
            <div
                className={classNames({
                    [styles['menu-warp']]: true,
                    [styles['hide']]: !isShowDropdown,
                })}
                {...otherProps()}
            >
                <div
                    className={classNames(
                        isShowDropdown ? styles['menu'] : styles['menu-hide']
                    )}
                >
                    <div className={styles['main']}>
                        {dataList.map((item: any) => {
                            return (
                                <span
                                    className={classNames(styles['menu-main-item'], {
                                        [styles['menu-main-item-active']]: curItem && curItem.id === item.id,
                                    })}
                                    key={item.id}
                                    onClick={() => {
                                        clickMainMenu(item);
                                    }}
                                >
                  <span>{item.name}</span>
                                    {item.children && (
                                        <Icon type={'arrow-right'} />
                                    )}
                </span>
                            );
                        })}
                    </div>
                    {curItem && curItem.children ? (
                        <div className={styles['sub']}>
                            {curItem.children.map((subItem: any) => {
                                return (
                                    <span
                                        key={subItem.id}
                                        className={classNames(styles['menu-sub-item'], {
                                            [styles['menu-sub-item-active']]:
                                            curSubItem && curSubItem.id === subItem.id,
                                        })}
                                        onClick={() => {
                                            clickSubMenu(subItem);
                                        }}
                                    >
                                        <span>{subItem.name}</span>
                                        {/*{curSubItem && curSubItem.id === subItem.id && <Icon type={'check'} />}*/}
                                    </span>
                                );
                            })}</div>
                    ) : (
                        <div className={styles['sub-hide']}>
                            {/*<span className={styles['menu-sub-item']}>未选择产品</span>*/}
                        </div>
                    )}
                    {/*<div className={styles['sub']}>*/}
                    {/*   */}
                    {/*</div>*/}
                </div>
            </div>
        </div>
    );
};

export default DropdownWithCascader;
