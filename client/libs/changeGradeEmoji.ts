export const changeGradeImoji = (grade: string) => {
  switch (grade) {
    case 'CANDLE':
      return '🕯';
    case 'MATCH':
      return '🔥';
    case 'BONFIRE':
      return '🎇';
    case 'MORAKMORAK':
      return '♨️';
  }
};
