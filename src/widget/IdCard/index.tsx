import {Input} from 'antd';
import * as React from 'react';
import {ChangeEvent, useCallback, useState} from 'react';
import queue from './queue';
import styles from './index.module.less';

export default function IDCard() {
    const [placeholder, setPlaceholder] = useState('xxxxxx / xxxxxx / xxxxxx')
    const [separators] = useState(' / ')
    const [value, setValue] = useState('')

    const handleInput = useCallback((e: ChangeEvent<HTMLInputElement>): void => {
        let splitValue: string[] = []
        if (separators.includes(e.target.value)) {
            splitValue = e.target.value.split('')
        } else {
            splitValue = e.target.value.split(' / ').join('').split('')
        }

        splitValue.forEach(v => queue.enqueue(v))
        let temp: string[] = []
        const result: any[] = []
        let size = queue.size()
        let value = ''
        let hasChanged = false

        placeholder.split(separators).forEach(v => {
            temp = v.split('').map(_ => {
                if (!queue.isEmpty()) {
                    return queue.dequeue()
                }
                return 'x'
            })
            // 设置placeholder
            result.push(temp.join(''))
            // 设置value
            for (let i = 0; i < Math.min(size, 6); i++) {
                value += temp[i]
            }
            size -= 6
            if (size % 6 !== 0 && e.target.value !== '' && !hasChanged) {
                value += ' / '
                hasChanged = true
            }
        })

        setValue(value)
        setPlaceholder(result.join(separators))
        queue.clear()
    }, [placeholder, separators])

    return (
        <div className={styles.container}>
            <div className={styles.placeholder}>
                <span>{placeholder}</span>
            </div>
            <Input value={value} onChange={handleInput}/>
        </div>
    )
}
