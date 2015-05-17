import ActiveJob from '../dist'

// Make sure to start beanstalkd on port 22122

class SimpleJob extends ActiveJob.Base {
  perform(params, callback) {
    console.log('perform job simply', params)
    callback('success')
  }
}

SimpleJob.performNow([1, 'steven'])

SimpleJob.performLater({ steven: 'zeiler' }).then(jobID => {
  console.info('enqueued job with id', jobID)
})

setTimeout(() => {
  new ActiveJob.Worker(SimpleJob).start()
}, 2000)


