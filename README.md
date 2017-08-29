# Simple Server Render

Without using any popular framework or module to achieve server rendering and routing for practice.

## Prerequisites

Install `yarn` and dependencies of this repo.

```
brew install yarn && yarn
```

## Usage

### Static HTML Export

This is a way to create standalone static app without node server.

```
yarn run build
```

### Launch Web Server

#### server rendering

Render plain html for server rendering, and use [expressjs/express](https://expressjs.com/) and [janl/mustache.js](https://github.com/janl/mustache.js/) as web server and template engine.

```
yarn run server
```

#### client rendering

Export static files for client rendering, and use [zeit/serve](https://github.com/zeit/serve) as web server.

```
yarn run client
```
