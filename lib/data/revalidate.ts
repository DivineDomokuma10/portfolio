import { revalidatePath } from "next/cache";

export function revalidateContent() {
  revalidatePath("/");
  revalidatePath("/works");
  revalidatePath("/about-me");
  revalidatePath("/", "layout");
}
