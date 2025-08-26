'use server';
import { createSessionClient } from '@/config/appwrite';
import { cookies } from 'next/headers';

async function destroySession() {
  try {
    console.log('Starting logout...');
    
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('appwrite-session');
    console.log('Session cookie found:', !!sessionCookie);

    if (!sessionCookie) {
      return { error: 'No session cookie found' };
    }

    console.log('Creating session client...');
    const sessionClient = createSessionClient(sessionCookie.value);
    console.log('Session client created:', !!sessionClient);
    
    console.log('Getting account...');
    const account = sessionClient.account;
    console.log('Account object:', account);

    if (!account) {
      return { error: 'Account is undefined' };
    }

    console.log('Deleting session...');
    await account.deleteSession('current');
    console.log('Session deleted');

    cookieStore.set('appwrite-session', '', {
      expires: new Date(0),
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    });

    return { success: true };
  } catch (error) {
    console.error('Logout error details:', error);
    return { error: 'Error deleting session: ' + error.message };
  }
}

export default destroySession;