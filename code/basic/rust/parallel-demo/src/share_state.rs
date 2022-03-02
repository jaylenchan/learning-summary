use std::sync::Mutex;

pub fn use_mutex<T>(m: T) -> Mutex<T> {
  let m = Mutex::new(m);

  m
}
