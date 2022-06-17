import * as Newman from 'newman'
import * as Pm2 from 'pm2'

const appName = 'wallock-test-app'

it('Postman test', async () => {
  try {
    await new Promise<Pm2.Proc>((resolve, reject) => {
      Pm2.start(
        {
          name: appName,
          script: 'npm run start:dev'
        },
        (err, proc) => {
          if (err) reject(err)
          else resolve(proc)
        }
      )
    })

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

    await new Promise<Pm2.Proc>((resolve, reject) => {
      Pm2.delete(appName, (err, proc) => {
        if (err) reject(err)
        else resolve(proc)
      })
    })

    Pm2.disconnect()

    expect(summary.run.failures.length).toEqual(0)
  } catch (error) {
    throw error
  }
})
