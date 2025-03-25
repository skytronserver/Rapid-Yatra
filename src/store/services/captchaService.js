import { api } from "./api";

export const captchaService = api.injectEndpoints({
  endpoints: (builder) => ({
    generateCaptcha: builder.query({
      query: () => "api/generate-captcha/",
    }),
    verifyCaptcha: builder.mutation({
      query: (formData) => ({
        url: "/api/generate-captcha/",
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const { useGenerateCaptchaQuery, useVerifyCaptchaMutation } = captchaService;
