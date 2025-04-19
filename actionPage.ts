import { LoginPage } from "./loginPage";


export class ActionPage extends LoginPage {

    public async clickActionmenu() {
        try{
            await this.click("[aria-label='Open Actions menu']","OpenAction Menu", "Button")
        } catch(error) {
            console.log(error);
        }
    }
    public async selectReinbursement() {
        try{
        await this.click("[aria-label='Open Reinbursement type']","OpenAction ", "Menu")
        } catch(error) {
            console.log(error);
        }
    }
    public async selectdropdown() {
        try{
            await this.click("[aria-label='File for a Reinbursement']","Dropdown", "Button")
            await this.click("[aria-label='Vehicle repair 1 of']","OpenAction Menu", "Button")
        } catch(error) {
            console.log(error);
        }
    }

    public async uploadFiles() {
        try{
            await this.uploadFile("[aria-label='Upload Vehicle repair order']","data/temp.png")
            await this.uploadFile("[aria-label='Upload Vehicle repair receipt']","data/temp.png")
        } catch(error) {
            console.log(error);
        }
    }

    public async enterEmail() {
        try{
            await this.type("[aria-label='Email address']","Email Address", "Textbox")
                  } catch(error) {
            console.log(error);
        }
    }

    public async clickSubmit(){
        try{
            await this.type("[aria-label='submit']","Submit", "Button")
                  } catch(error) {
            console.log(error);
        }
    }

    public async validateDocuments(){
        try{
          await  this.verification(".gcp-confirmation-title","You submitted two documents")
        } catch(error) {
            console.log(error);
        }
    }
}