class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    // 1.) Basic Filtering
    const queryObj = { ...this.queryString };
    const excludedFields = ['sort', 'page', 'limit'];

    excludedFields.forEach((field) => {
      delete queryObj[field];
    });

    // 2.) Advanced Filtering
    const queryStr = JSON.stringify(queryObj).replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match) => {
        return `$${match}`;
      }
    );

    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }

  // Sorting
  sort() {
    if (!this.queryString.sort) {
      this.query = this.query.sort('-ratingsAvg');
    } else {
      const sort = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sort);
    }

    return this;
  }

  // Pagination
  pagination() {
    // const limit = +this.queryString.limit * 1 || 5;
    const limit = Number(this.queryString.limit) || 100;
    const currentPage = Number(this.queryString.page) || 1;

    const skip = limit * (currentPage - 1);
    this.query = this.query.limit(limit).skip(skip);

    return this;
  }

  // limiting fields
  limitFields() {
    if (!this.queryString.fields) {
      this.query = this.query.select('-__v');
    } else {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    }

    return this;
  }
}
module.exports = APIFeatures;
