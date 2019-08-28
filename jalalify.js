#!/usr/bin/env node

var eol = require('os').EOL;
var optimist = require('optimist')
    .alias('h', 'help')
    .alias('x', 'reverse')
    .alias('f', 'format')
    .describe('h', 'Displays help.')
    .describe('x', 'Reverse')
    .describe('f', 'Format')
    .default('format', 'YYYY-M-D')
    .usage('Usage:' + eol +
           '  jalalify [-x] [-f <format>]');

if (optimist.argv.help) {
  console.log(optimist.help());
  return;
}

var input = '';

process.stdin.on('data', function(chunk) {
  input += chunk;
});

process.stdin.on('end', function() {
  if (optimist.argv.x) {
    var sourceCulture = new (require('./cultures/fa'))();
    var destinationCulture = new (require('./cultures/en'))();
  }
  else {
    var sourceCulture = new (require('./cultures/en'))();
    var destinationCulture = new (require('./cultures/fa'))();
  }

  console.log(convert(input, optimist.argv.format, sourceCulture, destinationCulture));
});

function convert(input, format, sourceCulture, destinationCulture) {
  var formatSpecifiers = getFormatSpecifiers(sourceCulture, destinationCulture);
  var formatComponents = getFormatComponents(format, formatSpecifiers);
  var usedFormatSpecifiers = [];
  var regex = '';

  formatComponents.forEach(function(formatComponent) {
    var formatSpecifier = formatSpecifiers[formatComponent];

    if (formatSpecifier) {
      usedFormatSpecifiers.push(formatSpecifier);
      regex += formatSpecifier.regex;
    }
    else {
      regex += formatComponent;
    }
  });

  input = input.replace(new RegExp(regex, 'gi'), function(match, group0, group1, group2) {
    var sourceDateGroups = [group0, group1, group2];
    var sourceDate = [];

    // Convert and reorder found groups to [year, month, day]
    for (var i = 0; i <= 2 ; i++)
      for (var j = 0; j <= 2 ; j++)
        if (usedFormatSpecifiers[i].part === j)
          sourceDate[j] = usedFormatSpecifiers[i].from(sourceDateGroups[i]);

    // TODO: Validate sourceDate

    var destinationDate = destinationCulture.fromGregorian(sourceCulture.toGregorian(sourceDate));
    var result = '';

    formatComponents.forEach(function(formatComponent) {
      var formatSpecifier = formatSpecifiers[formatComponent];
      result += formatSpecifier ? formatSpecifier.to(destinationDate[formatSpecifier.part]) : formatComponent;
    });

    return result;
  });

  return input;
}

function getFormatSpecifiers(sourceCulture, destinationCulture) {
  function parse(value) {
    return parseInt(value, 10);
  }

  function toString(value) {
    return value.toString();
  }

  function toPaddedString(value) {
    if (value < 10)
      return '0' + value.toString();

    return value.toString();
  }

  // TODO: YY

  return {
    'YYYY': {
      part: 0,
      regex: '(\\d{4})',
      from: parse,
      to: toString
    },
    'MMMM': {
      part: 1,
      regex: '(' + sourceCulture.monthNames().join('|') + ')',
      from: function(a) { return sourceCulture.monthNames().indexOf(a) + 1 },
      to: function(a) { return destinationCulture.monthNames()[a - 1] }
    },
    'MMM': {
      part: 1,
      regex: '(' + sourceCulture.shortMonthNames().join('|') + ')',
      from: function(a) { return sourceCulture.shortMonthNames().indexOf(a) + 1 },
      to: function(a) { return destinationCulture.shortMonthNames()[a - 1] }
    },
    'MM': {
      part: 1,
      regex: '(\\d{1,2})',
      from: parse,
      to: toPaddedString
    },
    'M': {
      part: 1,
      regex: '(\\d{1,2})',
      from: parse,
      to: toString
    },
    'DD': {
      part: 2,
      regex: '(\\d{1,2})',
      from: parse,
      to: toPaddedString
    },
    'D': {
      part: 2,
      regex: '(\\d{1,2})',
      from: parse,
      to: toString
    }
  };
}

// Exploits String.split's strange behavior when splitting by a regex which contains groups
// Don't do this at home.
function getFormatComponents(format, formatSpecifiers) {
  var keys = Object.keys(formatSpecifiers);

  for (var i = 0; i < keys.length; i++)
    keys[i] = '(' + keys[i] + ')';

  var regex = keys.join('|');
  var result = [];

  format.split(new RegExp(regex)).forEach(function(part) {
    if (part)
      result.push(part);
  });

  return result;
}
