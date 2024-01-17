import {Command, Flags} from '@oclif/core'
import {AxiosError} from 'axios'
import {encode} from 'js-base64'

import {coreConnection} from '../../axios/core.connection'

export default class Cars extends Command {
  static description = 'Get all cars data from server'

  static examples = [
    `$ client cars --user admin --password 12345678
data from server (./src/commands/cars/index.ts)
`,
  ]

  static flags = {
    password: Flags.string({char: 'p', description: 'Password', required: true}),
    user: Flags.string({char: 'u', description: 'Login', required: true}),
  }

  static args = {}

  public async run(): Promise<void> {
    const {flags} = await this.parse(Cars)
    try {
      const response = await coreConnection.get('/cars', {
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
