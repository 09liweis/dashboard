interface ScrollRevealProps {
  children: React.ReactNode;
  width?: "100%" | "fit-content";
}

export default function ScrollReveal({ children, width = "100%" }: ScrollRevealProps) {
  return (
    <div style={{ width }}>
      {children}
    </div>
  );
}