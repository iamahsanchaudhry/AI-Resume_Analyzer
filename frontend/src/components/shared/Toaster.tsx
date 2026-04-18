import { toast } from "sonner";

export default function Toaster(
  type: "success" | "error",
  message: string,
  description: string,
) {
  return toast[type](message, {
    description: description,
    action: {
      label: "Close",
      onClick: () => toast.dismiss(),
    },
  });
}
