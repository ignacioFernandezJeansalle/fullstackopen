export default function Notification({ message, error }) {
  if (!message) return null;

  const className = error ? "notification error" : "notification";

  return <div className={className}>{message}</div>;
}
