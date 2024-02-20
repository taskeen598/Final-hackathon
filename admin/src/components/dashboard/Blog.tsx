import {
  Card,
  CardBody,
  CardSubtitle,
  CardText,
  CardTitle,
} from "reactstrap";
import PropTypes from "prop-types";
import Image from "next/image";
import React,{ useEffect } from "react";
import { useRouter } from "next/router";

interface BlogProps {
  image: string;
  title: string;
  author: string;
  like: number;
  comment?: number;
  date: string;
  blog: {
    _id: string;
  };
}

const Blog: React.FC<BlogProps> = ({ image, title, author, like, comment, date, blog }) => {
  // Use `useRouter` only if it's available (client-side)
  const router = useRouter();

  useEffect(() => {
    if (router) {
      console.log(blog?._id);
    }
  }, [router, blog])

  return (
    <Card onClick={() => router.push(`/blognews/${blog?._id}`)} className="rounded-lg cursor-pointer hover:bg-slate-100">
      <Image alt="Card image cap" src={image} width={200} height={200} />
      <CardBody className="p-4">
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

// Blog.propTypes = {
//   title: PropTypes.string.isRequired,
//   image: PropTypes.any.isRequired,
//   author: PropTypes.string.isRequired,
//   like: PropTypes.number.isRequired,
//   comment: PropTypes.number,
//   date: PropTypes.string.isRequired,
//   blog: PropTypes.object.isRequired
// };

export default Blog;