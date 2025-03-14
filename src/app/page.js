import { CardPost } from "@/components/CardPost";
import logger from "@/logger";
import styles from './page.module.css'
import Link from "next/link";
import db from "../../prisma/db";

async function getAllPosts(page = 1, search) {
  try{
    
    const where = {title : {
      contains: search,
      mode: 'insensitive'
    }}
    const perPage = 4
    const skip = (page - 1) * perPage
    const totalItems = await db.post.count({where})
    const totalPages = Math.ceil(totalItems / perPage)
    const next = page < totalPages ? page + 1 : null
    const prev = page > 1 ? page - 1 : null

    if(search) {
      where.title = {
        contains: search,
        mode: 'insensitive'
      }
    }

    const posts = await db.post.findMany({
      take: perPage,
      skip,
      where,
      orderBy: {
        createdAt: 'desc'
      },  
      include: {
        author: true
      }
    })
    
    return { data:posts, next, prev }

  } catch (error) {
    logger.error(error)
    return { data:[], next: null, prev: null }
  }
} 
 

export default async function Home({ searchParams }) {
  const curretPage = parseInt(searchParams?.page || 1)
  const search = searchParams?.q || ''
  const { data: posts, next, prev } = await getAllPosts(curretPage, search)
  return (
    <main className={styles.grid}>
      {
        posts.map(post => <CardPost key={post.id}  post={post} />)
      }
      <div className={styles.links}>
        { prev && <Link href={{pathname: '/', query: { q:search, page: prev}}}>Anterior</Link> }
        { next && <Link href={{pathname: '/', query: { q:search, page: next}}}>Próxima</Link> }
      </div>
    </main>
  );
}
