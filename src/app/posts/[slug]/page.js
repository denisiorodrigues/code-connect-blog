import logger from "@/logger"

async function getPost(slug) {
  const response = await fetch(`http://localhost:3042/posts?slug=${slug}`).catch((error) => {
    logger.error("Falha na requisição ao servidor." + error)
  })

  if(!response || !response.ok) {
    logger.error("Problema ao obter os posts")
    return {}
  }

  const data = await response.json()

  if(data.length === 0) {
    return {}
  }

  return data[0]
}

export default async function SlugPage({ params }) {
    const { slug } = params
    const post = await getPost(slug)
    return (
      <div>
        <h1>{post.title}</h1>
        <p>{post.content}</p>
      </div>
    );
}