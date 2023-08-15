export abstract class AbstractError extends Error {
  constructor(message?: string) {
    super(message)

    // @ts-ignore
    this.__proto__ = new.target.prototype
  }
}
