fn main() {
    // let days = [
    //     "Sunday",
    //     "Monday",
    //     "Tuesday",
    //     "Wednesday",
    //     "Thursday",
    //     "Friday",
    //     "Saturday",
    // ];
    // let bytes = [0; 5];

    // println!("days => {:#?}", days);
    // println!("bytes => {:#?}", bytes);

    // let first = days[0];
    // let seconde = days[1];

    // println!("first => {}", first);
    // println!("second => {}", seconde);

    // will panic!!!
    // let seventh = days[7];
    // println!("seventh => {}", seventh);

    let three_nums = vec![1, 2, 3, 4, 5];
    println!("three_nums => {:?}", three_nums);

    let zeroes = vec![0; 5];
    println!("zeroes => {:?}", zeroes);

    let mut fruit = Vec::new();

    fruit.push("apple");
    fruit.push("banana");
    fruit.push("cherry");
    println!("fruit => {:?}", fruit);

    let a = fruit.pop();
    let b = fruit.pop();
    let c = fruit.pop();
    let d = fruit.pop();
    println!("{:?}", a);
    println!("{:?}", b);
    println!("{:?}", c);
    println!("{:?}", d);
}
