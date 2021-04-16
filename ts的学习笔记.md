# TS比JS多的一些东西

- 类型批注和编译时类型检查

- 类型推断

- 类型擦除

- 接口

- 美剧

- 泛型编程

- 名字空间

- 元祖

  

# 类型声明

1. 数组

推荐使用T[]这种写法`const nums: number[] = [1, 2, 3, 4];`

2. 数组的concat方法，返回类型为never[]的

```js
 // 数组concat方法的never问题
 // 提示： Type 'string' is not assignable to type 'never'.
 const arrNever: string[] = [].concat(['s']);

 // 主要问题是：[]数组，ts无法根据上下文判断数组内部元素的类型
 // @see https://github.com/Microsoft/TypeScript/issues/10479
 const fixArrNever: string[] = ([] as string[]).concat(['s']);
```

3. 接口

```tsx
interface name {
    first: string;
    second: string;
}

const userName: Name = {
    first: "a",
    second: "b"
}
```

4. 交叉类型

```js
// 交叉类型：如果以后遇到此种类型声明不会写，直接看Object.assign声明写法
function $extend<T, U>(first: T, second: U): T & U {
  return Object.assign(first, second); // 示意而已
}
```

5. type

> type用来创建新的类型，也可以重命名（别名）已有的类型，建议使用type创建简单类型，无嵌套的或者一层嵌套的类型，其它复杂的类型都应该使用interface, 结合implements ,extends实现。

```js
type StrOrNum = string | number;
doubu
// 使用
let sample: StrOrNum;
sample = 123;
sample = '123';

// 会检查类型
sample = true; // Error
```

6. 强制类型转换(类型断言)

`const fixArrNever: `

`string[] = ([] as string[]).concat(['s']);// 兼容jsx`



```js
let someValue:any = "this is a string"
let strLength:number = (someValue as steing).length
```

7. 属性可选和默认属性

```js
export interface SocketOptions {
    type: SocketType;
    protocols?: string | string[]; // optional
    pinMessage: string | (() => string); // 联合类型，可以为string或者function
    pongMessage: string | (() => string);
}

export function eventHandler = {
    evt: CloseEvent | MessageEvent | event
    socket : Socket,
    type = "Websock" // 默认值
} => any
```

8. !的使用，强行告诉ts的编辑器，ts声明的变量没有问题，保证运行的时候不会再出错。

# Type和interface的区别

## 不同点

1. 语法

```tsx
interface User {
    name: string
    age: number
    sayHello: () => void
    sayHi(): void
}

type UserType = {
    name: String
    age: number
    sayHello: () => void
    sayHi(): void
}
```

2. - 接口主要声明的是函数和对象，并且总是需要引入特定的类型

   - 类型别名声明的可以是任何的数据类型（基本类型别名，联合类型，元组等类型）

```tsx
// 定义一个对象
interface Point {
  x: number;
  y: number;
}
// 定义一个函数
interface SetPoint {
  (x: number, y: number): void; // 或者 (x:number, y:number): () => void
}

// 类型别名定义的类型检查，例如
type Point = {
    x: number;
    y: number;
};

type SetPoint = (x: number, y: number) => void;
// 定义原生类型
type Name = string;

// 对象
type PartialPointX = { x: number; };
type PartialPointY = { y: number; };

// 联合类型
type PartialPoint = PartialPointX | PartialPointY;

// 元组
type Data = [number, string];
```

3. 扩展方式

- 接口可以使用 `extends` 关键字来进行扩展（这个继承是包含关系，如果父级有了，子集不可以声明重复的，会报错的），或者是 `implements`来进行实现某个接口

```tsx
interface A {
    T1: string,	
}
interface B {
    T2: number,
}

interface C extends A,B{
    T1: number, // 接口C错误extend A，T1的类型不兼容，不能将number分配给string
    T4: string,
}
```

- 类型别名也可以进行扩展，使用 `&`符号进行（这个继承是合并关系，如果父级有了一个类型，子集还可以声明，但是类型就是变成 &；）这个叫做`交叉类型`

```tsx
type A = {
     T1:string,
}
type B ={
    T2:number,
}
type C ={
    T1:number,
    T4:string,
}&A &B

const test:C ={
     T1:12, // 不能将number 分配给never
    T2:12,
    T3:'23'
}
```

4. 合并声明

- 接口可以定义一个名字，后面的接口也可以直接使用这个名字，自动合并所有的声明，可以理解类似为继承，但是不建议这么使用，还是使用`extends`关键字好

```tsx
// interface能够声明合并
interface User {
  T1: string
}

interface User {
  T2: number
}

/*
User 接口为 {
  T1: string
  T2: number
}
*/
```

- 类型别名不能这么使用，会直接报错

```tsx
type A = {
	T1:string,
}

type A = {
	T2:number // A重复定义
}
```

5. 类型别名 可以使用 typeof获取实例的类型 直接进行赋值（接口没有这个功能

```tsx
let div = document.createElement('div')
type B = tyoeof div // type B = HTMLDivElement
```

6. 类型别名 可以通过 `in`来实现类型映射（接口没有这样的功能

```tsx
type Keys = "firstName" | "lastName"
type DudeType = {
    [key in Keys]:string
}
/*
type DudeType = {
	firstNameL :string;
    lastName:string;
}
*/
const test: DudeType ={
    firstName: "322",
    lastName: '322',
}
```

7. 接口可以继承类，类型别名不行

```tsx
class A {
	a:string = ''
}
class B{
 	b:number = 0
}
interface C extends A,B {
	c: () => void
}
const c:C{
	//需要实现属性a,b,c
}
```

## 相同点

1. 两个都都不会出现在编译结果里
2. 两者都可以进行扩展，扩展方式不同，一个`extends`,一个是`&`

```tsx
interface Name{
	name:string;
}
// interface extends interface
interface User extends Name{
    age: number;
}
type Name = {
    name:string;
}
// type extends type
type User = Name & {age:numerb}
// interface extends type
interface User extends Name
//type extends interface
interface Name{
    name:string
}
type user = Name & {
    age: number
}
```

3. 描述函数和对象

```tsx
interface User{
	name:string;
	age:number;
	(name:string, age:number):void;
}

type User = {
	name:string;
	age:number;
}
type setProps = (name:string, age:number) => void
```

一般来说，如果不清楚什么时候用interface/type，能用 interface 实现，就用 interface , 如果不能就用 type 





## Record

Record本质上就是为 对象 申明 key和value的类型

```js
interface CatInfo {
    age:number;
    breed:string;
}
type CatName = "miffy" | "boris" |"mordred"

const cats: Record<CatName, CatInfo> = {
  miffy: { age: 10, breed: "Persian" },
  boris: { age: 5, breed: "Maine Coon" },
  mordred: { age: 16, breed: "British Shorthair" },
}
```













