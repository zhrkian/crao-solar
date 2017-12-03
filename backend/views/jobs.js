exports.jobListView = job => {
  const { _id, createdAt, name, status } = job

  return {
    id: _id,
    createdAt,
    name,
    status
  }
}

exports.jobView = job => {
  const { _id, createdAt, name, status, options } = job

  return {
    id: _id,
    createdAt,
    name,
    status,
    options
  }
}