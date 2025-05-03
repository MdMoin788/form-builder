import { z } from "zod";

const UserDTO = z.object({
  name: z.string().min(3, "Name is required"),
  password: z.string().min(4, "Password is required"),
  email: z.string().email("Invalid email format").optional(),
});

export { UserDTO };
