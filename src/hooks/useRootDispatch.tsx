import { useDispatch } from "react-redux";
import { RootDispatch } from "../store/redux/root-store";

export const useRootDispatch = useDispatch.withTypes<RootDispatch>();
