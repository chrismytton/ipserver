# ipserver

Returns your current ip address in plain text. Can also return json and resolve your current domain names.

## Install

### Source

Clone the code from GitHub and install the dependencies with npm.

    git clone https://github.com/hecticjeff/ipserver
    cd ipserver
    npm install

### Docker

You can also install a trusted build of [hecticjeff/ipserver](https://index.docker.io/u/hecticjeff/ipserver/) from the docker index. The image is built whenever this repository is updated.

    docker pull hecticjeff/ipserver

## Usage

### Source

To start a local server on port 3000 run `app.'s`.

    node app.js
    curl -i localhost:3000

If you want to specify the port to run on, use the `PORT` environment variable.

    PORT=5000 node app.js
    curl -i localhost:5000

### Docker

If you're using docker the container exposes port 80, so you can use it as follows.

    docker run -d -p 3000:80 hecticjeff/ipserver
    curl -i localhost:3000

## Deploy to heroku

This repository can be used on heroku without modification. Create a new heroku app and then push this repository to it.

    heroku create ipserver
    git push heroku master
    curl -iL ipserver.herokuapp.com

## License

MIT
