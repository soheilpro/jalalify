function Culture() {
}

Culture.prototype.monthNames = function(date) {
  return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
};

Culture.prototype.shortMonthNames = function(date) {
  return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
};

Culture.prototype.fromGregorian = function(date) {
  return date;
};

Culture.prototype.toGregorian = function(date) {
  return date;
};

module.exports = Culture;
