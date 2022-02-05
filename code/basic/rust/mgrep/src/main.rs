use mgrep::Config;
use std::{env, process};

fn main() {
    let args: Vec<String> = env::args().collect();
    // 为啥不直接args[1]取值
    let config = Config::new(&args).unwrap_or_else(|err| {
        process::exit(1);
    });
    if let Err(e) = mgrep::run(config) {
        process::exit(1);
    }
}
