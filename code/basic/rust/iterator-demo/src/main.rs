fn main() {
    // 迭代器：负责遍历序列中的每一项和决定序列何时结束的逻辑
    // 迭代器时惰性的，意思是调用迭代器的方法之前，迭代器不会做任何动作，没有任何效果
    // 每一个迭代器都实现了一个iterator trait - 定义在标准库中。
    // trait iterator {
    //     type Item;
    //     fn next(&mut self) -> Option<Self::Item>;
    //     // Item + Self::Item的这种用法叫做定义trait的关联类型【项目中用的多】
    // }
    // next就是拥有这种特征的类型必须要去实现的唯一的方法

    let v1 = vec![1, 2, 3];
    // 创建迭代器
    let mut v1_iter = v1.iter();
    println!("v1_iter => {:?}", v1_iter);
    // for item in v1_iter {
    //     println!("item => {}", item);
    // }

    // 访问获取迭代器中的元素
    if let Some(v) = v1_iter.next() {
        println!("v => {}", v);
    }
    if let Some(v) = v1_iter.next() {
        println!("v => {}", v);
    }
    if let Some(v) = v1_iter.next() {
        println!("v => {}", v);
    }
    if let Some(v) = v1_iter.next() {
        println!("v => {}", v);
    } else {
        println!("End");
    }

    // 改变迭代器中的元素
    let mut v2 = vec![1, 2, 3]; // 要想获取可以改变的迭代器，就必须创建可以改变的mut v2
    let mut v2_iter = v2.iter_mut(); // 要改迭代器中的内容，必须获取一个可以改变元素的迭代器

    if let Some(v) = v2_iter.next() {
        *v = 3;
    }

    println!("v2 => {:?}", v2);

    // 消费适配器
    let v3 = vec![1, 2, 3];
    let v3_iter = v3.iter();
    let total: i32 = v3_iter.sum(); // 调用消费适配器：sum来求和。也就是sum这个方法叫做消费适配器
    println!("total => {}", total);

    // 迭代适配器
    let v4 = vec![1, 2, 3];
    let v4_iter = v4.iter();
    let v4: Vec<_> = v4_iter.map(|x| x + 1).collect(); // 其实就相当于js中的map方法，只不过map后是迭代器，然后再collect收集成Vec类型
    println!("v4 => {:#?}", v4);

    let v5 = vec![1, 2, 3];
    let v5_iter = v5.into_iter();
    let v5: Vec<_> = v5_iter.filter(|x| *x > 1).collect();
    println!("v5 => {:#?}", v5);

    // 自定义迭代器
    struct Counter {
        count: u32,
    }
    impl Counter {
        fn new() -> Self {
            Counter { count: 0 }
        }
    }
    impl Iterator for Counter {
        type Item = u32;
        fn next(&mut self) -> Option<Self::Item> {
            self.count += 1;
            if self.count < 6 {
                Some(self.count)
            } else {
                None
            }
        }
    }

    let mut counter = Counter::new();
    for i in 0..6 {
        if let Some(v) = counter.next() {
            println!("i={} v={}", i, v);
        } else {
            println!("i={} => End", i);
            break;
        }
    }
}
