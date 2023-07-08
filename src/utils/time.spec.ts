import time from './time';

describe('time', () => {
  describe('date', () => {
    it('should return the current date if no value is provided', () => {
      const currentDate = new Date();
      const result = time.date();
      expect(result).toEqual(currentDate);
    });

    it('should return a new Date object if a value is provided', () => {
      const dateValue = '2022-01-01';
      const result = time.date(dateValue);
      expect(result).toEqual(new Date(dateValue));
    });
  });

  describe('isExpired', () => {
    it('should return true if the current date is greater than or equal to the past date', () => {
      const pastDate = '2022-01-01';
      const result = time.isExpired(pastDate);
      expect(result).toBe(true);
    });

    it('should return false if the current date is less than the past date', () => {
      const pastDate = '2030-01-01';
      const result = time.isExpired(pastDate);
      expect(result).toBe(false);
    });

    it('should handle past dates as Date objects', () => {
      const pastDate = new Date('2022-01-01');
      const result = time.isExpired(pastDate);
      expect(result).toBe(true);
    });
  });
});
