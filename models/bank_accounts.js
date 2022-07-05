
module.exports = (sequelize, DataTypes) => {
    const bank_accounts = sequelize.define(
      'bank_accounts',
      {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        user_id: DataTypes.STRING,
        account_number: DataTypes.STRING,
        ifsc: DataTypes.STRING,
        created: { 
          type : DataTypes.DATE,
        },
        updated: { 
          type : DataTypes.DATE,
        }
      },
      {
        freezeTableName: true,
        underscored: true,
        timestamps: false,
      },
    );
    bank_accounts.associate = models => {
      bank_accounts.hasOne(models.users, {
        foreignKey: 'id',
        sourceKey : 'user_id',
        as: 'users',
      });
    };
    return bank_accounts;
  }; 