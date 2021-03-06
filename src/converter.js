const analytics = require('./analytics');
const rh = require('./regex_helper');
const ch = require('./conversion_helper');

function conversions(comment) {
  if (!ch.shouldConvertComment(comment)) {
    return {};
  }

  const potentialConversions = ch.findPotentialConversions(comment);
  const filteredConversions = ch.filterConversions(potentialConversions);
  const metricConversions = ch.calculateMetric(filteredConversions);
  const roundedConversions = ch.roundConversions(metricConversions);
  const formattedConversions = ch.formatConversion(roundedConversions);
  
  return formattedConversions.reduce((memo, conversion) => {
    const key = conversion['imperial']['number'] + conversion['imperial']['unit'];
    const formatted = conversion['formatted'];

    let value;
    if (Array.isArray(formatted)) {
      value = formatted.map(el => el['number'] + el['unit']).join(' or ');
    } else {
      value = formatted['number'] + formatted['unit'];
    }
    
    memo[key] = value ;
    return memo;
  }, {});
}

module.exports = {
  "conversions" : conversions
}
