fn main() {
    // 定义一个结构体
    #[derive(Debug)]
    struct User {
        name: String,
        count: String,
        nonce: u64,
        active: bool,
    }

    // 定义一个空结构体
    struct Empty {}

    // 定义一个元组结构体
    #[derive(Debug)]
    struct Point(i32, i32);

    // 创建一个结构体实例
    let xiaoming = User {
        name: String::from("xiaoming"),
        count: String::from("80001000"),
        nonce: 10000,
        active: true,
    };
    println!("{:#?}", xiaoming);

    // 修改结构体中的字段
    let mut xiaohuang = User {
        name: String::from("xiaohuang"),
        count: String::from("80001001"),
        nonce: 10000,
        active: true,
    };
    xiaohuang.nonce = 20000;
    println!("{:#?}", xiaohuang);

    // 参数名和字段名同名的时候的简写方式
    let name = String::from("xiaoxiao");
    let count = String::from("89077777");
    let nonce = 200000;
    let active = false;

    let user1 = User {
        name,
        count,
        nonce,
        active,
    };
    println!("{:#?}", user1);

    // 以其他结构体为基础创建实例
    let user2 = User {
        name: String::from("xiaowang"),
        ..user1
    };
    println!("{:#?}", user2);
    // 创建一个元组结构体实例
    let point_a = Point(32, 32);
    println!("{:?}", point_a);

    // 访问一个元组结构体中的元素
    let point_c = Point(128, 128);
    let x = point_c.0;
    let y = point_c.1;
    println!("{}", x);
    println!("{}", y);

    // 定义一只狗
    #[derive(Debug)]
    struct Dog {
        name: String,
        weight: f32,
        height: f32,
    }

    // 狗的方法
    impl Dog {
        fn get_name(&self) -> &str {
            &(self.name)[..]
        }

        fn get_weight(&self) -> f32 {
            self.weight
        }

        fn get_height(&self) -> f32 {
            self.height
        }
    }

    // 静态方法
    impl Dog {
        fn shout() {
            println!("wang wang wang!");
        }
    }

    // 创建一只狗
    let dog = Dog {
        name: String::from("wangcai"),
        weight: 100.0,
        height: 70.5,
    };
    println!("{:#?}", dog);
    println!("dog.name = {}", dog.get_name());
    println!("dog.weight = {}", dog.get_weight());
    println!("dog.height = {}", dog.get_height());
    Dog::shout();
}
