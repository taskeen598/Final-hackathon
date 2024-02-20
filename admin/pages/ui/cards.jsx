"use client"
import {
  Row,
  Col,
} from "reactstrap";
import Blog from "../../src/components/dashboard/Blog";
import bg1 from "../../src/assets/images/bg/bg1.jpg";
import useFakeNewsStore from "../../zustand/fakenews.zustand";
import Pagination from "../../src/components/dashboard/Pagination";
import { useEffect, useState } from "react";
import FullLayout from "../../src/layouts/FullLayout";

const Cards = () => {

  const [currentPage, setCurrentPage] = useState(1);
  const { getAllFakeNews, fakeNews, getTotal } = useFakeNewsStore();

  useEffect(() => {
    getAllFakeNews();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
    return formattedDate;
  };

  function getFirstThreeWords(title) {
    const words = title.split(' ');
    const firstThreeWords = words.slice(0, 3).join(' ');
    return firstThreeWords;
  }

  return (
    <div>
      <FullLayout>
        <Row className="bg-white rounded-lg pt-4">
          {fakeNews?.map((blg, index) => (
            <Col sm="6" lg="6" xl="3">
              <Blog
                blog={blg}
                image={bg1}
                title={getFirstThreeWords(blg.title)}
                author={blg.author}
                like={blg?.likes?.length}
                // comment={blg?.comments?.length}
                date={formatDate(blg.published)}
              />
            </Col>
          ))}
          <div className="flex items-center justify-center mt-2">
            <Pagination setCurrentPage={setCurrentPage} currentPage={currentPage} />
          </div>
        </Row>
      </FullLayout>
    </div>
  );
};

export default Cards;