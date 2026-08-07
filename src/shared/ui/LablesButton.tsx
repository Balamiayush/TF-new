
export default function LablesButton({
  label,
  bg,
  textColor,
}: {
  label: string;
  bg?: string;
  textColor?: string;
}) {
  return (
    <div>
      <p
        className={`rounded-lg px-3 py-1.5 text-[12px] leading-[110%] font-medium ${bg ?? "bg-[#FFFFFF47]"} ${textColor ?? "text-[#1A1A1A]"}`}
      >
        {label}
      </p>
    </div>
  );
}
