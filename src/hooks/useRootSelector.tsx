import { useSelector } from "react-redux";
import { RootState } from "../store/redux/root-store";

export const useRootSelector = useSelector.withTypes<RootState>();
