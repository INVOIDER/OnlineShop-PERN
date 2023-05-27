import Header from "./components/Header";
import "./styles/index.css"
import Footer from "./components/Footer";
import AppRouter from "./components/AppRouter";
import {BrowserRouter} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {Context} from "./index";
import {observer} from "mobx-react-lite";
import {check} from "./http/userAPI";
const App = observer(()=> {
    const {user} = useContext(Context)
    const [loading,setLoading] = useState(true)
    useEffect(()=>{
            check().then(data=>{
                user.setUser({data})
                user.setIsAuth(true)
                console.log('Вы - ', user.user.data.name)
            }).finally(()=> setLoading(false))
    },[])

    if (loading){
        return <p>Подождите. Идёт загрузка страницы...</p>
    }
  return (
      <BrowserRouter>
          <div className="App">
              <Header/>
              <div className="content-wrapper">
                  <AppRouter/>
              </div>
              <Footer/>
          </div>
      </BrowserRouter>
  );
});

export default App;
