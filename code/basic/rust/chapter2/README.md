```rust
use std::collections::HashMap;
fn main () {
  let mut reviews: HashMap<String, String> = HashMap::new();

    reviews.insert(String::from("color"), String::from("red"));
    reviews.insert(String::from("age"), String::from("1"));

    println!("{:#?}", reviews);

    let book = "color";
    println!("\nReview for \'{}\': {:?}", book, reviews.get(book));

    let obsolete: &str = "Ancient Roman History";
    println!("\n'{}\' removed.", obsolete);
    reviews.remove(obsolete);

    // Confirm book review removed
    println!("\nReview for \'{}\': {:?}", obsolete, reviews.get(obsolete));
}
```