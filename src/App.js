import './App.css';
import {useEffect} from "react";
import {useTelegram} from "./hooks/useTelegram";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home"
import Form from "./components/Form/Form"
import FeatureForm from "./components/FeatureForm/FeatureForm"
import {useSelector} from "react-redux";
import uuid from 'react-native-uuid';
import {TYPE_OF_QUESTION} from "./constans";

function App() {
    const {tg} = useTelegram();
    const morning = [
        {
            id: 1,
            type: TYPE_OF_QUESTION.QUESTION_LIST,
            name: 'Количество часов сна:',
            key: uuid.v4()
        },
        {
            id: 2,
            name: 'Качество сна:',
            type: TYPE_OF_QUESTION.QUESTION_LIST,
            key: uuid.v4()
        },
        {
            id: 3,
            name: 'Уровень энергии:',
            type: TYPE_OF_QUESTION.QUESTION_LIST,
            key: uuid.v4()
        },
        {
            id: 4,
            name: 'Утреннее взвешивание',
            type: TYPE_OF_QUESTION.FILE,
            key: uuid.v4()
        }
    ]
    const evening = [
        {
            id: 1,
            name: 'Уровень стресса:',
            type: TYPE_OF_QUESTION.QUESTION_LIST,
            key: uuid.v4()
        },
        {
            id: 2,
            name: 'Уровень физической нагрузки:',
            type: TYPE_OF_QUESTION.QUESTION_LIST,
            key: uuid.v4()
        },
        {
            id: 3,
            name: 'Удовлетворенность рационом:',
            type: TYPE_OF_QUESTION.QUESTION_LIST,
            key: uuid.v4()
        },
        {
            id: 4,
            name: 'Насыщенность рационом:',
            type: TYPE_OF_QUESTION.QUESTION_LIST,
            key: uuid.v4()
        },
        {
            id: 5,
            name: 'Количество приемов пищи:',
            type: TYPE_OF_QUESTION.QUESTION_LIST,
            key: uuid.v4()
        },
        {
            id: 6,
            name: 'Количество шагов:',
            type: TYPE_OF_QUESTION.QUESTION_INPUT,
            key: uuid.v4()
        },
        {
            id: 7,
            name: 'Калорийность',
            type: TYPE_OF_QUESTION.FILE,
            key: uuid.v4()
        }
    ]
    const pageList = [
        {name: 'Home', page: <Home />},
        {name: 'Features', page: <FeatureForm questionList={[...morning, ...evening]} />},
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