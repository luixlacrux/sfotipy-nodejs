# Sfotipy-nodejs
by [@luixlacrux](https://twitter.com/luixlacrux) and [@moiseslacruz161](https://twitter.com/moiseslacruz161)

An web app to listen to music
this is a improved version of [Sfotipy](https://github.com/proyectos-mejorandola/sfotipy)
made in the course of professional frontend in [Platzi](https://platzi.com/frontend/)

## Requirements
##### Requires have installed on the computer:
* [NodeJS](https://nodejs.org/en/)
* [Postgresql](https://www.postgresql.org/)
* [Redis](http://redis.io/)

## Clone
```
$ git clone https://github.com/luixlacrux/sfotipy-nodejs.git
$ cd sfotipy-nodejs
```
## Set the credentials for your database 
Open file src/server/config/database.js and edit the following lines
```js
const NAME = process.env.NAME_DB || <<< YOUR_DATABASE_NAME >>>
const PASS = process.env.PASS_DB || <<< YOUR_DATABASE_PASSWORD >>>
const USER = process.env.USER_DB || <<< YOUR_DATABASE_USER >>>
```
#### NOTE: If you wish, you can also set the environment variable  
## Install dependecies
```
$ npm install
```
### Generate the builds
```
$ npm run build && npm run dist
```
### Start node server
```
$ npm run server
```
### Ready
ready now open a new tab browser in url http://localhost:3000