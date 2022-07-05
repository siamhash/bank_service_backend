
module.exports = (sequelize, DataTypes) => {
    const bank_transactions = sequelize.define(
      'bank_transactions',
      {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        user_id: DataTypes.STRING,
        bank_account_id: DataTypes.STRING,
        txn_id: DataTypes.STRING,
        txn_type: DataTypes.STRING,
        amount: DataTypes.STRING,
        remarks: DataTypes.STRING,
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
    return bank_transactions;
  }; 