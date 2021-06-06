export default {
  hourToMinutes: (hourMinute) => {
    const [hour, minutes] = hourMinute.split(':');
    return parseInt(hour) * 60 + parseInt(minutes);
  },
  validateEmail: (email) => {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  },
  allFields: (obj, keys) => {
    for (let key of keys) {
      if (!obj[key] || obj[key] === '' || obj[key].length === 0) {
        return false;
      }
    }
    return true;
  },
};
