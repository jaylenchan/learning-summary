pub mod animal;

#[cfg(test)]
mod tests {
    use super::animal::{cat, dog};
    #[test]
    fn is_dog() {
        assert_eq!(true, dog::is_dog());
    }

    #[test]
    fn is_cat() {
        assert_eq!(true, cat::is_cat());
    }
}
