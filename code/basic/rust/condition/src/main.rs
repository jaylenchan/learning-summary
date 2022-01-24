fn main() {
    // let x = 5;
    // if x == 5 {
    //     println!("the value of x {}", x);
    // } else {
    //     println!("err")
    // }
    // let x = 8;
    // if x % 2 == 0 {
    //     println!("x能被2整除");
    // } else if x % 8 == 0 {
    //     println!("x能被8整除")
    // } else {
    //     println!("err")
    // }
    let condition = true;
    let x = if condition { 5 } else { 6 }; // 所有分支的返回类型都必须是一样的，不然会报错！

    println!("x {}", x)
}
