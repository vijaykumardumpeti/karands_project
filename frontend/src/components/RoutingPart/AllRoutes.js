import React, { Suspense, lazy } from 'react';



import { Routes, Route } from "react-router-dom";

import Role from '../authentication/Role'
import Iu from '../completeRole/Iu'
import IchpUser from '../completeRole/IchpUser'
import ReferalCode from '../completeRole/ReferalCode'
import Details from '../Dashboard/Details'
import Sidebar from '../Dashboard/Sidebar'
import Viewprofile from '../Dashboard/Viewprofile'
import Editprofile from '../Dashboard/Editprofile';
import Newdocuments from '../Dashboard/Newdocuments';
import MyAccount from '../Dashboard/MyAccount'
import MainPage from '../objSurvey/MainPage'
import ObjSurvey from '../objSurvey/ObjSurvey';
import ObjSurveyBox from '../objSurvey/ObjSurveyBox'
import PopUp from "../Dashboard/PopUp";
import Pricing from '../Pricing/Pricing'



 import Protect from './Protect'
import MyTaskDashBoard from '../MyTask/MyTaskDashBoard'
import Recruitment from '../MyTask/Recruitment'
import Referalbonus from '../MyTask/Referalbonus'
import AffiliateAds from '../MyTask/AffiliateAds'
import OngoingTask from '../MyTask/OngoingTask'
import CompletedTask from '../MyTask/CompletedTask'
import DeclinedTask from '../MyTask/DeclinedTask'
import Earning from '../MyTask/Earning';
import PostfeedAdmin from "../Admin/PostfeedAdmin";
import AccountAdmin from '../Admin/otheradmin/AccountAdmin'
import TeamAdmin from '../Admin/TeamAdmin';
import JobPostAdmin from '../Admin/JobPostAdmin';
import UserAdmin from '../Admin/UserAdmin';
import DocumentAdmin from '../Admin/DocumentAdmin';
import PaymentAdmin from '../Admin/PaymentAdmin';
import ComplaintAdmin from '../Admin/ComplaintAdmin';
import RequestAdmin from '../Admin/RequestAdmin';
import SettingsAdmin from '../Admin/SettingsAdmin'
import TemplateAdmin from '../Admin/TemplateAdmin';

import DeclnTasks from '../Admin/DeclineTasks/DeclnTasks';
import ListOfPostfeeds from '../Admin/ListOfPostfeeds'
import AdminuserlistEach from '../userlist/AdminuserlistEach'
import Companieslist from '../Admin/Companieslist'
import ListOfPostJobs from '../Admin/ListOfPostJobs'
import ListOfICHP from '../Admin/ListOfICHP';
import ListOfIU from '../Admin/ListOfIU';
// import AdminRegistration from '../AdminRegistration/Admininvite'
import SearchAdmin from '../Admin/SearchAdmin';
import Dashboardadmin from '../Admin/Dashboardadmin';
// import MyNetwork from '../Admin/MyNetwork/MyNetwork';
import Tasks from '../Admin/AcceptTasks/Tasks';
import AdminFirstLogin from '../AdminRegistration/AdminFirstLogin'
import ViewDocument from '../Document/ViewDocument'
import Company from '../company/Company'
import MyPostedJobs from '../company/MyPostedJobs';
import Editcompanypage from '../company/Editcompanypage'
import Companypreview from '../company/Companypreview'
import Newjobpreview from '../job/Newjobpreview'
import Joblist from '../job/Joblist'

import MyNetwork from '../Dashboard/MyNetwork'
import CheckEligibility from './CheckEligibility'
import PricingAll from '../payment/PricingAll';
import Adminuserlist from '../Admin/Adminuserlist'
import CardPost from '../Dashboard/CardPost';
import Comment from '../Dashboard/Comment';
import NewPop from "../Dashboard/NewPop"
import TopUser from './TopUser'


import ForgotPassword from '../authentication/ForgotPassword'
import Settings from '../Dashboard/settings'
import Appliedjobs from '../Dashboard/appliedjobs'

import OtpVerification from '../authentication/OtpVerification'
import Searchpage from '../Dashboard/searchpage'
import Changepassword from '../AdminRegistration/Changepassword'
import Admininvite from '../AdminRegistration/Admininvite'
import Adminlogin from '../AdminRegistration/Adminlogin'
import Hrmailform from '../Dashboard/Hrmailform'
import PhonePayIntegration from '../authentication/PhonePayIntegration'
import PaymentSuccess from '../authentication/PaymentSuccess'
import Userchangepassword from '../authentication/userchangepassword'
import CallbackPage from '../authentication/callbackpage'
import PaymentFailure from '../authentication/paymenterror'
import Overview from '../Admin/overview'
import AdminViewProfile from '../Admin/AdminViewProfile'
import Editcompanydetails from '../company/editcompanydetails'
import Ichpmytask from '../MyTask/ichpmytask'
import Assignedtask from '../MyTask/assignedtask'
import UserSelection from '../MyTask/UserSelection'
import BCCForm from '../BCC/BCCForm';
import BCCForm2 from '../BCC/BCCForm2';
import Bccaddcompany from '../BCC/Bccaddcompany';
import SuccessPage from '../BCC/BCCpaymentsuccess';
import Bccpaymentsucess from '../BCC/BCCpaymentsuccess';
import CompanyPaymentFailure from '../BCC/BCCpaymenterror';
import ConsultantPage from '../Admin/TeamPage/ConsultantPage';
import Post from '../activity/Post';
import AllActivity from '../activity/AllActivity';
import FavouritePosts from '../activity/FavouritePosts';
import Sharedprofile from '../Dashboard/sharedprofile';
import Jobpreview from '../job/jobpreview';


import Login from '../../components/authentication/Login'
import Assignedtasks from '../MyTask/Assignedtasks';
import Recruitmentdrivejob from '../company/Recruitmentdrivejob';
import AssignedNewtask from '../MyTask/AssignedNewtask';

function AllRoutes() {

  const payment = 1000;

  return (

    
    <Routes>
      {/* <Route path='/register' element={<Register />} /> */}

      <Route path='/hrform' element={<Hrmailform />} />

      <Route path='/forgotpassword' element={<ForgotPassword />} />
      <Route path='/box' element={<ObjSurveyBox />} />
      <Route path='/role' element={<Protect>
        <Role />
      </Protect>} />
      <Route path='/iu' element={<Protect>
        <Iu />
      </Protect>} />
      <Route path='/ichp' element={<Protect><IchpUser /></Protect>} />
      <Route path='/refferalcode' element={<Protect><ReferalCode /></Protect>} />
      <Route path='/details' element={<Protect><Details /></Protect>} />
      <Route path='/sidebar' element={<Protect><Sidebar /></Protect>} />
      <Route path='/viewprofile' element={<Protect><Viewprofile /></Protect>} />
      <Route path='/viewprofile/:userId' element={<Protect><Viewprofile /></Protect>} />
      <Route path='/editprofile' element={<Protect><Editprofile /></Protect>} />
      <Route path='/upload' element={<Protect><Newdocuments /></Protect>} />
      <Route path='/myaccount' element={<Protect><MyAccount /></Protect>} />
      <Route path='/survey' element={<Protect><MainPage /></Protect>} />
      <Route path='/objectSurvey' element={<Protect><ObjSurvey /></Protect>} />
      <Route path='/otpverify' element={<Protect><OtpVerification /></Protect>} />
      <Route path='/paymentsuccess' element={<Protect><PaymentSuccess /></Protect>} />
      <Route path='/paymenterror' element={<Protect><PaymentFailure /></Protect>} />
      <Route path='/dashboard' element={
        // here i changed protec................
        <CheckEligibility>
          <PopUp />
        </CheckEligibility>
        // here i changed protec................
      } />
      <Route path='/pricing' element={<Protect>
        <Pricing />
      </Protect>} />
   
      <Route path='/' element={<Login />} />
      {/* <Route path='/' element={<Home />} /> */}

      <Route path='/card' element={<CardPost />} />
      <Route path='/pricingall' element={<PricingAll />} />
      <Route path='/mytask' element={<MyTaskDashBoard />} />

      <Route path='/AssignedNewtask' element={<AssignedNewtask />} />

      <Route path='/recruitment' element={<Recruitment />} />
      <Route path='/refferalbonus' element={<Referalbonus />} />
      <Route path='/affiliateads' element={<AffiliateAds />} />
      <Route path='/ongoingtask' element={<OngoingTask />} />

      <Route path='/assignedtask' element={<Assignedtask />} />

      <Route path='/completedtask' element={<CompletedTask />} />
      <Route path='/declinetask' element={<DeclinedTask />} />
      <Route path='/earning' element={<Earning />} />
      <Route path='/admin/postfeed' element={<PostfeedAdmin />} />
      <Route path='/dashboard/admin' element={<Dashboardadmin />} />
      <Route path='/Admin' element={<Protect><Dashboardadmin /></Protect>} />
      <Route path='/admin/account' element={<AccountAdmin />} />
      <Route path="/admin/team" element={<TeamAdmin />} />
      <Route path="/admin/jobposts" element={<JobPostAdmin />} />
      <Route path="/admin/users" element={<UserAdmin />} />
      <Route path="/admin/documents" element={<DocumentAdmin />} />
      <Route path="/admin/payments" element={<PaymentAdmin />} />
      <Route path="/admin/complaints" element={<ComplaintAdmin />} />
      <Route path="/admin/requests" element={<RequestAdmin />} />
      <Route path="/admin/settings" element={<SettingsAdmin />} />
      <Route path="/admin/template" element={<TemplateAdmin />} />
      <Route path="/admin/search" element={<SearchAdmin />} />
      <Route path='/task' element={<Tasks />} />
      <Route path='/declntask' element={<DeclnTasks />} />
      <Route path='/listofpostfeed' element={<ListOfPostfeeds />} />
      <Route path='/admin/userlist' element={<Adminuserlist />} />

      <Route path='/admin/userlist/:name' element={<Adminuserlist />} />


      <Route path='/admin/companylist' element={<Companieslist />} />
      <Route path='/listofpostjobs' element={<ListOfPostJobs />} />
      <Route path='/listofiu' element={<ListOfIU />} />
      <Route path='/listofichp' element={<ListOfICHP />} />
      <Route path='/invite/registration' element={<Admininvite payment={payment} />} />
      <Route path='/document/verify' element={<ViewDocument />} />
      <Route path='/invite/login' element={<Adminlogin />} />
      <Route path='/adminlogin' element={<Adminlogin />} />
      <Route path='/companypage' element={<Company />} />
      <Route path='/companypage/postedjobs' element={<MyPostedJobs />} />
      <Route path='/companypage/add' element={<Editcompanypage />} />
      <Route path='/companypage/about' element={<Companypreview />} />
      <Route path='/pricingall' element={<Pricing />} />
      <Route path='/jobpreview' element={<Newjobpreview />} />
      <Route path='/joblist' element={<Joblist />} />
      <Route path='/mynetwork' element={<MyNetwork />} />
      <Route path='/mypostedjobs' element={<MyPostedJobs />} />
      <Route path='/invite/passwordChange' element={<Changepassword />} />
      <Route path='/userlist' element={<AdminuserlistEach />} />
      <Route path='/companytablelist' element={<Companieslist />} />
      <Route path='/postfeedlist' element={<ListOfPostfeeds />} />
      <Route path='/comments' element={<Comment />} />
      <Route path='/newpop' element={<NewPop />} />
      <Route path='/topuser' element={<TopUser />} />
      <Route path='/settings' element={<Settings />} />
      <Route path='/appliedjobs' element={<Appliedjobs />} />
      <Route path='/searchpage' element={<Searchpage />} />
      <Route exact path="/PhonePayIntegration" element={<PhonePayIntegration />} />
      <Route path="/paymentsuccess" element={<PaymentSuccess />} />
      <Route path="/callbackPage" element={<CallbackPage />} />
      <Route path="/userchangepassword" element={<Userchangepassword />} />
      <Route path="/overview" element={<Overview />} />
      <Route path="/adminviewprofile" element={<AdminViewProfile />} />

      <Route path="/company/edit" element={<Editcompanydetails />} />

      <Route path="/ichpmytask" element={<Ichpmytask />} />
      <Route path="/userselection" element={<UserSelection />} />


      <Route path="/consultant" element={<Bccaddcompany />} />
      
      <Route path="/bccform" element={<BCCForm />} />

      <Route path="/bccform2" element={<BCCForm2 />} />

      <Route path='/bccpaymentsucess' element={<Bccpaymentsucess />} />


      <Route path='/bccpaymenterror' element={<CompanyPaymentFailure />} />

      


      <Route path='/consultantpage' element={<ConsultantPage />} />


      <Route path='/post' element={<Post/>}/>
      <Route path='/allactivity' element={<AllActivity/>}/>
      <Route path='/favouritepage' element={<FavouritePosts/>}/>

      <Route path='/sharedprofile/:userId' element={<Sharedprofile/>}/>
      
      <Route path='/sharedjobpreview/:query' element={<Jobpreview/>}/>

      <Route path='/Assignedtasks' element={<Assignedtasks/>}/>
      <Route path='/recruitmentdrivejobs' element={<Recruitmentdrivejob/>}/>




    </Routes>

  )
}

export default AllRoutes;
