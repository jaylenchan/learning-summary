// struct Person {
//     first: String,
//     middle: Option<String>,
//     last: String,
// }

// fn build_full_name(person: &Person) -> String {
//     let mut full_name = String::new();
//     full_name.push_str(&person.first);
//     full_name.push_str(" ");

//     // TODO: Implement the part of this function that handles the person's middle name.

//     full_name.push_str(&person.last);
//     full_name
// }
// #[derive(Debug)]
// struct DivisionByZeroError;

// fn safe_division(dividend: f64, divisor: f64) -> Result<f64, DivisionByZeroError> {
//     if divisor == 0.0 {
//         Err(DivisionByZeroError)
//     } else {
//         Ok(dividend / divisor)
//     }
// }
use std::fs::File;
use std::io::{Error, Read};
use std::path::PathBuf;

fn read_file_contents(path: PathBuf) -> Result<String, Error> {
    let mut string = String::new();

    // Access a file at a specified path
    // ---------------------------------
    // TODO #1:
    // - Pass variable to `file` variable on success, or
    // - Return from function early if there's an error
    let mut file: File = match File::open(path) {
        Ok(file_handle) => todo!("Pass variable to `file` variable on success"),
        Err(io_error) => todo!("Return from function early if there's an error"),
    };

    // Read file contents into `String` variable with `read_to_string`
    // ---------------------------------
    // Success path is already filled in
    // TODO #2: Return from function early if there's an error
    match file.read_to_string(&mut string) {
        Ok(_) => (),
        Err(io_error) => todo!("Return from function early if there's an error"),
    };

    // TODO #3: Return `string` variable as expected by function signature
    todo!("Return `string` variable")
}

fn main() {
    // let john = Person {
    //     first: String::from("James"),
    //     middle: Some(String::from("Oliver")),
    //     last: String::from("Smith"),
    // };
    // assert_eq!(build_full_name(&john), "James Oliver Smith");

    // let alice = Person {
    //     first: String::from("Alice"),
    //     middle: None,
    //     last: String::from("Stevens"),
    // };
    // assert_eq!(build_full_name(&alice), "Alice Stevens");

    // let bob = Person {
    //     first: String::from("Robert"),
    //     middle: Some(String::from("Murdock")),
    //     last: String::from("Jones"),
    // };
    // assert_eq!(build_full_name(&bob), "Robert Murdock Jones");
    // println!("{:?}", safe_division(9.0, 3.0));
    // println!("{:?}", safe_division(4.0, 0.0));
    // println!("{:?}", safe_division(0.0, 2.0));
    if read_file_contents(PathBuf::from("src/main.rs")).is_ok() {
        println!("The program found the main file.");
    }
    if read_file_contents(PathBuf::from("non-existent-file.txt")).is_err() {
        println!("The program reported an error for the file that doesn't exist.");
    }
}
