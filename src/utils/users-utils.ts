
import { LoggedUser } from '../auth/logged-user.decorator';

export const UserLoggedIsAdim = () => {
    console.log('UserLoggedIsAdim');

    const user =LoggedUser();

    /*
    console.log('user cpf:', user['cpf']);
    console.log('user email:', user['email']);
    console.log('user admin:', user['isAdmin']);
    */

    return user['isAdmin'];
};