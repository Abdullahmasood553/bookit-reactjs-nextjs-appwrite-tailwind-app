import { Client, Databases, Account, Storage } from 'node-appwrite'

// Admin Client
const createAdminClient = async () => {
    const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)
    .setKey(process.env.NEXT_APPWRITE_KEY);

    return {
        get account() {
            return new Account(client);
        },
        get databases() {
            return new Databases(client);
        },
        get storage() {
            return new Storage(client);
        }
    }
}

// Session Client - REMOVE async since it's not needed
const createSessionClient = (session) => {
    const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID); // Changed to PROJECT_ID to match admin client

    if (session) {
        client.setSession(session); 
    }
    return {
        get account() {
            return new Account(client);
        },
        get databases() {
            return new Databases(client);
        }
    }
}

export { createAdminClient, createSessionClient }