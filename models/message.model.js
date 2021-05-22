module.exports = (sequelize, Sequelize) => {
  const Message = sequelize.define('Message', {
    message_id: {
      type: Sequelize.INTEGER,
      unique: true,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    sender_user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    recipient_user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    text: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  }, {
    freezeTableName: true,
  });
  
  return Message;
}