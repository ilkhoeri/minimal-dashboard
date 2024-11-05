import * as z from 'zod';

export const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+?<>{}\/]).{8,}$/;

export const passwordMessage =
  'Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character, and minimum of 8 characters required.';

export const passwordSchema = (message: string) =>
  z.string().refine((password) => passwordRegex.test(password), {
    message
  });

export const SettingsUserImageSchema = z.object({
  image: z.string().min(0).optional()
});

export const SettingsSchema = z
  .object({
    name: z.optional(z.string()),
    alias: z.optional(z.string()),
    email: z.optional(z.string().email()),
    image: z.optional(z.string()),
    birth: z.optional(z.date()),
    phone: z.optional(z.string()),
    bio: z.string().min(0).optional(),
    resume: z.string().min(0).optional(),
    isTwoFactorEnabled: z.optional(z.boolean()),
    password: z.optional(passwordSchema(passwordMessage)),
    newPassword: z.optional(passwordSchema(passwordMessage))
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) {
        return false;
      }

      return true;
    },
    {
      message: 'New password is required!',
      path: ['newPassword']
    }
  )
  .refine(
    (data) => {
      if (data.newPassword && !data.password) {
        return false;
      }

      return true;
    },
    {
      message: 'Password is required!',
      path: ['password']
    }
  );

export const NewPasswordSchema = z.object({
  password: passwordSchema(passwordMessage)
});

export const ResetSchema = z.object({
  email: z.string().email({
    message: 'Email is required'
  })
});

export const SignInSchema = z.object({
  email: z.string().email({
    message: 'Email is required'
  }),
  password: passwordSchema(passwordMessage),
  code: z.optional(z.string())
});

export const SignUpSchema = z
  .object({
    name: z.string().min(1, {
      message: 'Name is required'
    }),
    email: z.string().email({
      message: 'Email is required'
    }),
    image: z.optional(z.string()),
    password: passwordSchema(passwordMessage),
    confirmPassword: passwordSchema("Passwords don't match")
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: passwordMessage,
    path: ['confirmPassword'] // path of error
  });
