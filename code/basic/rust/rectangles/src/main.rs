#[derive(Debug)]
struct Rectangle {
    width: u32,
    height: u32,
}

fn main() {
    // let width1 = 30;
    // let height1 = 50;

    // let rect1 = (30, 50);
    // fn area(width: u32, height: u32) -> u32 {
    //     return width * height;
    // }

    let rect2 = Rectangle {
        width: 30,
        height: 50,
    };

    impl Rectangle {
        fn area(&self) -> u32 {
            return self.width * self.height;
        }
        fn say(size: u32) {
            println!("value size {}", size)
        }
    }
    // fn area1(dimensions: (u32, u32)) -> u32 {
    //     return dimensions.0 * dimensions.1;
    // }
    // println!(
    //     "The area of the rectangle is {} square pixels.",
    //     area(width1, height1)
    // );
    // println!(
    //     "The area of the rectangle is {} square pixels.",
    //     area1(rect1)
    // )
    // fn area2(rect: &Rectangle) -> u32 {
    //     return rect.width * rect.height;
    // }
    // println!(
    //     "The area of the rectangle is {} square pixels.",
    //     area2(&rect2)
    // );
    // println!("the value  width {}", rect2.width);
    println!("{}", rect2.area());
    Rectangle::say(32);
}
