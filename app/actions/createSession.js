"use server";
import { createAdminClient } from "@/config/appwrite";
import { cookies } from "next/headers";

 async function createSession(prevState, formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  if (!email || !password) {
    return { error: "Please fill out all fields" };
  }

  // Get account instance
  const { account } = await createAdminClient();

  try {
    // Generate session
    const session = await account.createEmailPasswordSession(email, password);

 // Get cookie store first by awaiting cookies()
    const cookieStore = await cookies();
    
    // Create cookie using the cookieStore instance
    cookieStore.set('appwrite-session', session.secret, {
        httpOnly: true, 
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        expires: new Date(session.expire),
        path: '/'
    });


    return {
      success: true, 
    }

  } catch(error) {
    console.log('Authentication Error: ', error);
    return {
       error:  'Invalid Credentials'
    }
  }
}

export default createSession;
