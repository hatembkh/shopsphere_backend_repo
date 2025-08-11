const crypto = require('crypto')


const verifySignedUrl = (req, res, next) => {
    const { filename } = req.params
    const { timestamp, signature } = req.query
    
    // Verify URL freshness (5 minutes max)
    const age = (Date.now() - parseInt(timestamp)) / 1000
    if (age > 300) {
        return res.status(401).json({ message: 'URL expired' })
    }

    // Verify signature
    const payload = `${filename}${timestamp}`
    const expectedSignature = crypto
        .createHmac('sha256', process.env.SECRET_KEY)
        .update(payload)
        .digest('hex')

    if (!crypto.timingSafeEqual(
        Buffer.from(signature),
        Buffer.from(expectedSignature)
    )) {
        return res.status(403).json({ message: 'Invalid signature' })
    }

    next()
}

module.exports = { verifySignedUrl }