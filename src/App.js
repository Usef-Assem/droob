import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Home from './components/Home/Home'
import About from './components/About/About'
import Animation from './components/Animation/Animation'
import Footer from './components/Footer/Footer'
import Loading from './components/Animation/Loading'


function App() {
  return <>
  <Navbar />
  <Home />
  <Animation />
  <About />
  {/* <Loading /> */}
  <Footer />
  </>
}

export default App
