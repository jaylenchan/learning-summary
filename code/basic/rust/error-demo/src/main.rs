use std::fs::File;
use std::io;
use std::io::Read;
use std::io::Write;

fn main() {
    // 错误分两种 可恢复错误和不可恢复错误
    // 可恢复错误：通常代表向用户报告错误和重试操作是合理的情况。比如：没找到相应文件。rust中使用Result<T,E>来实现
    // 不可恢复错误：其实就是bug。比如：尝试越界访问数组。rust中使用panic!来实现

    // panic!("crash here");
    // let f = File::open("hello.txt");
    // let r = match f {
    //     Ok(file) => file,
    //     Err(error) => panic!("error => {:?}", error),
    // };

    // let m = File::open("hello.txt").unwrap();
    // let v = File::open("hello.txt").expect("no such file or directory");

    // 错误传播：指的是编写一个函数的时候，这个函数可能失败的。此时除了在函数中处理错误之外，还可以将错误传递给调用者，让调用者去决定如何处理。

    fn read_username_from_file(str: &str) -> Result<String, io::Error> {
        let mut f = File::open("hello.txt")?;
        // let mut f = match f {
        //     Ok(f) => f,
        //     Err(error) => return Err(error),
        // };

        let mut s = String::new();
        // match f.read_to_string(&mut s) {
        //     Ok(_) => Ok(s),
        //     Err(error) => Err(error),
        // }
        f.read_to_string(&mut s)?;
        Ok(s)
    }

    let r = read_username_from_file("hello.txt");
    if let Err(err) = r {
        println!("val {:?}", err);
    }

    // 代码测试的时候使用panic!直接报错
    // 代码预料错误处理就用Result<T,E>传播错误出来给程序员做处理
    // 实际中项目用Result<T,E>
}
