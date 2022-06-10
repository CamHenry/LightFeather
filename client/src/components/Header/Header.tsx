import './Header.css';
import { Heading } from '@chakra-ui/react';

const Header = () => {

  return(
    <header className='Header-title'>
      <Heading as='h1' size='2xl'>
          Notification Form
      </Heading>
    </header>
  )

}

export default Header;