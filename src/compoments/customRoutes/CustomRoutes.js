import { Navigate } from 'react-router-dom';

function checkLog(){
    const token = JSON.parse(localStorage.getItem('tokens'));
    if(token === null)  return false;
    else return true;
}

const CustomRoutes = ({compoment:Compoment,...rest}) => {
    const isLog = checkLog()
    console.log("is loginnnn"+isLog);
    return (
       isLog? (<Compoment{...rest}/>) : (<Navigate to={'/'}/>)
    )
}

export default CustomRoutes;