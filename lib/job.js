import fivebeans from 'fivebeans'

const HOST = process.env.BEANSTALKD_HOST || '127.0.0.1'
const PORT = process.env.BEANSTALKD_PORT || 22122

class Beanstalkd {

  enqueue(queue, params) {
    return new Promise((resolve, reject) => {
      // send job to beanstalkd
      let client = new fivebeans.client(HOST, PORT)

      client.on('connect', () => {
        let payload = JSON.stringify({
          type: queue, payload: params
        })
        client.put(1, 0, 600, payload, (err, jobid) => {
          if (err) {
            reject(err)
          } else {
            resolve(jobid)
          }
          client.quit()
        })
      })
      client.on('error', error => {
        reject(error)
          client.quit()
      })
      client.connect()
    })
  } 
}

export default class Job {
  get type() {
    return 'default'
  }

  work(params, callback) {
    this.perform(params, callback)
  }

  static performNow(params, callback) {
    return new Promise((resolve, reject) => {
      let job = new this()
      if (callback) {
        job.perform(params, callback) 
      } else {
        job.perform(params, function(response) {
          if (response === 'success') {
            resolve() 
          } else {
            reject(response)
          }
        })
      }
    })
  }

  static performLater(params) {
    let job = new this()
    return new Beanstalkd().enqueue(job.type, params)
  }
}

