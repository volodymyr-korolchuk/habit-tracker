import { getDaysInMonth } from "@/lib/dateUtils";

import Checkbox from "./Checkbox";
import { useTracker } from "@/app/tracker/context/TrackerContext";
import { Months } from "@/constants/months";

interface Props {
  month?: Months;
  checkedDaysIndexes: number[];
}

const CheckboxContainer: React.FC<Props> = ({ checkedDaysIndexes }) => {
  const { selectedMonth } = useTracker();

  const daysInMonth = getDaysInMonth(new Date().getFullYear(), selectedMonth);

  return (
    <div className="flex gap-[5px]">
      {Array(daysInMonth)
        .fill(0)
        .map((_, index) => (
          <Checkbox
            key={index}
            checked={checkedDaysIndexes.indexOf(index) !== -1}
          />
        ))}
    </div>
  );
};

export default CheckboxContainer;
