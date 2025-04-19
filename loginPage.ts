import { BrowserContext, Page } from "playwright";
import { PlaywrightWrapper } from "../helpers/playwright";
import { URLConstants } from "../constants/urlConstants";

export class LoginPage extends PlaywrightWrapper {

    constructor(page: Page, context: BrowserContext) {
        super(page, context);
    }
   
    public async doLogin(uname:string,lname:string,zipCode:string) {
        await this.loadApp(URLConstants.adminURL)
        try{
            await this.type("[aria-label='VIN (full or last ']", "Username", uname);
            await this.type("[aria-label= Last Name]", "Lastname",lname);
            await this.type("[aria-label= Zip]", "ZipCode",zipCode);
            await this.click("[aria-label= Log In]", "Sign In", "Button");
        } catch(error) {
            console.log(error);
        }
    }

  


















}