struct Person {
    first: String,
    middle: Option<String>,
    last: String
}

fn build_full_name (person: &Person) {
  let mut full_name = String::new();
  full_name.push_str(&person.first);
  full_name.push_str("");

  full_name.push_str(&person.last);
  full_name;
}

fn main() {}
