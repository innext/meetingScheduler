module.exports = class Response {
  static customResponse(res, status, message = null, data = null) {
    return res.status(status).json({
      status,
      message,
      data
    })
  }
}