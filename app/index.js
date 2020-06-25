import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { ThemeProvider } from './contexts/theme';
import Nav from './components/Nav';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Loading from './components/Loading';

// Для динамической загрузки кода модулей @babel/plugin-syntax-dynamic-import
const Popular = React.lazy(() => import('./components/Popular'));
const Battle = React.lazy(() => import('./components/Battle'));
const Results = React.lazy(() => import('./components/Results'));


// Каждый Component иммет три составляющие
// - State
// - Lifecycle (берем данные и передаем в интерфейс или состояние)
// - UI

class App extends React.Component {
    state = {
        theme: 'light',
        toggleTheme: () => {
            this.setState(({ theme }) => ({
                theme: theme === 'light' ? 'dark' : 'light'
            }));
        }
    }
    
    // Отвечает за то как будет выглядеть UI, но для работы нам нужен babel
    // Babel обернет return в React.createElement
    render() {
        return (
            <Router>
                <ThemeProvider value={this.state}>
                    <div className={this.state.theme}>
                        <div className='container'>
                            <Nav />
                            <React.Suspense fallback={<Loading />}>
                                <Switch>
                                    <Route exact path='/' component={Popular}/>
                                    <Route exact path='/battle' component={Battle}/>
                                    <Route path='/battle/results' component={Results} />
                                    <Route render={() => <h1>404</h1>} />
                                </Switch>
                            </React.Suspense>
                        </div>
                    </div>
                </ThemeProvider>
            </Router>
        );
    };
}

// Отрисовывает компонент в интерфейсе
// Принимает на вход
// React Element
// и место где нужно этот элемент нарисовать
ReactDOM.render ( 
    <App />,
    document.getElementById('app')
);