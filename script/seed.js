'use strict'

const db = require('../server/db')
const {User} = require('../server/db/models')
const {Wine} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const wineData = [
    {
      brand: 'Cloud Break',
      varietal: 'Chardonnay',
      vintage: 2015,
      color: 'White',
      description:
        'California- The Cloud Break Chardonnay is rich with flavors of toasted oak, vanilla, butter, apple, pear and hints of coconut. Refined acidity and hints of green apple linger on the elegant finish. Excellent with grilled pork chops.',
      price: 899,
      imageURL:
        'https://www.totalwine.com/dynamic/490x/media/sys_master/twmmedia/hd0/h2f/11371085889566.png'
    },

    {
      brand: 'Buttercream',
      varietal: 'Chardonnay',
      vintage: 2017,
      color: 'White',
      description:
        'California - Tastes like silken butter dripped over a fresh croissant. A decadent Chardonnay perfect for enjoying on the dock of the bay, the backyard, with friends, or really anywhere...',
      price: 1399,
      imageURL:
        'https://www.totalwine.com/media/sys_master/twmmedia/h9e/h83/11452226961438.png'
    },
    {
      brand: 'Oyster Bay',
      varietal: 'Sauvignon Blanc',
      vintage: 2016,
      color: 'White',
      description:
        'This ticks all the Marlborough Sauvignon Blanc boxes: cut grass, snow pea, nectarine and citrus, all bundled into a medium-bodied wine that comes across as dry, silky and refreshing.',
      price: 997,
      imageURL:
        'https://www.totalwine.com/media/sys_master/twmmedia/hed/hd6/11385158762526.png'
    },
    {
      brand: 'Pebble Row Marlborough',
      varietal: 'Sauvignon Blanc',
      vintage: 2015,
      color: 'White',
      description:
        'Marlborough, New Zealand - The nose of this sauvignon blanc features aromatic passionfruit accented by zesty citrus notes. The palate is full flavored with lingering passionfruit flavors and a refreshing, crisp finish.',
      price: 999,
      imageURL:
        'https://www.totalwine.com/media/sys_master/twmmedia/hc2/h62/10508835848222.png'
    },
    {
      brand: 'Santa Margherita',
      varietal: 'Pinot Grigio',
      vintage: 2017,
      color: 'White',
      description:
        "Alto Adige, Italy- This dry white wine has a straw yellow color. Its clean, intense aroma and bone-dry taste (with an appealing flavor of Golden Delicious apples) make Santa Margherita's Pinot Grigio a wine of great personality and versatility.",
      price: 1797,
      imageURL:
        'https://www.totalwine.com/media/sys_master/twmmedia/hfc/hd3/10580509458462.png'
    },
    {
      brand: 'Armani',
      varietal: 'Pinot Grigio',
      vintage: 2018,
      color: 'White',
      description:
        "Valdadige, Veneto, Italy- This delicate, floral Pinot Grigio has flavors of apple, mineral and hints of spice. This wine is an outstanding testament to Armani's decision to produce wines from prime vineyards under its own label. The perfect aperitif, great with seafood, pasta or salads.",
      price: 1399,
      imageURL:
        'https://www.totalwine.com/media/sys_master/twmmedia/h10/h8b/11446997057566.png'
    },
    {
      brand: 'St Supery',
      varietal: 'Moscato',
      vintage: 2015,
      color: 'White',
      description:
        'The Muscat family includes numerous grape varieties that range from white to nearly black and make many deliciously sweet or dry, fruity and mostly unoaked wines around the world.',
      price: 2249,
      imageURL:
        'https://www.totalwine.com/media/sys_master/twmmedia/hdb/h85/9863536967710.png'
    },
    {
      brand: 'Double Dog Dare',
      varietal: 'Moscato',
      vintage: 2018,
      color: 'White',
      description:
        'California - A delicious blend of exotic fruit flavors and sweetness served up in a pleasing light style. Well-balanced with a crisp and clean finish. Perfect with brunch, desserts or lighter fare.',
      price: 399,
      imageURL:
        'https://www.totalwine.com/media/sys_master/twmmedia/h06/h6b/10773879717918.png'
    },
    {
      brand: 'Chateau Ste Michelle',
      varietal: 'Riesling',
      vintage: 2016,
      color: 'White',
      description:
        'Wine & Spirits-Columbia Valley, WA- "A terrific wine for its price, this Riesling\'s best feature is its freshness; it\'s a high-toned, leesy white leading with scents of apple blossoms and a hint of lime. The flavors are crisp and round, supple and generous, with the body to pair with seafood..."',
      price: 1399,
      imageURL:
        'https://www.totalwine.com/media/sys_master/twmmedia/h06/h6b/10773879717918.png'
    },
    {
      brand: 'Rock View',
      varietal: 'Riesling',
      vintage: 2017,
      color: 'White',
      description:
        'Columbia Valley, WA- Juicy notes of peaches and apples combined with honeysuckle. Enjoy with fresh fruit, as the perfect complement to a spicy cuisine, or as an everyday sipper.',
      price: 999,
      imageURL:
        'https://www.totalwine.com/media/sys_master/twmmedia/h62/h7b/8819309871134.png'
    },
    {
      brand: 'Meiomi',
      varietal: 'Pinot Noir',
      vintage: 2016,
      color: 'Red',
      description:
        'California - This beautiful Pinot Noir carries aromas of tobacco, dark red fruits and fresh berries. The rich cherry flavor is complemented by notes of cedar, raspberry and strawberry. Enjoy with turkey, salmon or beef dishes.',
      price: 1697,
      imageURL:
        'https://www.totalwine.com/dynamic/490x/media/sys_master/twmmedia/h9e/hca/11343118893086.png'
    },
    {
      brand: 'Domaine Loubejac',
      varietal: 'Pinot Noir',
      vintage: 2016,
      color: 'Red',
      description:
        "Oregon - Though the name and label suggest a French take on Oregon Pinot Noir, this wine's flavors have more in common with...California versions. Its jammy, forward and ripe strawberry fruit is hard to resist at this price. Drink it up while it remains young.",
      price: 3097,
      imageURL:
        'https://www.totalwine.com/media/sys_master/twmmedia/h37/hc2/11343134556190.png'
    },
    {
      brand: 'Olema',
      varietal: 'Cabernet Sauvignon',
      vintage: 2015,
      color: 'Red',
      description:
        'California - Lots of black currant and blackberry aromas with hints of wet earth and spice cake. Medium body with a solid center palate of ripe fruit and fine tannins. Soft and silky.',
      price: 2699,
      imageURL:
        'https://www.totalwine.com/dynamic/270x/media/sys_master/twmmedia/h97/h3c/11460166254622.png'
    },
    {
      brand: '1858',
      varietal: 'Cabernet Sauvignon',
      vintage: 2015,
      color: 'Red',
      description:
        'California - This hand crafted Napa Cabernet is a powerhouse in flavor and texture. Featuring luscious, ripe blackberry flavors with undertones of dark chocolate and toasted oak. The initial surge of raspberry is stunning but almost outdone by the regal tannic finish.',
      price: 6999,
      imageURL:
        'https://www.totalwine.com/dynamic/490x/media/sys_master/twmmedia/h8f/h48/9683865010206.png'
    },
    {
      brand: 'Radius',
      varietal: 'Merlot',
      vintage: 2017,
      color: 'Red',
      description:
        'Washington- Flavors and aromas of sweet cherries, ripe red raspberries, succulent plums and marshmallow-y vanilla leading to a soft and silky finish. Enjoy with red meats, grilled fish and sharp cheeses.',
      price: 2499,
      imageURL:
        'https://www.totalwine.com/dynamic/270x/media/sys_master/twmmedia/hdf/h76/8802741944350.png'
    },
    {
      brand: 'Duckhorn',
      varietal: 'Merlot',
      vintage: 2015,
      color: 'Red',
      description:
        'California - A delicious blend of several vineyard lots that is a distinct expression of the Napa Valley. The aroma is dominated by ripe blackberry, plum and cherry, accented by notes of toasted oak, vanilla, and tobacco. The palate adds chocolate, cassis, herb and spice to the tasty mix.',
      price: 5499,
      imageURL:
        'https://www.totalwine.com/dynamic/490x/media/sys_master/twmmedia/h9e/h0f/8815672590366.png'
    },
    {
      brand: 'Biale',
      varietal: 'Zinfandel',
      vintage: 2015,
      color: 'Red',
      description:
        'California - Zesty and tightly focused, with cherry, licorice and cedar aromas opening to plum and pepper flavors, finishing with dusty tannins.',
      price: 4499,
      imageURL:
        'https://www.totalwine.com/dynamic/490x/media/sys_master/twmmedia/h9e/h4a/8806115934238.png'
    },
    {
      brand: 'Grgich Hills',
      varietal: 'Zinfandel',
      vintage: 2014,
      color: 'Red',
      description:
        'California - Complex and structured, this wine is full of strawberry and dark plum flavors with a subtle hint of pepper. Pairs well with grilled meats, hearty stews, or pasta dishes.',
      price: 3499,
      imageURL:
        'https://www.totalwine.com/dynamic/490x/media/sys_master/twmmedia/h9a/hb5/8806086803486.png'
    },
    {
      brand: 'Molly Dooker',
      varietal: 'Shiraz',
      vintage: 2016,
      color: 'Red',
      description:
        'South Australia - Strikes the right balance between dense, dark flavors and juicy, vibrant note. Apricot, cherry and raspberry flavors are pure, ripe and expressive, mingling well with Earl Grey tea, sarsaparilla and orange zest accents. The tannins are concentrated and a tad rustic.',
      price: 7199,
      imageURL:
        'https://www.totalwine.com/dynamic/490x/media/sys_master/twmmedia/hda/hb3/8818868715550.png'
    },
    {
      brand: 'Rubus',
      varietal: 'Shiraz',
      vintage: 2015,
      color: 'Red',
      description:
        'Australia - Blackberry, currant and blueberry flavors are dense, intense and powerful, mingling with black licorice, sage and spice notes, with a brambly undertone. A spicy hint lingers on the finish.',
      price: 1899,
      imageURL:
        'https://www.totalwine.com/dynamic/490x/media/sys_master/twmmedia/h1e/h0a/9960884240414.png'
    }
  ]

  const userData = [
    {
      firstName: 'Kristi',
      lastName: 'Kelly',
      email: 'kristi@kelly.com',
      password: '12345',
      salt: 'movies',
      googleId: 'kristi',
      zip: 93405,
      city: 'San Luis Obispo',
      address1: '123 Foothill',
      address2: 'Apt B',
      state: 'CA'
    },
    {
      firstName: 'Joy',
      lastName: 'Grunklee',
      email: 'joy@grunklee.com',
      password: '12345',
      salt: 'doge',
      googleId: 'joy',
      zip: 93402,
      city: 'Los Osos',
      address1: '123 LOVR',
      address2: 'Unit C',
      state: 'CA'
    },
    {
      firstName: 'Victor',
      lastName: 'Marta',
      email: 'victor@marta.com',
      password: '12345',
      salt: 'mixers',
      googleId: 'victor',
      zip: 96001,
      city: 'Redding',
      address1: '123 Hill St',
      address2: 'Apt 5',
      state: 'CA'
    },
    {
      firstName: 'Dylan',
      lastName: 'Hrebenach',
      email: 'dylan@hrebenach.com',
      password: '12345',
      salt: 'salad',
      googleId: 'dylan',
      zip: 93405,
      city: 'San Luis Obispo',
      address1: '123 Foothill',
      address2: 'Apt B',
      state: 'CA'
    },
    {
      firstName: 'Larry',
      lastName: 'Jones',
      email: 'larry@jones.com',
      password: '12345',
      salt: 'ocean',
      googleId: 'larry',
      zip: 93405,
      city: 'San Luis Obispo',
      address1: '321 Cherry Ln',
      address2: 'Apt 10',
      state: 'CA'
    },
    {
      firstName: 'Emily',
      lastName: 'Winelover',
      email: 'emily@winelover.com',
      password: '12345',
      salt: 'bottle',
      googleId: 'emily',
      zip: 93402,
      city: 'Los Osos',
      address1: '999 Bear Ln',
      address2: 'Apt 3A',
      state: 'CA'
    }
  ]

  for (const wine of wineData) {
    await Wine.create(wine)
  }

  for (const user of userData) {
    await User.create(user)
  }

  console.log(`seeded ${userData.length} users`)
  console.log(`seeded ${wineData.length} wines`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
