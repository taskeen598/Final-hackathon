import React, { useEffect } from 'react'
import { Col, Row } from "reactstrap";
import SalesChart from "../../src/components/dashboard/SalesChart";
import TopCards from "../../src/components/dashboard/TopCards";
import FullLayout from "../../src/layouts/FullLayout";
import useFakeNewsStore from '../../zustand/fakenews.zustand';
// import { redirect } from 'next/dist/server/api-utils';
import { useRouter } from 'next/router';

const dashboard = () => {


    const router = useRouter()
    const { getTotalStats, totalCountries, totalLanguages, totalSites, getTotal, getAllFakeNews } = useFakeNewsStore();

    useEffect(() => {
        let user = localStorage.getItem('Auth');
        user = JSON.parse(user);
        let isLoggedIn = user?.state?.isLoggedIn
        if (isLoggedIn) {
            router.push('/ui/dashboard')
        } else {
            router.push('/')
        }
        getTotalStats()
        getAllFakeNews()
    }, [])

    return (
        <div>
            <FullLayout>
                <div>
                    {/***Top Cards***/}
                    <Row>
                        <Col sm="6" lg="3">
                            <TopCards
                                bg="bg-light-success text-success"
                                title="Total"
                                subtitle="Total News"
                                earning={getTotal}
                                icon="bi bi-file-break"
                            />
                        </Col>
                        <Col sm="6" lg="3">
                            <TopCards
                                bg="bg-light-danger text-danger"
                                title="Total languages"
                                subtitle="Total languages"
                                earning={totalLanguages.length}
                                icon="bi bi-translate"
                            />
                        </Col>
                        <Col sm="6" lg="3">
                            <TopCards
                                bg="bg-light-warning text-warning"
                                title="Total Countries"
                                subtitle="Total Countries"
                                earning={totalCountries.length}
                                icon="bi bi-globe-americas"
                            />
                        </Col>
                        <Col sm="6" lg="3">
                            <TopCards
                                bg="bg-light-info text-into"
                                title="Total Source"
                                subtitle="Total Source"
                                earning={totalSites.length}
                                icon="bi bi-diagram-3"
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
    )
}

export default dashboard
