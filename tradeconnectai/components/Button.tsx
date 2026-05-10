export default function Button({ children, href, variant = "primary" }) {
  const base =
    "px-6 py-3 rounded-lg font-semibold transition inline-block text-center";

  const styles = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    outline:
      "bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700",
  };

  return (
    <a href={href} className={`${base} ${styles[variant]}`}>
      {children}
    </a>
  );
}
