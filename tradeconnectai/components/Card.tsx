export default function Card({ children, className = "" }) {
  return (
    <div
      className={`p-8 bg-gray-100 dark:bg-gray-700 rounded-xl shadow ${className}`}
    >
      {children}
    </div>
  );
}
