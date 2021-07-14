module.exports = (sequelize, DataTypes)=>{
  const modules = sequelize.define('modules', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    description: {
      allowNull: false,
      type: DataTypes.STRING
    }
  },
  {
    timestamps: false
  })

  modules.associate = (models)=>{
    modules.hasMany(models.classes, {foreignKey: 'id_module'})
  } 

  return modules
}