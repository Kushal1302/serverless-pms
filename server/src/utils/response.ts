export const success = (data: any, message: string = "Success") => ({
  success: true,
  message,
  data,
});

export const fail = (message: string, errors?: any) => ({
  success: false,
  message,
  errors,
});
