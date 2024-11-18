import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <AppBar position='static'>
      <Toolbar component='nav' sx={{ justifyContent: 'space-between' }}>
        <Typography
          variant='h6'
          component={Link}
          color='white'
          sx={{ textDecoration: 'none' }}
          to='/'
        >
          Contacts
        </Typography>
        <Button variant='outlined' color='inherit' component={Link} to='new'>
          Add new contact
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
