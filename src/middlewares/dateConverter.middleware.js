import moment from "moment-timezone";

// Detecta si es una instancia de Sequelize
function isSequelizeInstance(obj) {
  return obj && typeof obj.toJSON === 'function';
}

// Detecta si es un string con formato ISO 8601
function isIsoDateString(value) {
  return typeof value === 'string' &&
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:.\d+)?Z?$/.test(value);
}

// Convierte recursivamente fechas al timezone deseado
function convertDatesToTimezone(obj, timezone = 'Europe/Madrid') {
  if (Array.isArray(obj)) {
    return obj.map(item => convertDatesToTimezone(item, timezone));
  }

  if (isSequelizeInstance(obj)) {
    return convertDatesToTimezone(obj.toJSON(), timezone);
  }

  if (obj instanceof Date || isIsoDateString(obj)) {
    return moment(obj).tz(timezone).format(); // ISO con offset (ej: 2024-06-27T19:08:48+02:00)
  }

  if (typeof obj === 'object' && obj !== null) {
    const newObj = {};
    for (const key in obj) {
      newObj[key] = convertDatesToTimezone(obj[key], timezone);
    }
    return newObj;
  }

  return obj;
}

// Middleware Express
function dateTimezoneMiddleware(timezone = 'Europe/Madrid') {
  return (req, res, next) => {
    const originalJson = res.json.bind(res);

    res.json = function (data) {
      const converted = convertDatesToTimezone(data, timezone);
      return originalJson(converted);
    };

    next();
  };
}

export default dateTimezoneMiddleware;