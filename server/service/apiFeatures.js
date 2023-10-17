class ApiFeatures {
  constructor(reqQuery, query, model) {
    this.reqQuery = reqQuery
    this.query = query
    this.model = model
  }
  filter() {
    // Create a shallow copy of the query object
    const queryObj = { ...this.reqQuery }
    const excludedQuery = ['sort', 'limit', 'fields', 'page']
    //Exclude unwanted fields
    excludedQuery.forEach(ele => {
      delete queryObj[ele]
    })

    // Convert Query Object to string.
    let queryStr = JSON.stringify(queryObj)
    // Replace gte|gt|lte|lt with  $gte $gt $lte $lt
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`)
    // query database to find the match with the filtered options
    this.query = this.query
      .find(JSON.parse(queryStr))
      .populate('subCategory category', '_id name')
    return this
  }

  limitFields() {
    if (this.reqQuery.fields) {
      // Remove ',' from the query fields to select fields from the DB.
      const selectedFields = this.reqQuery.fields.split(',').join(' ')
      this.query = this.query.find().select(selectedFields)
    }
    return this
  }
  async pagination() {
    // Input validation
    const page = Math.max(this.reqQuery.page * 1 || 1, 1) // default value 1
    const limit = Math.max(this.reqQuery.limit * 1 || 10, 1) // default value 10

    // Calculate skip
    const skip = (page - 1) * limit
    // Get totalDocs with a count query
    const totalDocs = await this.model.countDocuments()
    // Query result
    this.query = this.query.find().skip(skip).limit(limit)
    // Calculate totalPage
    const totalPage = Math.ceil(totalDocs / limit)

    const pagination = {}

    if (page < totalPage) {
      pagination.nextPage = page + 1
    }
    if (page > 1) {
      pagination.prevPage = page - 1
    }
    // return Pagination information
    return {
      ...pagination,
      currentPage: page,
      totalDocs: totalDocs
    }
  }
}

module.exports = ApiFeatures
