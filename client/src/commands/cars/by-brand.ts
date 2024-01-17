import {Args, Command, Flags} from '@oclif/core'
import {AxiosError} from 'axios'
import {encode} from 'js-base64'

import {coreConnection} from '../../axios/core.connection'

export default class ByBrand extends Command {
  static description = 'Get all cars data by brand from server'

  static examples = [
    `$ client cars:by-brand audi --user admin --password 12345678
data from server (./src/commands/cars/by-brand.ts)
`,
  ]

  static flags = {
    password: Flags.string({char: 'p', description: 'Password', required: true}),
    user: Flags.string({char: 'u', description: 'Login', required: true}),
  }

  static args = {
    brand: Args.string({description: 'Get all cars data by brand', required: true}),
  }

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(ByBrand)
    try {
      const response = await coreConnection.get(`/cars/brand/${args.brand}`, {
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
