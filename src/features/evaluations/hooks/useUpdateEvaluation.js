import { useState } from "react";
import { updateEvaluation } from "../evaluationsStore";

export function useUpdateEvaluation() {
  const [updating, setUpdating] = useState(false);

  async function update(id, data) {
    setUpdating(true);

    await new Promise((resolve) => setTimeout(resolve, 400));

    updateEvaluation(id, data);

    setUpdating(false);
    return { success: true };
  }

  return { update, updating };
}
