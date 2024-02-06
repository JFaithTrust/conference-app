import * as z from "zod";

export const loginSchema = z.object({
  phoneNumber: z.string().min(10),
  password: z.string().min(4),
});

const passwordSchema = z
  .string()
  .min(8, { message: "Password must be at least 8 characters long." })
  .max(30, { message: "Password must not be longer than 30 characters." });

export const registerSchema = z
  .object({
    fullName: z.string().min(3),
    phoneNumber: z.string().min(13),
    password: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export const createPostSchema = z.object({
  name: z.string(),
  authors: z.string().nonempty("Please write authors name."),
  description: z.string().nonempty("Please write description."),
});

export const userAddSchema = z.object({
  users: z.array(z.string()).nonempty("Please select at least one reviewer."),
});

export const ConfirmPhoneCodeSchema = z.object({
  smsCode: z.string().min(4).max(4),
});

export const DirectionAddSchema = z.object({
  name: z.string().min(3),
});

export const ConferenceAddSchema = z.object({
  name: z.string().min(3),
  description: z.string().min(3),
  requirements: z.string().min(3),
  adress: z.string().min(3),
  cost: z.string().min(0),
  startsAt: z.date({
    required_error: "A date is required.",
  }),
  endsAt: z.date({
    required_error: "A date is required.",
  }),
  deadlineForThesis: z.date({
    required_error: "A date is required.",
  }),
});
