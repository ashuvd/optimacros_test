import {expect, test} from '@oclif/test'

describe('get-cars', () => {
  test
  .stdout()
  .command(['get-cars'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['get-cars', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
