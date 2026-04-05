export const success = (data: unknown, message: string = "Success") => ({
  success: true,
  message,
  data,
});

export const fail = (message: string, errors?: unknown) => ({
  success: false,
  message,
  errors,
});
