#[derive(Debug)]
struct Rectangle {
    width: u32,
    height: u32,
}

impl Rectangle {
    fn area(&self) -> u32 {
        self.width * self.height
    }
}

fn main() {
    // for i in 1..5 {
    //     // 1..5 从1-4
    //     println!("{}", i);
    // }
    // for i in 1..=5 {
    //     // 1..=5 从1-5
    //     println!("{}", i);
    // }
    // for i in 'a'..='z' {
    //     // 如果能够确保字符连续序列，也可以使用for in
    //     println!("{}", i);
    // }
    let rec = Rectangle {
        width: 32,
        height: 32,
    };

    let area = rec.area();
    println!("{}", area);
}
