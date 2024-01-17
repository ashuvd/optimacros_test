import {Args, Command, Flags} from '@oclif/core'
import {AxiosError} from 'axios'
import {encode} from 'js-base64'

import {coreConnection} from '../../axios/core.connection'

export default class UpdateOne extends Command {
  static description = 'Update one car data to server'

  static examples = [
    `$ client cars:update-one 65a6d6957fc1b5953cea66b5 --name=mers500 --user admin --password 12345678
data from server (./src/commands/cars/update-one.ts)
`,
  ]

  static flags = {
    brand: Flags.string({char: 'u', description: 'brand', required: false}),
    name: Flags.string({char: 'u', description: 'name', required: false}),
    password: Flags.string({char: 'p', description: 'Password', required: true}),
    price: Flags.string({char: 'u', description: 'price', required: false}),
    productionYear: Flags.string({char: 'u', description: 'productionYear', required: false}),
    user: Flags.string({char: 'u', description: 'Login', required: true}),
  }

  static args = {
    id: Args.string({description: 'Update car data by id', required: true}),
  }

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(UpdateOne)
    try {
      const response = await coreConnection.put(
        `/cars/${args.id}`,
        {
          brand: flags.brand,
          name: flags.name,
          price: Number(flags.price),
          productionYear: Number(flags.productionYear),
        },
        {
          headers: {
            Authorization: `Basic ${encode(`${flags.user}:${flags.password}`)}`,
          },
        },
      )

      this.log(`${JSON.stringify(response.data)}`)
    } catch (error) {
      if (error instanceof AxiosError) this.log(error.response?.data)
    }
  }
}
