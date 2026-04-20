import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogOverlay,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type AuthDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
};

const AuthDialog = ({ isOpen, onClose, onLogin }: AuthDialogProps) => {
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose(); // ✅ only close when false
      }}
    >
      <DialogOverlay className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
      <DialogContent className="sm:max-w-md text-center bg-transparent backdrop-blur">
        <DialogHeader>
          <DialogTitle>Save Your Results</DialogTitle>
          <DialogDescription>
            Create a free account to save your resume analysis history.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-3 mt-4">
          <Button onClick={onLogin} className="w-full">
            Login / Sign Up
          </Button>

          <Button variant="ghost" onClick={onClose} className="w-full">
            Continue as Guest
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthDialog;
