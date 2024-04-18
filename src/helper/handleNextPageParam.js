function handleNextPageParam(
  meta = { currentPage: 0, totalItems: 0 },
  initUrl
) {
  const { currentPage, totalItems } = meta;
  return currentPage <= totalItems
    ? initUrl.concat(`page=${Number(currentPage) + 1}&limit=10`)
    : undefined;
}

export default handleNextPageParam;
