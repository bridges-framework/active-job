# Active Job

A job queue abstraction for node.js

## Installation

````
npm install --save active-job
````

## Usage

Defining the Job class
````
import {Job} from 'active-job'

class SendGoldJob extends Job {
  queue()   { return 'send-gold' }
  adapter() { return 'beanstalkd' } // default to 'inline'

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

SendGoldJob.performLater(params)

SendGoldJob.set({ wait: 24 })).performLater(params)
````

Performing the Job Later
````
new ActiveJob.Worker(SendGoldJob).start()
````

