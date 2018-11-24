export default dateString =>
  new Date(dateString).toLocaleString('vi-VN', {
    localeMatcher: 'best fit',
    hour12: true,
  });
