export default function validateForm(values) {
  let errors = {};

  const validateEmail = (email, name) => {
    if (
      !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        email
      )
    ) {
      errors[name] = "Dirección de correo inválida";
    }
  };

  const validatePassword = (password, name) => {
    if (password.length < 6)
      errors[name] = "Contraseña debe tener al menos 6 carácteres";
  };

  const validateNumber = (number, name) => {
    if (!/^\d+$/.test(number)) {
      errors[name] = "Número no válido";
    }
  };

  for (const obj of Object.keys(values)) {
    if (values[obj].value.length === 0) {
      errors[obj] = values[obj].title + " Requerido";
      continue;
    } else {
      switch (values[obj].type) {
        case "email":
          validateEmail(values[obj].value, obj);
          break;
        case "password":
          validatePassword(values[obj].value, obj);
          break;
        case "confirm":
          if (values["confirm"].value !== values["password"].value)
            errors.confirm = "Contraseñas no coinciden";
          break;
        case "number":
          validateNumber(values[obj].value, obj);
      }
    }
  }

  return errors;
}
