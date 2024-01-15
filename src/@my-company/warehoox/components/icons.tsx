type Props = {
  size: number; // px
};

// Hacky example icon using the package emoji to avoid relying on an icon library in the scaffold.
export function PackageIcon({ size }: Props) {
  return (
    <div
      style={{
        width: size,
        height: size,
        fontSize: size / 1.2,
        lineHeight: `${size}px`,
        textAlign: "center",
      }}
    >
      &#128230;
    </div>
  );
}
