// AppwriteClient.ts
'use client'
import { Client, Storage } from "appwrite";

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("672eea12003a27727408");

const storage = new Storage(client);

export default storage;
