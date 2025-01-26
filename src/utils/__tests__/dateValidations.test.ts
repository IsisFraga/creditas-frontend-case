import { isUserAtLeast18YearsOld } from '../dateValidations';

describe('Age Verification', () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');

  it('should return true for users exactly 18 years old', () => {
    const birthDate = `${day}/${month}/${year - 18}`;
    expect(isUserAtLeast18YearsOld(birthDate)).toBe(true);
  });

  it('should return true for users over 18 years old', () => {
    const birthDate = `${day}/${month}/${year - 25}`;
    expect(isUserAtLeast18YearsOld(birthDate)).toBe(true);
  });

  it('should return false for users under 18 years old', () => {
    const birthDate = `${day}/${month}/${year - 17}`;
    expect(isUserAtLeast18YearsOld(birthDate)).toBe(false);
  });

  it('should return false for users born today 18 years ago minus one day', () => {
    const yesterdayDay = String(today.getDate() + 1).padStart(2, '0');
    const birthDate = `${yesterdayDay}/${month}/${year - 18}`;
    expect(isUserAtLeast18YearsOld(birthDate)).toBe(false);
  });

  it('should handle different months correctly', () => {
    const nextMonth = String(today.getMonth() + 2).padStart(2, '0');
    const birthDate = `${day}/${nextMonth}/${year - 18}`;
    expect(isUserAtLeast18YearsOld(birthDate)).toBe(false);
  });
});