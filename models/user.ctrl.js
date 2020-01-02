// import routes from '../routes';
// import User from './User';

// export const getJoin = (req, res) => res.render("join");
// export const postJoin = async (req, res) => {
//     const {
//         body: { name, email, password, password2 }
//     } = req;
//     if( password !== password2) {
//         res.status(400);
//         res.render("join", { pageTitle: "Join"})
//     }
//     else{
//         try{
//         const user = await User.create({
//             name,
//             email,
//         });

//         await User.register(user, password);

//         } catch(error) {
//             console.log(error);
//         }

//         res.redirect(routes.home);
//     }

// };