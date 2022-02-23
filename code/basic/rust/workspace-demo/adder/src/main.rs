use add_one;

fn main() {
    let num = add_one::add_one();
    println!("num => {}", num);
    let x = Box::new(5);
    let y = *x;
    println!("x => {}", y)
}
