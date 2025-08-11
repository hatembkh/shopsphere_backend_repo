const crypto = require('crypto')

const generateSignedUrl = (filename) => {
    const timestamp = Date.now().toString()
    const payload = `${filename}${timestamp}`
    const signature = crypto
        .createHmac('sha256', process.env.SECRET_KEY)
        .update(payload)
        .digest('hex')

    return `/api/images/${filename}?timestamp=${timestamp}&signature=${signature}`
}

module.exports = { generateSignedUrl }