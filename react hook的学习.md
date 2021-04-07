1. 在组件内部调用useEffect可以在effect中直接访问state变量或者其他的props，不需要其他的特殊的API来读取它，它已经保存在函数作用域中。Hook使用了js的闭包。

2. class组件中比如订阅一个好友的状态，在`componentDidMount`和`componentWillUnmount`中分别订阅和取消订阅好友的ID及状态变化还不够，组件会仍然展示好友的状态，所以需要在class组件中添加 `componentDidUpdate`中重新取消订阅，再重新订阅新的，算是对之前的逻辑的更新处理。但是用effect就不会出现这样的效果， `useEffect`会默认处理，在调用新的effect之前就会对前一个`effect`进行清理

3. ```js
     componentDidMount() {
       ChatAPI.subscribeToFriendStatus(
         this.props.friend.id,
         this.handleStatusChange
       );
     }
      
     componentDidUpdate(prevProps) {
       // 取消订阅之前的 friend.id
       ChatAPI.unsubscribeFromFriendStatus(
         prevProps.friend.id,
         this.handleStatusChange
       );
       // 订阅新的 friend.id
       ChatAPI.subscribeToFriendStatus(
         this.props.friend.id,
         this.handleStatusChange
       );
     }
      
     componentWillUnmount() {
       ChatAPI.unsubscribeFromFriendStatus(
         this.props.friend.id,
         this.handleStatusChange
       );
     }
   ```

   用hook的版本：

   ```js
   function FriendStatus(props) {
     // ...
     useEffect(() => {
       // ...
       ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
       return () => {
         ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
       };
     });
   ```

## Hook的使用规则

   1. 只在最顶层使用hook，不要在循环，条件，或者嵌套函数中使用hook。如果一定要条件的使用hook，可以在hook中用if
   2. 只在react函数、自定义的hook中调用hook，不要在普通的js函数

   ## Memo，useCallback(),useMemo

   https://www.jianshu.com/p/014ee0ebe959

但是如果父组件渲染，子组件也会跟着渲染，但是子组件的props和state都没有变化，为了避免冗余渲染，可以用memo

子组件：

```js
function ChildComp () {
  console.log('render child-comp ...')
  return <div>Child Comp ...</div>
}
```

父组件：

```js
function ParentComp () {
  const [ count, setCount ] = useState(0)
  const increment = () => setCount(count + 1)

  return (
    <div>
      <button onClick={increment}>点击次数：{count}</button>
      <ChildComp />
    </div>
  );
}
```

如果是这样的话，父组件每次点击，改变count的值，会导致父组件重新渲染，但是子组件的props和state也没有任何变化，子组件仍然会被重新渲染

### memo

用memo包裹子组件，可以避免重复渲染

```js
import React, { memo } from 'react'

const ChildComp = memo(function () {
  console.log('render child-comp ...')
  return <div>Child Comp ...</div>
})
```

### useCallback()

但是上面父组件只是简单的调用子组件，没有传递属性，如果传递属性的话，memo不管用。

子组件：（子组件仍然用 React.memo() 包裹一层）

```js
import React, { memo } from 'react'

const ChildComp = memo(function ({ name, onClick }) {
  console.log('render child-comp ...')
  return <>
    <div>Child Comp ... {name}</div>
    <button onClick={() => onClick('hello')}>改变 name 值</button>
  </>
})
```

父组件：

```js
function ParentComp () {
  const [ count, setCount ] = useState(0)
  const increment = () => setCount(count + 1)

  const [ name, setName ] = useState('hi~')
  const changeName = (newName) => setName(newName)  // 父组件渲染时会创建一个新的函数

  return (
    <div>
      <button onClick={increment}>点击次数：{count}</button>
      <ChildComp name={name} onClick={changeName}/>
    </div>
  );
}
```

点击父组件按钮，改变了父组件中的count变量值（父组件的state值），进而导致父组件重新渲染。

父组件重新渲染会重新创造changeName函数（**新的引用，这是渲染的关键，也是这几个hook内存的必要性**），所以传给子组件的onClick属性也发生了变化，导致子组件又一次渲染。

子组件props发生了变化，重新渲染没毛病，如果只点击了父组件的按钮，但是没有对子组件做任何操作，不希望子组件的props发生变化，如何做，

### 解决：

修改父组件的 changeName 方法，用 useCallback 钩子函数包裹一层。

```js
import React, { useCallback } from 'react'

function ParentComp () {
  // ...
  const [ name, setName ] = useState('hi~')
  // 每次父组件渲染，返回的是同一个函数引用
  const changeName = useCallback((newName) => setName(newName), [])  

  return (
    <div>
      <button onClick={increment}>点击次数：{count}</button>
      <ChildComp name={name} onClick={changeName}/>
    </div>
  );
}
```

`useCallback()`函数起到了缓存的作用，即使父组件渲染了，`useCallback()`包裹的函数也不会重新生成，会返回上次的函数引用。

### useMemo()

前面父组件调用子组件时传递的 name 属性是个字符串，如果换成传递对象会怎样？

下面例子中，父组件在调用子组件时传递 info 属性，info 的值是个对象字面量，点击父组件按钮时，发现控制台打印出子组件被渲染的信息。

```js
import React, { useCallback } from 'react'

function ParentComp () {
  // ...
  const [ name, setName ] = useState('hi~')
  const [ age, setAge ] = useState(20)
  const changeName = useCallback((newName) => setName(newName), [])
  const info = { name, age }    // 复杂数据类型属性

  return (
    <div>
      <button onClick={increment}>点击次数：{count}</button>
      <ChildComp info={info} onClick={changeName}/>
    </div>
  );
}
```

分析原因跟调用函数是一样的：

- 点击父组件按钮，触发父组件重新渲染；
- 父组件渲染，`const info = { name, age }` 一行会重新生成一个新对象，导致传递给子组件的 info 属性值变化，进而导致子组件重新渲染。

### 解决

使用 useMemo 对对象属性包一层。

useMemo 有两个参数：

- 第一个参数是个函数，返回的对象指向同一个引用，不会创建新对象；
- 第二个参数是个数组，只有数组中的变量改变时，第一个参数的函数才会返回一个新的对象。

```js
function ParentComp () {
  // ....
  const [ name, setName ] = useState('hi~')
  const [ age, setAge ] = useState(20)
  const changeName = useCallback((newName) => setName(newName), [])
  const info = useMemo(() => ({ name, age }), [name, age])   // 包一层

  return (
    <div>
      <button onClick={increment}>点击次数：{count}</button>
      <ChildComp info={info} onClick={changeName}/>
    </div>
  );
}
```

再次点击父组件按钮，控制台中不再打印子组件被渲染的信息了。

