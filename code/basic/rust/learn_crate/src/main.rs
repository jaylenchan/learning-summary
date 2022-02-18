mod factory {
    pub mod produce_refrigerator {
        pub fn produce_re() {
            println!("produce_re")
        }
    }
    pub mod produce_washing_machine {
        pub fn produce_wash() {
            println!("produce washing")
        }
    }
}

use factory::{produce_refrigerator, produce_washing_machine};

fn main() {
    produce_refrigerator::produce_re();
    produce_washing_machine::produce_wash();
}
