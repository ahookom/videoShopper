'use strict'

const db = require('APP/db')
    , {User, Thing, Favorite, Product, Order, Review, Purchase, Category, Promise} = db
    , {mapValues} = require('lodash')

function seedEverything() {
  const seeded = {
    users: users(),
    things: things(),
    products: products(),
    orders: orders(),
    reviews: reviews(),
    purchases: purchases(),
    categories: categories()
  }

  seeded.favorites = favorites(seeded)

  return Promise.props(seeded)
}

const users = seed(User, {
  god: {
    email: 'god@example.com',
    type: 'admin',
    name: 'So many names',
    shippingAddress: '1600 Pearly Gate Burning Bush, Egypt 66666',
    phoneNumber: '316-316-5555',
    password: '1234',
    githubID: 'strangefrond',
  },
  barack: {
    name: 'Barack Obama',
    email: 'barack@example.gov',
    password: '1234'
  },
})

const purchases = seed(Purchase, {
  firstPurchase: {purchasePrice: 75.01, quantity: 3, product_id: 1, order_id: 1},
  secondPurchase: {purchasePrice: 12.34, quantity: 1, product_id: 2, order_id: 1}
})

const things = seed(Thing, {
  surfing: {name: 'surfing'},
  smiting: {name: 'smiting'},
  puppies: {name: 'puppies'},
})

const products = seed(Product, {
  photos1: {
    name: 'Basic Photo Package',
    description: 'Let us take product photos for your website, increasing traffic and sales! Send us your product and we will send you five professional photos on a white background for your product.',
    price: '99',
    leadTime: 7,
    imageURL: 'https://static1.squarespace.com/static/586feeb08419c2130fdda9fb/587e69dbe58c621e10202f76/587e6a512e69cf0b68443078/1484679763661/Paper-photography-06.jpg?format=750w',
    isActive: true,
    tags: ['blue', 'vermillion', 'deal', 'photo']
  },
  photos2: {
    name: 'Premium Photo Package',
    description: 'Let us take product photos for your website, increasing traffic and sales! Send us your product and we will send you ten professional photos on a white background for your product.',
    price: '150',
    leadTime: 14,
    imageURL: 'https://static1.squarespace.com/static/586feeb08419c2130fdda9fb/587d6188c534a59c410c049e/587d6189be65944eb793fa80/1484611979834/Electronics_Photography_3.jpg?format=750w',
    isActive: true,
    tags: ['blue', 'customizable', 'flavored', 'photo']
  },
  video1: {
    name: 'Premium Video Package',
    description: 'Let us make a custom video for your website, increasing traffic and sales! Send us your product and we will film a video with professional modeling, lighting and voiceover.',
    price: '500',
    leadTime: 14,
    imageURL: 'https://static1.squarespace.com/static/586feeb08419c2130fdda9fb/587d6188c534a59c410c049e/587d6189be65944eb793fa80/1484611979834/Electronics_Photography_3.jpg?format=750w',
    isActive: true,
    tags: ['video', 'customizable', 'flavored']
  },
  video2: {
    name: 'Standard Video Package',
    description: 'Let us make a custom video for your website, increasing traffic and sales! Send us your product and we will film it under professional lighting.',
    price: '31.89',
    leadTime: 14,
    imageURL: 'https://static1.squarespace.com/static/586feeb08419c2130fdda9fb/587d6188c534a59c410c049e/587d6189be65944eb793fa80/1484611979834/Electronics_Photography_3.jpg?format=750w',
    isActive: true,
    tags: ['video', 'customizable', 'deal']
  },
  bundle1: {
    name: 'Multimedia Package',
    description: 'Save when you buy photos and videos together! Let us make a custom video for your website, increasing traffic and sales! Send us your product and we will film it under professional lighting.',
    price: '199.75',
    leadTime: 14,
    imageURL: 'https://static1.squarespace.com/static/586feeb08419c2130fdda9fb/587d6188c534a59c410c049e/587d6189be65944eb793fa80/1484611979834/Electronics_Photography_3.jpg?format=750w',
    isActive: false,
    tags: ['deal', 'bundle']
  },
  bundle2: {
    name: 'Custom Multimedia Package',
    description: 'Save when you buy photos and videos together! Let us make a custom video for your website, increasing traffic and sales! Send us your product and we will film it under professional lighting.',
    price: '200.00',
    leadTime: 14,
    imageURL: 'https://static1.squarespace.com/static/586feeb08419c2130fdda9fb/587d6188c534a59c410c049e/587d6189be65944eb793fa80/1484611979834/Electronics_Photography_3.jpg?format=750w',
    isActive: true,
    tags: ['customizable', 'bundle']
  }
})

const orders = seed(Order, {
  simpleOrder: {status: 'inCart', deliveryDay: new Date()},
  placedOrder: {status: 'completed', deliveryDay: new Date()}
})

const reviews = seed(Review, {
  simpleReview: {title: 'Best photos!!!', stars: 5, text: 'OMG like totes amazeballs', product_id: 2},
  secondReview: {title: 'You call that a video?', stars: 1, text: 'My product was not visible and that guy did not sound like Morgan Freeman AT. ALL.', product_id: 1},
  thirdReview: {title: 'Great service!', stars: 5, text: 'Delivered my product video in only four days!', product_id: 3},
  fourthReview: {title: 'Wanted a different background', stars: 3, text: 'I really wanted a teal background, not turquoise. But besides that, great job!', product_id: 2},
  fifthReview: {title: 'Wow. What a voice.', stars: 5, text: 'I was shocked at the quality of the voice over.', product_id: 1}
})

const categories = seed(Category, {
  videoCategory: {
    title: 'Videos',
    description: 'modelling and voiceover available',
    imageURL: 'http://noirexcellence.com/wp-content/uploads/2016/11/maxresdefault-1-800x500.jpg',
    frontEndRoute: 'products/video'
  },
  photoCategory: {
    title: 'Photos',
    description: 'professionally done packages',
    imageURL: 'http://www.portfolio.ideadunes.com/wp-content/uploads/2015/09/23-showing-goggles-on-white-background.jpg',
    frontEndRoute: 'products/photo'
  },
  bundleCategory: {
    title: 'Complete Packages',
    description: 'save when you bundle',
    imageURL: 'http://i778.photobucket.com/albums/yy66/riffeym/Stereo%20Stuff/_DSC9626.jpg',
    frontEndRoute: 'products/bundle'
  }
})

const favorites = seed(Favorite,
  // We're specifying a function here, rather than just a rows object.
  // Using a function lets us receive the previously-seeded rows (the seed
  // function does this wiring for us).
  //
  // This lets us reference previously-created rows in order to create the join
  // rows. We can reference them by the names we used above (which is why we used
  // Objects above, rather than just arrays).
  ({users, things}) => ({
    // The easiest way to seed associations seems to be to just create rows
    // in the join table.
    'obama loves surfing': {
      user_id: users.barack.id,    // users.barack is an instance of the User model
                                   // that we created in the user seed above.
                                   // The seed function wires the promises so that it'll
                                   // have been created already.
      thing_id: things.surfing.id  // Same thing for things.
    },
    'god is into smiting': {
      user_id: users.god.id,
      thing_id: things.smiting.id
    },
    'obama loves puppies': {
      user_id: users.barack.id,
      thing_id: things.puppies.id
    },
    'god loves puppies': {
      user_id: users.god.id,
      thing_id: things.puppies.id
    },
  })
)

if (module === require.main) {
  db.didSync
    .then(() => db.sync({force: true}))
    .then(seedEverything)
    .finally(() => process.exit(0))
}

class BadRow extends Error {
  constructor(key, row, error) {
    super(error)
    this.cause = error
    this.row = row
    this.key = key
  }

  toString() {
    return `[${this.key}] ${this.cause} while creating ${JSON.stringify(this.row, 0, 2)}`
  }
}

// seed(Model: Sequelize.Model, rows: Function|Object) ->
//   (others?: {...Function|Object}) -> Promise<Seeded>
//
// Takes a model and either an Object describing rows to insert,
// or a function that when called, returns rows to insert. returns
// a function that will seed the DB when called and resolve with
// a Promise of the object of all seeded rows.
//
// The function form can be used to initialize rows that reference
// other models.
function seed(Model, rows) {
  return (others={}) => {
    if (typeof rows === 'function') {
      rows = Promise.props(
        mapValues(others,
          other =>
            // Is other a function? If so, call it. Otherwise, leave it alone.
            typeof other === 'function' ? other() : other)
      ).then(rows)
    }

    return Promise.resolve(rows)
      .then(rows => Promise.props(
        Object.keys(rows)
          .map(key => {
            const row = rows[key]
            return {
              key,
              value: Promise.props(row)
                .then(row => Model.create(row)
                  .catch(error => { throw new BadRow(key, row, error) })
                )
            }
          }).reduce(
            (all, one) => Object.assign({}, all, {[one.key]: one.value}),
            {}
          )
        )
      )
      .then(seeded => {
        console.log(`Seeded ${Object.keys(seeded).length} ${Model.name} OK`)
        return seeded
      }).catch(error => {
        console.error(`Error seeding ${Model.name}: ${error} \n${error.stack}`)
      })
  }
}

module.exports = Object.assign(seed, {users, things, favorites, products})
