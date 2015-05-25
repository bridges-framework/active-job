import AWS from 'aws-sdk'

AWS.config.region = 'us-west-1'

export default new AWS.SQS({apiVersion: '2012-11-05'})

