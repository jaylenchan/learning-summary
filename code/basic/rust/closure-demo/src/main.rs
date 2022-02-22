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
    use std::collections::HashMap;
    // 使用闭包实现缓存
    #[derive(Debug)]
    struct Cacher<T>
    where
        T: Fn(u32) -> u32,
    {
        calculation: T,
        value: HashMap<u32, Option<u32>>,
    }

    impl<T> Cacher<T>
    where
        T: Fn(u32) -> u32,
    {
        fn new(calculation: T) -> Self {
            Cacher {
                calculation: calculation,
                value: HashMap::new(),
            }
        }

        fn value(&mut self, arg: u32) -> u32 {
            match &(self.value).get(&arg) {
                Some(val) => match val {
                    Some(v) => *v,
                    None => {
                        let val = (self.calculation)(arg);
                        self.value.insert(arg, Some(val));
                        val
                    }
                },
                None => {
                    let val = (self.calculation)(arg);
                    self.value.insert(arg, Some(val));
                    val
                }
            }
        }
    }

    let mut c = Cacher::new(|x| x + 1);
    let val_1 = c.value(1);
    println!("val_1 => {}", val_1);
    let val_2 = c.value(2);
    println!("val_2 => {}", val_2);

    // 闭包捕获环境的三种方式 对应着函数的三种获取参数的方式
    // 三种方式分别如下：
    // 获取所有权 ｜ 可变借用 ｜ 不可变借用
    // 以上三种方式在rust中被编码为三个Fn trait
    // 【1】FnOnce trait
    // 【2】FnMut trait
    // 【3】Fn trait

    // FnOnce trait：消费从周围【作用域（也叫环境）】捕获的变量。为了消费捕获到的变量，闭包必须获取其所有权，并且在定义闭包的时候将其移动道闭包内部。
    //FnOnce的Once就代表闭包不可以多次获取相同变量的所有权

    // FnMut:获取可变的借用值，所以可以改变其的环境

    // Fn： 从其环境获取不可变的借用值

    // 当创建一个闭包时，rust会根据其如何使用环境中的变量去判断我们希望怎么去引用环境。
    // 由于所有的闭包都至少被调用一次，所以所有的闭包都实现了FnOne这个trait；
    // 没有把被捕获变量的所有权移动到闭包自己里头的那些闭包也实现了FnMut这个trait；
    // 不需要对捕获变量进行可变访问的那些闭包就实现了Fn这个trait。

    
}
