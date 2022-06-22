import { Post } from '@prisma/client'
import { db } from './db.server'

export type { Post } from '@prisma/client'

export const getPosts = () =>{
    return db.post.findMany({include:{author: {select:{email: true, id: true}}}})
}

export const createPost = ({title, body, authorId}: Pick<Post, 'title' | 'body' | 'authorId'>) =>{
    return db.post.create({data:{title, body, authorId}})
}