// src/features/evaluations/components/DeleteEvaluationDialog.jsx

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "/src/components/ui/alert-dialog";

export function DeleteEvaluationDialog({ onConfirm, children }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {children}
      </AlertDialogTrigger>

      <AlertDialogContent className="rounded-2xl border border-neutral-200 shadow-sm">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-neutral-900">
            Delete Evaluation
          </AlertDialogTitle>

          <AlertDialogDescription className="text-neutral-600">
            Are you sure you want to delete this evaluation? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel className="border-neutral-300 text-neutral-700 hover:bg-neutral-100">
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={onConfirm}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

