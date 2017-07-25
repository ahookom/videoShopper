
## VideoShopper requires node >= 6.7.0 and <8.0.0

## VideoShopper

VideoShopper is a complete single-page e-commerce site that uses a single Express server in Node to serve up both the frontend resources and the database data. It includes Sequelize database models that are currently set up to work with a Postgres SQL server running on the default port of localhost:5432. It uses React and Redux (and React-Redux) on the front-end, all the JavaScript for which is bundled using Webpack.

The VideoShopper site includes the following views:

* A home view with a welcome banner and product category cards
* A products view displaying animated products cards that can be sorted by category.
* A product view that offers details and reviews for a specific product.
* An admin panel that displays order information (located at '/admin' , log in as 'god@example.com' with the password '1234' to take a look)
* A cart view that provides the user with a form to place an order
* A cart implemented in window.localStorage that works regardless of sign-in/registration and persists after the window has closed.

## To get the codebase:

* `git clone https://github.com/ahookom/videoShopper.git`


## To start it up:

Short and sweet:

```sh
npm install
npm run dev
```

The `dev` script sets `NODE_ENV` to "development", runs the build script in watch mode, and
starts the server with `nodemon`. Build vs server logs are separated by a prefix. If you prefer
to run the server and build processes separately, you can instead do:

```sh
npm run start-dev
```

```sh
npm run build-dev
```

In two separate terminals.

You can also use the vanilla `npm start`, but it is meant for production.

## What's in the box

`/app` has the React/Redux setup. `main.jsx` is the entry point.

`/db` has Sequelize models and database setup. It'll create the database for you if it doesn't exist,
assuming you have postgres already installed and running.

`/server` has the Express server and routes. `start.js` is the entry point.

`/bin` has a few scripts, including a heroku deployment script.

`/public` is where you'll find various front-end resources

## Quick Heroku deployment

1. Set up the [Heroku command line tools](https://devcenter.heroku.com/articles/heroku-cli) and install [Yarn](https://yarnpkg.com/en/) if you haven't already (`npm install -g yarn`)
2. `heroku login`
3. Add a git remote for heroku:
  - **If you're creating a new app...**
    1. `heroku create` or `heroku create your-app-name` if you have a name in mind.
    2. `heroku addons:create heroku-postgresql:hobby-dev` to add postgres
    3. `npm run deploy-heroku`. This will create a new branch and compile and commit your frontend JS to it, then push that branch to Heroku.
    4. `heroku run npm run seed` to seed the database

  - **If you already have a Heroku app...**
    1.  `heroku git:remote your-app-name` You'll need to be a collaborator on the app.

Afterwards,
  - *To deploy:* `npm run deploy-heroku`
  - *To re-seed:* `heroku run npm run seed`
