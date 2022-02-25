/*! lib包是world_hello二进制包的依赖包，
里面包含了compute等有用模块 */

fn main() {
    // 代码注释 - 二线
    println!("代码注释");
}

/// 文档注释 - 单行
/**
 * 文档注释 - 多行
 */
fn add(num: i32) -> i32 {
    num + 1
}

/**`add_two` 将指定值加2
```
let arg = 5;
let answer = my_crate::add_two(arg);

assert_eq!(7, answer);
```
*/
fn add_two(num: i32) -> i32 {
    num + 1
}
