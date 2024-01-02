import prisma from "../DB/db.config.js";

export const getAllComments=async(req, res)=>{
    const comments=await prisma.comment.findMany({
        include:{
            user:true,
            post:{
                include:{
                    user:true
                }
            }
        }
    })

    return res.json({status:200, data:comments})

}

export const createComment=async(req, res)=>{
    const {post_id, user_id, comment}=req.body;

   //increase the comment counter
   await prisma.post.update({
    where:{
        id:Number(post_id)
    },
    data:{
        comment_count:{
            increment:1
        }
    }
   })

    const newComment=await prisma.comment.create({
          data:{
            post_id:Number(post_id),
            user_id:Number(user_id),
            comment
          }
    })
    return res.json({status:200, data:newComment, msg:"comment created successfully."})
}

export const showComment=async(req, res)=>{
    const commentId=req.params.id;

    const fetchComment=await prisma.comment.findFirst({
        where:{
            id:commentId
        }
    })

    return res.json({status:200, fetchComment})
}

export const updateComment=async(req, res)=>{
    const commentId=req.params.id;
    const {post_id, user_id, comment}=req.body;

    const fetchComment=await prisma.comment.update({
        where:{
            id:commentId
        },
        data:{
            post_id:post_id,
            user_id:user_id,
            comment
        }
    })
    return res.json({status:200, data:fetchComment, msg:"Comment Updated Successfully."})
}

export const deleteComment=async(req, res)=>{
    const commentId=req.params.id;

       //decrease the comment counter
   await prisma.post.update({
    where:{
        id:Number(post_id)
    },
    data:{
        comment_count:{
            decrement:1
        }
    }
   })


    const comment=await prisma.comment.delete({
        where:{
            id: commentId
        }
    })

    res.json({status:200, data:comment, msg:"Comment Deleted Successfully."})
}