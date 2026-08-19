// src/components/GuidedTour/TourGate.jsx

import React, {
    useEffect,
    useState
} from "react";

import {
    useNavigate,
    useLocation
} from "react-router-dom";

import Cookies from "js-cookie";

import GuidedTour from "./GuidedTour";


const TOUR_COMPLETED_KEY =
    "farmxpert_tour_completed";

const TOUR_SKIPPED_KEY =
    "farmxpert_tour_skipped";


const TourGate = ({
    children
}) => {

    const navigate =
        useNavigate();

    const location =
        useLocation();


    /* =========================================================
       STATE
    ========================================================= */

    const [
        showTour,
        setShowTour
    ] = useState(false);


    const [
        checkingUser,
        setCheckingUser
    ] = useState(true);


    /* =========================================================
       CHECK LOGGED-IN USER
    ========================================================= */

    const getLoggedInUser = () => {

        try {

            const userCookie =
                Cookies.get("user");


            if (
                userCookie
            ) {

                return JSON.parse(
                    userCookie
                );

            }


            /*
             * Optional fallback if your
             * application stores user data
             * in localStorage.
             */

            const localUser =
                localStorage.getItem(
                    "user"
                );


            if (
                localUser
            ) {

                return JSON.parse(
                    localUser
                );

            }


            return null;

        } catch (error) {

            console.error(
                "TourGate: Unable to read user:",
                error
            );


            return null;

        }

    };


    /* =========================================================
       CHECK FIRST-TIME TOUR
    ========================================================= */

    const checkTourStatus = () => {

        const user =
            getLoggedInUser();


        /*
         * No logged-in user
         */

        if (!user) {

            setShowTour(false);

            setCheckingUser(false);

            return;

        }


        /*
         * Check whether the user has
         * already completed the tour.
         */

        const completed =
            localStorage.getItem(
                TOUR_COMPLETED_KEY
            );


        /*
         * Check whether the user
         * previously skipped it.
         */

        const skipped =
            localStorage.getItem(
                TOUR_SKIPPED_KEY
            );


        /*
         * Show tour only for a user who
         * has not completed or skipped it.
         */

        if (
            !completed &&
            !skipped
        ) {

            setShowTour(true);

        } else {

            setShowTour(false);

        }


        setCheckingUser(false);

    };


    /* =========================================================
       INITIAL CHECK
    ========================================================= */

    useEffect(() => {

        checkTourStatus();

    }, []);


    /* =========================================================
       LISTEN FOR TOPBAR TOUR BUTTON
       ========================================================= */

    useEffect(() => {

        const handleStartTour = () => {

            /*
             * Remove previous status so
             * GuidedTour can start again.
             */

            localStorage.removeItem(
                TOUR_COMPLETED_KEY
            );


            localStorage.removeItem(
                TOUR_SKIPPED_KEY
            );


            setShowTour(true);

        };


        window.addEventListener(
            "start-guided-tour",
            handleStartTour
        );


        return () => {

            window.removeEventListener(
                "start-guided-tour",
                handleStartTour
            );

        };

    }, []);


    /* =========================================================
       COMPLETE TOUR
    ========================================================= */

    const handleTourComplete = () => {

        /*
         * Mark tour as completed.
         */

        localStorage.setItem(
            TOUR_COMPLETED_KEY,
            "true"
        );


        /*
         * Remove skipped status.
         */

        localStorage.removeItem(
            TOUR_SKIPPED_KEY
        );


        /*
         * Close tour.
         */

        setShowTour(false);


        /*
         * Always take the user
         * to Dashboard after completion.
         */

        if (
            location.pathname !==
            "/dashboard"
        ) {

            navigate(
                "/dashboard",
                {
                    replace: true
                }
            );

        }

    };


    /* =========================================================
       SKIP TOUR
    ========================================================= */

    const handleTourSkip = () => {

        /*
         * Remember that the user skipped
         * the first-time tour.
         */

        localStorage.setItem(
            TOUR_SKIPPED_KEY,
            "true"
        );


        /*
         * Remove completed status.
         */

        localStorage.removeItem(
            TOUR_COMPLETED_KEY
        );


        /*
         * Close tour.
         */

        setShowTour(false);


        /*
         * Return to dashboard.
         */

        if (
            location.pathname !==
            "/dashboard"
        ) {

            navigate(
                "/dashboard",
                {
                    replace: true
                }
            );

        }

    };


    /* =========================================================
       WHILE CHECKING USER
    ========================================================= */

    if (checkingUser) {

        return children;

    }


    /* =========================================================
       RENDER
    ========================================================= */

    return (

        <>

            {children}


            <GuidedTour
                isActive={
                    showTour
                }

                onTourComplete={
                    handleTourComplete
                }

                onTourSkip={
                    handleTourSkip
                }
            />

        </>

    );

};


export default TourGate;