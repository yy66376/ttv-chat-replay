import { MdReplay } from "react-icons/md";

interface ReplayControlProps {
  className?: string;
  onReplay: () => void;
}

const ReplayControl = ({ className, onReplay }: ReplayControlProps) => {
  return (
    <button className={className ?? ""} onClick={onReplay}>
      <MdReplay />
    </button>
  );
};

export default ReplayControl;
