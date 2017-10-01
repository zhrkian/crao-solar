"use strict";

class ExtendableError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = (new Error(message)).stack;
    }
  }
}

// now I can extend

class NotFoundError extends ExtendableError {
  constructor(m) {
    super(m);
    this.status = 404;
  }
}

module.exports = {
  NotFoundError: NotFoundError,
}