import { Account, Client, Databases, Storage } from "node-appwrite"


const createAdminClient = async () => {
    const adminClient = new Client()
        .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
        .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT)
        .setKey(process.env.NEXT_APPWRITE_KEY);
    return {
        get account() {
            return new Account(adminClient)
        },
        get databases() {
            return new Databases(adminClient)
        },
        get storage() {
            return new Storage(adminClient)
        }
    }
}
const createSessionClient = async (session) => {
    const client = new Client()
        .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
        .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT);
    if (session) client.setSession(session)
    return {
        get account() {
            return new Account(client)
        },
        get databases() {
            return new Databases(client)
        }
    }
}

export { createAdminClient, createSessionClient }