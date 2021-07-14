module.exports = (sequelize, DataTypes)=>{
  const users = sequelize.define('users', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    user: {
      allowNull: false,
      type: DataTypes.STRING
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING
    },
    authorization: {
      allowNull: false,
      type: DataTypes.STRING
    }
  },
  {
    timestamps: false
  })
  users.associate = (models)=>{
    users.hasMany(models.watch_classes, {foreignKey: 'id_user'})
  }

  return users
}