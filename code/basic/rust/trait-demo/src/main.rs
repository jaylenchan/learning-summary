#[derive(Debug)]
pub struct Student {
    name: String,
    age: u32,
}

pub struct Teacher {
    name: String,
    age: u32,
    subject: String,
}

fn main() {
    // 特征trait： 特征用于定义不同类型共享的功能，类似于接口
    // 【1】可以通过trait以抽象的方式定义共享的行为
    // 【2】可以使用trait bounds指定范型是任何拥有特定行为的类型

    // 定义trait
    // pub trait GetInformation {
    //     fn get_name(&self) -> &str;
    //     fn get_age(&self) -> &u32;
    // }

    trait SchoolName {
        fn get_school_name(&self) -> String {
            String::from("HongXing")
        }
    }

    // // 实现trait
    // impl GetInformation for Student {
    //     fn get_name(&self) -> &str {
    //         &self.name
    //     }

    //     fn get_age(&self) -> &u32 {
    //         &self.age
    //     }
    // }

    // impl GetInformation for Teacher {
    //     fn get_name(&self) -> &str {
    //         &self.name
    //     }

    //     fn get_age(&self) -> &u32 {
    //         &self.age
    //     }
    // }

    impl SchoolName for Student {}
    impl SchoolName for Teacher {
        fn get_school_name(&self) -> String {
            String::from("GuangMing")
        }
    }

    // 创造实例
    let student = Student {
        name: String::from("xiaohuang"),
        age: 12,
    };

    let teacher = Teacher {
        name: "miss wang".to_string(),
        age: 32,
        subject: String::from("math"),
    };

    let student_name = student.get_name();
    let teacher_name = teacher.get_name();
    let student_age = student.get_age();
    let teacher_age = teacher.get_age();

    println!("student => name={}, age={}", student_name, student_age);
    println!("teacher => name={}, age={}", teacher_name, teacher_age);

    // trait作为参数 [用来实现某些类型必须拥有指定trait，然后才能过调用某个函数]。限制某个函数的使用对象
    // fn print_information(item: &impl GetInformation) {
    //     println!("name = {}", item.get_name());
    //     println!("age = {}", item.get_age());
    // }

    // print_information(&student);
    // print_information(&teacher);

    // trait 默认实现
    fn print_school(item: &impl SchoolName) {
        println!("school => {}", item.get_school_name());
    }
    print_school(&student);
    print_school(&teacher);

    // trait bound
    // trait bound写print_school
    fn print_school_with_trait_bound<T: SchoolName>(item: &T) {
        println!("school => {}", item.get_school_name());
    }

    print_school_with_trait_bound(&student);
    print_school_with_trait_bound(&teacher);

    // trait bound
    trait GetName {
        fn get_name(&self) -> &str;
    }

    trait GetAge {
        fn get_age(&self) -> &u32;
    }

    impl GetName for Student {
        fn get_name(&self) -> &str {
            &self.name
        }
    }

    impl GetName for Teacher {
        fn get_name(&self) -> &str {
            &self.name
        }
    }

    impl GetAge for Student {
        fn get_age(&self) -> &u32 {
            &self.age
        }
    }
    impl GetAge for Teacher {
        fn get_age(&self) -> &u32 {
            &self.age
        }
    }
    // trait_bound 写法1
    fn print_information_with_trait_bound<T: GetName + GetAge>(item: &T) {
        println!("name = {}", item.get_name());
        println!("age = {}", item.get_age());
    }

    // trait_bound写法2
    fn print_information_with_trait_bound_2<T>(item: &T)
    where
        T: GetName + GetAge,
    {
        println!("name = {}", item.get_name());
        println!("age = {}", item.get_age());
    }

    print_information_with_trait_bound(&student);
    print_information_with_trait_bound(&teacher);

    print_information_with_trait_bound_2(&student);
    print_information_with_trait_bound_2(&teacher);

    // 返回的值符合某个特征,但是必须是同一个类型，而不能是符合某个特征的两种不同类型！！

    fn return_miss_impl() -> impl GetName {
        Student {
            name: String::from("xiaoli"),
            age: 32,
        }
    }

    let _xiaoli = return_miss_impl();

    // 使用trait bound 有条件的实现方法
    
}
