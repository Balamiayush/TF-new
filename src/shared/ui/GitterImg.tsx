import Image from "next/image";

export default function GitterImage({ className = "", ...props }) {
  return (
    <Image
      alt="gitter"
      fill
      className={`w-full h-full absolute pointer-events-none object-cover z-0 ${className}`}
      src="/gitter.png"
      {...props}
    />
  );
}