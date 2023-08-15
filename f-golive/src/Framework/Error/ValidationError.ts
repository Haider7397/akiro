import { AbstractError } from './AbstractError'

export class ValidationError extends AbstractError {
  constructor(
    public readonly key?: string,
  ) {
    super()
  }
}