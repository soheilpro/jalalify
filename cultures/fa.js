var jalali = require('./calendars/jalali');

function Culture() {
}

Culture.prototype.monthNames = function(date) {
  return ['Farvardin', 'Ordibehesht', 'Khordad', 'Tir', 'Mordad', 'Shahrivar', 'Mehr', 'Aban', 'Azar', 'Dey', 'Bahman', 'Esfand'];
};

Culture.prototype.shortMonthNames = function(date) {
  return ['Far', 'Ord', 'Kho', 'Tir', 'Mor', 'Sha', 'Meh', 'Aba', 'Aza', 'Dey', 'Bah', 'Esf'];
};

Culture.prototype.fromGregorian = function(date) {
  return jalali.gregorian_to_jalali(date);
};

Culture.prototype.toGregorian = function(date) {
  return jalali.jalali_to_gregorian(date);
};

module.exports = Culture;