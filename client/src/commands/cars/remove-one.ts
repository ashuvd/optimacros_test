import {Args, Command, Flags} from '@oclif/core'
import {AxiosError} from 'axios'
import {encode} from 'js-base64'

import {coreConnection} from '../../axios/core.connection'

export default class RemoveOne extends Command {
  static description = 'Remove one car'

  static examples = [
    `$ client cars:remove-one 65a6d6957fc1b5953cea66b5 --user admin --password 12345678
data from server (./src/commands/cars/remove-one.ts)
`,
  ]

  static flags = {
    password: Flags.string({char: 'p', description: 'Password', required: true}),
    user: Flags.string({char: 'u', description: 'Login', required: true}),
  }

  static args = {
    id: Args.string({description: 'Remove car by id', required: true}),
  }

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(RemoveOne)

    try {
      const response = await coreConnection.delete(`/cars/${args.id}`, {
        headers: {
          Authorization: `Basic ${encode(`${flags.user}:${flags.password}`)}`,
        },
      })

      this.log(`${JSON.stringify(response.data)}`)
    } catch (error) {
      if (error instanceof AxiosError) this.log(error.response?.data)
    }
  }
}
