import { rejects } from "assert"
import { resolve } from "path"
import { error } from "console"
import { getAccessToken } from "../lib/actions"

const apiService = {  


    get: async function (url : string): Promise<any> {
        console.log('get', url)
        const token = await getAccessToken()
        
    
        return new Promise((resolve, reject) =>{
            fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
    
                }
                
            })
            .then(response => response.json())
            .then((json) =>{
                console.log('json', json)
    
                resolve(json)
            })
            .catch((error) =>{
                console.log('error', error)
                reject(error)
            })
        })
       },

       getwithoutToken: async function (url : string): Promise<any> {
        console.log('get', url)
        
        
    
        return new Promise((resolve, reject) =>{
            fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
                method: "GET",
                
                
            })
            .then(response => response.json())
            .then((json) =>{
                console.log('json', json)
    
                resolve(json)
            })
            .catch((error) =>{
                console.log('error', error)
                reject(error)
            })
        })
       },

    
       postWithoutToken: async function(url : string, data : any): Promise<any> {
        console.log('post', url)
       
        return new Promise((resolve, reject) =>{
            
            fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
                method: "POST",
                body: data,
                headers: {
                    'accept': 'application/json',
                    'Content-type': 'application/json',
                   
    
                }
            })
    
            .then(response => response.json())
            .then((json) =>{
                resolve(json)
            })
    
            .catch((error) =>{
                reject(error)
            })
    
    
        })
       
       },

       post: async function(url : string, data : any): Promise<any> {
        const token = await getAccessToken()
        return new Promise((resolve, reject) =>{
            
            fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
                method: "POST",
                body: data,
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
    
                }
            })
    
            .then(response => response.json())
            .then((json) =>{
                resolve(json)
            })
    
            .catch((error) =>{
                reject(error)
            })
    
    
        })
       
       },

       put: async function(url: string, data: FormData): Promise<any> {
        const token = await getAccessToken();
        return fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
          method: "PUT",
          body: data, // Send FormData directly
          headers: {
            'Authorization': `Bearer ${token}`
            // REMOVE "Content-Type": "application/json"
          }
        })
        .then(response => response.json())
        .catch(error => {
          console.error('API Error:', error);
          throw error;
        });
      }
       
    
    
    


}

export default apiService