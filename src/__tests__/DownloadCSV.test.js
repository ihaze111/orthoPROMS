import { transpose, DownloadCSV } from '../components/Modules/DownloadCSV';

describe('Transpose Function Tests', () => {
  it('DownloadCSV function exist', () => {
    expect(DownloadCSV).toBeDefined();
  });

  it('transpose function exist', () => {
    expect(transpose).toBeDefined();
  });

  it('returns transposed array', () => {
    expect(transpose([[1, 2, 3], [1, 2, 3]])).toEqual([[1, 1], [2, 2], [3, 3]]);
  });
});
