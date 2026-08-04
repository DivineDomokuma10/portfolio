import { revalidatePath } from "next/cache";

export function revalidateContent() {
  revalidatePath("/", "layout");
}
