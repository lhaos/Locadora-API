/**
* Services available for clients/users
**/
const randomString = require('random-string');
const md5 = require('md5');
const {User} = require('./../models/user');

/**
* Logs in the user by generating a token for it and saving it in the database
**/
const login = function(data){
  const hash = md5(data.password);
  return new Promise(function(resolve, reject){
    User.findOne({
      where: {
        email: data.email,
        password: hash
      }
    }).then(function(user){
      if (!user) {
        resolve(null);
      }

      const token = randomString({
        length: 30,
        numeric: true,
        letters: true,
        special: false
      });

      user.update({
          access_token: token
        }).then(function(user) {
        resolve(user);
      }).catch(function(err) {
        reject(err);
      });
    }).catch(function(err) {
      reject(err);
    });
  });
}

/**
* Removes the access token from the database logging out the user
**/
const logout = function(user){
  return new Promise(function(resolve, reject){
    user.update(
      {
        access_token: ''
      }
    ).then(function(user) {
      resolve(true);
    }).catch(function(err) {
      reject(err);
    });
  });
}

/**
* Creates a new user and generates a hash of your password
**/
const create = function(data){
  return new Promise(function(resolve, reject){
    if (!data.name || !data.email || !data.password) {
      reject(new Error('Erro ao criar usuario.'));
    }
    const hash = md5(data.password);
    User.create({
      name: data.name,
      email: data.email,
      password: hash
    }).then(function(user){
      resolve(user);
    }).catch(function(err) {
      reject(err);
    });
  });
}

module.exports = {
  login: login,
  logout: logout,
  create: create
}
