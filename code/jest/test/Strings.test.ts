describe('Strings', () => {
  test('there is no I in team', () => {
    expect('team').not.toMatch(/I/)
  })

  test('there is a "stop" in Christoph', () => {
    expect('Christoph').toMatch(/stop/)
  })
})
