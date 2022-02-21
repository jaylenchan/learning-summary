fn main() {
    // 创建1个空的vector
    let mut vec_empty: Vec<i32> = Vec::new();
    vec_empty.push(1);

    // 创建1个包含初始值的vector
    let vector = vec![1, 2, 3];
    println!("{:?}", vector);

    // 丢弃vector
    {
        // _vector出了作用域就会被丢弃，里头的所有元素都会被丢弃
        let _vector = vec![1, 2, 3];
    }

    // 读取vector元素
    let vec_one = &vector[0];
    println!("{}", vec_one);

    // rust提倡的访问元素的方式
    match vector.get(1) {
        Some(val) => println!("{:?}", val),
        _ => println!("None"),
    }

    // 更新vector元素
    let mut vec1: Vec<i32> = Vec::new();
    vec1.push(1);
    vec1.push(2);
    println!("{:?}", vec1);

    // 遍历vector元素
    // 不可变遍历
    for item in &vec1 {
        println!(" item {}", item)
    }

    // 可变遍历
    for item in &mut vec1 {
        *item += 1
    }
    println!("{:?}", vec1);

    // 利用枚举让Vector可以存放不同类型的值
    #[derive(Debug)]
    enum Context {
        Text(String),
        Float(f32),
        Int(i32),
    }

    let vec_context: Vec<Context> = vec![
        Context::Text(String::from("Text")),
        Context::Float(1.0),
        Context::Int(32),
    ];
    println!("{:#?}", vec_context);

    //
    let mut v = vec![1, 2, 3, 4, 5];
    let first = &v[0]; // 这里使用了不可变引用
                       // v.push(6); // 这里又用了可变引用，所以报错了，所以不能这么写
    println!("{}", first)
}
