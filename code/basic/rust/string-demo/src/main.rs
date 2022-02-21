fn main() {
    // 创建一个空字串
    let mut string_empty = String::new();
    string_empty.push_str("string_new");
    println!("{}", string_empty);

    // 通过字面值创建一个字符串
    let s1 = String::from("string_from");
    let s2 = "string_tostring".to_string();
    println!("{}", s1);
    println!("{}", s2);

    // 追加切片
    let mut s_concat = String::from("hello");
    s_concat.push_str(", world");
    let s_str = "!".to_string();
    s_concat.push_str(&s_str);
    println!("{}", s_concat);
    println!("{}", s_str);

    // 追加字符
    let mut team = String::from("tea");
    team.push('m');
    println!("{}", team);

    // 合并字符串
    let s_con1 = String::from("s_con1");
    let s_con2 = String::from("s_con2");
    let s_con3 = s_con1 + &s_con2; // s_con1已经失去所有权了这里，+相当于调用了一个方法
    println!("{}", s_con3);
    println!("{}", s_con2);

    // 使用format!
    let s_for1 = String::from("s_for1");
    let s_for2 = String::from("s_for2");
    let s_for3 = String::from("s_for3");

    let s_for = format!("{}-{}-{}", s_for1, s_for2, s_for3);
    println!("{}", s_for);
    println!("{}", s_for1);
    println!("{}", s_for2);
    println!("{}", s_for3);

    // 获取字符串长度
    let s_len = String::from("s_len");
    let s_len = s_len.len();
    println!("s_len length = {}", s_len);
    let s_len = String::from("你好");
    let s_len = s_len.len();
    println!("你好 length = {}", s_len);

    // 遍历字符串
    let hello = "您好";
    // chars字符方式遍历字符串
    for string_char in hello.chars() {
        println!("char  = {}", string_char);
    }
    // bytes字节方式遍历字符串
    for string_byte in hello.bytes() {
        println!("byte = {}", string_byte);
    }
}
