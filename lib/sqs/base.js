import Job from '../job'
import Queue from './queue'

export default class SQS extends Job {
  type() { return 'default' }

  static performLater(params) {
    let job = new this()
    var message

    if (typeof params === 'string') {
      message = params
    } else {
      message = JSON.stringify(params)
    }
    return Queue.findOrCreate(job.type()).then(queue => {
      return queue.sendMessage(message)
    })
  }
}

