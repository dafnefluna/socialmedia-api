// import { Router } from 'express';
// import User from '../../models/User'; // Ensure this path is correct and the file exists

// const router = Router();

// // all of these routes are PREFIXED with '/api/users'
// /*router.get('/', (_req, res) => {

//     // We make our QUERY to our DB
//     User.find({}, (err, data) => {
//         if(err) {
//             throw Error
//         }
//         console.log(data)
//         res.status(200).json(data)
//     })
// })
// */
// // all of these routes are PREFIXED with '/api/users'
// router.get('/', async (_req, res) => {

//     // We make our QUERY to our DB
//     let data = await User.find();

//     res.status(200).json(data);
// })

// // all of these routes are PREFIXED with '/api/users'
// router.post('/', async (req, res) => {
//     console.log("incoming data: ", req.body);
//     // We make our QUERY to our DB
//    // let data = await User.create(req.body);

//     res.status(200).json({ msg: "User Created "});
// })

// export default router;