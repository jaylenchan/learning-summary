fn main() {
    // 模式：用来匹配值的结构

    // 模式由如下内容组成：
    // 字面值
    // 解构的数组、枚举、结构体、元组
    // 变量
    // 通配符
    // 占位符

    // 1.match
    // match VALUE {
    //     PATTERN => EXPRESSION,
    //     PATTERN => EXPRESSION,
    // }

    let a = 1;
    // match必须匹配完所有的情况
    match a {
        // a是i32的类型，所以应该匹配完i32的所有能表示的数值范围
        0 => println!("0"),
        1 => println!("1"),
        _ => println!("none"),
    }

    // 2. if let
    let color: Option<&str> = None;
    let is_ok = true;
    let age: Result<u8, _> = "33".parse();

    if let Some(c) = color {
        println!("c => {}", c);
    } else if is_ok {
        println!("is_ok");
    } else if let Ok(a) = age {
        if a > 30 {
            println!("成熟的人");
        } else {
            println!("幼稚的人");
        }
    } else {
        println!("None");
    }

    // 3.while let 只要模式匹配，就一直循环执行
    let mut stack = Vec::new();
    stack.push(1);
    stack.push(2);

    while let Some(top) = stack.pop() {
        println!("top => {}", top);
    }

    // 4.for循环 【for中的模式是直接跟着for关键字的值的】for x in y 中
    // x就是对应的模式
    let v = vec!['a', 'b', 'c'];
    // 此处的模式是(index,value)
    for (index, value) in v.iter().enumerate() {
        println!("index={}, value={}", index, value);
    }

    // 5.let 语句
    // let PATTERN = EXPRESSION
    // 实际上(x,y,z)就是模式
    // 1,2,3就会匹配x,y,z。1绑定到x,2绑定到y,绑定到z
    let (x, y, z) = (1, 2, 3);
    let (x, .., z) = (1, 2, 3); // 还可以忽略，只取首尾

    // 6.fn
    // fn的参数也是模式
    fn print_point(&(x, y): &(i32, i32)) {
        println!("x={}, y={}", x, y);
    }
    let point = (1, 2);
    print_point(&point);

    // 模式分类：不可反驳模式和可反驳模式
    // 不可反驳模式：能匹配任何传递的可能值的模式
    // 可反驳模式：对值匹配可能存在失败的模式

    // 只能接受不可反驳模式的有：函数、let语句、for循环。【原因：通过不匹配的值的话，程序没法进行有意义的工作】

    // 可反驳模式的有：if let和while let。【原因：她们的定义就是为了解决可能失败的情况】

    // 所有模式语法
    // 1. 匹配字面值
    let x = 1;
    match x {
        1 => println!("one => {}", 1),
        _ => println!("two => {}", 2),
    }

    // 2. 匹配命名变量
    let x = Some(1);
    let y = 10; // 位置1的y
    match x {
        Some(1) => println!("x = {}", 1),
        Some(y) => println!("y = {}", y), // 此处的y不是位置1的y。此y非彼y。里头的这个y是一个变量，相当于重新声明了一个，覆盖了外边的
        None => println!("None"),
    };
    println!("x={:?}, y={}", x, y); // 此处的y是位置1 的y

    // 3. 多个模式
    let x = 2;
    match x {
        1 | 2 => println!("1OR2"), //匹配1或者2
        3 => println!("3"),
        _ => println!("else"),
    }

    // 4. 通过..匹配
    let x = 2;
    match x {
        1..=5 => println!("1~5"), // 匹配1-5的值（1，2，3，4，5）等价于1|2|3|4|5
        _ => println!("else"),
    }
    let x = 'c';
    match x {
        'a'..='j' => println!("a-j"),
        'k'..='z' => println!("k-z"),
        _ => println!("else"),
    }

    // 5. 解构并分解值 = 主要应用：元组、结构体、枚举、引用
    struct Point {
        x: i32,
        y: i32,
    }
    // 解构结构体
    let p = Point { x: 1, y: 2 };
    let Point { x, y } = p; // 这里就是结构体解构
    let Point { x: a, y: b } = p; // 也可以改名
    assert_eq!(x, 1);
    assert_eq!(y, 2);
    assert_eq!(a, 1);
    assert_eq!(b, 2);

    let p = Point { x: 1, y: 0 };
    match p {
        Point { x: _, y: 0 } => println!("点在x轴上"),
        Point { x: 0, y: _ } => println!("点在y轴上"),
        Point { x: _, y: _ } => println!("点在x，y平面上"),
    }

    // 解构枚举
    enum Message {
        Quit,
        Move { x: i32, y: i32 },
        Write(String),
        Change(i32, i32, i32),
    }
    let msg = Message::Change(0, 160, 255);
    match msg {
        Message::Quit => {
            println!("Quit")
        }
        Message::Move { x, y } => {
            println!("x={}, y={}", x, y);
        }
        Message::Write(text) => {
            println!("text = {}", text);
        }
        Message::Change(r, g, b) => {
            println!("rgb=({},{},{})", r, g, b)
        }
    }

    // 解构枚举嵌套
    enum Color {
        Rgb(i32, i32, i32),
        Hsv(i32, i32, i32),
    }
    enum MessageColor {
        Quit,
        Move { x: i32, y: i32 },
        Write(String),
        Change(Color),
    }

    let msg = MessageColor::Change(Color::Hsv(0, 160, 255));
    match msg {
        MessageColor::Change(Color::Rgb(r, g, b)) => {
            println!("rgb = ({},{},{})", r, g, b);
        }
        MessageColor::Change(Color::Hsv(h, s, v)) => {
            println!("hsv = ({},{},{})", h, s, v)
        }
        _ => {}
    }

    // 解构结构体和枚举
    struct PointNest {
        x: i32,
        y: i32,
    }

    let ((a, b), PointNest { x, y }) = ((1, 2), PointNest { x: 1, y: 2 });
    println!("a={},b={},x={},y={}", a, b, x, y);

    // 忽略模式中的值
    fn foo(_: i32, y: i32) {
        // 使用下划线忽略第一个参数
        println!("y = {}", y);
    }
    foo(1, 2);

    let numbers = (1, 2, 3);
    match numbers {
        (one, _, three) => {
            println!("one={}, three={}", one, three);
        }
    }

    // 忽略未使用的变量
    let _f = 5;
    let _y = 5;

    let s = Some(String::from("5"));
    // if let Some(_c) = s {
    //     // 这里已经将s的所有权移动进去了
    //     println!("_c ={}", _c);
    // }
    // println!("s = {:?}", s); //所以这里没法打印，s已经失去数据所有权了
    if let Some(_) = s {
        println!("C=>"); //如果使用_忽略值，那么不会发生所有权转移
    }
    println!("s = {:?}", s); // 这里可以打印

    // ..忽略中间值，只匹配中间和最后值
    let numbers = [1, 2, 3, 4, 5, 6];
    match numbers {
        [first, .., last] => {
            println!("first={}, last={}", first, last);
        }
    }

    // 匹配守卫
    let num = Some(5);
    match num {
        Some(x) if x < 5 => println!("x={}", x),
        Some(x) => println!("x={}", x),
        None => println!("None"),
    }

    let num = Some(5);
    let y = 10;
    match num {
        Some(num) if num == y => println!("num == y"),
        Some(_) => println!("num != y"),
        None => println!("None"),
    }

    let x = 4;
    let y = false;
    match x {
        1 | 2 | 3 | 4 if y => println!("{}", x), // if y指的是if 1|2|3|4
        _ => println!("else"),
    }

    // 使用@符号，允许我们在创建一个存放值的变量的同时，去测试这个变量的值是否匹配某个模式
    enum MessageX {
        Hello { id: i32 },
    }

    let msg = MessageX::Hello { id: 15 };
    match msg {
        MessageX::Hello { id: id_va @ 3..=7 } => println!("yes id_va={}", id_va),
        MessageX::Hello { id: 10..=20 } => println!("large"),
        MessageX::Hello { id } => println!("id = {}", id),
    }
}
