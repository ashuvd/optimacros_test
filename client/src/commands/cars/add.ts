import {Command, Flags} from '@oclif/core'
import {AxiosError} from 'axios'
import {encode} from 'js-base64'

import {coreConnection} from '../../axios/core.connection'

export default class Add extends Command {
  static description = 'Add car data to server'

  static examples = [
    `$ client cars:add --name=mers500 --brand=audi --productionYear=1987 --price=42 --user admin --password 12345678
data from server (./src/commands/cars/add.ts)
`,
  ]

  static flags = {
    brand: Flags.string({char: 'u', description: 'brand', required: true}),
    name: Flags.string({char: 'u', description: 'name', required: true}),
    password: Flags.string({char: 'p', description: 'Password', required: true}),
    price: Flags.string({char: 'u', description: 'price', required: true}),
    productionYear: Flags.string({char: 'u', description: 'productionYear', required: true}),
    user: Flags.string({char: 'u', description: 'Login', required: true}),
  }

  static args = {}

  public async run(): Promise<void> {
    const {flags} = await this.parse(Add)
    try {
      const response = await coreConnection.post(
        '/cars',
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
