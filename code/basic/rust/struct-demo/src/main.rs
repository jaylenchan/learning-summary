fn main() {
    struct User {
        username: String,
        email: String,
        sign_in_count: u64,
        active: bool,
    }

    // let mut user = User {
    //     username: String::from("csy"),
    //     email: String::from("csy@hotmail.com"),
    //     sign_in_count: 10002,
    //     active: false,
    // };

    // println!("the value of username {}", user.username);
    // user.email = String::from("cjl@hotmail.com");
    // println!("the value of email {}", user.email);

    // fn create_user(username: String, email: String) -> User {
    //     return User {
    //         username,
    //         email,
    //         sign_in_count: 20220124,
    //         active: true,
    //     };
    // }

    // let user = create_user(String::from("user"), String::from("email"));
    // println!("the value of username {}", user.username);

    // let user1 = User {
    //     active: false,
    //     sign_in_count: 20220124,
    //     ..user
    // };
    // println!("the value of user1.username {}", user1.username)

    // 元祖结构体
    struct Color(i32, i32, i32);
    struct Point(i32, i32, i32);

    let color = Color(5, 5, 5);
    let point = Point(5, 5, 5);

    println!("the value of color {}", color.0);
    println!("the value of point {}", point.0);
}
