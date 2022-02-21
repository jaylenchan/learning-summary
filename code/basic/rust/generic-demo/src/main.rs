fn main() {
    #[derive(Debug)]
    struct Point<T> {
        x: T,
        y: T,
    }

    impl<T> Point<T> {
        fn get_x(&self) -> &T {
            &self.x
        }

        fn get_y(&self) -> &T {
            &self.y
        }
    }

    let point_integer = Point { x: 1, y: 1 };
    let point_float = Point { x: 1.0, y: 1.0 };
    let point_string = Point { x: "x", y: "y" };

    println!("integer => {:?}", point_integer);
    println!("float => {:?}", point_float);
    println!("string => {:?}", point_string);

    let x = point_integer.get_x();
    let y = point_integer.get_y();
    println!("{}-{}", x, y);
}
