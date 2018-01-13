# Sfotipy-nodejs
by [@luixlacrux](https://twitter.com/luixlacrux) and [@_moisesdelacruz](https://twitter.com/_moisesdelacruz)

An web app to listen to music
this is a improved version of [Sfotipy](https://github.com/proyectos-mejorandola/sfotipy)
made in the course of professional frontend in [Platzi](https://platzi.com/frontend/)

## Requirements

### Requires have installed on the computer:
* [Docker](https://www.docker.com/)
* [Docker Compose](https://docs.docker.com/compose/)

### Clone
```sh
$ git clone https://github.com/luixlacrux/sfotipy-nodejs.git

$ cd sfotipy-nodejs
```

### Environment variables

* Create a **.env** file in the project root directory with the next content:
```sh
# database postgresql
POSTGRES_DB=<db_name>
POSTGRES_USER=<db_user>
POSTGRES_PASSWORD=<db_password>

# Facebook auth
F_CLIENT=<facebook_key>
F_SECRET=<facebook_secret>

# Twitter auth
T_CLIENT=<twitter_key>
T_SECRET=<twitter_secret>

# Sfotipy auth
S_CLIENT=<spotify_key>
S_SECRET=<spotify_secret>

# Server port
PORT=80
```

### Build Docker Image (optional)
```sh
$ docker-compose build
```

### Build Project
```sh
$ docker-compose run web npm install
$ docker-compose run web npm run dist
$ docker-compose run web npm run build
```

### Run Project
```sh
$ docker-compose up
```

### Stop Project
```sh
$ docker-compose stop
# or
$ docker-compose down
```

### Ready
ready now open a new tab browser in url http://localhost/
