import React, { useEffect } from 'react';
import { Col, Row } from "reactstrap";
import SalesChart from "../../src/components/dashboard/SalesChart";
import TopCards from "../../src/components/dashboard/TopCards";
import FullLayout from "../../src/layouts/FullLayout";
import useFakeNewsStore from '../../zustand/fakenews.zustand';
import { useRouter } from 'next/router';

const Dashboard = () => {
    const router = useRouter();
    const { getTotalStats, totalCountries, totalLanguages, totalSites, getTotal, getAllFakeNews } = useFakeNewsStore();

    useEffect(() => {
        getTotalStats();
        getAllFakeNews();
    }, []);

    return (
        <div className='bg-white'>
            <FullLayout>
                <div>
                    {/***Top Cards***/}
                    <Row>
                        <Col sm="6" lg="3">
                            <TopCards
                                background={"bg-[#D5F3F2]"}
                                bg="bg-light-success text-success"
                                title="Total"
                                subtitle="Total News"
                                earning={getTotal}
                                textcolor="text-emerald-500"
                                subtitlecolor="text-emerald-500"
                                icon="bi bi-file-break"
                            />
                        </Col>
                        <Col sm="6" lg="3">
                            <TopCards
                                background={"bg-[#F8DDDD]"}
                                bg="bg-light-danger text-danger"
                                title="Total languages"
                                subtitle="Total Languages"
                                earning={totalLanguages.length}
                                textcolor="text-red-500"
                                subtitlecolor="text-red-500"
                                icon="bi bi-translate"
                            />
                        </Col>
                        <Col sm="6" lg="3">
                            <TopCards
                                background={"bg-[#F8ECDC]"}
                                bg="bg-light-warning text-warning"
                                title="Total Countries"
                                subtitle="Total Countries"
                                earning={totalCountries.length}
                                textcolor="text-yellow-500"
                                subtitlecolor="text-yellow-500"
                                icon="bi bi-globe"
                            />
                        </Col>
                        <Col sm="6" lg="3">
                            <TopCards
                                background={"bg-[#D3EDFA]"}
                                bg="bg-light-info text-into"
                                title="Total Source"
                                subtitle="Total URLs"
                                earning={totalSites.length}
                                subtitlecolor="text-teal-500"
                                textcolor="text-teal-500"
                                icon="bi bi-gear"
                            />
                        </Col>
                    </Row>
                    {/***Sales & Feed***/}
                    <Row>
                        <Col>
                            <SalesChart />
                        </Col>
                        {/* <Col sm="12" lg="6" xl="5" xxl="4">
                            <Feeds />
                        </Col> */}
                    </Row>
                </div>
            </FullLayout>
        </div>
    );
};

export default Dashboard;