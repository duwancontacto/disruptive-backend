# Disruptive Backend

This backend server is written using expressJS

## Setup

- Node

You will need to have node installed. (http://howtonode.org/how-to-install-nodejs). I recommend using `homebrew` if you are on a Mac.

You will then need to install the packages for the project.

```
npm install
```

## Authentication

We are using token based authentication. Here is an example request:

```HTTP
POST /auth/profile HTTP/1.1
Host: localhost:3001
Content-Type: application/json
Authorization: 6fe280b4d61373da82eb47a2c7e54132e168b52f5e64b522
Cache-Control: no-cache

```

## Start server

You can run the server with

```
npm run start
```

or if you are developing use

```
npm run dev
```
