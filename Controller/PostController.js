import prisma from "../DB/db.config.js";

export const getAllPosts=async (req, res)=>{
    const page=Number(req.query.page) || 1;
    const limit=Number(req.query.limit) || 10;

    if(page<=0){
        page=1
    }
    if(limit <=0 || limit>100){
        limit=10

    }
    const skip=(page-1) * limit;
    const posts=await prisma.post.findMany({
        skip:skip,
        take:limit,
        include:{
            comment:{
                include:{
                    //get all details of user
                    //user:true

                    user:{
                        select:{
                            name:true
                        }
                    }
                }
            }
        },
        orderBy:{
            id:"desc"
        },
        where:{
            comment_count:{
                gt:0
            }
        }
    })
    
    //to get the total posts count
    const totalPosts=await prisma.post.count();
    const totalPages=Math.ceil(totalPosts/limit);

    return res.json({status:200, data:posts, meta:{totalPages, currentPage:page, limit:limit,}})

}

export const createPost=async (req, res)=>{
    const {user_id, title, description}=req.body;

    const newPost=await prisma.post.create({
        data:{
            user_id:Number(user_id),
            title,
            description
        }
    })

    return res.json({status:200, data:newPost, msg:"Post Created Successfully."})
}

export const showPost=async(req, res)=>{
    const postid=req.params.id;
    
    const post=await prisma.post.findFirst({
        where:{
            id:Number(postid)
        }
    })

    return res.json({status:200, data:post})
}

export const updatePost=async(req, res)=>{
    const post_id=req.params.id;
    const {title, description}=req.body;

    const post=await prisma.post.update({
        where:{
            id:Number(post_id)        
        },
        data:{
            title,
            description
        }
    })

    return res.json({status:200, data:post, msg:"Post Updated Successfully."})
}

export const deletePost=async(req, res)=>{
    const postid=req.params.id;

    const post=await prisma.post.delete({
        where:{
            id:Number(postid)
        }
    })

    return res.json({status:200, data:post, msg:"Post Deleted Sucessfully."})
}

//to search the post

export const searchPost=async(req, res)=>{
    const query=req.query.q;
    const posts=await prisma.post.findMany({
        where:{
            description:{
                search:query
            }
        }
    })
    return res.json({status:200, data:posts})
}