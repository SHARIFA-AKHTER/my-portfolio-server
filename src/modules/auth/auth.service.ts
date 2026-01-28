import { signToken } from "../../utils/jwt";
import { comparePassword, hashPassword } from "../../utils/bcrypt";
import prisma from "../../config/db";
import { OAuth2Client } from 'google-auth-library';

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


const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const authWithGoogle = async (payload: any) => {
  const { token } = payload;

  if (!token) throw new Error("Google token missing");

  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  const google = ticket.getPayload();

  const email = google?.email;
  const name =
    google?.name ||
    google?.email?.split("@")[0] ||
    "Google User";

  const picture = google?.picture || null;

  if (!email) throw new Error("Google email not found");

  let user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    user = await prisma.user.create({
      data: {
        email,
        name,
      picture: picture,
        password: "google-auth",
      },
    });
  }

  const jwt = signToken({ id: user.id, email: user.email }, "7d");

  return {
    success: true,
    token: jwt,
    user,
  };
};

export const authWithFacebook = async (payload: any) => {
  const { accessToken } = payload; 

  if (!accessToken) throw new Error("Facebook access token missing");


  const fbResponse = await fetch(
    `https://graph.facebook.com/me?fields=id,name,email,picture.type(large)&access_token=${accessToken}`
  );
  
  const fbData = await fbResponse.json();

  if (fbData.error) {
    throw new Error(fbData.error.message || "Invalid Facebook token");
  }

  const email = fbData.email;
  const name = fbData.name || "Facebook User";
  const picture = fbData.picture?.data?.url || null;

  if (!email) {
    throw new Error("Email not found in Facebook account. Please ensure your Facebook email is public.");
  }

  let user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    user = await prisma.user.create({
      data: {
        email,
        name,
        picture: picture,
        password: "facebook-auth",
        role: "USER" 
      },
    });
  }

  const jwt = signToken({ id: user.id, email: user.email, role: user.role }, "7d");

  return {
    success: true,
    token: jwt,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
};


export const AuthService = {
  loginWithEmailAndPassword,
  authWithGoogle,
  authWithFacebook,
};
