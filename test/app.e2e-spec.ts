import * as Newman from 'newman'
import * as Pm2 from 'pm2'

async function startTestApp() {
  return new Promise<Pm2.Proc>((resolve, reject) => {
    Pm2.start(
      {
        name: 'app',
        script: 'npm run start:dev'
      },
      (err, proc) => {
        if (err) reject(err)
        else resolve(proc)
      }
    )
  })
}

async function runPostmanCollection(): Promise<Newman.NewmanRunSummary> {
  return new Promise<Newman.NewmanRunSummary>((resolve, reject) => {
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
  })
}

async function stopTestApp() {
  return new Promise<Pm2.Proc>((resolve, reject) => {
    Pm2.delete('app', (err, proc) => {
      Pm2.disconnect()
      if (err) reject(err)
      else resolve(proc)
    })
  })
}

it('Postman test', async () => {
  try {
    await startTestApp()

    const summary = await runPostmanCollection()

    await stopTestApp()

    if (summary.run.failures.length) {
      throw new Error(
        'Postman finished with error(s). View the summary above for details.'
      )
    }
  } catch (error) {
    throw error
  }
})
