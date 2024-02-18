"use client";
import { Card, CardBody, CardTitle, CardSubtitle, Table } from "reactstrap";
import React, { useEffect, useState } from "react";
import useFakeNewsStore from "../../../zustand/fakenews.zustand";
import Pagination from "./Pagination";
import FullLayout from "../../../src/layouts/FullLayout";

const ProjectTables = () => {

  const [currentPage, setCurrentPage] = useState(1);
  const { getAllFakeNews, fakeNews, getTotal } = useFakeNewsStore();
  const articlesPerPage = 10;
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;

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

  return (
    <FullLayout>
    <Card>
      <CardBody>
        <CardTitle tag="h5">News Listing</CardTitle>
        <CardSubtitle className="mb-2 text-muted" tag="h6">
          Overview of the News
        </CardSubtitle>
        <div className="table-responsive">
          <Table className="text-nowrap mt-3 align-middle" borderless>
            <thead className="bg-blue-500 text-white rounded-lg ">
              <tr>
                <th>#</th>
                <th>ORD</th>
                <th>Author</th>
                <th>Published</th>
                <th>Title</th>
                {/* <th>Text</th> */}
                <th>Language</th>
                <th>Crawled</th>
                <th>Thread</th>
                <th>Replies</th>
                <th>Participants</th>
                <th>Likes</th>
                <th>Comments</th>
                <th>Type</th>
                <th>Country</th>
                <th>Spam Score</th>
                <th>URL</th>
              </tr>
            </thead>
            <tbody >
              {fakeNews?.map((tdata, index) => (
                <tr key={index} className="border-top hover:bg-blue-300 hover:text-white hover:cursor-pointer">
                  <td>{indexOfFirstArticle + index + 1}</td>
                  <td>{tdata.ord_in_thread}</td>
                  <div className="text-red-400">
                    <td className="bg-red-100  hover:bg-white rounded px-2">{tdata.author}</td>
                  </div>
                  <td>{formatDate(tdata.published)}</td>
                  <td>{tdata.title}</td>
                  {/* <td>{tdata.text}</td> */}
                  <div className="text-green-400">
                    <td className="bg-green-100 hover:bg-white rounded px-2 capitalize">{tdata.language}</td>
                  </div>
                  <td>{formatDate(tdata.crawled)}</td>
                  <td>{tdata.thread_title}</td>
                  <td>{tdata.replies_count}</td>
                  <td>{tdata.participants_count}</td>
                  <td>{tdata?.likes?.length}</td>
                  <td>{tdata?.comments?.length}</td>
                  <td>{tdata.type}</td>
                  <td>{tdata.reference.country}</td>
                  <td>{tdata.reference.spam_score}</td>
                  <td className="cursor-pointer italic  underline">{tdata.reference.site_url}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        <div className="flex items-end justify-end mt-2">
          <Pagination setCurrentPage={setCurrentPage} currentPage={currentPage} />
        </div>
      </CardBody>
    </Card>
    </FullLayout>
  );
};

export default ProjectTables;