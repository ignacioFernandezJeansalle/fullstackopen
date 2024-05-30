export default function Message({ messageObj }) {
  if (!messageObj) return null;

  const { message, className } = messageObj;

  return <p className={className}>{message}</p>;
}
