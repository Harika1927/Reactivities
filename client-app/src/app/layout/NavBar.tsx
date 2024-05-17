
import { Button, Container, Menu } from "semantic-ui-react";
import {  NavLink } from "react-router-dom";

//if NavBar is not rturning any elements or data in UI keep empty function
export default function NavBar(){
   
    return(
        <Menu inverted fixed='top' >
            <Container>
                <Menu.Item as={NavLink} to='/' header>
                    <img src="/assets/logo.png" alt = "logo" style = {{marginRight : '10px'}}/>
                        Reactivities                  
                </Menu.Item>
                <Menu.Item as={NavLink} to='/activities' name='Activity'/>
                <Menu.Item>
                    <Button as={NavLink} to='/createActivity' positive content = 'Create Activity'/>
                </Menu.Item>
            </Container>
        </Menu>
    )
}