mod msg_pass;

use msg_pass::{mpsc, use_mpsc};
use std::thread;
use std::time::Duration;

fn main() {
    // let handle = thread::spawn(|| {
    //     for i in 1..10 {
    //         println!("num = {}", i);
    //         thread::sleep(Duration::from_millis(1));
    //     }
    // });
    // handle.join().unwrap();

    // for i in 1..5 {
    //     println!("hi number {} from the main thread!", i);
    //     thread::sleep(Duration::from_millis(1));
    // }
    // let vec = vec![1, 2, 3];
    // let handle = thread::spawn(move || {
    //     println!("vec = {:?}", vec);
    // });
    // handle.join().unwrap();

    // let (tx, rx) = use_mpsc::<String>();

    // thread::spawn(move || {
    //     let val = String::from("hi");
    //     tx.send(val).unwrap();
    // });

    // let received = rx.recv().unwrap();
    // println!("received => {}", received);
    // let (tx, rx) = use_mpsc::<i32>();

    // thread::spawn(move || {
    //     let vec = vec![1, 2, 3];

    //     for val in vec {
    //         tx.send(val).unwrap();
    //     }
    // });

    // for received in rx {
    //     println!("recv => {}", received);
    // }

    let (tx, rx) = use_mpsc::<&str>();

    let tx1 = mpsc::Sender::clone(&tx);

    thread::spawn(move || {
        let vec = vec!["I", "Love", "You"];
        for val in vec {
            tx.send(val).unwrap();
        }
    });

    thread::spawn(move || {
        let vec = vec!["Sy", "Baby", "Love"];
        for val in vec {
            tx1.send(val).unwrap();
        }
    });

    for recv in rx {
        println!("recv => {}", recv);
    }
}
