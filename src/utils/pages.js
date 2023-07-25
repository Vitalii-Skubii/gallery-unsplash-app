export const getPagesCount = (totalCount, limit) => {
  return Math.ceil(totalCount / limit);
};

export const getPagesArray = (totalPages, currentPage) => {
  let result = [];
  for (let i = 0; i < totalPages; i++) {
    result.push(i + 1);
  }
  return result.slice(
    currentPage > 3 ? currentPage - 3 : 0,
    currentPage > totalPages - 2 ? totalPages : currentPage + 2
  );
};
