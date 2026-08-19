// const express = require("express");
// const router = express.Router();

// const axios = require("axios");

// // GET Nearby Soil Testing Centers
// router.get("/", async (req, res) => {

//     try {

//         const { lat, lon } = req.query;

//         if (!lat || !lon) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Latitude and Longitude are required."
//             });
//         }

//         // Overpass API Query
//         const query = `
//         [out:json];
//         (
//           node
//             ["name"~"soil|agriculture|laboratory|lab",i]
//             (around:25000,${lat},${lon});

//           way
//             ["name"~"soil|agriculture|laboratory|lab",i]
//             (around:25000,${lat},${lon});

//           relation
//             ["name"~"soil|agriculture|laboratory|lab",i]
//             (around:25000,${lat},${lon});
//         );
//         out center;
//         `;

//         const response = await axios.post(
//             "https://overpass-api.de/api/interpreter",
//             query,
//             {
//                 headers: {
//                     "Content-Type": "text/plain"
//                 }
//             }
//         );

//         const centers = response.data.elements.map((item) => {

//             const latitude = item.lat || item.center?.lat;
//             const longitude = item.lon || item.center?.lon;

//             return {

//                 id: item.id,

//                 name:
//                     item.tags?.name ||
//                     "Soil Testing Center",

//                 address:
//                     item.tags?.["addr:full"] ||
//                     item.tags?.["addr:street"] ||
//                     item.tags?.city ||
//                     "Address unavailable",

//                 phone:
//                     item.tags?.phone ||
//                     item.tags?.contact ||
//                     "Not Available",

//                 latitude,

//                 longitude,

//                 maps:

// `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`

//             };

//         });

//         res.json({
//             success: true,
//             centers
//         });

//     }

//     catch (err) {

//         console.log(err);

//         res.status(500).json({

//             success: false,

//             message: "Unable to fetch nearby soil testing centers."

//         });

//     }

// });

// module.exports = router;











const express = require("express");
const router = express.Router();

const SoilCenter = require("../models/SoilCenter");

/*
==========================================
GET NEARBY SOIL CENTERS
GET /api/soil-centers
==========================================
*/

router.get("/", async (req, res) => {

    try {

        let {

            lat,

            lon,

            radius = 10000,

            search = ""

        } = req.query;

        if (!lat || !lon) {

            return res.status(400).json({

                success: false,

                message: "Latitude and Longitude are required."

            });

        }

        lat = Number(lat);

        lon = Number(lon);

        radius = Number(radius);

        const query = {

            location: {

                $near: {

                    $geometry: {

                        type: "Point",

                        coordinates: [

                            lon,

                            lat

                        ]

                    },

                    $maxDistance: radius

                }

            }

        };

        if (search.trim() !== "") {

            query.$text = {

                $search: search

            };

        }

        let centers = await SoilCenter.find(query);

        centers = centers.map(center => {

            const obj = center.toObject();

            obj.distance = calculateDistance(

                lat,

                lon,

                obj.latitude,

                obj.longitude

            );

            obj.maps =
                `https://www.google.com/maps/dir/?api=1&destination=${obj.latitude},${obj.longitude}`;

            return obj;

        });

        centers.sort(

            (a, b) => a.distance - b.distance

        );

        res.json({

            success: true,

            total: centers.length,

            centers

        });

    }

    catch (err) {

        console.log(err);

        res.status(500).json({

            success: false,

            message: err.message

        });

    }

});
/*
==========================================
GET SINGLE SOIL CENTER
GET /api/soil-centers/:id
==========================================
*/

router.get("/:id", async (req, res) => {

    try {

        const center = await SoilCenter.findById(req.params.id);

        if (!center) {

            return res.status(404).json({

                success: false,

                message: "Soil Testing Center not found."

            });

        }

        res.json({

            success: true,

            center

        });

    }

    catch (err) {

        console.log(err);

        res.status(500).json({

            success: false,

            message: err.message

        });

    }

});
/*
==========================================
CALCULATE DISTANCE (KM)
==========================================
*/

function calculateDistance(lat1, lon1, lat2, lon2) {

    const R = 6371; // Radius of Earth in KM

    const dLat = (lat2 - lat1) * Math.PI / 180;

    const dLon = (lon2 - lon1) * Math.PI / 180;

    const a =

        Math.sin(dLat / 2) * Math.sin(dLat / 2) +

        Math.cos(lat1 * Math.PI / 180) *

        Math.cos(lat2 * Math.PI / 180) *

        Math.sin(dLon / 2) *

        Math.sin(dLon / 2);

    const c =

        2 * Math.atan2(

            Math.sqrt(a),

            Math.sqrt(1 - a)

        );

    return Number((R * c).toFixed(2));

}

/*
==========================================
EXPORT ROUTER
==========================================
*/

module.exports = router;