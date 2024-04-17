import { MdReplay } from "react-icons/md";
import { useRootDispatch } from "../../../hooks/useRootDispatch";
import { replay } from "../../../store/redux/features/video/videoSlice";

interface ReplayControlProps {
  className?: string;
}

const ReplayControl = ({ className }: ReplayControlProps) => {
  const dispatch = useRootDispatch();

  const handleReplay = () => {
    dispatch(replay());
  };

  return (
    <button className={className ?? ""} onClick={handleReplay}>
      <MdReplay />
    </button>
  );
};

export default ReplayControl;
