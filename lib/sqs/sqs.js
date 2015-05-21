import AWS from 'aws-sdk'

AWS.config.loadFromPath('./config.json')

export default new AWS.SQS({apiVersion: '2012-11-05'})

