import { typeOf } from 'mathjs';

export function makeQueryParam(objParam: any = {}) {
  let result = '';
  const arrArgs = Object.keys(objParam);
  function noValue(val: any) {
    const availableTypes = ['boolean', 'number'];
    return !val && !availableTypes.includes(typeOf(val));
  }

  arrArgs.forEach((x, y) => {
    result += y < 1 ? '?' : '';
    const val = objParam[x];
    if (noValue(val)) return;
    else if (Array.isArray(val)) {
      if (!val.length) return;
      val.forEach((a, b) => {
        if (
          x === 'q' ||
          x === 'q_index' ||
          x === 'search' ||
          x === 'code' ||
          x === 'name'
        ) {
          result += `${x}[${b}]=${encodeURIComponent(a)}`;
        } else {
          result += `${x}[${b}]=${a}`;
        }
        result += b < val.length - 1 ? '&' : '';
      });
    } else {
      if (
        x === 'q' ||
        x === 'q_index' ||
        x === 'search' ||
        x === 'code' ||
        x === 'name'
      ) {
        result += `${x}=${encodeURIComponent(val)}`;
      } else {
        result += `${x}=${val}`;
      }
    }
    result += y < arrArgs.length - 1 ? '&' : '';
  });

  return result;
}

export function stringPramsToObject(params: string): any {
  if (!params) return undefined;
  const newParams = params.substring(1);
  return JSON.parse(
    '{"' +
      decodeURI(newParams)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"') +
      '"}'
  );
}

export function makeArrayIds({
  data,
  valueWhenNull,
}: {
  data: any;
  valueWhenNull?: string;
}): string[] {
  const ids = [];
  if (!data) {
    if (valueWhenNull) return [valueWhenNull];
    else return [];
  } else if (Array.isArray(data)) {
    if (data?.length === 0) {
      if (valueWhenNull) return [valueWhenNull];
      else return [];
    }
    data.forEach(item => {
      const id = item.id ?? item.uuid;
      ids.push(id);
    });
  } else {
    const id = data.id ?? data.uuid;
    ids.push(id);
  }
  return ids;
}
