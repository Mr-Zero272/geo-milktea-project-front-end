import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from '~/routes';
import { Fragment } from 'react';
import { Provider } from 'react-redux';
import { DefaultLayout } from '~/Layout';
import store from './components/Provider/store';

function App() {
    return (
        <Provider store={store}>
            <Router>
                <div className="App">
                    <Routes>
                        {publicRoutes.map((route, index) => {
                            const Page = route.component;
                            let Layout = DefaultLayout;

                            if (route.layout) {
                                Layout = route.layout;
                            } else if (route.layout === null) {
                                Layout = Fragment;
                            }
                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    }
                                ></Route>
                            );
                        })}
                    </Routes>
                </div>
            </Router>
        </Provider>
    );
}

export default App;
