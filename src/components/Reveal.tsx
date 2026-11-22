import type { ElementType, ReactNode } from "react";

type Props = {
  as?: ElementType;
  className?: string;
  /** Posição no grupo; usado pelo scroll reveal (spec 02) */
  step?: number;
  children: ReactNode;
};

export default function Reveal({ as: Tag = "div", className = "", children }: Props) {
  return <Tag className={className || undefined}>{children}</Tag>;
}
