import conf from '../conf/conf.js';
import { Client, ID, Databases, Storage, Query } from "appwrite";
import { Permission, Role } from 'appwrite';
import { ImageFormat } from "appwrite";


export class Service{
    client = new Client();
    databases;
    bucket;
    
    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({title, slug, content, featureimage, expdate, status, userId, Type, description}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featureimage: featureimage, 
                    status,
                    userid: userId, 
                    Type,
                    expdate,
                    description
                }
            )
        } catch (error) {
            console.log("Appwrite serive :: createPost :: error", error);
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            );
            return true;
        } catch (error) {
            console.log("Appwrite service :: deletePost :: error", error);
            return false;
        }
    }

    async getPost(slug) {
        try {
            const document = await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            );
    
            return document; // Assuming this method returns the document object
        } catch (error) {
            console.log("Appwrite service :: getPost :: error", error);
            return false; // Return false or handle error as needed
        }
    }
    

    async getPosts(queries = [Query.equal("status", "active")]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries,
                [Permission.read(Role.any())],
                

            )
        } catch (error) {
            console.log("Appwrite serive :: getPosts :: error", error);
            return false
        }
    }
    
    }
    
    
    
     


const service = new Service()
export default service