import { Navigate } from 'react-router-dom';
import { checkLogin } from './../LoginVerify';

const CustomRoutes = ({compoment:Compoment,...rest}) => {
    const isLog = checkLogin()
    console.log("is loginnnn");

    console.log("is loginnnn"+isLog);
    return (
       isLog? (<Compoment{...rest}/>) : (<Navigate to={'/'}/>)
    )
}

export default CustomRoutes;