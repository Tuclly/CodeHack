1. 在组件内部调用useEffect可以在effect中直接访问state变量或者其他的props，不需要其他的特殊的API来读取它，它已经保存在函数作用域中。Hook使用了js的闭包。

2. class组件中比如订阅一个好友的状态，在`componentDidMount`和`componentWillUnmount`中分别订阅和取消订阅好友的ID及状态变化还不够，组件会仍然展示好友的状态，所以需要在class组件中添加 `componentDidUpdate`中重新取消订阅，再重新订阅新的，算是对之前的逻辑的更新处理。但是用effect就不会出现这样的效果， `useEffect`会默认处理，在调用新的effect之前就会对前一个`effect`进行清理。

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

# Hook

1. Hook就是让我来钩入一些Reacrt的特性，比如`useState`是允许我在React函数组件中添加state的Hook。

2. 基于函数使用的Hook API，从概念上讲，React 组件一直更像是函数。而 Hook 则拥抱了函数，同时也没有牺牲 React 的精神原则。Hook 提供了问题的解决方案，无需学习复杂的函数式或响应式编程技术。

3. ```tsx
   class Welcome extends React.Component{
   		
   }
   ```

4. 我们经常维护一些组件，组件起初很简单，但是逐渐会被状态逻辑和副作用充斥。每个生命周期常常包含一些不相关的逻辑。例如，组件常常在 `componentDidMount` 和 `componentDidUpdate` 中获取数据。但是，同一个 `componentDidMount` 中可能也包含很多其它的逻辑，如设置事件监听，而之后需在 `componentWillUnmount` 中清除

4. ```jsx
   import React, { useState } from 'react';
   function Example() {
     // 声明一个叫 “count” 的 state 变量。
     const [count, setCount] = useState(0);
     return (
       <div>
         <p>You clicked {count} times</p>
         <button onClick={() => setCount(count + 1)}>
           Click me
         </button>
       </div>
     );
   }
   ```

   通过在函数组件里调用它来给组件添加一些内部 state。React 会在重复渲染时保留这个 state。`useState` 会返回一对值：**当前**状态和一个让你更新它的函数，你可以在事件处理函数中或其他一些地方调用这个函数。它类似 class 组件的 `this.setState`，但是它不会把新的 state 和旧的 state 进行合并。

   `useState` 唯一的参数就是初始 state。在上面的例子中，我们的计数器是从零开始的，所以初始 state 就是 `0`。值得注意的是，不同于 `this.state`，这里的 state 不一定要是一个对象 —— 如果你有需要，它也可以是。这个初始 state 参数只有在第一次渲染时会被用到。

## useState

1. 更新setState总是替换它而不是像class中的`this.setState`去合并state

   ```jsx
   const [count, setCount] = useState(0) // 声明state变量
   const [fruit, setFruit] = useState('banana')
   const [todos, setTodos] = useState([{text:" learn hook"}])
   <p> you clicked {count} times <p> // 读取State
   <button onClick= { () => setCount(count + 1)}> Click me</button>
   ```

## useEffect

1. Effect 让我在函数组件中执行副作用操作，包括**数据获取，设置订阅，手动更改React组件中的DOM**

2. ```jsx
   useEffect ( () => {
       document.title = `you clicked ${count} time` 
   })
   ```

3. 可以讲`useEffect`Hook 看做`componentDidMount`,`componentDidupdate`,`componentWillUnmount`三个函数的集合

4. > class组件中，`render`函数是不应该有副作用的，希望在React更新DOM之后才执行操作，不然太早。所以副作用操作都放在`componentDidMount`和`componentDidUpdate`函数中。
   >
   > ```jsx
   >   componentDidMount() {
   >     document.title = `You clicked ${this.state.count} times`;
   >   }
   >   componentDidUpdate() {
   >     document.title = `You clicked ${this.state.count} times`;
   >   }
   > ```
   >
   > 在class中需要在两个生命周期函数中编写重复的代码，这是因为很多情况下，我们希望在组件加载和更新时执行同样的操作。从概念上讲，我们希望他每次渲染后都执行。但是class组件没有这样的方法，我们需要在两个生命周期函数调用它。



# 内置Hook

## `useEffect`

1. `useEffect` 就是一个 Effect Hook，给函数组件增加了操作副作用的能力。它跟 class 组件中的 `componentDidMount`、`componentDidUpdate` 和 `componentWillUnmount` 具有相同的用途，只不过被合并成了一个 API。

2. 当你调用 `useEffect` 时，就是在告诉 React 在完成对 DOM 的更改后运行你的“副作用”函数。由于副作用函数是在组件内声明的，所以它们可以访问到组件的 props 和 state。默认情况下，React 会在每次渲染后调用副作用函数 —— **包括**第一次渲染的时候。

   副作用函数还可以通过返回一个函数来指定如何“清除”副作用。例如，在下面的组件中使用副作用函数来订阅好友的在线状态，并通过取消订阅来进行清除操作：

3. 通过使用 Hook，你可以把组件内相关的副作用组织在一起（例如创建订阅及取消订阅），而不要把它们拆分到不同的生命周期函数里。



# Hook的使用规则

   1. 只在**函数最外层**使用hook，不要在循环，条件，或者嵌套函数中使用hook。如果一定要条件的使用hook，可以在hook中用if
   2. 只在react函数、自定义的hook中调用hook，不要在普通的js函数

# memo(),useCallback(),useMemo()

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

## memo()

用memo包裹子组件，可以避免重复渲染

```js
import React, { memo } from 'react'

const ChildComp = memo(function () {
  console.log('render child-comp ...')
  return <div>Child Comp ...</div>
})
```

## useCallback()

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

## useMemo()

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

使用 `useMemo` 对对象属性包一层。

`useMemo` 有两个参数：

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

