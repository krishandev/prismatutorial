import prisma from "../DB/db.config.js";

//Get all Users

export const fetchUsers=async (req, res)=>{
    const users=await prisma.user.findMany({

        //fetch all users with all posts
        // include:{
        //     post:true
        // }
        
        // -----------------------------
        // Fetch posts and comment of all users
        select:{
            _count:{
                select:{
                    post:true,
                    comment:true
                }
            }
        },
        
        //--------------------------------
        //fetch users with post titles
        include:{
            post:{
                select:{
                    title:true
                }
            }
        }

    })

    return res.json({status:200, data:users, })
}

export const createUser=async (req, res)=>{
    const {name, email, password}=req.body

    const findUser=await prisma.user.findUnique({
        where:{
            email:email
        }
    })

    if(findUser){
        return res.json({status:400, message:"Email Already Taken. Please another email."})
    }

    const newUser=await prisma.user.create({
        data:{
            name:name,
            email:email,
            password:password
        }
    })

    return res.json({status:200, data:newUser, msg:"User Created."})
}

//update user

export const updateUser=async (req, res)=>{
    const userId=req.params.id;
    const {name, email, password}=req.body;

    await prisma.user.update({
        where:{
            id:Number(userId)
        },
        data:{
            name,
            email,
            password
        }
    })
    return res.json({status:200, msg:"User Updated Successfully."})
}

//get single user

export const singleUser=async (req, res)=>{
    const userId=req.params.id;
    const user=await prisma.user.findFirst({
        where:{
            id: Number(userId)
        }
    })

    return res.json({status:200, data:user})
}

//delete user

export const deleteUser=async (req, res)=>{
    const userid=req.params.id;

    const getsingleUser=await prisma.user.delete({
        where:{
            id:Number(userid)
        }
    })

    res.json({status:200, data:getsingleUser, msg:"User Deleted Successfully."})
}
