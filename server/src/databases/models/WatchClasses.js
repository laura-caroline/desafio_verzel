module.exports = (sequelize, DataTypes)=>{
  const watch_classes = sequelize.define('watch_classes', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    id_user: {
      allowNull: false,
      references: {
        model: 'users', 
        key: 'id'
      },
      type: DataTypes.INTEGER,
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    id_class: {
      allowNull: false,
      references: {
        model: 'classes', 
        key: 'id'
      },
      type: DataTypes.INTEGER,
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    watched: {
      allowNull: false,
      defaultValue: false,
      type: DataTypes.BOOLEAN,
    }
  },
  {
    timestamps: false
  })

  watch_classes.associate = (models)=>{
    watch_classes.belongsTo(models.users, {foreignKey: 'id_user'})
    watch_classes.belongsTo(models.classes, {foreignKey: 'id_class'})

  }

  return watch_classes
}