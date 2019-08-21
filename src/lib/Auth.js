
class Auth {

  static setToken(data){
    console.log(data)
    localStorage.setItem('plantswap.portfolio', JSON.stringify(data) )
  }


  static isToken(){
    return !!localStorage.getItem('plantswap.portfolio')
  }


  static deleteToken(){

  }


  static getToken(){
    const token = localStorage.getItem('plantswap.portfolio')
    //console.log('Full token', token)
    if(!token) return null
    return JSON.parse(token).token
  }

  static getTokenPayload(){
    const token = this.getToken()
    //console.log('Token', token)
    if(!token) return false
    const parts = token.split('.')
    if(parts.length < 3) return false
    //console.log('raw token', parts)
    //console.log('token data', atob(parts[1]))
    return JSON.parse(atob(parts[1]))
  }

  static buildAuthHeader(){
    return { headers: { Authorization: this.getToken() }}
  }


  static isAuthenticated(){
    const payload = this.getTokenPayload()
    const now = Math.round(Date.now() / 1000)
    return now < payload.exp
  }

  static getUser(){
    return this.getTokenPayload().sub
  }

  static logOut(){
    localStorage.removeItem('plantswap.portfolio')
  }
}


export default Auth
