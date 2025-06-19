import { InputAdornment, TextField } from "@mui/material";
import React from "react";

const InputBox = React.forwardRef((props, ref) => {
  const {
    id,
    name,
    type,
    size = "small",
    label,
    variant = "outlined",
    value,
    defaultValue,
    placeholder,
    className,
    disabled,
    InputLabelProps,
    InputProps = {style: { borderRadius: "599px" }},
    error,
    helperText,
    multiline,
    rows,
    onChange,
    onBlur,
    onKeyDown,
    startAdornment, // Destructure startAdornment from props
    endAdornment, // Destructure endAdornment from props
  } = props;

  return (
    <TextField
      id={id}
      fullWidth
      name={name}
      type={type}
      size={size}
      label={label}
      variant={variant}
      value={value}
      autoComplete="off"
      defaultValue={defaultValue}
      placeholder={placeholder}
      className={`${className}`}
      disabled={disabled}
      InputProps={{
        ...InputProps, // Spread any additional InputProps
        startAdornment: startAdornment && (
          <InputAdornment position="start">
            {startAdornment}
          </InputAdornment>
        ),
        endAdornment: endAdornment && (
          <InputAdornment position="end">
            {endAdornment}
          </InputAdornment>
        ),
      }}
      error={error}
      helperText={helperText}
      multiline={multiline}
      rows={rows}
      inputRef={ref}
      InputLabelProps={InputLabelProps}
      onChange={onChange}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
    />
  );
});

export default InputBox;