import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";

type TableActionsFieldProps = {
  onDelete: () => void;
};

export default function TableActionsField({
  onDelete,
}: TableActionsFieldProps) {
  return (
    <IconButton aria-label="delete" color="primary" onClick={onDelete}>
      <DeleteIcon />
    </IconButton>
  );
}
