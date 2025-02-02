import { z } from 'zod';

export const sendFormStxSchema = z.object({
  amount: z.string().refine(val => !isNaN(Number(val)) && Number(val) > 0, {
    message: '',
  }),
  recipient: z.string(),
  memo: z.string().optional(),
  nonce: z.number().or(z.string()),
  fee: z.string(),
});

export type SendFormStxSchema = z.infer<typeof sendFormStxSchema>;

export const defaultSendFormStxValues: SendFormStxSchema = {
  amount: '',
  recipient: '',
  memo: '',
  nonce: '',
  fee: '',
};
