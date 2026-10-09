export class ApiError extends Error {
  private status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.status = status;
  }

  // Getters
  public getStatus(): number | undefined { return this.status; }
}
