import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import * as yup from "yup";

function RegisterForm() {
  const passwordCriteria = {
    regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
    message:
      "Password harus mengandung huruf kecil, huruf besar, angka, dan simbol!",
  };

  const handleRegister = () => {
    alert(
      `Username: ${formik.values.username} \nEmail: ${formik.values.email} \nPassword: ${formik.values.password}`
    );
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    onSubmit: handleRegister,
    validationSchema: yup.object().shape({
      username: yup
        .string()
        .required("Username wajib diisi!")
        .min(3, "Username minimal 3 karakter")
        .max(10, "Username maksimal 10 karakter"),
      email: yup
        .string()
        .required("Email wajib diisi!")
        .email("Silahkan masukkan email yang valid"),
      password: yup
        .string()
        .required("Password wajib diisi!")
        .matches(passwordCriteria.regex, passwordCriteria.message),
    }),
  });

  const handleForm = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    formik.setFieldValue(target.name, target.value);
  };

  return (
    <Container maxW={"container.2xl"} py={10} centerContent>
      <Heading>User Registration</Heading>
      <Box
        padding={4}
        border={"1px solid lightgray"}
        rounded={4}
        mt={8}
        w={"20%"}
      >
        <form onSubmit={formik.handleSubmit}>
          <Stack>
            <FormControl isInvalid={!!formik.errors.username}>
              <FormLabel>Username</FormLabel>
              <Input type="text" name="username" onChange={handleForm} />
              <FormErrorMessage>{formik.errors.username}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!formik.errors.email}>
              <FormLabel>Email</FormLabel>
              <Input type="email" name="email" onChange={handleForm} />
              <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!formik.errors.password}>
              <FormLabel>Password</FormLabel>
              <Input type="password" name="password" onChange={handleForm} />
              <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
            </FormControl>

            <Button type="submit" colorScheme="teal" marginTop={30}>
              Register
            </Button>
          </Stack>
        </form>
      </Box>
    </Container>
  );
}

export default RegisterForm;
