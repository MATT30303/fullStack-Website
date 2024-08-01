export default (sequelize, DataTypes) => {
  const Log = sequelize.define("Log", {
    logID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    userID: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    activity: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    timeStamp: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });
  return Log;
};
