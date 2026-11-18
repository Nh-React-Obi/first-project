import { useParams } from "react-router";

export function BottleDetail() {
  const { bottleId } = useParams();
  return (
    <div>
      <h1 className="text-2xl font-bold">Bottle Detail: {bottleId}</h1>
    </div>
  );
}

