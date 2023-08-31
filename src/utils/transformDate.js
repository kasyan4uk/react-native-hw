export const transformDate = (dateObject) => {
  const date = new Date(dateObject?.seconds * 1000).toLocaleDateString(
    'de-DE',
    {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }
  );
  const time = new Date(dateObject?.seconds * 1000).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
  return { date, time };
};
