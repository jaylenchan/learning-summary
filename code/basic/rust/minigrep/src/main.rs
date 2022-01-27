use std::env;
use std::fs;

fn main() {
    // let args: Vec<String> = env::args().collect();

    // // println!(" {:?}", args);

    // let query = &args[1];
    // let filename = &args[2];

    // println!("{}, {}", query, filename);

    // let contents = fs::read_to_string(filename).expect("文件读取失败");
    // println!("{:?}", contents);

    let string1 = String::from("abcd");
    let string2 = "abcd1";

    fn longest<'a>(s1: &'a str, s2: &'a str) -> &'a str {
        if s1.len() > s2.len() {
            s1
        } else {
            s2
        }
    }
    let s = longest(&string1, string2);
    println!("{}", s)
}
