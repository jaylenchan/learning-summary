```rust
 let fruits = vec!["banana", "apple", "coconut", "orange", "strawberry"];

    let first = fruits.get(0);
    println!("{:?}", first);

    let third = fruits.get(2);
    println!("{:?}", third);

    let non_existent = fruits.get(99);
    println!("{:?}", non_existent);

    for &index in [0, 2, 99].iter() {
        match fruits.get(index) {
            Some(fruit_name) => {
                println!("It's a delicious {}!", fruit_name)
            }
            None => {
                println!("There is no fruit! :(")
            }
        }
    }

    let a_number: Option<u8> = Some(7);
    if let Some(7) = a_number {
        println!("That's my lucky number!");
    }

    let gift = Some("candy");
    println!("{}", gift.unwrap());

    // let empty_gift: Option<&str> = None;
    // unwrap 的话会导致panic
    // println!("{}", empty_gift.unwrap());

    let a = Some("value");
    a.expect("fruits are healthy");

    // let b: Option<&str> = None;
    // 导致panic
    // b.expect("fruits are healthy");
    println!("{}", Some("dog").unwrap_or("cat"));
    println!("{}", None.unwrap_or("cat"));
```