jest.mock('axios')
const axios = require('axios')
import Users from '../src/user'

describe('MockModule', () => {
  test('should fetch users', () => {
    const resp = { data: [{ name: 'Bob' }] }
    axios.get.mockResolvedValue(resp)
    return Users.all().then((data) => expect(data).toEqual([{ name: 'Bob' }]))
  })
})
