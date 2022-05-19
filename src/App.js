import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Serie from './components/Serie';
import Home from './components/Home';
import Erro404 from './components/Erro404';
import Error from './components/Error';


const App = () => 
{
  return (
      <BrowserRouter>
        <Switch>
            <Route path="/" exact render={() => <Home/>}/>
            <Route path="/serie/:id" render={()=> <Serie/>}/>
            <Route path="/error" render={()=> <Error/>}/>
            <Route path="*" render={()=> <Erro404/>}/>
        </Switch>
      </BrowserRouter>
    
  );
}

export default App;
