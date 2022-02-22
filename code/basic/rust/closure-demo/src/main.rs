fn main() {
    // 闭包：一个匿名函数，可以保存变量或者作为其他函数的参数
    // 闭包和函数的区别：闭包可以捕获调用者作用域中的值

    let use_closure = || println!("use_closure");
    use_closure();

    // 实现数字加1
    // 函数的方式
    fn add_one_fn(x: u32) -> u32 {
        x + 1
    }
    // 闭包的方式
    let add_one_closure = |x: u32| -> u32 { x + 1 };

    let one_fn = add_one_fn(1);
    let one_closure = add_one_closure(1);

    println!("one_fn => {}", one_fn);
    println!("one_closure => {}", one_closure);

    // 闭包可以捕获作用域中的变量
    let i = 1;
    let exe = |x: u32| x + i; // fn定义的话，这个i不能取的，不是js那样的，在fn中取rust会报错i
    let r = exe(5);

    println!("r = {}", r);
}
