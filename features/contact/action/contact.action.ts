"use server";

import { FormSchema } from "@/lib/utilities";

export async function sendMessage(data: FormSchema) {
  const response = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data, null, 2),
  });

  return await response.json();
}
