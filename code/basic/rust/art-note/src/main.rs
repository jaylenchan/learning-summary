use art_note::kinds::PrimaryColor;
use art_note::utils::mix;

fn main() {
    let blue = PrimaryColor::Blue;
    let yellow = PrimaryColor::Yellow;
    println!("{:?}", mix(blue, yellow));
}
