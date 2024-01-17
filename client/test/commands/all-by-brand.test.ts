import {expect, test} from '@oclif/test'

describe('all-by-brand', () => {
  test
  .stdout()
  .command(['all-by-brand'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['all-by-brand', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
