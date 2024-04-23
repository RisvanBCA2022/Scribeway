import PostCard from "@/components/PostCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Search = () => {
  const [sidebarData, setSidebarData] = useState({
    searchTerm: "",
    sort: "desc",
    category: "uncategorized",
  });
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const navigate=useNavigate()
  const location = useLocation();
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const sortFromUrl = urlParams.get("sort");
    const categoryFromUrl = urlParams.get("category");
    if (searchTermFromUrl || sortFromUrl || categoryFromUrl) {
      setSidebarData({
        ...sidebarData,
        searchTerm: searchTermFromUrl,
        sort: sortFromUrl,
        category: categoryFromUrl,
      });
    }

    const fetchPosts = async () => {
      setLoading(true);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/post/getposts?${searchQuery}`);
      if (!res.ok) {
        setLoading(false);
        return;
      }
      if (res.ok) {
        const data = await res.json();
        console.log(data);
        setPosts(data.posts);
        setLoading(false);
        if (data.posts.length === 9) {
          setShowMore(true);
        } else {
          setShowMore(false);
        }
      }
    };
    fetchPosts();
  }, [location.search]);

  const handleChange = (e) => {
    if (e.target.id === 'searchTerm') {
      setSidebarData({ ...sidebarData, searchTerm: e.target.value });
    }

    if (e.target.id === 'category') {
      const category = e.target.value || 'uncategorized';
      setSidebarData({ ...sidebarData, category });
    }
  };

  const handleSubmt= async (e)=>{
    e.preventDefault()
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('searchTerm',sidebarData.searchTerm)
    urlParams.set('sort',sidebarData.sort)
    urlParams.set('category', sidebarData.category)

    const searchQuery=urlParams.toString();
    navigate(`/search?${searchQuery}`)
  }

  console.log(sidebarData);
  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7 border-b md:border-r md:min-h-screen border-gray-500">
        <form onSubmit={handleSubmt}>
          <div className="flex items-center gap-2 mb-4">
            <label className='whitespace-nowrap font-semibold'>
              Search Term:
            </label>
            <Input
              placeholder="Search..."
              id="searchTerm"
              type="text"
              value={sidebarData.searchTerm}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center gap-4">
            <label className="font-semibold">Sort:</label>
            <Select 
  onValueChange={(e)=>setSidebarData({...sidebarData, sort: e})}
  defaultValue={sidebarData.sort}
  value={sidebarData.sort}
  id='sort'
>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="Latest" />
  </SelectTrigger>
  <SelectContent>
    <SelectGroup>
      <SelectItem value="desc">Latest</SelectItem>
      <SelectItem value="asc">Oldest</SelectItem>
    </SelectGroup>
  </SelectContent>
</Select> 

          </div>
          <div className="flex items-center gap-4 mt-4">
            <label className="font-semibold">Category:</label>
            <Select 
  onValueChange={(e)=>setSidebarData({...sidebarData, category: e})}
  defaultValue={sidebarData.category}
  id='sort'
>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="Latest" />
  </SelectTrigger>
  <SelectContent>
    <SelectGroup>
      <SelectItem value="uncategorized">uncategorized</SelectItem>
      <SelectItem value="reactjs">React.js</SelectItem>
      <SelectItem value="nextjs">Next.js</SelectItem>
      <SelectItem value="javascript">Javascript</SelectItem>
    </SelectGroup>
  </SelectContent>
</Select> 

          </div>
          <Button type='submit' className='mt-5'>
            Search
          </Button>
        </form>
      </div>
      <div className="w-full">
        <h1 className="text-3xl font-semibold sm:border-b border-gray-500 p-3 m-5">Posts Results:</h1>
        <div className="p-7 flex flex-wrap gap-4">
            {
                !loading && posts.length===0 &&(
                    <p className="text-xl text-gray-500">No Posts found.</p>
                )
            }
            {
                loading && (
                    <p className="text-xl">
                        Loading...
                    </p>
                )
            }
              {
                !loading && posts && posts.map((post)=>(
                    <PostCard post={post} />
                ))
            }
        </div>
            {
                showMore && <button className="text-green-500 text-lg hover:underline pl-7" onClick={handleShowMore}>
                    Show More
                </button>
            }
      </div>
    </div>
  );
};

export default Search;
