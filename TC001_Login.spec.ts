import test from '@playwright/test'
import { ActionPage } from '../pages/actionPage'
import loginData from "../data/login.json"
test(`Scenario`,async({page,context})=>{
    const ap= new ActionPage(page,context)

    for(const data of loginData){
    await ap.doLogin(data.name,data.lastname,data.zipcode)
    await ap.clickActionmenu()
    await ap.selectdropdown()
    await ap.selectReinbursement()
    await ap.uploadFiles()
    await ap.enterEmail()
    await ap.clickSubmit()
    await ap.validateDocuments()
    
    }

})