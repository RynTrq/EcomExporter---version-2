export type ApiErrorCode =
  | "bad_request"
  | "body_too_large"
  | "conflict"
  | "forbidden"
  | "internal_error"
  | "method_not_allowed"
  | "not_found"
  | "rate_limited"
  | "unauthorized"
  | "validation_failed";

export class ApiError extends Error {
  status: number;
  code: ApiErrorCode;
  details?: unknown;

  constructor(status: number, code: ApiErrorCode, message: string, details?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
    this.details = details;
  }
}
