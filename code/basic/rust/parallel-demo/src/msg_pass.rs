pub use std::sync::mpsc::{self, Receiver, Sender};

pub fn use_mpsc<T>() -> (Sender<T>, Receiver<T>) {
  let (tx, rx) = mpsc::channel::<T>();

  (tx, rx)
}
