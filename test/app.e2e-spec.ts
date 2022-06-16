import * as Newman from 'newman'

it('Postman test', async () => {
  const summary = await new Promise<Newman.NewmanRunSummary>(
    (resolve, reject) => {
      Newman.run(
        {
          collection: './test/wallock-server.postman_collection.json',
          reporters: 'cli'
        },
        (error, summary) => {
          if (error) reject(error)
          else resolve(summary)
        }
      )
    }
  )
  if (summary.run.failures.length) {
    throw new Error(
      'Postman run completed with error(s). ' +
        'View the summary above for more details.'
    )
  }
})
