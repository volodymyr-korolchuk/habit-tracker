import { useTrackerStore } from "@/contexts/store";
import CheckTileSkeleton from "./CheckTileSkeleton";
import { getDaysInMonth } from "@/utils/date";

const ContentSkeleton = () => {
  const { daysInSelectedMonth } = useTrackerStore();

  const habitSkeletonsRow = Array.from(
    { length: daysInSelectedMonth },
    (_, index) => <CheckTileSkeleton key={index} />
  );

  const contentSkeleton = Array.from({ length: 3 }, (_, index) => (
    <div key={index} className="flex gap-1 items-center justify-start">
      {habitSkeletonsRow}
    </div>
  ));

  return (
    <div className="flex flex-col items-center gap-1 w-full">
      {contentSkeleton}
    </div>
  );
};

export default ContentSkeleton;
