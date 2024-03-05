import * as z from "zod";

export const loginSchema = z.object({
  phoneNumber: z.string().min(10),
  password: z.string().min(4),
});

const passwordSchema = z
  .string()
  .min(8, { message: "Password kamida 8 ta harakterdan iborat bo'lishi kerak" })
  .max(30, { message: "Password 30 ta harakterdan oshmasligi kerak" });

export const registerSchema = z
  .object({
    fullName: z.string().min(3),
    phoneNumber: z.string().min(13),
    password: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwordlar mos kelmadi! Iltimos qayta urinib ko'ring.",
    path: ["confirmPassword"],
  });

export const forgotPasswordSchema1 = z.object({
  phoneNumber: z.string().min(13),
});

export const forgotPasswordSchema2 = z.object({
  smsCode: z.string().min(4).max(4),
});

export const forgotPasswordSchema3 = z.object({
  password: passwordSchema,
  confirmPassword: passwordSchema,
});

export const createPostSchema = z.object({
  name: z.string(),
  authors: z.string().nonempty("Iltimos mualliflarni kiriting."),
  description: z.string().nonempty("Iltimos izoh qoldiring."),
});

export const userAddSchema = z.object({
  users: z.array(z.string()).nonempty("Iltimos foydalanuvchilarni tanlang."),
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
  address: z.string().min(3),
  cost: z.string().min(0),
  startsAt: z.date({
    required_error: "Sana kiritilishi shart.",
  }),
  endsAt: z.date({
    required_error: "Sana kiritilishi shart.",
  }),
  deadlineForThesis: z.date({
    required_error: "Sana kiritilishi shart.",
  }),
});

export const FeedbackSchema = z.object({
  text: z.string().nonempty("Izohni kiriting."),
});
