import './App.css';
import {useEffect} from "react";
import {useTelegram} from "./hooks/useTelegram";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home"
import Form from "./components/Form/Form"
import {useSelector} from "react-redux";

function App() {
    const {tg} = useTelegram();
    const pageName = useSelector( state => state.page)

    const pageList = [
        {name: 'Home', page: <Home />},
        {name: 'Morning', page: <Form />},
        {name: 'Evening', page: <Form />},
    ]

    useEffect(() => {
        tg.ready();
    }, [])

    const getPage = (pageName) => {
        if (!pageName) return pageList[0].page
        return pageList.filter( item => item.name === pageName)[0]?.page
    }

    return (
        <div className="App">
            <Header />
            {getPage(pageName)}
        </div>
    );
}

export default App;