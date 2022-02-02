#[derive(PartialEq, Debug)]
enum Age {
    NewCar,
    UsedCar,
}

#[derive(PartialEq, Debug)]
enum Transmission {
    Manual,
    SemiAuto,
    Automatic,
}

#[derive(PartialEq, Debug)]
struct Car {
    color: String,
    motor: Transmission,
    roof: bool,
    age: (Age, u32),
}

fn car_quality(miles: u32) -> (Age, u32) {
    if miles > 0 {
        (Age::NewCar, 0)
    } else {
        (Age::UsedCar, 0)
    }
}

fn car_factory(color: String, motor: Transmission, roof: bool, miles: u32) -> Car {
    let quality = car_quality(miles);

    if quality == (Age::NewCar, 0) {
        if roof == true {
            println!(
                "Prepare a used car: {:?}, {}, Hard top, {} miles\n",
                motor, color, miles
            );
        }
        Car {
            color: color,
            motor: motor,
            roof: roof,
            age: car_quality(miles),
        }
    } else {
        Car {
            color: color,
            motor: motor,
            roof: roof,
            age: car_quality(miles),
        }
    }
}

fn main() {
    let colors = ["blue", "green", "red", "silver"];
    let mut car = Car {
        color: String::from("red"),
        motor: Transmission::Automatic,
        roof: true,
        age: (Age::NewCar, 10),
    };
    let mut engine = Transmission::Manual;

    // Car order #1: New, Manual, Hard top
    car = car_factory(colors[0].to_string(), engine, true, 0);
    println!(
        "Car order 1: {:?}, Hard top = {}, {:?}, {}, {} miles",
        car.age.0, car.roof, car.motor, car.color, car.age.1
    );

    // Car order #2: Used, Semi-automatic, Convertible
    engine = Transmission::SemiAuto;
    car = car_factory(colors[1].to_string(), engine, false, 100);
    println!(
        "Car order 2: {:?}, Hard top = {}, {:?}, {}, {} miles",
        car.age.0, car.roof, car.motor, car.color, car.age.1
    );

    // Car order #3: Used, Automatic, Hard top
    engine = Transmission::Automatic;
    car = car_factory(colors[2].to_string(), engine, true, 200);
    println!(
        "Car order 3: {:?}, Hard top = {}, {:?}, {}, {} miles",
        car.age.0, car.roof, car.motor, car.color, car.age.1
    );
}
