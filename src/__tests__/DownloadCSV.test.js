import { transpose } from "../components/DownloadCSV.js";

it('transpose exist', () => {
    expect(transpose).toBeDefined();
});

it('transpose', () => {
    expect(transpose([[1,2,3],[1,2,3]])).toEqual([[1,1],[2,2],[3,3]]);
});