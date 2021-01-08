import React , {Suspense , lazy} from 'react'
import Loading from './Components/Loading'
const Index = lazy(() => import('./Pages/Index'))
const AppChat = () => {
    return(
        <Suspense fallback={<Loading/>}>
            <Index/>
        </Suspense>
    )
}
export default AppChat