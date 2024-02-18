import {
  Card,
  CardBody,
  CardSubtitle,
  CardText,
  CardTitle,
} from "reactstrap";
import PropTypes from "prop-types";
import Image from "next/image";
import { useEffect } from "react";

// Import `useRouter` conditionally for client-side rendering
let useRouter;
if (typeof window !== 'undefined') {
  useRouter = require("next/router").useRouter;
}

const Blog = ({ image, title, author, like, comment, date, blog }) => {
  // Use `useRouter` only if it's available (client-side)
  const router = useRouter ? useRouter() : null;

  useEffect(() => {
    if (router) {
      console.log(blog?._id);
    }
  }, [router, blog])

  return (
    <Card  onClick={router && (() => router.push(`/blognews/${blog?._id}`))} className="rounded-lg cursor-pointer hover:bg-slate-100">
      <Image alt="Card image cap" src={image} />
      <CardBody className="p-4">
        {/* Use router only if it's available */}
        <CardTitle className="text-blue-300 font-bold cursor-pointer hover:underline" tag="h5">{title}...</CardTitle>
        <CardSubtitle className="font-bold">{author}</CardSubtitle>
        <div className="flex mt-3 justify-between">
          <div className="bg-red-300 px-2 rounded">
            <CardText className="text-red-800">Like: {like}</CardText>
          </div>
          {/* <div className="bg-lime-300 px-2 rounded">
            <CardText className="text-lime-800">Comment: {comment}</CardText>
          </div> */}
        </div>
        <CardText className="mt-2 font-bold">{date}</CardText>
      </CardBody>
    </Card>
  );
};

Blog.propTypes = {
  title: PropTypes.string,
  image: PropTypes.any,
  author: PropTypes.string,
  like: PropTypes.any,
  comment: PropTypes.any,
  date: PropTypes.any,
  blog: PropTypes.object.isRequired, // Ensure `blog` is required
};

export default Blog;