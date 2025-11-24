"use server";

export async function handleContact(formData: FormData) {
  const name = formData.get("name") as string;
  const message = formData.get("message") as string;

  console.log("New Contact:", { name, message });

  return {
    success: true,
    msg: `Cảm ơn ${name}, tin nhắn của bạn đã được gửi!`,
  };
}
