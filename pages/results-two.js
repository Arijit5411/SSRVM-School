import React, { Fragment, useEffect, useRef, useState } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import GooglePieChart from "../components/GooglePieChart";

const Results_two = () => {
    const data1 = [
        ["Grade", "Percentage"],
        ["Above 90%", 30],
        ["50%-59%", 15],
        ["60%-69%", 20],
        ["70%-79%", 10],
        ["80%-89%", 25],
    ];

    const data2 = [
        ["Grade", "Percentage"],
        ["Above 90%", 22],
        ["50%-59%", 18],
        ["60%-69%", 7],
        ["70%-79%", 21],
        ["80%-89%", 32],
    ];

    const data3 = [
        ["Grade", "Percentage"],
        ["Above 90%", 15],
        ["50%-59%", 29],
        ["60%-69%", 17],
        ["70%-79%", 35],
        ["80%-89%", 4],
    ];

    const piechartData = [data1, data2, data3];
    const title = [
        "CBSE (STD. XII) Results",
        "CBSE (STD. XI) Results",
        "CBSE (STD. X) Results",
    ];

    const [currentPieChart, setCurrentPieChart] = useState(0);

    const goToPrevious = () => {
        setCurrentPieChart((prevChart) =>
            prevChart === 0 ? piechartData.length - 2 : prevChart - 1
        );
    };

    const goToNext = () => {
        setCurrentPieChart((prevChart) =>
            prevChart === piechartData.length - 2 ? 0 : prevChart + 1
        );
    };

    const [selectedOption, setSelectedOption] = useState("class1");
    const [selectedOption2, setSelectedOption2] = useState("result1");

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleChange2 = (event) => {
        setSelectedOption2(event.target.value);
    };

    const renderContent = () => {
        if (selectedOption === "class1") {
            return (
                <div className="row g-4 mt-5">
                    <div>
                        <h6>Science Toppers</h6>
                    </div>

                    <div className="col-lg-4">
                        <div className="card-wrapper">
                            <div className="cardimage">
                                <img src="assets/img/service/1-team1.jpg" alt="Image 1" />
                            </div>
                            <div className="cardcontent">
                                <h5>Student Name</h5>
                                <p>XII Grade - 98%, 1st Rank</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="card-wrapper">
                            <div className="cardimage">
                                <img src="assets/img/service/1-team1.jpg" alt="Image 1" />
                            </div>
                            <div className="cardcontent">
                                <h5>Student Name</h5>
                                <p>XII Grade - 97%, 2nd Rank</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="card-wrapper">
                            <div className="cardimage">
                                <img src="assets/img/service/1-team1.jpg" alt="Image 1" />
                            </div>
                            <div className="cardcontent">
                                <h5>Student Name</h5>
                                <p>XII Grade - 96%, 3rd Rank</p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h6>Commerce Toppers</h6>
                    </div>
                    <div className="col-lg-4">
                        <div className="card-wrapper">
                            <div className="cardimage">
                                <img src="assets/img/service/1-team1.jpg" alt="Image 1" />
                            </div>
                            <div className="cardcontent">
                                <h5>Student Name</h5>
                                <p>XII Grade - 96%, 3rd Rank</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="card-wrapper">
                            <div className="cardimage">
                                <img src="assets/img/service/1-team1.jpg" alt="Image 1" />
                            </div>
                            <div className="cardcontent">
                                <h5>Student Name</h5>
                                <p>XII Grade - 96%, 3rd Rank</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="card-wrapper">
                            <div className="cardimage">
                                <img src="assets/img/service/1-team1.jpg" alt="Image 1" />
                            </div>
                            <div className="cardcontent">
                                <h5>Student Name</h5>
                                <p>XII Grade - 96%, 3rd Rank</p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h6>Arts Toppers</h6>
                    </div>
                    <div className="col-lg-4">
                        <div className="card-wrapper">
                            <div className="cardimage">
                                <img src="assets/img/service/1-team1.jpg" alt="Image 1" />
                            </div>
                            <div className="cardcontent">
                                <h5>Student Name</h5>
                                <p>XII Grade - 96%, 3rd Rank</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="card-wrapper">
                            <div className="cardimage">
                                <img src="assets/img/service/1-team1.jpg" alt="Image 1" />
                            </div>
                            <div className="cardcontent">
                                <h5>Student Name</h5>
                                <p>XII Grade - 96%, 3rd Rank</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="card-wrapper">
                            <div className="cardimage">
                                <img src="assets/img/service/1-team1.jpg" alt="Image 1" />
                            </div>
                            <div className="cardcontent">
                                <h5>Student Name</h5>
                                <p>XII Grade - 96%, 3rd Rank</p>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else if (selectedOption === "class2") {
            return (
                <div className="row g-4 mt-5">
                    <div className="col-lg-4">
                        <div className="card-wrapper">
                            <div className="cardimage">
                                <img src="assets/img/service/1-team1.jpg" alt="Image 1" />
                            </div>
                            <div className="cardcontent">
                                <h5>Student Name</h5>
                                <p>XI Grade - 98%, 1st Rank</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="card-wrapper">
                            <div className="cardimage">
                                <img src="assets/img/service/1-team1.jpg" alt="Image 1" />
                            </div>
                            <div className="cardcontent">
                                <h5>Student Name</h5>
                                <p>XI Grade - 97%, 2nd Rank</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="card-wrapper">
                            <div className="cardimage">
                                <img src="assets/img/service/1-team1.jpg" alt="Image 1" />
                            </div>
                            <div className="cardcontent">
                                <h5>Student Name</h5>
                                <p>XI Grade - 96%, 3rd Rank</p>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else if (selectedOption === "class3") {
            return (
                <div className="row g-4 mt-5">
                    <div className="col-lg-4">
                        <div className="card-wrapper">
                            <div className="cardimage">
                                <img src="assets/img/service/1-team1.jpg" alt="Image 1" />
                            </div>
                            <div className="cardcontent">
                                <h5>Student Name</h5>
                                <p>X Grade - 98%, 1st Rank</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="card-wrapper">
                            <div className="cardimage">
                                <img src="assets/img/service/1-team1.jpg" alt="Image 1" />
                            </div>
                            <div className="cardcontent">
                                <h5>Student Name</h5>
                                <p>X Grade - 97%, 2nd Rank</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="card-wrapper">
                            <div className="cardimage">
                                <img src="assets/img/service/1-team1.jpg" alt="Image 1" />
                            </div>
                            <div className="cardcontent">
                                <h5>Student Name</h5>
                                <p>X Grade - 96%, 3rd Rank</p>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else if (selectedOption === "class4") {
            return (
                <div className="row g-4 mt-5">
                    <div className="col-lg-4">
                        <div className="card-wrapper">
                            <div className="cardimage">
                                <img src="assets/img/service/1-team1.jpg" alt="Image 1" />
                            </div>
                            <div className="cardcontent">
                                <h5>Student Name</h5>
                                <p>IX Grade - 98%, 1st Rank</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="card-wrapper">
                            <div className="cardimage">
                                <img src="assets/img/service/1-team1.jpg" alt="Image 1" />
                            </div>
                            <div className="cardcontent">
                                <h5>Student Name</h5>
                                <p>IX Grade - 97%, 2nd Rank</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="card-wrapper">
                            <div className="cardimage">
                                <img src="assets/img/service/1-team1.jpg" alt="Image 1" />
                            </div>
                            <div className="cardcontent">
                                <h5>Student Name</h5>
                                <p>IX Grade - 96%, 3rd Rank</p>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else if (selectedOption === "class5") {
            return (
                <div className="row g-4 mt-5">
                    <div className="col-lg-4">
                        <div className="card-wrapper">
                            <div className="cardimage">
                                <img src="assets/img/service/1-team1.jpg" alt="Image 1" />
                            </div>
                            <div className="cardcontent">
                                <h5>Student Name</h5>
                                <p>VIII Grade - 98%, 1st Rank</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="card-wrapper">
                            <div className="cardimage">
                                <img src="assets/img/service/1-team1.jpg" alt="Image 1" />
                            </div>
                            <div className="cardcontent">
                                <h5>Student Name</h5>
                                <p>VIII Grade - 97%, 2nd Rank</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="card-wrapper">
                            <div className="cardimage">
                                <img src="assets/img/service/1-team1.jpg" alt="Image 1" />
                            </div>
                            <div className="cardcontent">
                                <h5>Student Name</h5>
                                <p>VIII Grade - 96%, 3rd Rank</p>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else if (selectedOption === "class6") {
            return (
                <div className="row g-4 mt-5">
                    <div className="col-lg-4">
                        <div className="card-wrapper">
                            <div className="cardimage">
                                <img src="assets/img/service/1-team1.jpg" alt="Image 1" />
                            </div>
                            <div className="cardcontent">
                                <h5>Student Name</h5>
                                <p>VII Grade - 98%, 1st Rank</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="card-wrapper">
                            <div className="cardimage">
                                <img src="assets/img/service/1-team1.jpg" alt="Image 1" />
                            </div>
                            <div className="cardcontent">
                                <h5>Student Name</h5>
                                <p>VII Grade - 97%, 2nd Rank</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="card-wrapper">
                            <div className="cardimage">
                                <img src="assets/img/service/1-team1.jpg" alt="Image 1" />
                            </div>
                            <div className="cardcontent">
                                <h5>Student Name</h5>
                                <p>VII Grade - 96%, 3rd Rank</p>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else if (selectedOption === "class7") {
            return (
                <div className="row g-4 mt-5">
                    <div className="col-lg-4">
                        <div className="card-wrapper">
                            <div className="cardimage">
                                <img src="assets/img/service/1-team1.jpg" alt="Image 1" />
                            </div>
                            <div className="cardcontent">
                                <h5>Student Name</h5>
                                <p>VI Grade - 98%, 1st Rank</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="card-wrapper">
                            <div className="cardimage">
                                <img src="assets/img/service/1-team1.jpg" alt="Image 1" />
                            </div>
                            <div className="cardcontent">
                                <h5>Student Name</h5>
                                <p>VI Grade - 97%, 2nd Rank</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="card-wrapper">
                            <div className="cardimage">
                                <img src="assets/img/service/1-team1.jpg" alt="Image 1" />
                            </div>
                            <div className="cardcontent">
                                <h5>Student Name</h5>
                                <p>VI Grade - 96%, 3rd Rank</p>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    };

    const renderContent2 = () => {
        if (selectedOption2 === "result1") {
            return (
                <div className="row g-4 mt-0 pd-bottom-80">
                    <div className="col-lg-6">
                        <div className="card-wrap">
                            <div className="cardcontent2">
                                <h6>Results for 2020-21</h6>
                                <p className="Downloadlink">
                                    {" "}
                                    <a href="path/to/item2.pdf" download>
                                        Download
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-6">
                        <div className="card-wrap">
                            <div className="cardcontent2">
                                <h6>Results for 2020-21</h6>
                                <p className="Downloadlink">
                                    <a href="path/to/item2.pdf" download>
                                        Download
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-6">
                        <div className="card-wrap">
                            <div className="cardcontent2">
                                <h6>Results for 2020-21</h6>
                                <p className="Downloadlink">
                                    <a href="path/to/item2.pdf" download>
                                        Download
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="card-wrap">
                            <div className="cardcontent2">
                                <h6>Results for 2020-21</h6>
                                <p className="Downloadlink">
                                    <a href="path/to/item2.pdf" download>
                                        Download
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else if (selectedOption2 === "result2") {
            return (
                <div className="row g-4 mt-0">
                    <div className="col-lg-6">
                        <div className="card-wrap">
                            <div className="cardcontent2">
                                <h6>Results 11 for 2020-21</h6>
                                <p className="Downloadlink">
                                    {" "}
                                    <a href="path/to/item2.pdf" download>
                                        Download
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-6">
                        <div className="card-wrap">
                            <div className="cardcontent2">
                                <h6>Results 11 for 2020-21</h6>
                                <p className="Downloadlink">
                                    <a href="path/to/item2.pdf" download>
                                        Download
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-6">
                        <div className="card-wrap">
                            <div className="cardcontent2">
                                <h6>Results 11 for 2020-21</h6>
                                <p className="Downloadlink">
                                    {" "}
                                    <a href="path/to/item2.pdf" download>
                                        Download
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="card-wrap">
                            <div className="cardcontent2">
                                <h6>Results 11 for 2020-21</h6>
                                <p className="Downloadlink">
                                    <a href="path/to/item2.pdf" download>
                                        Download
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else if (selectedOption2 === "result3") {
            return (
                <div className="row g-4 mt-0">
                    <div className="col-lg-6">
                        <div className="card-wrap">
                            <div className="cardcontent2">
                                <h6>Results 10 for 2020-21</h6>
                                <p className="Downloadlink">
                                    {" "}
                                    <a href="path/to/item2.pdf" download>
                                        Download
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-6">
                        <div className="card-wrap">
                            <div className="cardcontent2">
                                <h6>Results 10 for 2020-21</h6>
                                <p className="Downloadlink">
                                    <a href="path/to/item2.pdf" download>
                                        Download
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-6">
                        <div className="card-wrap">
                            <div className="cardcontent2">
                                <h6>Results 10 for 2020-21</h6>
                                <p className="Downloadlink">
                                    {" "}
                                    <a href="path/to/item2.pdf" download>
                                        Download
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="card-wrap">
                            <div className="cardcontent2">
                                <h6>Results 10 for 2020-21</h6>
                                <p className="Downloadlink">
                                    <a href="path/to/item2.pdf" download>
                                        Download
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else if (selectedOption2 === "result4") {
            return (
                <div className="row g-4 mt-0">
                    <div className="col-lg-6">
                        <div className="card-wrap">
                            <div className="cardcontent2">
                                <h6>Results 9 for 2020-21</h6>
                                <p className="Downloadlink">
                                    {" "}
                                    <a href="path/to/item2.pdf" download>
                                        Download
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-6">
                        <div className="card-wrap">
                            <div className="cardcontent2">
                                <h6>Results 9 for 2020-21</h6>
                                <p className="Downloadlink">
                                    <a href="path/to/item2.pdf" download>
                                        Download
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-6">
                        <div className="card-wrap">
                            <div className="cardcontent2">
                                <h6>Results 9 for 2020-21</h6>
                                <p className="Downloadlink">
                                    {" "}
                                    <a href="path/to/item2.pdf" download>
                                        Download
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="card-wrap">
                            <div className="cardcontent2">
                                <h6>Results 9 for 2020-21</h6>
                                <p className="Downloadlink">
                                    <a href="path/to/item2.pdf" download>
                                        Download
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else if (selectedOption2 === "result5") {
            return (
                <div className="row g-4 mt-0">
                    <div className="col-lg-6">
                        <div className="card-wrap">
                            <div className="cardcontent2">
                                <h6>Results 8 for 2020-21</h6>
                                <p className="Downloadlink">
                                    {" "}
                                    <a href="path/to/item2.pdf" download>
                                        Download
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-6">
                        <div className="card-wrap">
                            <div className="cardcontent2">
                                <h6>Results 8 for 2020-21</h6>
                                <p className="Downloadlink">
                                    <a href="path/to/item2.pdf" download>
                                        Download
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-6">
                        <div className="card-wrap">
                            <div className="cardcontent2">
                                <h6>Results 8 for 2020-21</h6>
                                <p className="Downloadlink">
                                    {" "}
                                    <a href="path/to/item2.pdf" download>
                                        Download
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="card-wrap">
                            <div className="cardcontent2">
                                <h6>Results 8 for 2020-21</h6>
                                <p className="Downloadlink">
                                    <a href="path/to/item2.pdf" download>
                                        Download
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else if (selectedOption2 === "result6") {
            return (
                <div className="row g-4 mt-0">
                    <div className="col-lg-6">
                        <div className="card-wrap">
                            <div className="cardcontent2">
                                <h6>Results 7 for 2020-21</h6>
                                <p className="Downloadlink">
                                    {" "}
                                    <a href="path/to/item2.pdf" download>
                                        Download
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-6">
                        <div className="card-wrap">
                            <div className="cardcontent2">
                                <h6>Results 7 for 2020-21</h6>
                                <p className="Downloadlink">
                                    <a href="path/to/item2.pdf" download>
                                        Download
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-6">
                        <div className="card-wrap">
                            <div className="cardcontent2">
                                <h6>Results 7 for 2020-21</h6>
                                <p className="Downloadlink">
                                    {" "}
                                    <a href="path/to/item2.pdf" download>
                                        Download
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="card-wrap">
                            <div className="cardcontent2">
                                <h6>Results 7 for 2020-21</h6>
                                <p className="Downloadlink">
                                    <a href="path/to/item2.pdf" download>
                                        Download
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else if (selectedOption2 === "result7") {
            return (
                <div className="row g-4 mt-0">
                    <div className="col-lg-6">
                        <div className="card-wrap">
                            <div className="cardcontent2">
                                <h6>Results 6 for 2020-21</h6>
                                <p className="Downloadlink">
                                    {" "}
                                    <a href="path/to/item2.pdf" download>
                                        Download
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-6">
                        <div className="card-wrap">
                            <div className="cardcontent2">
                                <h6>Results 6 for 2020-21</h6>
                                <p className="Downloadlink">
                                    <a href="path/to/item2.pdf" download>
                                        Download
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-6">
                        <div className="card-wrap">
                            <div className="cardcontent2">
                                <h6>Results 6 for 2020-21</h6>
                                <p className="Downloadlink">
                                    {" "}
                                    <a href="path/to/item2.pdf" download>
                                        Download
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="card-wrap">
                            <div className="cardcontent2">
                                <h6>Results 6 for 2020-21</h6>
                                <p className="Downloadlink">
                                    <a href="path/to/item2.pdf" download>
                                        Download
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    };

    return (
        <>
            <NavBar />
            <Fragment>
                <div className="top-section1">
                    <div className="container">
                        <h1 className="principal-mess">Results</h1>
                    </div>

                    <div className="piecontainer">
                        <div className="left-arrow arrow-result" onClick={goToPrevious}>
                            &larr;
                        </div>

                        <div className="row g-4 mt-0">
                            {piechartData
                                .slice(currentPieChart, currentPieChart + 2)
                                .map((data, index) => (
                                    <div key={index} className="col-lg-6">
                                        <div className="result-box">
                                            <h2 className="pie-heading">
                                                {title[currentPieChart + index]}
                                            </h2>
                                            <GooglePieChart data={data} />
                                        </div>
                                    </div>
                                ))}
                        </div>

                        <div className="right-arrow arrow-result" onClick={goToNext}>
                            &rarr;
                        </div>
                    </div>
                    <section>
                        <div className="container">
                            <div className="head">
                                <div>
                                    <h4>Our Toppers</h4>
                                </div>
                                <div className="dropdown">
                                    <p>Filter class-wise:</p>
                                    <select
                                        className="drop"
                                        value={selectedOption}
                                        onChange={handleChange}
                                    >
                                        <option value="class1">XII</option>
                                        <option value="class2">XI</option>
                                        <option value="class3">X</option>
                                        <option value="class4">IX</option>
                                        <option value="class5">VIII</option>
                                        <option value="class6">VII</option>
                                        <option value="class7">VI</option>
                                    </select>
                                </div>
                            </div>

                            {renderContent()}
                        </div>
                    </section>

                    <section className="container wrap-item-1">
                        <div>
                            <div className="head">
                                <div>
                                    <h4>Download Results</h4>
                                </div>
                                <div className="dropdown">
                                    <p>Download Results for class:</p>
                                    <select
                                        className="drop"
                                        value={selectedOption2}
                                        onChange={handleChange2}
                                    >
                                        <option value="result1">XII</option>
                                        <option value="result2">XI</option>
                                        <option value="result3">X</option>
                                        <option value="result4">IX</option>
                                        <option value="result5">VIII</option>
                                        <option value="result6">VII</option>
                                        <option value="result7">VI</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        {renderContent2()}
                    </section>
                </div>
                <Footer />
            </Fragment>
        </>
    );
};
export default Results_two;
