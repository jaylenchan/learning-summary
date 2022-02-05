fn main() {
    let args: Vec<String> = env::args().collect();
    // 为啥不直接args[1]取值
    let config = Config::new(&args).unwrap_or_else(|err| {
        println!("Problem parsing arguments: {}", err);
        process::exit(1);
    });
    println!("Searching for {}", config.query);
    println!("In file {}", config.filename);
    if let Err(e) = run(config) {
        println!("Application error: {}", e);
        process::exit(1);
    }
}
