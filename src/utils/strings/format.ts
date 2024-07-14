export function format(format: string, ...args: unknown[]): string {
  let argIndex = 0;
  let result = '';
  let escaped = false;
  let leadingZero = false;
  let precision: number | null;
  let arg: unknown;
  let i = 0;
  let c = '';
  let tmp: string;

  const nextArg = function() {
    return args[argIndex++];
  };

  const slurpNumber = function() {
    let digits = '';

    while (/\d/.test(format[i])) {
      digits += format[i++];
      c = format[i];
    }

    return digits.length > 0 ? parseInt(digits) : null;
  };

  const length = format.length;
  for (; i < length; ++i) {
    c = format[i];

    if (escaped) {
      escaped = false;

      if (c == '.') {
        leadingZero = false;
        c = format[++i];
      } else if (c == '0' && format[i + 1] == '.') {
        leadingZero = true;
        i += 2;
        c = format[i];
      } else {
        leadingZero = true;
      }

      precision = slurpNumber();

      switch (c) {
        case 'b': // number in binary
          result += parseInt(nextArg() as never, 10).toString(2);
          break;

        case 'c': // character
          arg = nextArg();
          if (typeof arg === 'string' || arg instanceof String)
            result += arg;
          else
            result += String.fromCharCode(parseInt(arg as never, 10));
          break;

        case 'd': // number in decimal
          result += parseInt(nextArg() as never, 10);
          break;

        case 'f': // floating point number
          tmp = String(parseFloat(nextArg() as never).toFixed(precision || 6));
          result += leadingZero ? tmp : tmp.replace(/^0/, '');
          break;

        case 'j': // JSON
          result += JSON.stringify(nextArg());
          break;

        case 'o': // number in octal
          result += '0' + parseInt(nextArg() as never, 10).toString(8);
          break;

        case 's': // string
          result += nextArg();
          break;

        case 'x': // lowercase hexadecimal
          result += '0x' + parseInt(nextArg() as never, 10).toString(16);
          break;

        case 'X': // uppercase hexadecimal
          result += '0x' + parseInt(nextArg() as never, 10).toString(16).toUpperCase();
          break;

        default:
          result += c;
          break;
      }
    } else if (c === '%') {
      escaped = true;
    } else {
      result += c;
    }
  }

  return result;
}
