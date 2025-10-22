import authenticationRoute from './authentication.route.js';
import messageRoute from './message.route.js';
import userRoute from './user.route.js';


const routes = (app) => {
    app.use('/api/authentication', authenticationRoute);
    app.use('/api/user', userRoute);
    app.use('/api/message', messageRoute);
};


export default routes;