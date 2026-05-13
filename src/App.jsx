import DailyBudget from './Pages/DailyBudget'
import Save from './Pages/Save'
import Tab from './Pages/Tab'

import { Routes, Route } from "react-router-dom";





function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Tab />} />
        <Route path="/save" element={<Save />} />
        <Route path="/budget" element={<DailyBudget />} />
      </Routes>
    </>
  )
}

export default App 