import uuid from 'uuid'
import fivebeans from 'fivebeans'

const HOST = process.env.BEANSTALKD_HOST || '127.0.0.1'
const PORT = process.env.BEANSTALKD_PORT || 22122

export default class Worker {

  constructor(jobClass) {
    this.jobClass = jobClass
  }

  start() {
    let job = new this.jobClass()
    let handlers = {}
    job.work = job.perform
    handlers[job.type] = job
    let worker = new fivebeans.worker({
      host: HOST,
      port: PORT,
      id: uuid.v4(),
      handlers: handlers
    })
    worker.on('started', message => {
      console.log('worker started')
    })
    worker.start([job.type])
  }
}

