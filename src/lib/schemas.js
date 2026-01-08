import { z } from 'zod';

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.email("Invalid email address"),
  whatsappNumber: z.string().min(10, "Invalid phone number"),
  collegeName: z.string().min(2, "College name is required"),
  yearOfStudy: z.enum(['1st Year', '2nd Year', '3rd Year', '4th Year', '5th Year', 'Graduated', 'Other']),
  workshop: z.string().min(1, "Please select a workshop"),
  attendedBefore: z.enum(['Yes', 'No']),
  referralSource: z.string().optional(),
  referralCode: z.string().optional(),
  upiTransactionId: z.string().min(4, "Transaction ID is required"),
  amount: z.coerce.number().min(1, "Amount is required"),
  paymentScreenshot: z
    .any()
    .refine((files) => files?.length > 0, "Payment screenshot is required.")
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `Max file size is 2MB.`)
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
});
