import {Args, Command, Flags} from '@oclif/core'
import {AxiosError} from 'axios'
import {encode} from 'js-base64'

import {coreConnection} from '../../axios/core.connection'

export default class GetOne extends Command {
  static description = 'Get one car data from server'

  static examples = [
    `$ client cars:get-one 65a6d6957fc1b5953cea66b5 --user admin --password 12345678
data from server (./src/commands/cars/get-one.ts)
`,
  ]

  static flags = {
    password: Flags.string({char: 'p', description: 'Password', required: true}),
    user: Flags.string({char: 'u', description: 'Login', required: true}),
  }

  static args = {
    id: Args.string({description: 'Get car data by id', required: true}),
  }

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(GetOne)
    try {
      const response = await coreConnection.get(`/cars/${args.id}`, {
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
