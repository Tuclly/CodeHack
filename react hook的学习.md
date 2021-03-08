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

   