import { serverURL } from "./serverURL";
import { commonAPI } from "./commonAPI";

//1)upload video

export const uploadVideo =async(reqBody)=>{
    return await commonAPI('POST',`${serverURL}/videos`,reqBody) 
}

//2 Get all videos

export const getAllVideos = async ()=>
    {
        return await commonAPI('GET',`${serverURL}/videos`,"")
    }
// 3) delete video

export const deleteVideo = async(id)=>{
    return await commonAPI('DELETE',`${serverURL}/videos/${id}`,{})
}

// 4) add to watch history

export const addToHistory = async(videoDetails)=>{
    return await commonAPI('POST',`${serverURL}/history`,videoDetails)
}

//5) get all watch history

export const getAllhistory = async ()=>
    {
        return await commonAPI('GET',`${serverURL}/history`,"")
    }

// 6) delete history

export const deleteHistory = async(id)=>{
    return await commonAPI('DELETE',`${serverURL}/history/${id}`,{})
}

//7) Add category

export const addCategory =  async(reqBody)=>{
    return await commonAPI('POST',`${serverURL}/category`,reqBody)
}

//8)get all category

export const getAllCategory = async ()=>
    {
        return await commonAPI('GET',`${serverURL}/category`,"")
    }

//9) Delete category
 export const deleteCategory = async (id) =>{
    return await commonAPI ('DELETE',`${serverURL}/category/${id}`,{})
 }