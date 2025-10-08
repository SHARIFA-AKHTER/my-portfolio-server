import { signToken } from "../../utils/jwt";
import { comparePassword, hashPassword } from "../../utils/bcrypt";
import prisma from "../../config/db";

interface LoginPayload {
  email: string;
  password: string;
}

interface GooglePayload {
  idToken: string;
}

const loginWithEmailAndPassword = async (payload: LoginPayload) => {
  const { email, password } = payload;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error("User not found!");
  }

  // password check
  const isMatch = await comparePassword(password, user.password || "");
  if (!isMatch) {
    throw new Error("Invalid credentials!");
  }

  // JWT token generate with role
  const token = signToken(
    { id: user.id, email: user.email, role: user.role },
    "1d"
  );

  return {
    success: true,
    message: "Login successful",
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
};

// Google Auth (Basic)
const authWithGoogle = async (payload: GooglePayload) => {
  const { idToken } = payload;

  if (!idToken) {
    throw new Error("Google idToken required!");
  }

  const googleEmail = "googleuser@example.com";
  const googleName = "Google User";

  // check user exists
  let user = await prisma.user.findUnique({
    where: { email: googleEmail },
  });

  if (!user) {
    user = await prisma.user.create({
      data: {
        email: googleEmail,
        name: googleName,
        password: await hashPassword("google-auth"),
        phone: "01315909090",
      },
    });
  }

  const token = signToken({ id: user.id, email: user.email }, "1d");

  return {
    success: true,
    message: "Google auth successful",
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  };
};

export const AuthService = {
  loginWithEmailAndPassword,
  authWithGoogle,
};
