import { TransposeFunction } from "../components/DownloadCSV";

it('transpose exist', () => {
    expect(TransposeFunction.Transpose).toBeDefined();
});

it('transpose', () => {
    expect(TransposeFunction.Transpose([[1,2,3],[1,2,3]])).toEqual([[1,1],[2,2],[3,3]]);
});