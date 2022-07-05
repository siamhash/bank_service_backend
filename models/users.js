
module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define(
    'users',
    {
      id: {
          type: DataTypes.INTEGER,
          primaryKey: true
      },
      name:DataTypes.STRING,
      email:DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      freezeTableName: true,
      underscored: false,
      timestamps: false,
    },
  );
  return users;
}; 