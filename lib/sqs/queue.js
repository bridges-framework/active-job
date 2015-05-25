import sqs from './sqs'

export default class Queue {

  constructor(url) {
    this.url = url
  }

  static findOrCreate(queueName) {
    return this.find(queueName).catch(error => {
      return this.create(queueName)
    })
  }

  static find(queueName) {
    return new Promise((resolve, reject) => {
      sqs.getQueueUrl({ QueueName: queueName }, (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(new this(data.QueueUrl))
        }
      })
    })
  }

  static create(queueName) {
    return new Promise((resolve, reject) => {
      sqs.createQueue({ QueueName: queueName }, (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(new this(data.QueueUrl))
        }
      })
    })
  }

  static list() {
    return new Promise((resolve, reject) => {
      sqs.listQueues({}, function(err, data) {
        if (err) {
          reject(err)
        } else {
          resolve(data)
        }
      });
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


