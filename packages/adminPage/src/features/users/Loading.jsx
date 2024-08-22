import Spinner from "@common/components/Spinner";

export default function Loading() {
  return (
    <div className="flex justify-center items-center w-full h-[600px] bg-slate-50">
      <Spinner />
    </div>
  );
}
