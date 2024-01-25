import './App.css';
import {useEffect} from "react";
import {useTelegram} from "./hooks/useTelegram";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home"
import Form from "./components/Form/Form"
import {useSelector} from "react-redux";

function App() {
    const {tg} = useTelegram();
    const morning = [
        {
            id: 1,
            name: 'Количество часов сна:'
        },
        {
            id: 2,
            name: 'Качество сна:'
        },
        {
            id: 3,
            name: 'Уровень энергии:'
        }
    ]
    const evening = [
        {
            id: 1,
            name: 'Уровень стресса:'
        },
        {
            id: 2,
            name: 'Уровень физической нагрузки:'
        },
        {
            id: 3,
            name: 'Удовлетворенность рационом:'
        },
        {
            id: 4,
            name: 'Насыщенность рационом:'
        },
        {
            id: 5,
            name: 'Количество приемов пищи:'
        },
        {
            id: 6,
            name: 'Количество шагов:'
        }
    ]
    const pageList = [
        {name: 'Home', page: <Home />},
        {name: 'Morning', page: <Form questionList={morning} />},
        {name: 'Evening', page: <Form questionList={evening}/>},
    ]

    const pageName = useSelector( state => state.page)

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