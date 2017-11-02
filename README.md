## Javascript Server + Frontend

Javascript is going through growing pains at an incredible rate. There are new frameworks, transpilers, and frontends daily. The guide shows you how to build a simple web app using javascript on the frontend and backend while still having modern tools.

This is the simple guide I wanted to setup a basic node server for a react app.

Writing a [Javascript server is easy](http://expressjs.com/). So is starting a [React.js App](https://github.com/facebookincubator/create-react-app). Doing both together is a bit harder. Then if you want hot-reloading, ES6, or authentication you have to piece things together.

## Goal

We are building an express server that will tunnel requests to `create-react-app` when in development, and serve compiled assets in production. In addition this server will handle auth and provide an API for the frontend.

During development, most people simply add a `proxy: http://localhost:3000` line to their `create-react-app` `package.json`. We don't want to do that because that means our express server simply becomes an API instead of the actual server like it will be when we build.

## Instructions

To install this example on your computer, clone the repository and install
dependencies.


## Install Server

```bash
git clone git@github.com:Xeoncross/javascript_server_and_frontend.git
cd javascript_server_and_frontend
npm install
```

## Install Frontend

We will be using [create-react-app](https://github.com/facebookincubator/create-react-app), but you can use any client framework that starts a development server for hot-reloading.

```bash
create-react-app client
cd client
npm install
```

Next, replace the `client/src/App.js` file with the following contents so it will show authentication status.

```
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = { user: null };
  }

  componentDidMount() {
    fetch('/api/user', { credentials: 'same-origin' })
      .then(res => res.json())
      .then((res) => {
        this.setState({ user: res.user });
      });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="App-intro" style={{width: '500px', margin:'0 auto'}}>
          <p>To get started, edit <code>src/App.js</code> and save to reload.</p>
          <p><a href="/">back to express server</a></p>
          <pre style={{textAlign: "left", background: "#eee"}}>{JSON.stringify(this.state.user, null, 2)}</pre>
        </div>
      </div>
    );
  }
}

export default App;
```

Whatever client you use, make sure it installs into the `client` folder and that when you `build` the static assets it places them inside `client/build`. You also need it to run on port 3000 or adjust the proxy port in `server/server.js`.

## Run

Now we can start our express server.

```bash
node server/server.js
```

You can also run `npm start` which will run the server with [nodemon](https://nodemon.io/). Nodemon is a utility that will monitor for any changes in your source and automatically restart your server.

Next, start our react app (which is a webpack/babel development server itself)

```bash
cd client
npm start
```

## Deployment

To deploy our server into production we will have `create-react-app` built a complete app bundle.

```bash
cd client
npm build
```

Then push the code to your server and simply start the `server/server.js` and tell it your in production mode.

    NODE_ENV=production node server/server.js

To save you time, the command is already in your `package.json` file. Run your server in production:

    npm run production

## Technologies

- [Express](http://expressjs.com/) 4.x
- [Passport](http://passportjs.org/)
- [create-react-app](https://github.com/facebookincubator/create-react-app)
- [eslint](https://eslint.org/)
- [webpack](https://webpack.js.org/concepts/) hot-reloading
- [babel](https://babeljs.io/) for transpiling new syntax to ES5 javascript (normal javascript)

You can substitute `create-react-app` for [vue-cli](https://github.com/vuejs/vue-cli) or [angular-cli](https://github.com/angular/angular-cli) in this guide. It doesn't matter what frontend you use, each generator/scaffolding should handle webpack + babel for you.

## Linting / Formatting

Developers want to keep their code clean and standardized. The most popular style guide is the [airbnb style guide](https://github.com/airbnb/javascript) which we are using in this project.

You add eslint to a project using NPM

    npm install --save eslint eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react eslint-config-airbnb

Then we create an `.eslintrc` file in our project root so our text-editor or IDE can help us follow the rules.

    {
      "extends": "airbnb"
    }

If you are using Atom / Atom IDE you should install the plugins to read `.eslintrc` files straight from your editor.

    apm install linter linter-eslint prettier-atom

## Reference

### Tutorials and Guides

- https://github.com/verekia/js-stack-from-scratch/blob/master/tutorial/04-webpack-react-hmr.md#readme
- https://github.com/netpoetica/react-router-passport-express-demo-app
- https://github.com/Alex-ray/v2-universal-js-hmr-ssr-react-redux/blob/master/package.json
- https://www.akawebdesign.com/2016/04/08/hot-reloading-react-webpack-express/

### Example Server + Client Projects

- https://github.com/glenjamin/ultimate-hot-reloading-example
- https://github.com/nylas/nylas-mail/blob/master/packages/cloud-api/app.es6
- https://github.com/zeit/next.js
- https://github.com/kriasoft/react-starter-kit
- https://github.com/react-boilerplate/react-boilerplate
- https://github.com/Xeoncross/aqua-sql
- https://github.com/velopert/react-express-hmr-example
- https://github.com/madole/webpack-dev-middleware-boilerplate

### Other Resources

- https://github.com/topics/react
- https://github.com/enaqx/awesome-react
- https://vimeo.com/168648012
