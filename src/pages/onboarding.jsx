import { useEffect, useState } from "react";
import logo from "../assets/logo_colorful.svg";
import logoshine from "../assets/logo_shine.svg";
import { StatusBar } from '@capacitor/status-bar';

function Onboarding() {
    const [page, setPage] = useState(0);
    const [student, setStudent] = useState('regular');
    const [semester, setSemester] = useState(1);
    const [Timetabledata, setTimetableData] = useState([]);

    useEffect(() => {
        const initialize = async () => {
            await StatusBar.setBackgroundColor({ color: '#000000' });
            await StatusBar.setStyle({ style: 'dark' }); // Icons will be white
        };
        initialize();
    }, []);

    const changePage = () => {
        setPage(page + 1);
    };

    const changeStudent = (e) => {
        setStudent(e.target.value);
    };

    const changeSemester = (value) => {
        setSemester(value);
    };

    // You can also add a function to go back to previous pages
    const goBack = () => {
        if (page > 0) {
            setPage(page - 1);
        }
    };

    useEffect(() => {
        const data = async () => {
            fetch('/data.json')
                .then((response) => response.json())
                .then((data) => setTimetableData(data));

        };
        data();
    }, []);

    return (
        <div>
            {page === 0 ? (
                <div className="flex justify-around items-center flex-col h-screen bg-black p-6">
                    <div className="flex flex-col items-center gap-3">
                        <img src={logo} alt="" />
                        <h1 className="text-white playfair-display text-2xl">FAST timetable <span className="text-lime-400">sucks?</span></h1>
                        <h2 className="text-white playfair-display">Yeah, We Know!!</h2>
                    </div>
                    <div className="flex flex-col justify-center items-center h-[350px] min-h-[350px] min-w-[350px]">
                        <img src={logoshine} alt="" className="h-[500px]" />
                    </div>
                    <div className="flex flex-col items-center gap-3">
                        <h3 className="text-white playfair-display text-sm">Let's Fix the Mess in flat 2 min</h3>
                        <button
                            className="bg-gradient-to-r from-lime-400 to-lime-500 px-6 py-2 rounded-xl font-bold product-sans border-2 border-lime-400 hover:cursor-pointer hover:to-lime-600 ease-in duration-300"
                            onClick={changePage}
                        >
                            Let's Do it!!
                        </button>
                    </div>
                </div>
            ) : page === 1 ? (
                <div className="flex justify-around items-center flex-col h-screen bg-black p-6">
                    <div className="flex flex-col items-center gap-3">
                        <img src={logo} alt="" />
                        <h1 className="text-white playfair-display text-2xl">Choose Options</h1>
                    </div>
                    <div className="flex flex-col gap-4 items-center h-[350px] min-h-[350px] min-w-[350px]">
                        <p className="text-white playfair-display text-sm">
                            Are You Regular Student or a Student with Backlogs?
                        </p>
                        <div className="flex flex-col items-center gap-3 text-white">
                            <label
                                id="regular"
                                className={student === 'regular' ?
                                    "bg-gradient-to-r from-lime-400 to-lime-500 w-[120px] p-3 font-bold product-sans flex justify-center items-center rounded-xl hover:cursor-pointer hover:to-lime-600 ease-in duration-300 text-black" :
                                    "bg-[#212121] w-[120px] p-3 flex justify-center items-center rounded-xl hover:cursor-pointer"
                                }
                            >
                                <input
                                    type="radio"
                                    name="student"
                                    value="regular"
                                    checked={student === 'regular'}
                                    onChange={changeStudent}
                                    className="hidden"
                                />
                                Regular
                            </label>

                            <label
                                id="backlog"
                                className={student === 'backlog' ?
                                    "bg-gradient-to-r from-lime-400 to-lime-500 w-[120px] p-3 font-bold product-sans flex justify-center items-center rounded-xl hover:cursor-pointer hover:to-lime-600 ease-in duration-300 text-black" :
                                    "bg-[#212121] w-[120px] p-3 flex justify-center items-center rounded-xl hover:cursor-pointer"
                                }
                            >
                                <input
                                    type="radio"
                                    name="student"
                                    value="backlog"
                                    checked={student === 'backlog'}
                                    onChange={changeStudent}
                                    className="hidden"
                                />
                                Backlogs
                            </label>
                        </div>
                    </div>
                    <div className="flex flex-col items-center gap-3 bottom-0">
                        <h3 className="text-white playfair-display text-sm">Let's Fix the Mess in flat 2 min</h3>
                        <div className="flex gap-4">
                            <button
                                className="bg-[#212121] px-6 py-2 rounded-xl font-bold product-sans border-2 border-[#212121] hover:cursor-pointer hover:bg-[#2c2c2c] ease-in duration-300 text-white"
                                onClick={goBack}
                            >
                                Back
                            </button>
                            <button
                                className="bg-gradient-to-r from-lime-400 to-lime-500 px-6 py-2 rounded-xl font-bold product-sans border-2 border-lime-400 hover:cursor-pointer hover:to-lime-600 ease-in duration-300"
                                onClick={changePage}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            ) : page === 2 ? (
                <div className="flex justify-around items-center flex-col h-screen bg-black p-6">
                    <div className="flex flex-col items-center gap-3">
                        <img src={logo} alt="" />
                        <h1 className="text-white playfair-display text-2xl">Select Semester</h1>
                    </div>
                    <div className="flex flex-col gap-4 items-center h-[350px] min-h-[350px] min-w-[350px]">
                        <p className="text-white playfair-display text-sm">
                            Which semester are you in?
                        </p>
                        <div className="grid grid-cols-3 gap-3 text-white">
                            {
                                Timetabledata.semesters.map((semester, index) => (
                                    <label
                                        key={index}
                                        id={semester}
                                        className={
                                            "bg-gradient-to-r from-lime-400 to-lime-500 w-[120px] p-3 font-bold product-sans flex justify-center items-center rounded-xl hover:cursor-pointer hover:to-lime-600 ease-in duration-300 text-black"
                                        }
                                    >
                                        <input
                                            type="radio"
                                            name="semester"
                                            value={semester}

                                            onChange={() => changeSemester(semester)}
                                            className="hidden"
                                        />
                                        {semester}
                                    </label>
                                ))
                            }
                        </div>
                    </div>
                    <div className="flex flex-col items-center gap-3 bottom-0">
                        <h3 className="text-white playfair-display text-sm">Let's Fix the Mess in flat 2 min</h3>
                        <div className="flex gap-4">
                            <button
                                className="bg-[#212121] px-6 py-2 rounded-xl font-bold product-sans border-2 border-[#212121] hover:cursor-pointer hover:bg-[#2c2c2c] ease-in duration-300 text-white"
                                onClick={goBack}
                            >
                                Back
                            </button>
                            <button
                                className="bg-gradient-to-r from-lime-400 to-lime-500 px-6 py-2 rounded-xl font-bold product-sans border-2 border-lime-400 hover:cursor-pointer hover:to-lime-600 ease-in duration-300"
                                onClick={changePage}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            ) : page === 3 ? (
                <div className="flex justify-around items-center flex-col h-screen bg-black p-6">
                    <div className="flex flex-col items-center gap-3">
                        <img src={logo} alt="" />
                        <h1 className="text-white playfair-display text-2xl">Select Section</h1>
                    </div>
                    <div className="flex flex-col gap-4 items-center h-[350px] min-h-[350px] min-w-[350px] overflow-y-auto">
                        <p className="text-white playfair-display text-sm">
                            Select your Parent Section {semester}
                        </p>
                        {/* Sample course selection UI - you would populate this with actual courses */}
                        <div className="flex flex-col gap-2 w-full">
                            {['Calculus', 'Physics', 'Programming Fundamentals', 'Communication Skills', 'Data Structures', 'Algorithm Analysis'].map((course, index) => (
                                <label key={index} className="flex items-center bg-[#212121] p-3 rounded-xl hover:cursor-pointer">
                                    <input type="checkbox" className="mr-3" />
                                    <span className="text-white">{course}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col items-center gap-3 bottom-0">
                        <h3 className="text-white playfair-display text-sm">Let's Fix the Mess in flat 2 min</h3>
                        <div className="flex gap-4">
                            <button
                                className="bg-[#212121] px-6 py-2 rounded-xl font-bold product-sans border-2 border-[#212121] hover:cursor-pointer hover:bg-[#2c2c2c] ease-in duration-300 text-white"
                                onClick={goBack}
                            >
                                Back
                            </button>
                            <button
                                className="bg-gradient-to-r from-lime-400 to-lime-500 px-6 py-2 rounded-xl font-bold product-sans border-2 border-lime-400 hover:cursor-pointer hover:to-lime-600 ease-in duration-300"
                                onClick={changePage}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex justify-around items-center flex-col h-screen bg-black p-6">
                    <div className="flex flex-col items-center gap-3">
                        <img src={logo} alt="" />
                        <h1 className="text-white playfair-display text-2xl">Your Timetable</h1>
                    </div>
                    <div className="flex flex-col gap-4 items-center h-[350px] min-h-[350px] min-w-[350px] overflow-y-auto">
                        <p className="text-white playfair-display text-xl mb-4">
                            Here's your optimized timetable!
                        </p>
                        <div className="bg-[#212121] p-5 rounded-xl w-full">
                            <p className="text-lime-400 text-center mb-3">Your classes are scheduled for maximum efficiency</p>
                            {/* This would be replaced with the actual timetable */}
                            <div className="text-white text-sm">
                                <div className="flex justify-between border-b border-gray-700 pb-2 mb-2">
                                    <span>Monday</span>
                                    <span>Programming 9:00-10:30, Physics 11:00-12:30</span>
                                </div>
                                <div className="flex justify-between border-b border-gray-700 pb-2 mb-2">
                                    <span>Tuesday</span>
                                    <span>Calculus 10:00-11:30, Communication 1:00-2:30</span>
                                </div>
                                <div className="flex justify-between border-b border-gray-700 pb-2 mb-2">
                                    <span>Wednesday</span>
                                    <span>Data Structures 9:00-10:30, Algorithms 11:00-12:30</span>
                                </div>
                                <div className="flex justify-between border-b border-gray-700 pb-2 mb-2">
                                    <span>Thursday</span>
                                    <span>Physics Lab 10:00-1:00</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Friday</span>
                                    <span>Programming Lab 9:00-12:00</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col items-center gap-3 bottom-0">
                        <div className="flex gap-4">
                            <button
                                className="bg-[#212121] px-6 py-2 rounded-xl font-bold product-sans border-2 border-[#212121] hover:cursor-pointer hover:bg-[#2c2c2c] ease-in duration-300 text-white"
                                onClick={goBack}
                            >
                                Back
                            </button>
                            <button
                                className="bg-gradient-to-r from-lime-400 to-lime-500 px-6 py-2 rounded-xl font-bold product-sans border-2 border-lime-400 hover:cursor-pointer hover:to-lime-600 ease-in duration-300"
                                onClick={() => alert("Timetable saved!")}
                            >
                                Save Timetable
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Onboarding;