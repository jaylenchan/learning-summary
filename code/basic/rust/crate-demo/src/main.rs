use mylib::factory::{produce_refrigerator, produce_washingmachine};
// extern crate crypto; // 使用外部库

use crypto::digest::Digest;
use crypto::sha3::Sha3;

/**
 * 先dependence使用外部包
 * extern crate 外部包
 * 再use crate::外部包
 * extern crate crypto
 * use crate::crypto
 */
// 上下两种方式效果等价
/**
 * 先dependence使用外部包
 * 再use 外部包
 * use crypto
 */

mod modA {
    #[derive(Debug)]
    pub struct A {
        pub number: u32,
        name: String,
    }
    impl A {
        pub fn new() -> Self {
            A {
                number: 1,
                name: String::from("A"),
            }
        }

        pub fn print(&self) {
            println!("number={}, name={}", self.number, self.name);
        }
    }
}

mod modB {
    pub fn print_b() {
        println!("Print B");
    }
}

mod modC {
    pub fn print_c() {
        super::modB::print_b();
    }
}

fn main() {
    produce_refrigerator::produce_refri();
    produce_washingmachine::produce_washing();

    // let a = modA::A::new();
    use modA::A as Person; // A写了个别名叫做Person
    let a = Person::new();
    a.print();
    println!("pub number => {}", a.number);
    // println!("pri name => {}", a.name); // 报错！！！name是私有的
    use modC::print_c;
    print_c();

    let mut hasher = Sha3::sha3_256();
    hasher.input_str("hello world");
    let result = hasher.result_str();
    println!("hash result{}", result)
}
