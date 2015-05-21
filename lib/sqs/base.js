import Job from '../job'
import Queue from './queue'

export default class SQS extends Job {
  get type() {
    return 'default'
  }

  static performLater(params) {
    let job = new this()

    return new Queue(job.type).sendMessage(params)
  }
}

