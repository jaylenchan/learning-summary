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
}
