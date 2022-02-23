use std::fs;
use std::io::{Read, Write};
use std::net::{TcpListener, TcpStream};

fn handle_client(mut stream: TcpStream) {
    let mut buffer: [u8; 512] = [0; 512];
    stream.read(&mut buffer);
    let content;
    let response;
    let get = b"GET / HTTP/1.1\r\n";
    if buffer.starts_with(get) {
        content = fs::read_to_string("index.html").unwrap();
        response = format!("HTTP/1.1 200 OK\r\n\r\n{}", content);
    } else {
        content = fs::read_to_string("404.html").unwrap();
        response = format!("HTTP/1.1 404 NOT FOUND\r\n\r\n{}", content);
    }
    stream.write(response.as_bytes()).unwrap();
    stream.flush().unwrap();
}

fn main() -> std::io::Result<()> {
    let listener = TcpListener::bind("127.0.0.1:8080")?;

    for stream in listener.incoming() {
        handle_client(stream?);
    }
    Ok(())
}
