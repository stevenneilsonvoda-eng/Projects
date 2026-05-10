export default function Section({ children, className = "" }) {
  return (
    <section className={`py-24 px-6 ${className}`}>
      {children}
    </section>
  );
}
