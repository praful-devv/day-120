import { useForm } from "react-hook-form";
import { LoginThunk, RegisterThunk } from "../states/authThunkSlice";
import { useSelector, useDispatch } from "react-redux";

const authHook = () => {

  

  const dispatch = useDispatch()

    const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
    } = useForm();

    function OnRegister(data){
        dispatch(RegisterThunk(data));
    }

  async function OnLogin(data){
    dispatch(LoginThunk(data))
    reset()
    }

  return { register, handleSubmit, errors, OnRegister, OnLogin };
};

export default authHook;
