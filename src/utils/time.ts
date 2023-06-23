const time = {
  date: (value?: string | Date): Date => (value ? new Date(value) : new Date()),
  isExpired(pastDate: string | Date): boolean {
    const _currentDate = this.date();
    const _pastDate = this.date(pastDate);
    if (_currentDate >= _pastDate) {
      return true;
    }
    return false;
  },
};
export default time;
