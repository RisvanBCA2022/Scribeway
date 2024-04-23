import Calltoaction from "@/components/Calltoaction";
import CommentSection from "@/components/CommentSection";
import PostCard from "@/components/PostCard";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const PostPage = () => {
  const { postSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [post, setPost] = useState(null);
  const [recentPost,setRecentPost]=useState(null)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);

        const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
        const data = await res.json();
        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        }
        if (res.ok) {
          setPost(data.posts[0]);
          setLoading(false);
          setError(false);
        }
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };

    fetchPost();
  }, [postSlug]);
  
  useEffect(()=>{
    try {
      const fetchRecentPost= async ()=>{
        const res = await fetch(`/api/post/getposts?limit=3`)
        const data = await res.json()
        console.log(data);
        if(res.ok){
          setRecentPost(data.posts)
        }

      }
      fetchRecentPost()
      
    } catch (error) {
      console.log(error);
    }
  },[])
  console.log(recentPost);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-8 border-dashed rounded-full animate-spin border-blue-600"></div>
      </div>
    );
  return <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
    <h1 className="text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl">{post && post.title}</h1>
    <Link to={`/search?category=${post && post.category}`} className="self-center mt-5" >
    <button className="text-gray-700 dark:text-gray-50">
        {post && post.category}
    </button>
    </Link>
    <img src={post && post.image} alt={post && post.title} className="mt-10 p-3 max-h-[600px] w-full object-cover" />
    <div className="flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs">
        <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
        <span className="bold">{post && (post.content.length / 1000).toFixed(0)} mins read</span>
    </div>
    <div
        className='p-3 max-w-2xl mx-auto w-screen overflow-hidden post-content'
        // dangerouslySetInnerHTML={{ __html: post && post.content }}
      >
                {post && renderContent(post.content)}

      </div>
    {/* <div className="max-w-4xl mx-auto w-full">
        <Calltoaction />
    </div> */}
    <CommentSection postId={post._id} />
    <div className="flex flex-col justify-center items-center mb-5">
      <h1 className="text-xl mt-5">Recent Articles</h1>
      <div className="flex gap-6 mt-6 flex-col md:flex-row lg:flex-row">
        { recentPost && (recentPost.map((post)=>(
          <PostCard key={post._id} post={post} />
        )))}
      </div>
    </div>
  </main>;
};

const renderContent = (htmlContent) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlContent, 'text/html');
  const elements = doc.body.childNodes;

  return Array.from(elements).map((element, index) => {
    if (element.nodeName === 'PRE' && element.firstChild.nodeName === 'CODE') {
      return (
        <div className="terminal-wrapper" key={index}>
          <SyntaxHighlighter language="css" style={terminalStyle}>
            {element.firstChild.textContent}
          </SyntaxHighlighter>
        </div>
      );
    } else if (element.nodeName === 'IMG') {
      return (
        <img key={index} src={element.src} alt={element.alt} />
      );
    } else {
      return (
        <div key={index} dangerouslySetInnerHTML={{ __html: element.outerHTML }} />
      );
    }
  });
};


export default PostPage;
