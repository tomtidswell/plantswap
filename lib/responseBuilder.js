module.exports = function responseBuilder(response, status, payload){
  const message = {}
  switch(status){
    case 200: message.text = 'Ok, we found what you wanted'
      break
    case 201: message.text = 'Sorted, we made that for you'
      break
    case 202: message.text = 'Sure thing, consider it done'
      break
    case 204: message.text = 'Nothing left but an empty plantpot'
      break
    case 401: message.text = 'Youre not allowed in - bugger off'
      break
    case 404: message.text = 'Cant find that plant for you'
      break
    case 501: message.text = 'OMG, give me a break! I havent coded that yet'
      break
    default:
  }
  message.image = `https://httpstatusdogs.com/${status}`
  return response.status(status).json({ data: payload, message })
}
