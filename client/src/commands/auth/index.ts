import {Command, Flags} from '@oclif/core'

import {coreConnection} from '../../axios/core.connection'

export default class Auth extends Command {
  static description = 'User data from server'

  static examples = [
    `$ client auth --user admin --password 12345678
data from server (./src/commands/users/auth.ts)
`,
  ]

  static flags = {
    password: Flags.string({char: 'p', description: 'Password', required: true}),
    user: Flags.string({char: 'u', description: 'Login', required: true}),
  }

  static args = {}

  public async run(): Promise<void> {
    const {flags} = await this.parse(Auth)

    const response = await coreConnection.post('/authentication/login', {
      login: flags.user,
      password: flags.password,
    })

    this.log(`Доброго времени суток ${response.data.firstName} ${response.data.lastName}`)
  }
}
