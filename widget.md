m# widget开发格式



## 目录配置

```
root
|-- public
|		|-- ...
|-- src
|		|-- widget
|		|		|-- IDCard
|		|		|		|-- index.tsx
|		|		|		|-- index.module.less
|		|		|		|-- ...
|		|		|-- ...
|   |-- App.tsx
|   |-- index.tsx
|   |-- index.css
|   |-- style.d.ts
|-- craco.config.js
|-- package.json
|-- tsconfig.json
|-- tsconfig.extend.json
```

### App.tsx

```tsx
import IDCard from '@/widget/IdCard';

function App() {
  return (
    <div className="App">
      <div className="display-box">
        <IDCard/>
      </div>
    </div>
  );
}

export default App;
```

### index.tsx

```tsx
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
```

### index.css

```css
body {
  padding: 0;
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}

.App {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.App > .display-box {
  width: 50vw;
  min-height: 200px;
  margin: 100px auto;
}
```

### style.d.ts

```ts
declare module '*.module.less' {
  const classes: { readonly [key: string]: string }
  export default classes
}
```

### craco.config.js

```js
const CracoLessPlugin = require('craco-less');
const CracoAlias = require('craco-alias');

module.exports = {
  babel: {
    plugins: [
      ["@babel/plugin-proposal-decorators", { legacy: true }],
      // antd 样式按需引入，不需要引入整个css
      ["import", { "libraryName": "antd", "style": true }],
    ]
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            javascriptEnabled: true,
          },
        },
      },
    },
    {
      plugin: CracoLessPlugin,
      options: {
        modifyLessRule: function (lessRule, _context) {
          lessRule.test = /\.(less)$/;
          lessRule.use = [
            {
              loader: "style-loader",
            },
            {
              loader: "css-loader",
              options: {
                modules: true,
              },
            },
            {
              loader: "less-loader",
              options: {
                lessOptions: {
                  javascriptEnabled: true,
                },
              },
            },
          ];
          lessRule.exclude = /node_modules/;
          return lessRule;
        },
      },
    },
    {
      plugin: CracoAlias,
      options: {
        source: 'tsconfig',
        tsConfigPath: './tsconfig.extend.json',
        baseUrl: './src',
      }
    }
  ],
};
```

### tsconfig.json

```json
{
  "extends": "./tsconfig.extend.json",
  "compilerOptions": {
    "target": "es5",
    "lib": [
      "dom",
      "dom.iterable",
      "esnext"
    ],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"
  },
  "include": [
    "src"
  ],
  "exclude": [
    "node_modules"
  ]
}
```

### tsconfig.extend.json

```json
{
  "compilerOptions": {
    "baseUrl": "./src",
    "paths": {
      "@": ["./"],
      "@/*": ["./*"]
    }
  }
}
```

---

## 开发备注

1. 样式使用的语法为 `less`，每个组件的独立样式必须为 `module`，组件的样式不允许污染到全局
2. 注意组件的颗粒度，不宜太大，除非是一系列组件运用工厂模式开发
3. 组件引入本地依赖的时候使用相对路径

---

## 开发示例

该例子用一个身份证组件作为例子

PS：

1. 设计之初视觉稿没有认真考虑，导致逻辑编写困难，该示例无法正常工作，但是重点是查看开发示例
2. 最好的设计是利用视觉上的欺骗，用一个div包裹三个input框从而达到分隔的目的，本例使用一个input框和一个div(用于placeholder视觉欺骗) 属于设计失误

`index.tsx`

```tsx
import {Input} from 'antd';
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
```

`queue.ts`

```ts
class Queue {
  private queue: any[] = []
  
  enqueue = (item: any) => {
    this.queue.push(item)
  }
  
  dequeue = () => {
    return this.queue.shift()
  }
  
  size = () => {
    return this.queue.length
  }
  
  isEmpty = () => {
    return !this.queue.length
  }
  
  clear = () => {
    this.queue = []
  }
}

export default new Queue()
```

`index.module.less`

```less
.container {
  position: relative;
  .placeholder {
    display: flex;
    position: absolute;
    width: 100%;
    height: 100%;
    padding: 0 11px;
    align-items: center;
    pointer-events: none;	// 事件穿透
    z-index: 999;
    color: rgba(0, 0, 0, .3);
  }
}
```
