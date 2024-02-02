import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const Home = () => {

  const data = useSelector((state) => state.userLoginInfo.userInfo)
  const navigate = useNavigate()
  useEffect(()=>{
    if(!data){
      navigate('/login')
    }
  })
  return (
    <div>
      <h1>page</h1>
    </div>
  );
};

export default Home;
