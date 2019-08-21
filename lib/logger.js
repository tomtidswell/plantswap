//custom logging function
function logRequests(req,res,next){
  console.log(`${req.method} request to ${req.url}`)
  next()
}

module.exports = {
  logRequests
}
