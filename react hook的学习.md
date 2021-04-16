1. 在组件内部调用useEffect可以在effect中直接访问state变量或者其他的props，不需要其他的特殊的API来读取它，它已经保存在函数作用域中。Hook使用了js的闭包。


## Hook

1. Hook就是让我来钩入一些Reacrt的特性，比如`useState`是允许我在React函数组件中添加state的Hook。

2. 基于函数使用的Hook API，从概念上讲，React 组件一直更像是函数。而 Hook 则拥抱了函数，同时也没有牺牲 React 的精神原则。Hook 提供了问题的解决方案，无需学习复杂的函数式或响应式编程技术。

3. 我们经常维护一些组件，组件起初很简单，但是逐渐会被状态逻辑和副作用充斥。每个生命周期常常包含一些不相关的逻辑。例如，组件常常在 `componentDidMount` 和 `componentDidUpdate` 中获取数据。但是，同一个 `componentDidMount` 中可能也包含很多其它的逻辑，如设置事件监听，而之后需在 `componentWillUnmount` 中清除

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

## 内置Hook

### `useState`

1. 更新setState总是替换它而不是像class中的`this.setState`去合并state

   ```jsx
   const [count, setCount] = useState(0) // 声明state变量
   const [fruit, setFruit] = useState('banana')
   const [todos, setTodos] = useState([{text:" learn hook"}])
   <p> you clicked {count} times <p> // 读取State
   <button onClick= { () => setCount(count + 1)}> Click me</button>
   ```
   
2. 如果新的 state 需要通过使用先前的 state 计算得出，那么可以将函数传递给 `setState`。该函数将接收先前的 state，并返回一个更新后的值。下面的计数器组件示例展示了 `setState` 的两种用法：

   ```js
   function Counter({initialCount}) {
     const [count, setCount] = useState(initialCount);
     return (
       <>
         Count: {count}
         <button onClick={() => setCount(initialCount)}>Reset</button>
         <button onClick={() => setCount(prevCount => prevCount - 1)}>-</button>
         <button onClick={() => setCount(prevCount => prevCount + 1)}>+</button>
       </>
     );
   }
   ```

   “+” 和 “-” 按钮采用函数式形式，因为被更新的 state 需要基于之前的 state。但是“重置”按钮则采用普通形式，因为它总是把 count 设置回初始值。

   > 注意
   >
   > 与 class 组件中的 `setState` 方法不同，`useState` 不会自动合并更新对象。你可以用函数式的 `setState` 结合展开运算符来达到合并更新对象的效果。
   >
   > ```js
   > setState(prevState => {
   >   // 也可以使用 Object.assign
   >   return {...prevState, ...updatedValues};
   > });
   > ```
   >
   > `useReducer` 是另一种可选方案，它更适合用于管理包含多个子值的 state 对象。

   3. 调用 State Hook 的更新函数并传入当前的 state 时，React 将跳过子组件的渲染及 effect 的执行。`useState(currentState)`

   

### `useEffect`

在函数组件主体内（这里指在 React 渲染阶段）**改变 DOM、添加订阅、设置定时器、记录日志以及执行其他包含副作用**的操作都是不被允许的，因为这可能会产生莫名其妙的 bug 并破坏 UI 的一致性。

使用 `useEffect` 完成副作用操作。赋值给 `useEffect` 的函数会在组件渲染到屏幕之后执行。你可以把 effect 看作从 React 的纯函数式世界通往命令式世界的逃生通道。

1. Effect 给函数组件增加了操作副作用的能力。包括**数据获取，设置订阅，手动更改React组件中的DOM**

2. ```jsx
   useEffect ( () => {
       document.title = `you clicked ${count} time` 
   })
   ```

3. 可以将`useEffect`Hook 看做`componentDidMount`,`componentDidupdate`,`componentWillUnmount`三个函数的集合;

   用这个函数来处理一些副作用或者模拟生命周期，但是它跟之前生命周期最大的区别就是**同步和异步**，简单的说就是useEffect不会阻塞渲染，它是在渲染之后执行的

4. > class组件中，`render`函数是不应该有副作用的，希望在React更新**DOM之后**才执行操作，不然太早。所以副作用操作都放在`componentDidMount`和`componentDidUpdate`函数中。
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

5. 当你调用 `useEffect` 时，就是在告诉 React 在完成对 **DOM 的更改**后运行你的“副作用”函数。由于副作用函数是在组件内声明的，所以它们**可以访问到组件的 props 和 state**。默认情况下，React 会在每次渲染后调用副作用函数 —— **包括**第一次渲染的时候。

6. 在组件内部调用`useEeffect`可以直接访问count, state变量或者其他的props，不需要其他的API来读取，因为已经在函数作用域内。Hook使用了JS的闭包机制。

7. `useEffect`会在*第一次渲染之后*和*每次更新之后*都会执行，不需要像之前的生命周期函数去考虑“mount"还是”update“，React保证每次运行effect的时候，DOM已经更新完毕。

8. ```js
   function Example() {
     const [count, setCount] = useState(0);
   
     useEffect(() => {
       document.title = `You clicked ${count} times`;
     });
   }
   ```

   递给 `useEffect` 的函数在每次渲染中都会有所不同，这是刻意为之的。事实上这正是我们可以在 effect 中获取最新的 `count` 的值，而不用担心其过期的原因。每次我们重新渲染，都会生成*新的* effect，替换掉之前的。某种意义上讲，effect 更像是渲染结果的一部分 —— 每个 effect “属于”一次特定的渲染。

   #### 需要清除的effect

9. 副作用函数还可以通过返回一个函数来指定如何“清除”副作用（防止造成内存泄露）。例如，在下面的组件中使用副作用函数来订阅好友的在线状态，并通过取消订阅来进行清除操作：

   通过使用 Hook，你可以把组件内相关的副作用组织在一起（例如创建订阅及取消订阅），而不要把它们拆分到不同的生命周期函数里；所以 `useEffect` 的设计是在同一个地方执行。如果你的 effect **返回一个函数，React 将会在执行清除操作时调用它：**

   ```js
     componentDidMount() {
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
   ---------使用useEffect()-----
     useEffect(() => {
       function handleStatusChange(status) {
         setIsOnline(status.isOnline);
       }
       ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
       // Specify how to clean up after this effect:
       return function cleanup() {
         ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
       };
     });
   ```

   **为什么要在 effect 中返回一个函数？** 这是 effect 可选的清除机制。每个 effect 都可以返回一个清除函数。如此可以将添加和移除订阅的逻辑放在一起。它们都属于 effect 的一部分。

   **React 何时清除 effect？** React 会在*组件卸载之前执行清除操作*。正如之前学到的，effect 在每次渲染的时候都会执行。这就是为什么 React 会在*执行当前 effect 之前对上一个 effect 进行清除*。

   #### effect的执行时机

   与 `componentDidMount`、`componentDidUpdate` 不同的是，**在浏览器完成布局与绘制之后**，传给 `useEffect` 的函数会延迟调用。这使得它适用于许多常见的副作用场景，比如设置订阅和事件处理等情况，因此不应在函数中执行阻塞浏览器更新屏幕的操作。

   然而，并非所有 effect 都可以被延迟执行。例如，在浏览器执行下一次绘制前，用户可见的 DOM 变更就必须同步执行，这样用户才不会感觉到视觉上的不一致。（概念上类似于被动监听事件和主动监听事件的区别。）React 为此提供了一个额外的 [`useLayoutEffect`](https://react.docschina.org/docs/hooks-reference.html#uselayouteffect) Hook 来处理这类 effect。它和 `useEffect` 的结构相同，区别只是调用时机不同。

   虽然 `useEffect` 会在浏览器绘制后延迟执行，但会**保证在任何新的渲染前执行**。React 将在组件更新前刷新上一轮渲染的 effect。

   #### 使用Effect的一些Tips

   1. 使用Hook的目的之一就是为了要解决class中生命周期函数经常包含不相关的逻辑，但又把相关逻辑分离到几个不同方法中的问题。

      Hook的解决方案就是使用多个state的hook，使用多个effect，将不相关逻辑分离到不同的effect中

      ```tsx
      function FriendStatusWithCounter(props) {
        const [count, setCount] = useState(0); // title
        useEffect(() => {
          document.title = `You clicked ${count} times`;
        });
      
        const [isOnline, setIsOnline] = useState(null); // frined status
        useEffect(() => {
          function handleStatusChange(status) {
            setIsOnline(status.isOnline);
          }
      
          ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
          return () => {
            ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
          };
        });
        // ...
      }
      ```

      React将按照effect声明的顺序依次调用组件中的每一个Effect

   2. **为什么每次更新的时候都要运行 Effect**

      为什么 effect 的清除阶段在每次重新渲染时都会执行，而不是只在卸载组件的时候执行一次。

      一个用于显示好友是否在线的 `FriendStatus` 组件。从 class 中 props 读取 `friend.id`，然后在组件挂载后订阅好友的状态，并在卸载组件的时候取消订阅：

      ```js
        componentDidMount() {
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

      **但是当组件已经显示在屏幕上时，`friend` prop 发生变化时会发生什么？** 我们的组件将继续展示原来的好友状态。这是一个 bug。而且我们还会因为取消订阅时使用错误的好友 ID 导致内存泄露或崩溃的问题。

      在 class 组件中，我们需要添加 `componentDidUpdate` 来解决这个问题：

      ```js
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
      ```

      忘记正确地处理 `componentDidUpdate` 是 React 应用中常见的 bug 来源。

      **Hook的版本**

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

      并不需要特定的代码来处理更新逻辑，因为 `useEffect` *默认*就会处理。它会**在调用一个新的 effect 之前对前一个 effect 进行清理**。为了说明这一点，下面按时间列出一个可能会产生的订阅和取消订阅操作调用序列：

      ```js
      // Mount with { friend: { id: 100 } } props
      ChatAPI.subscribeToFriendStatus(100, handleStatusChange);     // 运行第一个 effect
      
      // Update with { friend: { id: 200 } } props
      ChatAPI.unsubscribeFromFriendStatus(100, handleStatusChange); // 清除上一个 effect
      ChatAPI.subscribeToFriendStatus(200, handleStatusChange);     // 运行下一个 effect
      
      // Update with { friend: { id: 300 } } props
      ChatAPI.unsubscribeFromFriendStatus(200, handleStatusChange); // 清除上一个 effect
      ChatAPI.subscribeToFriendStatus(300, handleStatusChange);     // 运行下一个 effect
      
      // Unmount
      ChatAPI.unsubscribeFromFriendStatus(300, handleStatusChange); // 清除最后一个 effect
      ```

      此默认行为保证了一致性，避免了在 class 组件中因为没有处理更新逻辑而导致常见的 bug。

   3. **跳过Effect在每次渲染后执行清理或执行导致的性能问题**

      在 class 组件中，我们可以通过在 `componentDidUpdate` 中添加对 `prevProps` 或 `prevState` 的比较逻辑解决：

      ```js
      componentDidUpdate(prevProps, prevState) {
        if (prevState.count !== this.state.count) {
          document.title = `You clicked ${this.state.count} times`;
        }
      }
      ```

      这是很常见的需求，所以它被内置到了 `useEffect` 的 Hook API 中。如果某些特定值在两次重渲染之间没有发生变化，你可以通知 React **跳过**对 effect 的调用，只要传递数组作为 `useEffect` 的第二个可选参数即可：

      ```js
      useEffect(() => {
        document.title = `You clicked ${count} times`;
      }, [count]); // 仅在 count 更改时更新
      ```

      对于有清除操作的 effect 同样适用：

      ```js
      useEffect(() => {
        function handleStatusChange(status) {
          setIsOnline(status.isOnline);
        }
      
        ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
        return () => {
          ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
        };
      }, [props.friend.id]); // 仅在 props.friend.id 发生变化时，重新订阅
      ```

      > **注意！**：使用依赖数组，要确保数组中包含了**所有外部作用域中会随时间变化而且在effect中使用的变量**，否则会引用到先前渲染中的旧变量。
      >
      > 且依赖数组的比较是浅比较，如果是个对象，只要对象的指向不发生变化，就不会执行effect里的函数。
      >
      > ```js
      > function Example({ someProp }) {
      >   function doSomething() {
      >     console.log(someProp);
      >   }
      > 
      >   useEffect(() => {
      >     doSomething();
      >   }, []); // 🔴 这样不安全（它调用的 `doSomething` 函数使用了 `someProp`）
      > }
      > ------effect里使用什么变量就依赖什么变量-----
      > function Example({ someProp }) {
      >   useEffect(() => { // 将这个函数移动到effect内部，可以清晰的看到他用到的值
      >     function doSomething() {
      >       console.log(someProp);
      >     }
      > 
      >     doSomething();
      >   }, [someProp]); // ✅ 安全（我们的 effect 仅用到了 `someProp`）
      > }
      > -----什么变量都没有使用就依赖为[]------
      > useEffect(() => {
      >   function doSomething() {
      >     console.log('hello');
      >   }
      > 
      >   doSomething();
      > }, []); // ✅ 在这个例子中是安全的，因为我们没有用到组件作用域中的 *任何* 值
      > ```
      >
      > **如果出于某些原因你 \*无法\* 把一个函数移动到 effect 内部，还有一些其他办法：**
      >
      > - **你可以尝试把那个函数移动到你的组件之外**。那样一来，这个函数就肯定不会依赖任何 props 或 state，并且也不用出现在依赖列表中了。
      > - 如果你所调用的方法是一个纯计算，并且可以在渲染时调用，你可以 **转而在 effect 之外调用它，** 并让 effect 依赖于它的返回值。
      > - 万不得已的情况下，你可以 **把函数加入 effect 的依赖但 \*把它的定义包裹\*** 进 [`useCallback`](https://react.docschina.org/docs/hooks-reference.html#usecallback) Hook。这就确保了它不随渲染而改变，除非 *它自身* 的依赖发生了改变：
      >
      > ```js
      > function ProductPage({ productId }) {
      >   // ✅ 用 useCallback 包裹以避免随渲染发生改变
      >   const fetchProduct = useCallback(() => {
      >     // ... Does something with productId ...
      >   }, [productId]); // ✅ useCallback 的所有依赖都被指定了
      > 
      >   return <ProductDetails fetchProduct={fetchProduct} />;
      > }
      > function ProductDetails({ fetchProduct }) {
      >   useEffect(() => {
      >     fetchProduct();
      >   }, [fetchProduct]); // ✅ useEffect 的所有依赖都被指定了
      >   // ...
      > }
      > /*注意在上面的案例中，我们 **需要** 让函数出现在依赖列表中。这确保了 `ProductPage` 的 `productId` prop 的变化会自动触发 `ProductDetails` 的重新获取。*/
      > //  productId 变化，导致fetchProduct函数重新渲染，作为ProductDetails的依赖，他也会跟着变化，
      > ```
      >
      > 如果想执行只运行一次的 effect（仅在组件挂载和卸载时执行），可以传递一个空数组（`[]`）作为第二个参数。这就告诉 React 你的 effect 不依赖于 props 或 state 中的任何值，所以它永远都不需要重复执行。这并不属于特殊情况 —— 它依然遵循依赖数组的工作方式。
      >
      > 如果你传入了一个空数组（`[]`），effect 内部的 props 和 state 就会一直拥有其初始值。尽管传入 `[]` 作为第二个参数更接近大家更熟悉的 `componentDidMount` 和 `componentWillUnmount` 思维模式，但我们有[更好的](https://react.docschina.org/docs/hooks-faq.html#is-it-safe-to-omit-functions-from-the-list-of-dependencies)[方式](https://react.docschina.org/docs/hooks-faq.html#what-can-i-do-if-my-effect-dependencies-change-too-often)来避免过于频繁的重复调用 effect。除此之外，请记得 React 会等待浏览器完成画面渲染之后才会延迟调用 `useEffect`，因此会使得额外操作很方便。

   4. 依赖的state频繁变化。https://react.docschina.org/docs/hooks-faq.html#what-can-i-do-if-my-effect-dependencies-change-too-often

### `useContext`

### `useCallback` 

```js
const memoizedCallback = useCallback(
  () => {
    doSomething(a, b);
  },
  [a, b],
);
```

当你把回调函数传递给经过优化的并使用引用相等性去避免非必要渲染（例如 `shouldComponentUpdate`）的子组件时，它将非常有用。

`useCallback(fn, deps)` 相当于 `useMemo(() => fn, deps)`。

#### 使用场景：

- 配合被memo包裹的子组件，传递给子组件方法时候，这个方法要使用useCallback包裹起来，不然每次更新的时候，此方法都是重新创建，子组件因为接受到的方法都是新的（子组件因此都要被重新渲染，如果父组件没有影响到子组件的话就是冗余渲染
- 当此方法作为其他hook的依赖项的时候

- 其实，使用useCallback也是有一定的损耗的，毕竟每次渲染的时候，都会执行useCallback，然后会去检测依赖项是否变化，所以对于一些简单的方法，每次渲染重新创建所带来的消耗可能并没有每次执行useCallback带来的消耗大

### `useMemo`

```js
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

把“创建”函数和依赖项数组作为参数传入 `useMemo`，它仅会在某个依赖项改变时才重新计算 memoized 值。这种优化有助于避免在每次渲染时都进行高开销的计算。

记住，传入 `useMemo` 的函数会在渲染期间执行。请**不要在这个函数内部执行与渲染无关的操作（必须是纯函数计算？），诸如副作用这类**的操作属于 `useEffect` 的适用范畴，而不是 `useMemo`。

如果没有提供依赖项数组，`useMemo` 在每次渲染时都会计算新的值。

先编写在没有 `useMemo` 的情况下也可以执行的代码 —— 之后再在你的代码中添加 `useMemo`，以达到优化性能的目的。

## 如何在Hook中获取数据的实例

https://codesandbox.io/s/jvvkoo8pq3?file=/src/index.js

## Hook的使用规则

   1. 只在**函数最外层**使用hook，不要在**循环**，**条件**，或者**嵌套函数**中使用hook。*如果一定要条件的使用hook，可以在hook中用*if。确保总是在你的 React 函数的最顶层调用他们。遵守这条规则，你就能确保 **Hook 在每一次渲染中都按照同样的顺序被调用**。这让 React 能够在多次的 `useState` 和 `useEffect` 调用之间保持 hook 状态的正确。

   2. 只在react函数、自定义的hook中调用hook，不要在普通的js函数

   3. **为什么要有这样的规则？**因为我们再一个组件中申明了多个state hook或者effect，react如何知道哪个state对应哪个useState：**靠的是Hook调用顺序吗，只要hook的调用顺序在多次渲染中保持一致，react就能正确地将内部的state与对应的Hook进行关联。**所以一旦放进循环条件嵌套函数里，hook的调用顺序就会发生改变，react不知道应该返回什么，会引起后面hook的链式错误（像追尾）。（将条件判断放进hook，哪怕这个hook里的条件不执行，hook仍然是执行且对应上渲染顺序的）

      这就是为什么Hook需要我们在组件的最顶层调用。

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

但是上面父组件只是简单的调用子组件，没有传递属性，如果**传递属性**的话，memo不管用。

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

`useCallback()`函数起到了缓存的作用，即使父组件渲染了，`useCallback()`包裹的函数也不会重新生成，会返回上次的函数引用。包裹的函数想要重新生成，就看后面的依赖项，依赖项发生变化，包裹的函数也会重新生成。

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

