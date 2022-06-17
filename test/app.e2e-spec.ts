import * as Newman from 'newman'
import * as Pm2 from 'pm2'
import Axios from 'axios'

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
}, 30_000)

async function startTestApp() {
  await startServerProcess()
  console.info('Server process has started')

  const initStartTime = Date.now()
  await waitForServerInit()
  const initTimeInSeconds = (Date.now() - initStartTime) / 1_000
  console.info(`Server took ${initTimeInSeconds} seconds to init`)
}

async function startServerProcess() {
  return new Promise<Pm2.Proc>((resolve, reject) => {
    Pm2.start(
      {
        name: 'app',
        script: 'npm run start:dev'
      },
      (err, proc) => {
        if (err) {
          reject(err)
        } else {
          resolve(proc)
        }
      }
    )
  })
}

async function waitForServerInit() {
  return new Promise<void>((resolve, _reject) => {
    const interval = setInterval(() => {
      Axios.get('http://localhost:3000')
        .then(() => {
          clearInterval(interval)
          resolve()
        })
        .catch(_error => {})
    }, 1_000)
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
      console.info('Server process has stopped')
      if (err) reject(err)
      else resolve(proc)
    })
  })
}
