import { typeOf } from 'mathjs';
import moment from 'moment';

interface IDateFormatter {
  getDate(): any;
  isValid(): boolean;
  isLocal(): boolean;
  toLocal(format?: string): string;
  toUtc(format?: string): string;
  toISOString(date?: any): string;
  parseEpoch(format?: string): any;
}

class DateFormatter implements IDateFormatter {
  constructor(
    private date: any,
    private format: string = 'DD-MM-YYYY, HH:mm:ss'
  ) {}

  getDate(): any {
    return this.date ? moment(this.date) : undefined;
  }

  isValid(): boolean {
    const isValidMoment = moment(this.date).isValid();
    return isValidMoment && this.date ? true : false;
  }

  isLocal(): boolean {
    return moment(this.date).isLocal();
  }

  toLocal(format?: string): string {
    const formatDate = format ?? this.format;
    const isValidDate = this.isValid();
    const isLocal = this.isLocal();

    if (isLocal)
      return isValidDate && this.date
        ? moment(this.date).format(formatDate)
        : '';
    return isValidDate && this.date
      ? moment(this.date)
          .local()
          .format(formatDate)
      : '';
  }

  toUtc(format?: string): string {
    const isValidDate = this.isValid();
    const formatDate = format ?? this.format;
    return isValidDate && this.date
      ? moment(this.date)
          .utc()
          .format(formatDate)
      : '';
  }

  toISOString(): any {
    return this.date ? moment(this.date)?.toISOString() : undefined;
  }
  parseEpoch(format?: string) {
    const formatDate = format ?? this.format;
    if (!this.date) return undefined;
    const newData =
      typeOf(this.date) === 'string' ? Number(this.date) : this.date;
    return moment(newData).format(formatDate);
  }
}

export function dateFormatter(date: any): IDateFormatter {
  return new DateFormatter(date);
}
