use std::ops::Deref;

struct MyBox<T>(T);

impl<T> MyBox<T> {
    fn new(x: T) -> MyBox<T> {
        MyBox(x)
    }
}
impl<T> Deref for MyBox<T> {
    type Target = T;
    fn deref(&self) -> &T {
        &self.0
    }
}
fn main() {
    // fn longest<'a>(a: &'a str, b:) -> 'astr {
    //     if true {
    //         a
    //     } else {
    //         b
    //     }
    // }
    // let c;
    // {
    //     let a;
    //     let b;
    //     a = String::from("a");
    //     b = String::from("b");
    //     c = longest(&a, &b);
    //     println!("{}", c);
    // }
    // fn c_c(c: &str) -> &str {
    //     c
    // }
    // c_c(c);
    let x = Box::new(5);
    let y = &x;

    let x = 5;
    let y = &x;

    let c = MyBox::new(5);
}
