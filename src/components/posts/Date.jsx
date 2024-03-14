export function calculateDday(targetDate) {
  const endDate = new Date(targetDate);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const timeDiff = endDate.getTime() - today.getTime();

  return Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
}

export function formatDate(date) {
  const now = new Date();
  const targetDate = new Date(date);
  const diffTime = Math.abs(now - targetDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    const diffMinutes = Math.ceil(diffTime / (1000 * 60));
    return `${diffMinutes}분 전`;
  } else if (diffDays === 1) {
    return '어제';
  } else {
    const year = targetDate.getFullYear();
    const month = targetDate.getMonth() + 1;
    const day = targetDate.getDate();
    return `${year}-${month}-${day}`;
  }
}
