import {SQS} from '../lib'

class MyQueue extends SQS.Base {

  type() { return 'xrp-payouts' }

  perform(args, callback) {
    console.log('pay the XRP', args)

    callback('success')
  }
}

MyQueue.performLater({
  amount: 15000,
  recipient: 'r4EwBWxrx5HxYRyisfGzMto3AT8FZiYdWk'
})
.then(console.log)
.catch(console.log)

//new ActiveJob.Worker(MyQueue).start()

