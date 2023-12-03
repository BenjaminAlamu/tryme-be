export const paginationOptions = req => {
  return {
    page: (req.query && req.query.page) || 0,
    limit: (req.query && parseInt(req.query.limit, 10)) || 5
  };
};

export const paginationData = async (data, count, options) => {
  const total = count;
  const limit = parseInt(options.limit, 10);
  const pages = Math.ceil(count / limit);
  return {
    pagination: {
      current_page: Number(options.page),
      per_page: limit,
      total_pages: pages,
      count: total
    },
    data
  };
};
