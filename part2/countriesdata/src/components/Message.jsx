export default function Message({ message, className }) {
  if (message === undefined) return null;

  return <p className={className}>{message}</p>;
}
