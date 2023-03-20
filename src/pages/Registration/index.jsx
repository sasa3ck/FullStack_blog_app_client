import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";

import styles from "./Login.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchRegister, selectorIsAuth } from "../../redux/slices/auth";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";

export const Registration = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectorIsAuth);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (value) => {
    const data = await dispatch(fetchRegister(value));

    if (!data.payload) alert("Не удалось зарегистрироваться");

    if ("token" in data.payload)
      window.localStorage.setItem("token", data.payload.token);
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }
  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Создание аккаунта
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={styles.field}
          error={Boolean(errors.fullName?.message)}
          helperText={errors.fullName?.message}
          {...register("fullName", { required: "Укажите имя" })}
          label="Полное имя"
          fullWidth
        />
        <TextField
          className={styles.field}
          error={Boolean(errors.email?.message)}
          type="email"
          helperText={errors.email?.message}
          {...register("email", { required: "Укажите почту" })}
          label="E-Mail"
          fullWidth
        />
        <TextField
          className={styles.field}
          error={Boolean(errors.password?.message)}
          type="password"
          helperText={errors.password?.message}
          {...register("password", { required: "Укажите пароль" })}
          label="Пароль"
          fullWidth
        />
        <Button
          disabled={!isValid}
          type="submit"
          size="large"
          variant="contained"
          fullWidth
        >
          Зарегистрироваться
        </Button>
      </form>
    </Paper>
  );
};
