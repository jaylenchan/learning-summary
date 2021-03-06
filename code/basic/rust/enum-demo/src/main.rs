fn main() {
    // 类似c语言的enum定义方式
    #[derive(Debug)]
    enum IpAddKind {
        V4,
        V6,
    }
    #[derive(Debug)]
    struct IpAddrClang {
        kind: IpAddKind,
        address: String,
    }
    // 【类似c语言的enum定义方式】的使用方式
    let ip4_clang = IpAddrClang {
        kind: IpAddKind::V4,
        address: String::from("127.0.0.1"),
    };
    let ip6_clang = IpAddrClang {
        kind: IpAddKind::V6,
        address: String::from("::1"),
    };
    println!("ip4_clang = {:#?}", ip4_clang);
    println!("ip6_clang = {:#?}", ip6_clang);

    // rust提倡的enum定义方式
    #[derive(Debug)]
    enum IpAddrRustlang {
        V4(String),
        V6(String),
    }

    // 【rust提倡的enum定义方式】使用方式
    let ip4_rustlang = IpAddrRustlang::V4(String::from("127.0.0.1"));
    let ip6_rustlang = IpAddrRustlang::V6(String::from("::1"));
    println!("ip4_rustlang = {:?}", ip4_rustlang);
    println!("ip6_rustlang = {:?}", ip6_rustlang);

    // enum中的变体可以附加不同类型
    #[derive(Debug)]
    enum IpAddr {
        V4(u8, u8, u8, u8),
        V6(String),
    }

    let ip4 = IpAddr::V4(127, 0, 0, 1);
    let ip6 = IpAddr::V6(String::from("::1"));
    println!("ip4 = {:?}, ip6 = {:?}", ip4, ip6);

    // 经典用法
    // 等同于如下结构体的结合
    // struct Quit;
    // struct Move { x: i32, y: i32 };
    // struct Write (String);
    // struct Change(i32,i32,i32);
    enum Message {
        Quit,
        Move { x: i32, y: i32 },
        Write(String),
        Change(i32, i32, i32),
    }

    // 定义枚举的方法
    impl Message {
        fn prin(&self) {
            match self {
                Message::Quit => println!("Quit"),
                Message::Move { x, y } => println!("Move -> x {}, y {}", x, y),
                Message::Write(message) => println!("Write -> message {}", message),
                Message::Change(x, y, z) => println!("Change -> x {}, y {}, z {}", x, y, z),
            }
        }
    }

    let message_quit = Message::Quit;
    let message_move = Message::Move { x: 1, y: 2 };
    let message_write = Message::Write(String::from("write"));
    let message_change = Message::Change(1, 2, 3);

    message_quit.prin();
    message_move.prin();
    message_write.prin();
    message_change.prin();

    // Option枚举
    // enum Option<T> {
    //  Some(T)
    //  None
    // }

    let some_number = Some(5);
    let some_string = Some(String::from("a string"));
    let none_absent: Option<i32> = None;
    let x: i32 = 5;
    let y = x + some_number.unwrap();

    // 使用match去计算带有Some的值
    let mut sum = 0;

    match some_number {
        Some(y) => sum = y + x,
        None => sum = 0 + x,
        _ => sum = 0 + x,
    }
    println!("sum = {}", sum);
    println!("x + some_number = {}", y);
    println!("some_string = {:?}", some_string);
    println!("none_absent = {:?}", none_absent);

    // 函数中使用Option
    fn plus_one(x: Option<i32>) -> Option<i32> {
        match x {
            Some(y) => Some(y + 1),
            None => None,
        }
    }

    let result_none = plus_one(None);
    let result_some = plus_one(some_number);
    println!(
        "result_none={:?} result_some={:?}",
        result_none, result_some
    );
    if let Some(y) = plus_one(Some(4)) {
        println!("some_number plus one {:?}", y)
    }
}
