interface DividerProps {
  color?: string;
}

function Divider({ color }: DividerProps) {
  return (
    <div
      style={{
        width: "2px",
        height: "100px",
        backgroundColor: color || "#E0E0E0",
        margin: "0 auto",
      }}
    />
  );
}

export default Divider;
