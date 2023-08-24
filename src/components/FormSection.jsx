import React from "react";
import TextInput from "./TextInput";

const FormSection = ({ isLoginUser, formProps }) => {
  return (
    <>
      {!isLoginUser && (
        <>
          <TextInput
            type={"text"}
            urlIcon={"/images/user.png"}
            placeholder="First Name"
            id="first_name"
            registerProps={formProps.register("first_name", {
              required: "First name is required",
              maxLength: {
                value: 20,
                message: "First name is too long",
              },
            })}
            error={formProps.errors.first_name}
          />

          <TextInput
            type={"text"}
            placeholder={"Last Name"}
            id="last_name"
            registerProps={formProps.register("last_name", {
              required: "Last name is required",
              maxLength: {
                value: 20,
                message: "Last name is too long",
              },
            })}
            error={formProps.errors.last_name}
          />
          <TextInput
            type={"date"}
            placeholder="dd/mm/aaaa"
            urlIcon={"/images/birthday-cake.png"}
            id="birthday"
            registerProps={formProps.register("birthday", {
              required: "Birthday is required",
            })}
          />
        </>
      )}

      <TextInput
        type={"email"}
        urlIcon={"/images/email.png"}
        placeholder={"Example@gmail.com"}
        id="email"
        registerProps={formProps.register("email", {
          required: "Email is required",
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            message: "Invalid email format",
          },
        })}
        error={formProps.errors.email}
      />

      <TextInput
        type="password"
        urlIcon="/images/lock.png"
        placeholder="Password"
        id="password"
        registerProps={formProps.register("password", {
          required: "Password is required",
          pattern: {
            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/,
            message:
              "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number.",
          },
        })}
        error={formProps.errors.password}
      />
    </>
  );
};

export default FormSection;
