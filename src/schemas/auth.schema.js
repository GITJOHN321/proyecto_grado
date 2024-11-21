import { z } from "zod";
import { REGEX_PASSWORD } from "../config.js";

export const registerJacSchema = z.object({
  username: z.string({
    required_error: "jacname is required",
  }),
  personery: z.string({
    required_error: "personery is required",
  }),
  telephone: z.number({
    required_error: "telephone is required",
  }),
  email: z
    .string({
      required_error: "Email is required",
    })
    .email({
      required_error: "invalid email",
    }),
  password: z
    .string({
      required_error: "Password is required",
    })
    .regex(REGEX_PASSWORD, { message: "Invalid Password" }),
  password2: z.string({ required_error: "New Password is required" }),
});

export const registerSchema = z.object({
  username: z.string({
    required_error: "username is required",
  }),
  user_last_name: z.string({
    required_error: "username is required",
  }),
  telephone: z.number({
    required_error: "telephone is required",
  }),
  birthdate: z
    .string({
      required_error: "username is required",
    })
    .date(),
  dni: z.string({
    required_error: "username is required",
  }),
  email: z
    .string({
      required_error: "Email is required",
    })
    .email({
      required_error: "invalid email",
    }),
  password: z
    .string({
      required_error: "Password is required",
    })
    .regex(REGEX_PASSWORD, { message: "Invalid Password" }),
  password2: z.string({ required_error: "New Password is required" }),
});

export const loginSchema = z.object({
  email: z
    .string({
      required_error: "Invalid is required",
    })
    .email({ required_error: "Invalid email" }),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(6, { message: "Password must be at least 6 characters" })
    .max(72, { message: "The password cannot be longer than 72 characters" }),
});

export const changePasswordSchema = z.object({
  old_password: z.string({ required_error: "Old Password is required" }),
  new_password: z
    .string({
      required_error: "Password is required",
    })
    .regex(REGEX_PASSWORD, { message: "Invalid Password" }),
  new_password2: z.string({ required_error: "New Password is required" }),
});

export const validEmail = z.object({
  email: z
    .string({
      required_error: "Invalid is required",
    })
    .email({ required_error: "Invalid email" }),
});
