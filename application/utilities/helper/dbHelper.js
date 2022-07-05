const convertSnakeCase = require('lodash.snakecase');
const { Sequelize : { Op }  } = require('../../../models');
const generateWhereCondition = (data) => {
    const where = { };
    (data || []).forEach((element) => {
        const { key: KeyCamelCase, ...values } = element;
        const [ key1, key2 ] = KeyCamelCase.split('.');
        const key = convertSnakeCase(key2 || key1);
        const [ secondKey ] = Object.keys(values);
        let value;
        if (secondKey === 'eq') {
            value = { [Op.eq]: values[secondKey] };
        }
        if (secondKey === 'in') {
            value = { [Op.in]: values[secondKey] };
        }
        if (secondKey === 'neq') {
            value = { [Op.ne]: values[secondKey] };
        }
        if (secondKey === 'gt') {
            value = { [Op.gt]: values[secondKey] };
        }
        if (secondKey === 'gte') {
            value = { [Op.gte]: values[secondKey] };
        }
        if (secondKey === 'lt') {
            value = { [Op.lt]: values[secondKey] };
        }
        if (secondKey === 'lte') {
            value = { [Op.lte]: values[secondKey] };
        }
        let KeyValue;
    
        if (key2) {
            if (!where[key1]) {
                where[key1] = { };
            }
            if (where[key1][key]) {
                KeyValue = where[key1][key];
            }
            where[key1][key] = { ...KeyValue, ...value };
        } else {
            if (where[key]) {
                KeyValue = where[key];
            }
            where[key] = { ...KeyValue, ...value };
        }
    });
    return where;
};

module.exports = {
    generateWhereCondition
}
  