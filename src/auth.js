import ls from 'local-storage'

class Auth {
  /**
   * Authenticate a user. Save a token string in Local Storage
   *
   * @param {string} token
   */
  static authenticateUser(token) {
    ls('token', token)
  }
  /**
   * Save a user object in Local Storage
   *
   * @param {object} token
   */
  static saveUser({user}) {
    ls('user', user)
  }

  /**
   * Check if a user is authenticated - check if a token is saved in Local Storage
   *
   * @returns {boolean}
   */
  static isUserAuthenticated() {
    return ls('token') !== null
  }

  /**
   * Deauthenticate a user. Remove a token from Local Storage.
   *
   */
  static deauthenticateUser() {
    ls.remove('token')
  }

  /**
   * Get a token value.
   *
   * @returns {string}
   */

  static getToken() {
    return ls('token')
  }

  /**
   * Get a token value.
   *
   * @returns {Object}
   */

  static getUser() {
    return ls('user')
  }
}

export default Auth
