
const port = process.env.PORT || 3000
const dbURI = process.env.MONGODB_URI || 'mongodb://localhost/houseplantsv2'
const secret = process.env.SECRET || 'I am now the king of copy and paste'

module.exports = { port, dbURI, secret }
