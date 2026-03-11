import { type ReactNode } from "react";

type LayoutWrapperProps = {
  children: ReactNode;
};

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  return <div>{children}</div>;
}
