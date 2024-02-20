type DataArray = {
  title: string;
  monthsData: {
    month: string;
    checkAtIndexes: number[];
  }[];
}[];

export const parseToMap = (data: DataArray): Map<string, number[][]> => {
  const dataEntryMap = new Map();

  data.map((entry) => {
    const indexesArray: number[][] = [];

    entry.monthsData.map((item) => indexesArray.push(item.checkAtIndexes));

    dataEntryMap.set(entry.title, indexesArray);
  });

  return dataEntryMap;
};
