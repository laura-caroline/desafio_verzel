module.exports = (sequelize, DataTypes)=>{
  const classes = sequelize.define('classes', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    id_module: {
      allowNull: false,
      references: {
        model: 'modules', 
        key: 'id'
      },
      type: DataTypes.INTEGER,
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    description: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    date:{
      allowNull: false,
      type: DataTypes.STRING,
    },
    time: {
      allowNull: false,
      type: DataTypes.STRING,
    }
  },
  {
    timestamps: false
  })

  classes.associate = (models)=>{
    classes.belongsTo(models.modules, {foreignKey: 'id_module'})
    classes.hasMany(models.watch_classes, {foreignKey: 'id_class'})

  }

  return classes
}