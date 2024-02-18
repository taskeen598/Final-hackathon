import { create } from "zustand";
// import {persist,devtools} from "zustand/middleware"

const domain = "http://localhost:3004";

interface BlogState {
  blogs: [];
  singleBlog: {
    _id: string;
    user: {
      _id: string;
      profileImage: string;
      name: string;
    };
    reaction: [];
    comments: [];
    categories: {
      name: string;
    };
    title: string;
    description: string;
    image: string;
    status: string;
    tags: [];
    createdAt: string;
    updatedAt: string;
  };
  getAllBlogs: () => void;
  getSingleBlog: (id: string) => void;
}

const BlogStore = (set: any): BlogState => ({
  blogs: [],
  singleBlog: {
    _id: "",
    user: {
      _id: "",
      profileImage: "",
      name: "",
    },
    reaction: [],
    comments: [],
    categories: {
      name: "",
    },
    title: "",
    description: "",
    image: "",
    status: "",
    tags: [],
    createdAt: "",
    updatedAt: "",
  },

  getAllBlogs: async () => {
    try {
      const res = await fetch(`${domain}/blog`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      });
      const blogsData = await res.json();
      console.log(blogsData);

      const blogsWithReactionCounts = blogsData.map((blog: any) => {
        const reactionCounts = blog?.reaction?.reduce(
          (counts: any, reaction: any) => {
            counts[reaction?.reactionType] =
              (counts[reaction?.reactionType] || 0) + 1;
            return counts;
          },
          {}
        );
        return { ...blog, reactionCounts };
      });

      console.log(blogsWithReactionCounts);

      set({
        blogs: blogsWithReactionCounts,
      });
      // Update the state with the received token

      return { blogsWithReactionCounts };
    } catch (error: any) {
      console.log(error);
    }
  },

  getSingleBlog: async (id: string) => {
    let localAuth: any = localStorage.getItem("Auth");
    localAuth = JSON.parse(localAuth);
    try {
      // Make a POST request to the login endpoint
      const res = await fetch(`${domain}/blog/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      // Parse the response as JSON
      const blogsData: any = await res.json();
      console.log(blogsData);
      const reactionCounts = blogsData?.reaction?.reduce(
        (counts: any, reaction: any) => {
          counts[reaction?.reactionType] =
            (counts[reaction?.reactionType] || 0) + 1;
          return counts;
        },
        {}
      );
      console.log(reactionCounts);
      if (localAuth) {
        const Reactions: [{}] = blogsData?.reaction;
        const userReaction = Reactions?.find(
          (reaction: any) => reaction?.user == localAuth?.state?.user?._id
        );
        set({
          singleBlog: blogsData,
        });
        return { reactionCounts, userReaction };
      }
      set({
        singleBlog: blogsData,
      });
      // Update the state with the received token

      return { reactionCounts };
      // return blogsData
    } catch (error) {
      console.log(error);
    }
  },
});

const useBlogStore = create<BlogState>(BlogStore);
export default useBlogStore;
