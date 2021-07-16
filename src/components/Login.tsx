import { Icon, Button } from "@chakra-ui/react";
import { BsFillPersonFill, BsFillUnlockFill, BsLockFill } from "react-icons/bs";
import Image from "next/image";
import {
  Flex,
  Box,
  Input,
  Stack,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Divider,
  HStack,
  Heading,
  useMediaQuery,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useState } from "react";
import { MdArrowForward } from "react-icons/md";
import { FaFacebook, FaGithub } from "react-icons/fa";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import LOGO from "../../assets/cnclogo.png";

type LoginInputs = {
  username: string;
  password: string;
};
const Login = () => {
  const [Mobile420] = useMediaQuery("(max-width: 420px)");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState<LoginInputs>({
    username: "",
    password: "",
  });

  const mockSubmit = (values: any) => {
    function randomIntFromInterval(min: number, max: number) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    }

    const rndInt = randomIntFromInterval(0, 1);
    const role = ["DEVELOPER", "ADMIN"];

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setInputs(values);
      localStorage.setItem("accessToken", "hello");
      localStorage.setItem("role", role[rndInt]);
    }, 2000);
  };
  const handleClick = () => setShow(!show);

  const loginInputSchema = Yup.object({
    username: Yup.string()
      .min(2, "Must be 3 characters or more")
      .required("Username is required"),
    password: Yup.string()
      .min(3, "Must be 3 characters or more")
      .required("Password is required"),
  });

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bgGradient="linear-gradient(312deg, rgba(80,175,230,1) 50%, rgba(255,255,255,1) 50%)"
    >
      <Box
        p={8}
        shadow="lg"
        borderRadius="md"
        bgColor="white"
        style={{
          height: Mobile420 ? "100vh" : "auto",
          width: Mobile420 ? "100vw" : "auto",
        }}
      >
        <Stack spacing={5} align="center" width="100%">
          <Image
            src={LOGO}
            width={120}
            height={120}
            alt="Cauld And Clark"
            style={{ margin: Mobile420 ? "2.5rem 0" : "" }}
            objectFit="cover"
            boxSize="120px"
          />

          <Formik
            initialValues={{ username: "", password: "" }}
            onSubmit={(values, actions) => mockSubmit(values)}
            validationSchema={loginInputSchema}
          >
            {(props) => (
              <Form>
                <Field name="username">
                  {({ field, form }: any) => (
                    <FormControl
                      isInvalid={form.errors.username && form.touched.username}
                      width="100%"
                    >
                      <InputGroup size="lg">
                        <InputLeftElement
                          pointerEvents="none"
                          children={
                            <Icon as={BsFillPersonFill} color="gray.400" />
                          }
                        />
                        <Input
                          {...field}
                          id="username"
                          placeholder="Username"
                          focusBorderColor="black.400"
                        />
                      </InputGroup>
                      <FormErrorMessage>
                        {form.errors.username}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <Field name="password">
                  {({ field, form }: any) => (
                    <FormControl
                      isInvalid={form.errors.password && form.touched.password}
                      width="100%"
                      mt="1rem"
                    >
                      <InputGroup size="lg">
                        <InputLeftElement
                          pointerEvents="none"
                          children={
                            show ? (
                              <Icon as={BsFillUnlockFill} color="gray.400" />
                            ) : (
                              <Icon as={BsLockFill} color="gray.400" />
                            )
                          }
                        />
                        <Input
                          {...field}
                          id="password"
                          placeholder="Password"
                          focusBorderColor="gray.400"
                          pr="4.5rem"
                          type={show ? "text" : "password"}
                        />
                        <InputRightElement width="4.5rem">
                          <Button h="1.75rem" size="sm" onClick={handleClick}>
                            {show ? "Hide" : "Show"}
                          </Button>
                        </InputRightElement>
                      </InputGroup>
                      <FormErrorMessage>
                        {form.errors.password}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Button
                  mt="1rem"
                  isLoading={loading}
                  loadingText="Wait.."
                  colorScheme="blue"
                  width="100%"
                  size="md"
                  type="submit"
                  rightIcon={<MdArrowForward />}
                >
                  Login
                </Button>
              </Form>
            )}
          </Formik>
        </Stack>

        <HStack my="1rem">
          <Divider />
          <Heading as="h6" size="xs" color="gray.500">
            {" "}
            or{" "}
          </Heading>
          <Divider />
        </HStack>

        <HStack>
          <Button
            isLoading={loading}
            loadingText="Wait.."
            onClick={mockSubmit}
            width="50%"
            size="md"
            colorScheme="facebook"
            leftIcon={<FaFacebook />}
          >
            Facebook
          </Button>
          <Button
            isLoading={loading}
            loadingText="Wait.."
            onClick={mockSubmit}
            width="50%"
            size="md"
            bgColor="color.600"
            leftIcon={<FaGithub />}
          >
            Github
          </Button>
        </HStack>
      </Box>
    </Flex>
  );
};

export default Login;
