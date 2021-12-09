const sequelize = require('../config/connection');
const { User, Location, Review } = require('../models');

const userData = require('./userData.json');
const locationData = require('./locationData.json');
const reviewData = require('./reviewData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const location of locationData) {
    await Location.create({
      ...location,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  for (const review of reviewData) {
    await review.create({
      ...review,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }


  process.exit(0);
};

seedDatabase();
