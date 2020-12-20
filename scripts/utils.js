async function retry(tryFunction, options = {}) {
  const { retries = 3 } = options;

  let tries = 0;
  let output = null;
  let exitErr = null;

  const bail = (err) => {
    exitErr = err;
  };

  while (tries < retries) {
    tries += 1;
    try {
      // eslint-disable-next-line no-await-in-loop
      output = await tryFunction({ tries, bail });
      break;
    } catch (err) {
      if (tries >= retries) {
        throw err;
      }
    }
  }

  if (exitErr) {
    throw exitErr;
  }

  return output;
}

// Ensure the first character is uppercase.
function capitalize(text) {
  if (text === '') {
      return text
  } else {
      return text.charAt(0).toUpperCase() + text.substring(1)
  }
}

const lessThanTwenty = ['','One','Two','Three','Four', 'Five','Six','Seven','Eight','Nine','Ten','Eleven','Twelve','Thirteen','Fourteen','Fifteen','Sixteen','Seventeen','Eighteen','Nineteen'];
const moreThanTwenty = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

// If the name starts with a number change it to a word.
function sanitizeName(name) {
  const match = name.match(/(?<number>\d+)?(?<rest>.*)/)
  if (!match.groups['number']) {
      return match.groups['rest']
  } else if (match.groups['number'] === '0') {
      return 'Zero' + match.groups['rest']
  }
  let text = capitalize(match.groups['rest'])
  for (let number = Number.parseInt(match.groups['number']); number >= 1; number = Math.floor(number / 100)) {
      let n = number % 100
      if (n == 0) {
          if (number === 0) {
              text = 'Zero' + text
          } else {
              text = (number === 100 ? 'One' : '') + 'Hundred' + text
          }
      } else if (n < 20) {
          text = lessThanTwenty[n] + text
      } else {
          const numerator = Math.floor(n/10)
          const denominator = n % 10
          text = moreThanTwenty[numerator] + text + (denominator > 0 ? lessThanTwenty[denominator] : '')
      }
  }

  return text
}

module.exports = {
  retry,
  sanitizeName
}