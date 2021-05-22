module.exports = (sequelize, Sequelize) => {
  const Tweet = sequelize.define('Tweet', {
    tweet_id: {
      type: Sequelize.INTEGER,
      unique: true,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    text: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    in_reply_to_tweet_id: {
      type: Sequelize.INTEGER,
      defaultValue: null,
    },
    in_retweet_to_tweet_id: {
      type: Sequelize.INTEGER,
      defaultValue: null,
    },
    reply_count: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    retweet_count: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  }, {
    freezeTableName: true,
  });
  
  return Tweet;
}