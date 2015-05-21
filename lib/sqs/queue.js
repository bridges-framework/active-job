import sqs from './sqs'

const QUEUE_NAME_PREFIX = 'xrp-payouts'

export default class Queue {

  constructor(url) {
    this.url = url
  }

  static list() {
    return new Promise((resolve, reject) => {
      let params = {
        QueueNamePrefix: QUEUE_NAME_PREFIX
      }
      sqs.listQueues(params, function(err, data) {
        if (err) {
          reject(err)
        } else {
          resolve(data)
        }
      });
    })
  }

  static create(name) {
    return new Promise((resolve, reject) => {
      let params = {
        QueueName: name
      };
      sqs.createQueue(params, (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(data)
        }
      })
    })
  }

  static describe(url) {
    return new Promise((resolve, reject) => {
      var params = {
        QueueUrl: url
      };
      sqs.getQueueAttributes(params, function(err, data) {
        if (err) {
          reject(err)
        } else {
          resolve(data)
        }
      })
    })
  }

  receiveMessage() {
    return new Promise((resolve, reject) => {
      var params = {
        QueueUrl: this.url
      }
      sqs.receiveMessage(params, function(err, data) {
        if (err) {
          reject(err)
        } else {
          resolve(data)
        }
      })
    })
  }

  sendMessage(message) {
    return new Promise((resolve, reject) => {
      var params = {
        MessageBody: message,
        QueueUrl: this.url,
        DelaySeconds: 0
      }
      sqs.sendMessage(params, function(err, data) {
        if (err) {
          reject(err)
        } else {
          resolve(data)
        }
      })
    })
  }

  deleteMessage(receiptHandle) {
    return new Promise((resolve, reject) => {
      var params = {
        QueueUrl: this.url,
        ReceiptHandle: receiptHandle
      }
      sqs.deleteMessage(params, function(err, data) {
        if (err) {
          reject(err)
        } else {
          resolve(data)
        }
      })
    })
  }
}


