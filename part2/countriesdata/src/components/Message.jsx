export default function Message({ message, className }) {
  if (!message) return null;

  return <p className={className}>{message}</p>;
}
