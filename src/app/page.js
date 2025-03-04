import { CardPost } from "@/components/CardPost";


async function getAllPosts() {
  const response = await fetch('http://localhost:3042/posts')
  if(!response.ok) {
    console.log("Ops, algo ocorreu mal")
  }

  return response.json()
} 
 

export default async function Home() {
  const posts = await getAllPosts()
  console.log(posts)
  return (
    <main>
      {posts.map(post => <CardPost post={post} />)}
       
    </main>
  );
}
