// 导入HashMap
use std::collections::HashMap;

fn main() {
    // 创建HashMap
    // 方法1
    let mut hashmap: HashMap<String, i32> = HashMap::new();
    hashmap.insert(String::from("Blue"), 32);
    hashmap.insert(String::from("Red"), 10);
    // 方法2[提倡]
    let keys = vec![String::from("Blue"), String::from("Red")];
    let values = vec![32, 10];
    let scores: HashMap<_, _> = keys.iter().zip(values.iter()).collect();
    println!("{:?}", scores);

    // 读取HashMap
    let blue = String::from("Blue");
    let blue = scores.get(&blue);
    // 方法1
    if let Some(color) = blue {
        println!("blue => {}", color);
    }
    // 方法2
    let yellow = String::from("yellow");
    let yellow = scores.get(&yellow);
    match yellow {
        Some(color) => println!("yellow => {}", color),
        _ => println!("None"),
    }

    // 遍历HashMap
    for (key, val) in &scores {
        println!("key=val <=> {}={}", key, val);
    }

    // 更新HashMap
    let mut hashmap1: HashMap<String, String> = HashMap::new();
    // 直接插入
    hashmap1.insert(String::from("color"), String::from("yellow"));
    // 键不存在的时候，才插入
    hashmap1
        .entry(String::from("age"))
        .or_insert(String::from("10"));
    // 键存在的时候，直接覆盖之前的值
    let text = "hello world";
    let mut text_map = HashMap::new();

    for word in text.split_whitespace() {
        let count = text_map.entry(word).or_insert(0);
        *count += 1;
    }
    println!("{:?}", text_map);
}
