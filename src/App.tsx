import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Calendar from './pages/Calendar';
import Chart from './pages/Chart';
import ECommerce from './pages/Dashboard/ECommerce';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Tables from './pages/Tables';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import DefaultLayout from './layout/DefaultLayout';
import AdminIn   from './pages/Admin/AdminIn';
import Lead from './pages/Lead/Lead';
import Contract from './pages/contract/Contract';
import Quotation from './pages/Quotation/Quotation'
import QuotationForm from './pages/Quotation/QuotationForm';
import EditUserTable from './pages/EditUserTable';
import EditLead from './pages/Lead/EditLead';
import HistoryLead from './pages/Lead/HistoryLead';
import LeadDetail from './pages/Lead/LeadDetail';
import CreateContract from './pages/contract/CreateContract';
import EditQuest from './pages/Question/EditQuest';
import EditContract from './pages/contract/EditContract';
import EditQuot from './pages/Quotation/EditQuot';
import ClientInformation from './pages/Question/ClientInformation';
import GeneralContract from './pages/contract/GeneralContract';
import IATFContractReviewForm from './pages/ISO_Form/IATFContractReviewForm';
import ProtectedRoute from './util/ProtectedRoute';
import InitialManday from './pages/ISO_Form/InitialManday';
import Recertificate from './pages/ISO_Form/Recertificate';
function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <DefaultLayout>
      <Routes>

      <Route
         index
          element={
            <>
              <PageTitle title="Signup | TailAdmin - Tailwind CSS Admin Dashboard Template" />
             <AdminIn/>
            </>
          }
        /> 
        <Route element={<ProtectedRoute/>}>
        <Route
          path="/dashboard"
          element={
            <>
              <PageTitle title="eCommerce Dashboard | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <ECommerce />
            </>
          }
        />
        <Route
          path="/calendar"
          element={
            <>
              <PageTitle title="Calendar | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Calendar />
            </>
          }
        />
        <Route
          path="/opportunity"
          element={
            <>
              <PageTitle title="Profile | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Profile />
            </>
          }
        />
        <Route
          path="/forms/form-elements"
          element={
            <>
              <PageTitle title="Form Elements | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <FormElements />
            </>
          }
        />
        <Route
          path="/forms/form-layout"
          element={
            <>
              <PageTitle title="Form Layout | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <FormLayout />
            </>
          }
        />
        <Route
          path="/tables"
          element={
            <>
              <PageTitle title="Tables | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Tables />
            </>
          }
        />
        <Route
          path="/settings"
          element={
            <>
              <PageTitle title="Settings | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Settings />
            </>
          }
        />
        <Route
          path="/chart"
          element={
            <>
              <PageTitle title="Basic Chart | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Chart />
            </>
          }
        />
        <Route
          path="/ui/alerts"
          element={
            <>
              <PageTitle title="Alerts | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Alerts />
            </>
          }
        />
        <Route
          path="/ui/buttons"
          element={
            <>
              <PageTitle title="Buttons | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Buttons />
            </>
          }
        />
        <Route
           path="/auth/signin"
          element={
            <>
              <PageTitle title="Signin | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <SignIn />
            </>
          }
        />
        <Route
          path="/auth/signup"
          element={
            <>
              <PageTitle title="Signup | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <SignUp />
            </>
          }
        />

       {/* admin */}
       
        <Route
        path="/business/lead"
        element={
          <>
            <PageTitle title="Signup | TailAdmin - Tailwind CSS Admin Dashboard Template" />
            <Lead/>
          </>
        }
        />
      <Route
        path="/business/contract"
        element={
          <>
            <PageTitle title="Signup | TailAdmin - Tailwind CSS Admin Dashboard Template" />
            <Contract/>
          </>
        }
        />
        <Route
         path="/business/contract/create"
         element={
          <>
            <PageTitle title="Signup | TailAdmin - Tailwind CSS Admin Dashboard Template" />
            {/* <Contract/> */}
            <CreateContract/>
          </>
         }
        />
        <Route
        path="/business/Quotation"
        element={
          <>
            <PageTitle title="Signup | TailAdmin - Tailwind CSS Admin Dashboard Template" />
            {/* <Contract/> */}
            <Quotation/>
          </>
        }
        />

{/* /business/quotation/form */}
<Route
        path="/business/quotation/form"
        element={
          <>
            <PageTitle title="Signup | TailAdmin - Tailwind CSS Admin Dashboard Template" />
            {/* <Contract/> */}
             <QuotationForm/>
          </>
        }
        />
        
        <Route
        path="/tables/edit-user/:id"
        element={
          <>
            <PageTitle title="Signup | TailAdmin - Tailwind CSS Admin Dashboard Template" />
            {/* <Contract/> */}
             <EditUserTable/>
          </>
        }
        />
       <Route
          path='/lead/edit-user/:id'
          element={
            <>
            <PageTitle title="Signup | TailAdmin - Tailwind CSS Admin Dashboard Template" />
          
              <EditLead/>
            
            </>
          }
          />

          <Route path="/quotation/edit-user/:id"
            element={
              <>
              <PageTitle title="Signup | TailAdmin - Tailwind CSS Admin Dashboard Template" />
            
                <EditQuot/>
              
              </>
            }
            />

<Route
          path='/lead/history'
          element={
            <>
            <PageTitle title="Signup | TailAdmin - Tailwind CSS Admin Dashboard Template" />
          
              <HistoryLead/>
            
            </>
          }
          />


          <Route path='/lead/detail/:id'
          element={
            <>
            <PageTitle title="Signup | TailAdmin - Tailwind CSS Admin Dashboard Template" />
          
        <LeadDetail/>
            
            </>
          }
          />
{/* questionnaire */}
<Route
          path='/questionnaire/edit-user/:id'
          element={
            <>
            <PageTitle title="Signup | TailAdmin - Tailwind CSS Admin Dashboard Template" />
            <EditQuest/>
              
            
            </>
          }
          />
          <Route
          path='/contract/edit-user/:id'
          element={
            <>
            <PageTitle title="Signup | TailAdmin - Tailwind CSS Admin Dashboard Template" />
             <EditContract/>
              
            
            </>
          }
          />

<Route
          path='/questionnaire/form'
          element={
            <>
            <PageTitle title="Signup | TailAdmin - Tailwind CSS Admin Dashboard Template" />
            <ClientInformation/>
              
            
            </>
          }
          />

<Route
          path='/business/contract/contractReview'
          element={
            <>
            <PageTitle title="Signup | TailAdmin - Tailwind CSS Admin Dashboard Template" />
            {/* <ClientInformation/> */}
            <GeneralContract/>
              
            
            </>
          }
          />
          <Route
          path='/business/contract/review'
          element={
            <>
            <PageTitle title="Signup | TailAdmin - Tailwind CSS Admin Dashboard Template" />
            {/* <ClientInformation/> */}
            <IATFContractReviewForm/>
              
            
            </>
          }
          />


<Route
          path='/business/contract/contractReview'
          element={
            <>
            <PageTitle title="Signup | TailAdmin - Tailwind CSS Admin Dashboard Template" />
            {/* <ClientInformation/> */}
            <GeneralContract/>
              
            
            </>
          }
          />
          <Route
          path='/business/contract/manday'
          element={
            <>
            <PageTitle title="Signup | TailAdmin - Tailwind CSS Admin Dashboard Template" />
            {/* <ClientInformation/> */}
            {/* <IATFContractReviewForm/> */}
              
               <InitialManday/> 
            </>
          }
          />

<Route
          path='/business/contract/recertification'
          element={
            <>
            <PageTitle title="Signup | TailAdmin - Tailwind CSS Admin Dashboard Template" />
            {/* <ClientInformation/> */}
            {/* <IATFContractReviewForm/> */}
              
               {/* <InitialManday/>  */}
               <Recertificate/>
            </>
          }
          />



        </Route>



        



          




      </Routes>
    </DefaultLayout>
  );
}

export default App;
