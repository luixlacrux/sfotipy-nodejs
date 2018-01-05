# Sfotipy-nodejs
by [@luixlacrux](https://twitter.com/luixlacrux) and [@_moisesdelacruz](https://twitter.com/_moisesdelacruz)

An web app to listen to music
this is a improved version of [Sfotipy](https://github.com/proyectos-mejorandola/sfotipy)
made in the course of professional frontend in [Platzi](https://platzi.com/frontend/)

## Requirements
##### Requires have installed on the computer:
* [NodeJS](https://nodejs.org/en/)
* [Postgresql](https://www.postgresql.org/)
* [Redis](http://redis.io/)

## Install gulp globally:
If you have previously installed a version of gulp globally, please run npm rm --global gulp to make sure your old version doesn't collide with gulp-cli.
```
$ npm install -g gulp-cli
```
for more info visit the docs of [Gulp](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md)

## Install nodemon globally (optional):
Needed for server to development
```
$ npm install -g nodemon
```
## Clone
```
$ git clone https://github.com/luixlacrux/sfotipy-nodejs.git
$ cd sfotipy-nodejs
```

## Environment variables
```sh
  # database postgresql
  NAME_DB
  PASS_DB
  USER_DB

  # Facebook auth
  F_CLIENT
  F_SECRET

  # Twitter auth
  T_CLIENT
  T_SECRET

  # Sfotipy auth
  S_CLIENT
  S_SECRET
```
#### NOTE: If you wish, you can also set the environment variable  
## Install dependecies
```
$ npm install
```
### Generate the builds and start server
```
$ npm start
```
### Ready
ready now open a new tab browser in url http://localhost:3000
