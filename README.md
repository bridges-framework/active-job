# Active Job

A job queue abstraction for node.js

Inspired heavily by [Active Job for Ruby on Rails](http://edgeguides.rubyonrails.org/active_job_basics.html)

## Installation

````
npm install --save active-job
````

## Usage

Defining the Job class
````
import ActiveJob from 'active-job'

class SendGoldJob extends ActiveJob.Base {
  get type()   { return 'send-gold' }

  perform(params) {
    console.log('send some gold with params', params)
  }
}
````

Enqueuing a Job
````
var params = {
  amount: 12,
  currency: 'XAG',
  issuer: '~instagold'
}

SendGoldJob.performLater(params).then(jobID => {
  console.log('enqueued job with id', jobID)
})
````
By default a job will be placed on a beanstalkd queue. Beanstalkd is
configurable via the `BEANSTALKD_HOST` and `BEANSTALKD_PORT` libraries


Performing a Job Now
````
SendGoldJob.performNow([1, 'steven'])
````

Performing the Job Later
````
new ActiveJob.Worker(SendGoldJob).start()
````

