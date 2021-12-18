describe('Arrays ', () => {
  let shoppingList: string[]
  beforeAll(() => {
    shoppingList = ['diapers', 'kleenex', 'trash bags', 'paper towels', 'milk']
  })
  test('the shopping list has milk on arrays', () => {
    expect(shoppingList).toContain('milk')
  })

  test('the shopping list has milk on sets', () => {
    expect(new Set(shoppingList)).toContain('milk')
  })
})
