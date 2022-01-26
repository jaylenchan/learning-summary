fn main() {
    let v = vec![1, 2, 3];
    let third: i32 = v[2];

    println!("{}", third);
    println!("{}", v[1]);

    // match v.get(2) {
    //     Some(third) => println!("The third element is {}", third),
    //     None => println!("There is no third element."),
    // }
    for i in &v {
        println!("{}", i);
    }

    enum Cell {
        Int(i32),
        Float(f64),
        Text(String),
    }

    let row = vec![
        Cell::Int(3),
        Cell::Float(5.4),
        Cell::Text(String::from("2")),
    ];
}
