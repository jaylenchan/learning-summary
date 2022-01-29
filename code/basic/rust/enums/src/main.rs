#[derive(Debug)]
enum PokerSuit {
    Hearts,
    Diamonds,
}

#[derive(Debug)]
enum Book {
    Papery(u32),
    Electronic(String),
}

#[derive(Debug)]
enum Books {
    Papery { index: i32 },
    Electronic { url: String },
}

fn main() {
    let hearts = PokerSuit::Hearts;
    let diamonds = PokerSuit::Diamonds;

    println!("{:#?}", hearts);
    println!("{:#?}", diamonds);

    let book = Book::Papery(1001);
    let ebook = Book::Electronic(String::from("url://..."));
    println!("book {:#?}", book);
    println!("ebook {:#?}", ebook);

    let books = Books::Papery { index: 32 };
    let ebooks = Books::Electronic {
        url: String::from("url://xxx"),
    };

    println!("books {:#?}", books);
    println!("ebooks {:#?}", ebooks);

    match ebooks {
        Books::Papery { index } => {
            println!("book {}", index);
        }
        Books::Electronic { url } => {
            println!("ebook {}", url);
        }
    }
}
