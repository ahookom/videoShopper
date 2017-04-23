'use strict'
import React from 'react'
import {Router, Route, IndexRedirect, browserHistory} from 'react-router'
import {render} from 'react-dom'
import {connect, Provider} from 'react-redux'

import store from './store'
import Jokes from './components/Jokes'
import Login from './components/Login'
import WhoAmI from './components/WhoAmI'
import NotFound from './components/NotFound'

import App from './components/App'

import HomeView from './components/HomeView'
import AdminView from './components/AdminView'
import CartView from './components/CartView'
import ProductsView from './components/ProductsView'
import ProductView from './components/ProductView'
import UserAccountView from './components/UserAccountView'

import {fetchProducts, getProductById} from './reducers/product'
import {fetchOrders} from './reducers/order'

// const ExampleApp = connect(
//  ({ auth }) => ({ user: auth })
// )(
//  ({ user, children }) =>
//    <div>
//      <nav>
//        {user ? <WhoAmI/> : <Login/>}
//      </nav>
//      {children}
//    </div>
// )

const handleFetchOrders = () => {
  store.dispatch(fetchOrders());
}

const onProductEnter = nextRouterState => {
  const productId = nextRouterState.params.id
  store.dispatch(getProductById(productId))
}

// const handleFetchProducts = (nextRouterState, replace, done) => {
//   store.dispatch(fetchProducts())
//   .then(() => done())
// }

render(
 <Provider store={store}>
   <Router history={browserHistory}>
     <Route path="/" component={App} >
       <Route path='/home' component={HomeView} />
       <Route path='/products' component={ProductsView} >
         <Route path='/products/:category' component={ProductsView} />
       </Route>
       <Route path='/product/:id' component={ProductView} onEnter={onProductEnter}/>
       <Route path='/user/:id' component={UserAccountView} />
       <Route path='/cart' component={CartView} />
       <Route path='/admin' component={AdminView} onEnter={handleFetchOrders} />
       <IndexRedirect to="/home" />
     </Route>
     <Route path='*' component={NotFound} />

   </Router>
 </Provider>,
 document.getElementById('main')
)
// <Route path="/" component={ExampleApp}>
